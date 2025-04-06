import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: false },
  desc: { type: String, required: false },
  date: { type: String, required: false },
  from: { type: String, required: false },
  to: { type: String, required: false },
  location_id: { type: Schema.Types.ObjectId, ref: "Location" ,required: true},
  user_id: { type: Schema.Types.ObjectId, ref: "User" ,required: true},
  image: { type: String },
  location: { type: Schema.Types.ObjectId, ref: "Location" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: Schema.Types.ObjectId, ref: "Participant" }]
});

const Events = mongoose.model("Event", EventSchema);

export default Events;