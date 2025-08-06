import { Router, Request, Response } from 'express';
import Post, { IPost } from '../models/Post';

const router = Router();

// @route   GET /api/posts
// @desc    Get all blog posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const posts: IPost[] = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/posts/:slug
// @desc    Get a single post by slug
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const post: IPost | null = await Post.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/posts/:slug/like
// @desc    Increment like count
router.post('/:slug/like', async (req: Request, res: Response) => {
    try {
        const post: IPost | null = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;