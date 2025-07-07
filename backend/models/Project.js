import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: [String],
  image: String,
  video: String,
  liveUrl: String,
  githubUrl: String,
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
