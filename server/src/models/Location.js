import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String, required: false },
  desc: { type: String, required: false },
  lat: { type: Number, required: false },
  lng: { type: Number, required: false },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }]
});

const Locations = mongoose.model("Location", LocationSchema);

export default Locations;