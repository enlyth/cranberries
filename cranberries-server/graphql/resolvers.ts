import { Zombie } from "../db/models/Zombie";
import { Location } from "../db/models/Location";
import { ZombieType, IZombie } from "../types/zombie";
import { selectRandom } from "../util/random";
import * as casual from "casual";
import * as dotenv from "dotenv";
import { ILocation } from "../types/location";

dotenv.config();

const resolvers = {
  Query: {
    zombie: (_, { id }) => Zombie.findById({ id }),
    zombies: () => Zombie.find({}),
    location: (_, { id }) => Location.findById({ id }),
    locations: () => Location.find({})
  },
  Zombie: {
    location: (zombie: IZombie) => Location.findOne({ _id: zombie.location })
  },
  Location: {
    zombies: (location: ILocation) => Zombie.find({ location })
  },
  Mutation: {
    moveZombiesToLocation: async (_, { zombieIds, locationName }) => {
      const location = await Location.findOne({ name: locationName }).exec();

      if (!location) {
        throw new Error("Unknown location");
      }

      await Zombie.updateMany(
        { _id: { $in: zombieIds } },
        { $set: { location } },
        { new: true }
      );

      return Location.find({});
    },
    moveAllToLocation: async (_, { locationName }) => {
      const location = await Location.findOne({ name: locationName }).exec();

      if (!location) {
        throw new Error("Unknown location");
      }

      await Zombie.updateMany(
        { location: { $ne: { _id: location._id } } },
        { $set: { location } },
        { new: true }
      );

      return Location.find({});
    },

    cleanseLocation: async (_, { locationName }) => {
      const location = await Location.findOne({ name: locationName }).exec();

      if (!location) {
        throw new Error("Unknown location");
      }

      await Zombie.deleteMany({ location }).exec();
      return await Location.findOne({ name: locationName });
    },
    spawnAtLocation: async (_, { locationName }) => {
      const location = await Location.findOne({ name: locationName }).exec();

      if (!location) {
        throw new Error("Unknown location");
      }

      const APPEARANCE_VARIATIONS = Number(process.env.APPEARANCE_VARIATIONS);
      const zombie = await Zombie.create({
        name: casual.first_name,
        location,
        type: selectRandom(Object.values(ZombieType)),
        appearance: Math.floor(Math.random() * APPEARANCE_VARIATIONS)
      });

      return Location.findOne({ name: locationName });
    },
    changeLocation: async (_, { zombieId, locationName }) => {
      const location = await Location.findOne({ name: locationName }).exec();

      if (!location) {
        throw new Error("Unknown location");
      }

      const zombie = await Zombie.findOneAndUpdate(
        { _id: zombieId },
        { location },
        { new: true }
      ).exec();

      if (!zombie) {
        throw new Error("Cannot find zombie");
      }
      return zombie;
    }
  }
};

export default resolvers;
