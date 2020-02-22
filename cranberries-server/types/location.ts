import { IZombie } from "./zombie";

export interface ILocation {
  name: string;
  image: string;
  zombies: IZombie[];
}
