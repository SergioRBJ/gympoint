import mongoose from 'mongoose';

const CheckInSchema = new mongoose.Schema(
    {
        student_id: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('CheckIn', CheckInSchema);
