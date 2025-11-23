export interface RegionData {
  name: string;
  img: string;
  index: number; //pokeapi index
  pokedexStart?: number; //offset
  pokedexEnd?: number; //limit
}

//export type EntrenadorFavoriteRegion = Pick<RegionData, 'name' | 'img'>