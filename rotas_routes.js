// Variáveis globais de rotas
let routeLine = null;
let waypoints = [];
let waypointMarkers = [];

// Calcula a rota entre usuário e destino
function calcularRota() {
  if (!userLocation) {
    alert('Localização do usuário não disponível. Aguarde ou ative o GPS.');
    return;
  }

  if (!currentDestination && waypoints.length === 0) {
    alert('Nenhum destino selecionado!');
    return;
  }

  const modo = document.getElementById('modeSelect').value;
  mostrarLoading(true);

  let coords = [`${userLocation.lng},${userLocation.lat}`];
  
  waypoints.forEach(wp => {
    coords.push(`${wp.coords[1]},${wp.coords[0]}`);
  });
  
  if (currentDestination) {
    coords.push(`${currentDestination.coords[1]},${currentDestination.coords[0]}`);
  }

  const url = `https://router.project-osrm.org/route/v1/${modo}/` +
              coords.join(';') + '?' +
              `overview=full&geometries=geojson&steps=true`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.code !== 'Ok') {
        throw new Error('Rota não encontrada');
      }

      const route = data.routes[0];
      const routeCoords = route.geometry.coordinates.map(c => [c[1], c[0]]);

      if (routeLine) {
        map.removeLayer(routeLine);
      }

      routeLine = L.polyline(routeCoords, {
        color: modo === 'driving' ? '#4CAF50' : '#2c5aa0',
        weight: 6,
        opacity: 0.8,
        lineJoin: 'round'
      }).addTo(map);

      waypoints.forEach((wp, index) => {
        const marker = L.marker(wp.coords, {
          icon: L.divIcon({
            className: 'waypoint-marker',
            html: `<div style="background: #FFA500; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">${index + 1}</div>`,
            iconSize: [30, 30]
          })
        }).addTo(map);
        waypointMarkers.push(marker);
      });

      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

      const distance = (route.distance / 1000).toFixed(1);
      const duration = Math.round(route.duration / 60);
      
      let destinoNome = currentDestination ? currentDestination.nome : 'Múltiplos pontos';
      if (waypoints.length > 0) {
        destinoNome += ` (+${waypoints.length} parada${waypoints.length > 1 ? 's' : ''})`;
      }
      
      document.getElementById('info-destino').textContent = destinoNome;
      document.getElementById('info-distancia').textContent = distance + ' km';
      document.getElementById('info-tempo').textContent = duration + ' min';
      document.getElementById('info-modo').textContent = modo === 'driving' ? '🚗 Carro' : '🚶 A pé';
      
      // Mostra seção de informações
      document.getElementById('routeInfoSection').style.display = 'block';
      
      gerarInstrucoes(route.legs);
      
      mostrarLoading(false);
    })
    .catch(error => {
      console.error('Erro ao calcular rota:', error);
      alert('Erro ao calcular rota. Tente novamente.');
      mostrarLoading(false);
    });
}

// Gera as instruções de navegação
function gerarInstrucoes(legs) {
  const instructionsList = document.getElementById('instructionsList');
  instructionsList.innerHTML = '';
  
  const instrucoes = [];
  
  legs.forEach(leg => {
    leg.steps.forEach(step => {
      if (step.maneuver && step.maneuver.instruction) {
        instrucoes.push({
          text: step.maneuver.instruction,
          distance: (step.distance / 1000).toFixed(2)
        });
      }
    });
  });
  
  if (instrucoes.length > 0) {
    instrucoes.slice(0, 8).forEach((instr, index) => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'instruction-step';
      stepDiv.innerHTML = `
        <div class="step-number">${index + 1}</div>
        <div class="step-text">${instr.text} (${instr.distance} km)</div>
      `;
      instructionsList.appendChild(stepDiv);
    });
    
    if (instrucoes.length > 8) {
      const moreDiv = document.createElement('div');
      moreDiv.className = 'instruction-step';
      moreDiv.innerHTML = `
        <div class="step-number">+</div>
        <div class="step-text">Mais ${instrucoes.length - 8} etapas...</div>
      `;
      instructionsList.appendChild(moreDiv);
    }
    
    document.getElementById('routeInstructions').style.display = 'block';
  } else {
    document.getElementById('routeInstructions').style.display = 'none';
  }
}

// Limpa a rota e waypoints
function limparRota() {
  if (routeLine) {
    map.removeLayer(routeLine);
    routeLine = null;
  }
  
  waypointMarkers.forEach(marker => {
    map.removeLayer(marker);
  });
  waypointMarkers = [];
  
  waypoints = [];
  atualizarListaWaypoints();
  
  document.getElementById('routeInfoSection').style.display = 'none';
  document.getElementById('routeInstructions').style.display = 'none';
}

// Adiciona um waypoint (parada intermediária)
function adicionarWaypoint(local) {
  waypoints.push(local);
  atualizarListaWaypoints();
}

// Remove um waypoint específico
function removerWaypoint(index) {
  waypoints.splice(index, 1);
  atualizarListaWaypoints();
  
  if (routeLine) {
    map.removeLayer(routeLine);
    routeLine = null;
  }
  
  waypointMarkers.forEach(marker => {
    map.removeLayer(marker);
  });
  waypointMarkers = [];
  
  document.getElementById('routeInfoSection').style.display = 'none';
}

// Atualiza a lista visual de waypoints
function atualizarListaWaypoints() {
  const lista = document.getElementById('waypointsList');
  const section = document.getElementById('waypointsSection');
  lista.innerHTML = '';
  
  if (waypoints.length > 0) {
    section.style.display = 'block';
    waypoints.forEach((wp, index) => {
      const item = document.createElement('div');
      item.className = 'waypoint-item';
      item.innerHTML = `
        <span>${index + 1}. ${wp.nome}</span>
        <button class="remove-btn" onclick="removerWaypoint(${index})">✕</button>
      `;
      lista.appendChild(item);
    });
  } else {
    section.style.display = 'none';
  }
}

// Seleciona destino do mapa (função global para onclick no popup)
window.selecionarDestinoDoMapa = function(categoria, nomeLocal) {
  const local = locaisData[categoria].find(l => l.nome === nomeLocal);
  if (local) {
    if (currentDestination && waypoints.length < 5) {
      adicionarWaypoint(local);
      
      const marker = L.marker(local.coords, {
        icon: L.divIcon({
          className: 'waypoint-temp-marker',
          html: `<div style="background: #FFA500; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">${waypoints.length}</div>`,
          iconSize: [30, 30]
        })
      }).addTo(map);
      
      marker.bindPopup(`<b>Parada ${waypoints.length}</b><br>${local.nome}`).openPopup();
      
      alert(`Ponto "${local.nome}" adicionado! ${5 - waypoints.length} paradas disponíveis.`);
      
      // Recalcula a rota automaticamente
      if (userLocation) {
        setTimeout(() => {
          calcularRota();
        }, 500);
      }
    } else if (waypoints.length >= 5) {
      alert('Máximo de 5 paradas intermediárias atingido!');
    } else {
      currentDestination = local;
      
      if (destinationMarker) {
        map.removeLayer(destinationMarker);
      }
      
      destinationMarker = L.marker(local.coords, {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      }).addTo(map);
      
      destinationMarker.bindPopup(`<b>Destino Final</b><br>${local.nome}`).openPopup();
      
      // Calcula a rota automaticamente
      if (userLocation) {
        setTimeout(() => {
          calcularRota();
        }, 500);
      }
    }
  }
};

// Expõe a função removerWaypoint globalmente
window.removerWaypoint = removerWaypoint;