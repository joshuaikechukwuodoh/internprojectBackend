import mongoose, { Document, Schema } from "mongoose";

interface Response {
  question: string;
  answer: number;
}
interface MoodEntryInterface extends Document {
  user_ID: string;
  responses: Response[];
  date: Date;
}

const MoodEntrySchema = new Schema<MoodEntryInterface>({
  user_ID: { type: String, required: true },
  responses: [
    {
      question: { type: String, required: true },
      answer: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

const MoodEntry = mongoose.model<MoodEntryInterface>(
  "MoodEntry",
  MoodEntrySchema
);

export default MoodEntry;
