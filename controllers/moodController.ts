import { Request, Response } from "express";
import MoodEntry from "../models/MoodEntry";
import { moodQuestions } from "../constants/moodQuestions";

interface userInterface {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export const getMoodQuestions = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ success: true, questions: moodQuestions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const submitMood = async (req: Request, res: Response) => {
  const { responses } = req.body;

  const user: userInterface | undefined = req.user as userInterface;
  if (!user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  const user_ID = user._id;

  if (!responses) {
    res.status(400).json({ success: false, message: "Answers are required." });
    return;
  }
  try {
    const newMoodEntry = new MoodEntry({ user_ID, responses });
    await newMoodEntry.save();

    if (newMoodEntry) {
      res.status(201).json({
        success: true,
        message: "Mood responses submitted successfully",
      });
      return;
    } else {
      res
        .status(400)
        .json({ success: false, message: "Failed to save mood responses" });
      return;
    }
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save mood responses",
    });
  }
};

export const getDailyMoodAverages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user: userInterface | undefined = req.user as userInterface;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const user_ID = user._id;

    const moodData = await MoodEntry.find({ user_ID });

    if (moodData.length === 0) {
      res.status(404).json({ message: "No mood data found for this user" });
      return;
    }

    const dailyAverages: Record<string, number> = {};

    moodData.forEach((entry) => {
      const dateKey = entry.date.toISOString().split("T")[0];
      let totalSum = 0;
      let count = 0;

      entry.responses.forEach((response) => {
        totalSum += response.answer;
        count++;
      });

      const dailyAverage = count ? totalSum / count : 0;
      dailyAverages[dateKey] = dailyAverage;
    });

    if (dailyAverages) {
      res.status(200).json({
        success: true,
        user_ID: user_ID,
        dailyAverages: dailyAverages,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to calculated daily mood average",
      });
      return;
    }
  } catch (error) {
    console.error("Error calculating daily averages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculated daily mood average",
    });
  }
};
