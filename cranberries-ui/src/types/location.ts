import { IZombie } from "./zombie";

export interface ILocation {
  id: string;
  name: string;
  image: string;
  zombies: IZombie[];
}
