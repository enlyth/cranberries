import { ILocation } from "./location";

export enum ZombieType {
  Basic = "Basic",
  Fast = "Fast",
  Tank = "Tank",
  Mage = "Mage"
}

export interface IZombie {
  name: string;
  type: ZombieType;
  location: ILocation;
}
