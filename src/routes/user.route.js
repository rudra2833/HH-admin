import { Router } from "express";

import { loginUser, registerUser } from "../controllers/user.controller.js";

import { registerService } from "../controllers/service.controller.js";

import {submitFeedback } from "../controllers/feedback.controller.js"

import { search } from "../controllers/search.controller.js";

const router = Router();

export default router;