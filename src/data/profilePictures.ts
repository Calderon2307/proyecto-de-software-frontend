import ash from '@assets/profilePics/ash.webp';
import blaine from '@assets/profilePics/blaine.webp';
import brock from '@assets/profilePics/brock.webp';
import cynthia from '@assets/profilePics/cynthia.webp';
import erika from '@assets/profilePics/erika.webp';
import giovanni from '@assets/profilePics/giovanni.webp';
import misty from '@assets/profilePics/misty.webp';
import red from '@assets/profilePics/red.webp';
import sabrina from '@assets/profilePics/sabrina.webp';
import surge from '@assets/profilePics/surge.webp';

import { EntrenadorProfilePicture } from '@models/entreador';

export const trainerPics: EntrenadorProfilePicture[] = [
  {
    img: ash,
    background: 'rgb(255, 160, 150)', // rojo/coral fuerte
  },
  {
    img: blaine,
    background: 'rgb(255, 200, 120)', // amarillo fuego más intenso
  },
  {
    img: brock,
    background: 'rgb(210, 160, 110)', // café roca más saturado
  },
  {
    img: cynthia,
    background: 'rgb(175, 175, 220)', // azul gris elegante pero más profundo
  },
  {
    img: erika,
    background: 'rgb(150, 200, 150)', // verde hierba más marcado
  },
  {
    img: giovanni,
    background: 'rgb(200, 150, 150)', // rojo-sombra más fuerte
  },
  {
    img: misty,
    background: 'rgb(140, 180, 240)', // azul agua saturado
  },
  {
    img: red,
    background: 'rgb(240, 100, 100)', // rojo potente pero no chillón
  },
  {
    img: sabrina,
    background: 'rgb(210, 160, 240)', // púrpura psíquico fuerte
  },
  {
    img: surge,
    background: 'rgb(250, 220, 120)', // amarillo eléctrico más vivo
  },
];
