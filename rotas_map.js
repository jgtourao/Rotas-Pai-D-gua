// Variáveis globais do mapa
let map;
let userMarker = null;
let userLocation = null;
let destinationMarker = null;
let currentDestination = null;
let allMarkers = [];

// Inicializa o mapa
function inicializarMapa() {
  const belemCoords = [-1.4558, -48.4902];
  const zoomLevel = 13;
  
  map = L.map('map').setView(belemCoords, zoomLevel);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  obterLocalizacao();
}

// Obtém a localização do usuário
function obterLocalizacao() {
  if (!navigator.geolocation) {
    alert('Geolocalização não suportada pelo navegador');
    return;
  }

  mostrarLoading(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      if (userMarker) {
        userMarker.setLatLng(userLocation);
      } else {
        userMarker = L.marker(userLocation, {
          icon: L.divIcon({
            className: 'user-marker',
            html: '<div style="background: #FF9800; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>',
            iconSize: [20, 20]
          })
        }).addTo(map);
        userMarker.bindPopup('📍 Você está aqui!');
      }

      map.setView(userLocation, 15);
      mostrarLoading(false);
    },
    (error) => {
      mostrarLoading(false);
      let msg = 'Erro ao obter localização. ';
      
      if (error.code === 1) {
        msg += 'Permita o acesso à localização.';
      } else if (error.code === 2) {
        msg += 'Localização indisponível.';
      } else {
        msg += 'Tempo esgotado.';
      }
      
      console.error('Erro de geolocalização:', msg);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

// Abre o mapa com um local selecionado
function abrirMapa(localSelecionado = null) {
  const mapContainer = document.getElementById('map-container');
  mapContainer.classList.add('active');
  
  if (!map) {
    inicializarMapa();
  }
  
  // Sempre mostra o painel de controles quando o mapa abre
  const mapControls = document.getElementById('mapControls');
  mapControls.classList.add('active');
  
  if (localSelecionado) {
    currentDestination = localSelecionado;
    
    if (destinationMarker) {
      map.removeLayer(destinationMarker);
    }
    
    destinationMarker = L.marker(localSelecionado.coords, {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).addTo(map);
    
    destinationMarker.bindPopup(`<b>${localSelecionado.nome}</b><br>${localSelecionado.descricao}`).openPopup();
    
    map.setView(localSelecionado.coords, 15);
    
    // Se tem localização do usuário, calcula a rota automaticamente
    if (userLocation) {
      setTimeout(() => {
        calcularRota();
      }, 500);
    }
  }
  
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
}

// Cria rota personalizada com todos os locais
function criarRotaPersonalizada() {
  document.getElementById('lista-container').classList.remove('active');
  
  const mapContainer = document.getElementById('map-container');
  mapContainer.classList.add('active');
  
  if (!map) {
    inicializarMapa();
  }
  
  // Sempre mostra o painel de controles
  const mapControls = document.getElementById('mapControls');
  mapControls.classList.add('active');
  
  limparTodosMarcadores();
  
  Object.keys(locaisData).forEach(categoria => {
    locaisData[categoria].forEach(local => {
      const cor = coresCategorias[categoria] || '#95a5a6';
      const marker = L.circleMarker(local.coords, {
        radius: 8,
        fillColor: cor,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);
      
      marker.bindPopup(`
        <div style="min-width: 200px">
          <h3 style="margin: 0 0 8px 0; color: #2c5aa0;">${local.nome}</h3>
          <p style="margin: 0 0 10px 0; font-size: 14px;">${local.descricao}</p>
          <button onclick="selecionarDestinoDoMapa('${categoria}', '${local.nome}')" 
                  style="width: 100%; padding: 8px; border: none; border-radius: 8px; 
                         background: #2c5aa0; color: white; cursor: pointer; font-weight: 600;">
            Traçar Rota
          </button>
        </div>
      `);
      
      allMarkers.push(marker);
    });
  });
  
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
}

// Limpa todos os marcadores do mapa
function limparTodosMarcadores() {
  allMarkers.forEach(marker => {
    map.removeLayer(marker);
  });
  allMarkers = [];
  
  if (destinationMarker) {
    map.removeLayer(destinationMarker);
    destinationMarker = null;
  }
}

// Centraliza o mapa na localização do usuário
function centralizarUsuario() {
  if (userLocation && map) {
    map.setView(userLocation, 16);
    if (userMarker) {
      userMarker.openPopup();
    }
  } else {
    obterLocalizacao();
  }
}
// Função para mostrar loading (referenciada mas não definida)
function mostrarLoading(show) {
  const overlay = document.getElementById('loadingOverlay');
  if (show) {
    overlay.classList.add('active');
  } else {
    overlay.classList.remove('active');
  }
}