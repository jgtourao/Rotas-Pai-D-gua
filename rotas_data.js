// Dados de todos os locais por categoria
const locaisData = {
  turisticos: [
    { nome: 'Estação das Docas', descricao: 'Complexo turístico na orla', coords: [-1.4545, -48.5030] },
    { nome: 'Mercado Ver-o-Peso', descricao: 'Mercado histórico', coords: [-1.4558, -48.5044] },
    { nome: 'Complexo Feliz Lusitânia', descricao: 'Conjunto histórico', coords: [-1.4570, -48.5050] },
    { nome: 'Cidade Velha', descricao: 'Centro histórico de Belém', coords: [-1.4575, -48.5045] },
    { nome: 'Forte do Presépio', descricao: 'Forte histórico', coords: [-1.4575, -48.5060] },
    { nome: 'Casa das Onze Janelas', descricao: 'Museu de arte', coords: [-1.4570, -48.5050] },
    { nome: 'Mangal das Garças', descricao: 'Parque ambiental', coords: [-1.4590, -48.5035] },
    { nome: 'Espaço São José Liberto', descricao: 'Centro cultural', coords: [-1.4580, -48.4970] },
    { nome: 'Teatro da Paz', descricao: 'Teatro histórico', coords: [-1.4528, -48.4928] },
    { nome: 'Basílica de Nazaré', descricao: 'Basílica religiosa', coords: [-1.4510, -48.4770] },
    { nome: 'Museu Goeldi', descricao: 'Museu e zoológico', coords: [-1.4520, -48.4790] },
    { nome: 'Bosque Rodrigues Alves', descricao: 'Parque ecológico', coords: [-1.4350, -48.4630] }
  ],
  
  praias: [
    { nome: 'Praia do Farol - Mosqueiro', descricao: 'Praia de água doce', coords: [-1.1200, -48.4400] },
    { nome: 'Praia do Chapéu Virado - Mosqueiro', descricao: 'Praia popular', coords: [-1.1300, -48.4500] },
    { nome: 'Praia Grande - Mosqueiro', descricao: 'Maior praia de Mosqueiro', coords: [-1.1400, -48.4600] },
    { nome: 'Praia do Marahú - Mosqueiro', descricao: 'Praia tranquila', coords: [-1.1100, -48.4300] },
    { nome: 'Balneário do Marangá', descricao: 'Balneário com estrutura', coords: [-1.1700, -48.4600] },
    { nome: 'Praia do Atalaia - Salinópolis', descricao: 'Praia do Atlântico', coords: [-0.6150, -47.3450] },
    { nome: 'Praia do Maçarico - Salinópolis', descricao: 'Praia extensa', coords: [-0.6200, -47.3500] },
    { nome: 'Praia do Farol Velho - Salinópolis', descricao: 'Praia com farol', coords: [-0.6240, -47.3560] },
    { nome: 'Ilha do Marajó - Praias', descricao: 'Praias fluviais', coords: [-0.9860, -49.1060] },
    { nome: 'Alter do Chão', descricao: 'Caribe amazônico', coords: [-2.5080, -54.9480] }
  ],
  
  hoteis: [
    { nome: 'Grand Mercure Belém', descricao: 'Hotel de luxo', coords: [-1.4450, -48.4880] },
    { nome: 'Radisson Hotel Belém', descricao: 'Hotel 5 estrelas', coords: [-1.4410, -48.4850] },
    { nome: 'Soft Inn Batista Campos', descricao: 'Hotel confortável', coords: [-1.4470, -48.4820] },
    { nome: 'Atrium Quinta de Pedras', descricao: 'Hotel boutique', coords: [-1.4400, -48.4800] },
    { nome: 'Villa Plaza Belém', descricao: 'Hotel moderno', coords: [-1.4460, -48.4890] },
    { nome: 'Salinas Premium Resort', descricao: 'Resort em Salinas', coords: [-0.6250, -47.3570] },
    { nome: 'Hotel Baia do Sol - Mosqueiro', descricao: 'Hotel em Mosqueiro', coords: [-1.1250, -48.4450] },
    { nome: 'Pousada Marajoara', descricao: 'Pousada no Marajó', coords: [-0.9800, -49.1000] }
  ],
  
  restaurantes: [
    { nome: 'Açaíze Gastronomia Paraense', descricao: 'Culinária regional', coords: [-1.4480, -48.4750] },
    { nome: 'Pastelaria Flor de Jambu', descricao: 'Pastéis amazônicos', coords: [-1.4500, -48.4850] },
    { nome: 'Lá em Casa', descricao: 'Comida caseira paraense', coords: [-1.4490, -48.4820] },
    { nome: 'Remanso do Bosque', descricao: 'Alta gastronomia regional', coords: [-1.4350, -48.4640] },
    { nome: 'Estação das Docas - Restaurantes', descricao: 'Vários restaurantes', coords: [-1.4545, -48.5030] },
    { nome: 'Terrazzo Sunset', descricao: 'Vista para a Baía', coords: [-1.4560, -48.5065] },
    { nome: 'Mercado de São Brás', descricao: 'Restaurantes populares', coords: [-1.4515, -48.4795] },
    { nome: 'Mangal das Garças - Restaurante', descricao: 'Restaurante no parque', coords: [-1.4590, -48.5035] },
    { nome: 'Point do Açaí', descricao: 'Açaí tradicional', coords: [-1.4520, -48.4880] },
    { nome: 'Boteco das Onze', descricao: 'Petiscos regionais', coords: [-1.4495, -48.4835] }
  ]
};

// Títulos das categorias
const titulosCategorias = {
  turisticos: 'Pontos turísticos',
  praias: 'Praias',
  hoteis: 'Hotéis',
  restaurantes: 'Restaurantes'
};

// Cores por categoria
const coresCategorias = {
  turisticos: '#3498db',
  praias: '#f39c12',
  hoteis: '#9b59b6',
  restaurantes: '#2ecc71'
};