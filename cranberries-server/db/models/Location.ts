import mongoose, { Schema, Document } from "mongoose";
import timestamp from "mongoose-timestamp";
import { ILocation } from "../../types/location";

interface ILocationDocument extends Document, ILocation {}

const LocationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  zombies: [{ type: Schema.Types.ObjectId, ref: "Zombie" }]
});

LocationSchema.plugin(timestamp);

export const Location = mongoose.model<ILocationDocument>(
  "Location",
  LocationSchema
);
