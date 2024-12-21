import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  alias: { type: String, required: true },
  topic: { type: String },
  totalClicks: { type: Number, default: 0 },
  uniqueClicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const URL = mongoose.model('URL', urlSchema);

export default URL;
