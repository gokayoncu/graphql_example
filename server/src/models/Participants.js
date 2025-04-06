import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  event_id: { type: Schema.Types.ObjectId, ref: "Event", required: true }
});

const Participants = mongoose.model("Participant", ParticipantSchema);

export default Participants;