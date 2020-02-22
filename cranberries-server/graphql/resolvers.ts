import { Zombie } from "../db/models/Zombie";
import { Location } from "../db/models/Location";
import { ZombieType } from "../types/zombie";
import { selectRandom } from "../util/random";
import casual from "casual";
import dotenv from "dotenv";

dotenv.config();

const resolvers = {
  Query: {
    zombie: async (_, { id }) => {
      return Zombie.findById({ id });
    },
    zombies: async () => {
      return Zombie.find({});
    },
    location: async (_, { id }) => {
      return Location.findById({ id });
    },
    locations: async () => {
      return Location.find({});
    }
  },
  Zombie: {
    location: zombie => Location.findOne({ _id: zombie.location })
  },
  Location: {
    zombies: location => Zombie.find({ location })
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
