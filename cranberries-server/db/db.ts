import mongoose from "mongoose";
import dotenv from "dotenv";
import { initialLocations } from "./seed/initialLocations";
import { Location } from "./models/Location";
import { Zombie } from "./models/Zombie";
import { selectRandom } from "../util/random";
import casual from "casual";
import { ZombieType } from "../types/zombie";

dotenv.config();

mongoose.connect(
  `${process.env.MONGO_URI}/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Connected to mongoDB");
  }
);

async function initializeLocations() {
  for (const location of initialLocations) {
    const existingLocation = await Location.findOne({
      name: location.name
    }).exec();

    if (!existingLocation) {
      console.log(`Default location ${location.name} not found in DB, adding.`);
      await Location.create(location);
    }
  }
}

async function initializeZombies() {
  const locations = await Location.find({}).exec();
  const zombieCount = await Zombie.countDocuments({}).exec();
  const MIN_ZOMBIES = Number(process.env.MIN_ZOMBIES);
  const APPEARANCE_VARIATIONS = Number(process.env.APPEARANCE_VARIATIONS);

  if (zombieCount < MIN_ZOMBIES) {
    console.log(
      `Zombie count less than ${MIN_ZOMBIES}, adding ${MIN_ZOMBIES -
        zombieCount} zombies.`
    );
    const newZombies = [];
    for (let i = 0; i < MIN_ZOMBIES; ++i) {
      newZombies.push({
        name: casual.first_name,
        location: selectRandom(locations),
        type: selectRandom(Object.values(ZombieType)),
        appearance: Math.floor(Math.random() * APPEARANCE_VARIATIONS)
      });
    }
    await Zombie.create(newZombies);
  }
}

export async function initializeDatabase() {
  await initializeLocations();
  await initializeZombies();
}
