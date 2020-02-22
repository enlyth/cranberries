import { ILocation } from "./location";

export enum ZombieType {
  Basic = "Basic",
  Fast = "Fast",
  Tank = "Tank",
  Mage = "Mage"
}

export interface IZombie {
  id: string;
  name: string;
  type: ZombieType;
  location: ILocation;
  appearance: number;
}
