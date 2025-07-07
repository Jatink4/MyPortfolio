import express from 'express';
import { getProjects, addProject } from '../controllers/projectController.js';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get("/", getProjects);
router.post("/", upload.single("image"), addProject);

export default router;
