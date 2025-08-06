import { Schema, model, Document } from 'mongoose';

// Interface to define the properties of a Post document
export interface IPost extends Document {
    slug: string;
    title: string;
    date: Date;
    content: string;
    tags: string[];
    likes: number;
}

const postSchema = new Schema<IPost>({
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

// The model is created with the IPost interface
export default model<IPost>('Post', postSchema);
