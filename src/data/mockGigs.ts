import { GigOffer } from '../types';

export const mockGigs: GigOffer[] = [
  {
    id: 'gig-1',
    profession: 'Bartender',
    venueName: 'Boteco São Jorge',
    rating: 4.9,
    neighborhood: 'Batel Soho',
    distance: '1.8 km de você',
    rate: 220,
    rateFormatted: 'R$ 220,00',
    shiftTime: '19:00 - 01:00',
    shiftDuration: '6 horas de turno',
    microtraining: {
      title: 'SPECKIT MICROTRAINING',
      rulesTitle: 'Regras de Apresentação',
      description: 'Dress code: camisa preta lisa e calça escura sem detalhes. Traga seu abridor e avental preto se tiver.',
    },
    coords: {
      x: 48,
      y: 31,
    },
    latLng: {
      lat: -25.4398,
      lng: -49.2885, // Praça da Espanha, Batel, Curitiba
    },
    active: true,
  },
  {
    id: 'gig-2',
    profession: 'Garçom',
    venueName: 'Bistrô do Batel',
    rating: 4.8,
    neighborhood: 'Batel',
    distance: '2.4 km de você',
    rate: 180,
    rateFormatted: 'R$ 180,00',
    shiftTime: '18:00 - 23:30',
    shiftDuration: '5.5 horas de turno',
    microtraining: {
      title: 'SPECKIT MICROTRAINING',
      rulesTitle: 'Protocolo de Atendimento',
      description: 'Traje social com avental preto e sapatos confortáveis pretos. Foco em agilidade no salão e cortesia.',
    },
    coords: {
      x: 72,
      y: 42,
    },
    latLng: {
      lat: -25.4452,
      lng: -49.2941, // Av. Batel, Curitiba
    },
    active: true,
  },
  {
    id: 'gig-3',
    profession: 'Garçom',
    venueName: 'Choperia Avenida',
    rating: 4.7,
    neighborhood: 'Centro Cívico',
    distance: '3.1 km de você',
    rate: 190,
    rateFormatted: 'R$ 190,00',
    shiftTime: '19:30 - 01:30',
    shiftDuration: '6 horas de turno',
    microtraining: {
      title: 'SPECKIT MICROTRAINING',
      rulesTitle: 'Agilidade de Chopp',
      description: 'Retirada rápida de copos vazios e abastecimento de chopeiras artesanais.',
    },
    coords: {
      x: 35,
      y: 65,
    },
    latLng: {
      lat: -25.4223,
      lng: -49.2668, // Centro Cívico / Museu Oscar Niemeyer
    },
    active: true,
  },
  {
    id: 'gig-4',
    profession: 'Bartender',
    venueName: 'Lounge Bar & Drinks',
    rating: 4.9,
    neighborhood: 'Água Verde',
    distance: '4.2 km de você',
    rate: 250,
    rateFormatted: 'R$ 250,00',
    shiftTime: '20:00 - 03:00',
    shiftDuration: '7 horas de turno',
    microtraining: {
      title: 'SPECKIT MICROTRAINING',
      rulesTitle: 'Coquetelaria Autoral',
      description: 'Experiência em coquetelaria clássica (Negroni, Old Fashioned, Gin Tônica) e velocidade.',
    },
    coords: {
      x: 60,
      y: 78,
    },
    latLng: {
      lat: -25.4519,
      lng: -49.2801, // Água Verde / Av. República Argentina
    },
    active: true,
  },
];
