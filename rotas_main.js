// Inicialização quando o DOM está pronto
document.addEventListener('DOMContentLoaded', function() {
  
  // Event listeners para os botões do menu principal
  document.getElementById('pontos-turisticos').addEventListener('click', () => {
    mostrarLista('turisticos');
  });
  
  document.getElementById('praias').addEventListener('click', () => {
    mostrarLista('praias');
  });
  
  document.getElementById('hoteis').addEventListener('click', () => {
    mostrarLista('hoteis');
  });
  
  document.getElementById('restaurantes').addEventListener('click', () => {
    mostrarLista('restaurantes');
  });
  
  document.getElementById('criar-rota').addEventListener('click', () => {
    currentCategory = '';
    criarRotaPersonalizada();
  });
  
  // Event listeners para botões de voltar
  document.getElementById('back-list-button').addEventListener('click', voltarDaLista);
  document.getElementById('back-button').addEventListener('click', voltarMenu);
  
  // Event listeners para controles de rota
  document.getElementById('calcularRotaBtn').addEventListener('click', calcularRota);
  document.getElementById('limparRotaBtn').addEventListener('click', limparRota);
  
  // Event listener para botão de localização
  document.getElementById('locateBtn').addEventListener('click', centralizarUsuario);

  // Toggle do painel de controles - clica no header inteiro
  const controlsHeader = document.getElementById('controlsHeader');
  controlsHeader.addEventListener('click', toggleControls);
  
});

// Log de inicialização
console.log('🗺️ Rotas Pai D\'Água inicializado!');