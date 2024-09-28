import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobmodels',
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phoneno: { type: String, required: true },
  currentctc: { type: String, required: true },
  expectedctc: { type: String, required: true },
  resume: { type: String, required: true },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const application=mongoose.model('Applications', applicationSchema)
export default application
