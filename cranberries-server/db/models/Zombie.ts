import mongoose, { Schema, Document } from "mongoose";
import timestamp from "mongoose-timestamp";
import { IZombie } from "../../types/zombie";

interface IZombieDocument extends Document, IZombie {}

const ZombieSchema: Schema = new Schema<IZombie>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  appearance: { type: Number, required: true, default: 0 },
  location: { type: Schema.Types.ObjectId, ref: "Location", required: true }
});

ZombieSchema.plugin(timestamp);

export const Zombie = mongoose.model<IZombieDocument>("Zombie", ZombieSchema);
