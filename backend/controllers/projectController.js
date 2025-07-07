import Project from '../models/Project.js';
import cloudinary from '../utils/cloudinary.js';

export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

export const addProject = async (req, res) => {
  const { title, description, tech, liveUrl, githubUrl } = req.body;

  const result = await cloudinary.uploader.upload_stream(
    { resource_type: "image" },
    async (error, result) => {
      if (error) return res.status(500).json({ error });
      const project = new Project({
        title,
        description,
        tech: tech.split(','),
        image: result.secure_url,
        liveUrl,
        githubUrl,
      });
      await project.save();
      res.status(201).json(project);
    }
  );

  req.file && result.end(req.file.buffer);
};
