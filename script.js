// Variável global para armazenar a instância do mapa
let map;

// Função para abrir o mapa
function abrirMapa() {
  const mapContainer = document.getElementById('map-container');
  mapContainer.classList.add('active');
  
  // Inicializa o mapa apenas na primeira vez
  if (!map) {
    inicializarMapa();
  }
  
  // Atualiza o tamanho do mapa após exibir
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
}

// Função para inicializar o mapa
function inicializarMapa() {
  // Coordenadas de Belém - PA
  const belemCoords = [-1.4558, -48.4902];
  const zoomLevel = 13;
  
  // Cria o mapa
  map = L.map('map').setView(belemCoords, zoomLevel);
  
  // Adiciona o tile layer do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // Adiciona marcador inicial
  adicionarMarcadores();
}

// Função para adicionar marcadores ao mapa
function adicionarMarcadores() {
  // Ver-o-Peso
  L.marker([-1.4558, -48.5044])
    .addTo(map)
    .bindPopup('Ver-o-Peso')
    .openPopup();

  // Teatro da Paz
  L.marker([-1.4528, -48.4928])
    .addTo(map)
    .bindPopup('Teatro da Paz');

  // Estação das Docas
  L.marker([-1.4545, -48.5030])
    .addTo(map)
    .bindPopup('Estação das Docas');

  // Casa das 11 Janelas
  L.marker([-1.4570, -48.5050])
    .addTo(map)
    .bindPopup('Casa das 11 Janelas');

  // Forte do Presépio
  L.marker([-1.4575, -48.5060])
    .addTo(map)
    .bindPopup('Forte do Presépio');

  // Basílica de Nazaré
  L.marker([-1.4510, -48.4770])
    .addTo(map)
    .bindPopup('Basílica de Nazaré');

  // Igreja da Sé (Catedral Metropolitana)
  L.marker([-1.4578, -48.5040])
    .addTo(map)
    .bindPopup('Igreja da Sé');

  // Mangal das Garças
  L.marker([-1.4590, -48.5035])
    .addTo(map)
    .bindPopup('Mangal das Garças');

  // Museu Goeldi
  L.marker([-1.4520, -48.4790])
    .addTo(map)
    .bindPopup('Museu Goeldi');

  // Bosque Rodrigues Alves
  L.marker([-1.4350, -48.4630])
    .addTo(map)
    .bindPopup('Bosque Rodrigues Alves');

  // Parque da Cidade
  L.marker([-1.4420, -48.4850])
    .addTo(map)
    .bindPopup('Parque da Cidade');

  // Parque do Utinga
  L.marker([-1.4260, -48.4260])
    .addTo(map)
    .bindPopup('Parque do Utinga');

  // Mosqueiro
  L.marker([-1.1600, -48.4660])
    .addTo(map)
    .bindPopup('Mosqueiro');

  // Salinópolis (Salinas)
  L.marker([-0.6240, -47.3560])
    .addTo(map)
    .bindPopup('Salinópolis (Salinas)');

  // Alter do Chão
  L.marker([-2.5080, -54.9480])
    .addTo(map)
    .bindPopup('Alter do Chão');

  // Ilha do Marajó
  L.marker([-0.9860, -49.1060])
    .addTo(map)
    .bindPopup('Ilha do Marajó');

  // Açaíze Gastronomia Paraense
  L.marker([-1.4480, -48.4750])
    .addTo(map)
    .bindPopup('Açaíze Gastronomia Paraense');

  // Pastelaria Flor de Jambu
  L.marker([-1.4500, -48.4850])
    .addTo(map)
    .bindPopup('Pastelaria Flor de Jambu');

  // Mercado de São Brás
  L.marker([-1.4515, -48.4795])
    .addTo(map)
    .bindPopup('Mercado de São Brás');

  // Balneário do Marangá
  L.marker([-1.1700, -48.4600])
    .addTo(map)
    .bindPopup('Balneário do Marangá');

  // Terrazzo Sunset
  L.marker([-1.4560, -48.5065])
    .addTo(map)
    .bindPopup('Terrazzo Sunset');

  // Complexo São José Liberto
  L.marker([-1.4580, -48.4970])
    .addTo(map)
    .bindPopup('Complexo São José Liberto');

  // Villa Plaza Belém
  L.marker([-1.4460, -48.4890])
    .addTo(map)
    .bindPopup('Villa Plaza Belém');

  // Salinas Premium Resort
  L.marker([-0.6250, -47.3570])
    .addTo(map)
    .bindPopup('Salinas Premium Resort');
}
    
   
  
  // Adicione aqui mais marcadores de pontos turísticos
  // Exemplo:
  // L.marker([latitude, longitude])
  //   .addTo(map)
  //   .bindPopup('Nome do local');


// Função para voltar ao menu
function voltarMenu() {
  const mapContainer = document.getElementById('map-container');
  mapContainer.classList.remove('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Botão de pontos turísticos
  const btnPontosTuristicos = document.getElementById('pontos-turisticos');
  btnPontosTuristicos.addEventListener('click', abrirMapa);
  
  // Botão voltar
  const btnVoltar = document.getElementById('back-button');
  btnVoltar.addEventListener('click', voltarMenu);
});