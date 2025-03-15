import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import {
  submitMood,
  getMoodQuestions,
  getDailyMoodAverages,
} from "../controllers/moodController";
import { userAuthenticationMiddleware } from "../controllers/useController";

router.post("/submit_mood", userAuthenticationMiddleware, submitMood);
router.get("/mood_questions", userAuthenticationMiddleware, getMoodQuestions);
router.get("/mood_summary", userAuthenticationMiddleware, getDailyMoodAverages);

export default router;
