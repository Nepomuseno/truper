export interface PokemonResponse {
  abilities: Ability2[];
  base_experience: number;
  cries: Cries;
  forms: Ability[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: Ability;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

interface Type {
  slot: number;
  type: Ability;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: Ability;
}

interface Sprites {
  back_default: null;
  back_female: null;
  back_shiny: null;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other: Other;
  versions: Versions;
}

interface Versions {
  "generation-i": Generationi;
  "generation-ii": Generationii;
  "generation-iii": Generationiii;
  "generation-iv": Generationiv;
  "generation-v": Generationv;
  "generation-vi": Generationvi;
  "generation-vii": Generationvii;
  "generation-viii": Generationviii;
}

interface Generationviii {
  icons: Dreamworld;
}

interface Generationvii {
  icons: Dreamworld;
  "ultra-sun-ultra-moon": Omegarubyalphasapphire;
}

interface Generationvi {
  "omegaruby-alphasapphire": Omegarubyalphasapphire;
  "x-y": Omegarubyalphasapphire;
}

interface Omegarubyalphasapphire {
  front_default: null;
  front_female: null;
  front_shiny: null;
  front_shiny_female: null;
}

interface Generationv {
  "black-white": Blackwhite;
}

interface Blackwhite {
  animated: Showdown;
  back_default: null;
  back_female: null;
  back_shiny: null;
  back_shiny_female: null;
  front_default: null;
  front_female: null;
  front_shiny: null;
  front_shiny_female: null;
}

interface Generationiv {
  "diamond-pearl": Showdown;
  "heartgold-soulsilver": Showdown;
  platinum: Showdown;
}

interface Generationiii {
  emerald: Emerald;
  "firered-leafgreen": Fireredleafgreen;
  "ruby-sapphire": Fireredleafgreen;
}

interface Fireredleafgreen {
  back_default: null;
  back_shiny: null;
  front_default: null;
  front_shiny: null;
}

interface Emerald {
  front_default: null;
  front_shiny: null;
}

interface Generationii {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

interface Gold {
  back_default: null;
  back_shiny: null;
  front_default: null;
  front_shiny: null;
  front_transparent: null;
}

interface Crystal {
  back_default: null;
  back_shiny: null;
  back_shiny_transparent: null;
  back_transparent: null;
  front_default: null;
  front_shiny: null;
  front_shiny_transparent: null;
  front_transparent: null;
}

interface Generationi {
  "red-blue": Redblue;
  yellow: Redblue;
}

interface Redblue {
  back_default: null;
  back_gray: null;
  back_transparent: null;
  front_default: null;
  front_gray: null;
  front_transparent: null;
}

interface Other {
  dream_world: Dreamworld;
  home: Home;
  "official-artwork": Officialartwork;
  showdown: Showdown;
}

interface Showdown {
  back_default: null;
  back_female: null;
  back_shiny: null;
  back_shiny_female: null;
  front_default: null;
  front_female: null;
  front_shiny: null;
  front_shiny_female: null;
}

interface Officialartwork {
  front_default: string;
  front_shiny: string;
}

interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

interface Dreamworld {
  front_default: null;
  front_female: null;
}

interface Move {
  move: Ability;
  version_group_details: Versiongroupdetail[];
}

interface Versiongroupdetail {
  level_learned_at: number;
  move_learn_method: Ability;
  order: null | number;
  version_group: Ability;
}

interface Cries {
  latest: string;
  legacy: null;
}

interface Ability2 {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

interface Ability {
  name: string;
  url: string;
}
