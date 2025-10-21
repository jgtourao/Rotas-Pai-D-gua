// Variável para controlar a categoria atual
let currentCategory = '';

// Mostra a lista de locais por categoria
function mostrarLista(categoria) {
  currentCategory = categoria;
  const listaContainer = document.getElementById('lista-container');
  const listaTitulo = document.getElementById('lista-titulo');
  const listaItems = document.getElementById('lista-items');
  
  listaTitulo.textContent = titulosCategorias[categoria];
  listaItems.innerHTML = '';
  
  const locais = locaisData[categoria];
  locais.forEach((local) => {
    const item = document.createElement('div');
    item.className = 'local-item';
    item.innerHTML = `
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <div class="info">
        <div class="nome">${local.nome}</div>
        <div class="descricao">${local.descricao}</div>
      </div>
      <div class="arrow">›</div>
    `;
    
    item.addEventListener('click', () => {
      mostrarNoMapa(local);
    });
    
    listaItems.appendChild(item);
  });
  
  listaContainer.classList.add('active');
  document.getElementById('main-menu').style.display = 'none';
  document.querySelector('header').style.display = 'none';
}

// Mostra um local específico no mapa
function mostrarNoMapa(local) {
  document.getElementById('lista-container').classList.remove('active');
  abrirMapa(local);
}

// Volta da lista para o menu principal
function voltarDaLista() {
  document.getElementById('lista-container').classList.remove('active');
  document.getElementById('main-menu').style.display = 'flex';
  document.querySelector('header').style.display = 'block';
}

// Volta do mapa para menu ou lista
function voltarMenu() {
  const mapContainer = document.getElementById('map-container');
  mapContainer.classList.remove('active');
  
  limparRota();
  document.getElementById('mapControls').classList.remove('active');
  
  if (destinationMarker) {
    map.removeLayer(destinationMarker);
    destinationMarker = null;
  }
  currentDestination = null;
  
  if (allMarkers.length > 0) {
    limparTodosMarcadores();
  }
  
  if (currentCategory) {
    document.getElementById('lista-container').classList.add('active');
  } else {
    document.getElementById('main-menu').style.display = 'flex';
    document.querySelector('header').style.display = 'block';
  }
}

// Mostra/oculta o overlay de loading
function mostrarLoading(show) {
  const overlay = document.getElementById('loadingOverlay');
  if (show) {
    overlay.classList.add('active');
  } else {
    overlay.classList.remove('active');
  }
}

// Toggle do painel de controles (minimizar/expandir)
function toggleControls() {
  const controls = document.getElementById('mapControls');
  controls.classList.toggle('minimized');
}