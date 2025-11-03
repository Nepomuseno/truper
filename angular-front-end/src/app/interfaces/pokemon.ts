export interface Pokemon {
  name: string;
  id: number;
  weight: number;
  height: number;
  sprite: {
    back: string;
    front: string;
  };
}
