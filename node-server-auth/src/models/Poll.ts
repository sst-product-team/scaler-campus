import mongoose, { Schema } from "mongoose";

export type OptionType = {
  [option: string]: string[];
};

export interface PollQuestion extends Document {
  question: string;
  options: OptionType;
}

// Define the schema for the Poll
const PollSchema: Schema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
  acceptingResponses: {
    type: Boolean,
    required: true
  },
});

// Create the Poll model
const PollModel = mongoose.model<PollQuestion>("Poll", PollSchema);

export default PollModel;
