import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import matter from 'gray-matter'; // For parsing front-matter
import Post from './models/Post'; // Import your Post model

dotenv.config();

// --- CONFIGURATION ---
const {
    GITHUB_TOKEN,
    GITHUB_REPO_OWNER,
    GITHUB_REPO_NAME,
    MONGO_URI,
} = process.env;

const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/blogs`;

// --- MAIN SYNC FUNCTION ---
async function syncGitHubToDB() {
    console.log('Starting GitHub sync process...');

    // 1. Validate environment variables
    if (!GITHUB_TOKEN || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME || !MONGO_URI) {
        console.error('Error: Missing required environment variables.');
        process.exit(1);
    }

    // 2. Connect to MongoDB
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected for sync.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }

    try {
        // 3. Fetch list of files from the GitHub repo's /blogs directory
        console.log(`Fetching posts from ${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}...`);
        const response = await axios.get(GITHUB_API_URL, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        const files = response.data.filter((file: any) => file.type === 'file' && file.name.endsWith('.md'));
        console.log(`Found ${files.length} markdown files to process.`);

        // 4. Process each file
        for (const file of files) {
            console.log(`Processing: ${file.name}`);

            // Fetch the raw content of the file
            const fileResponse = await axios.get(file.download_url);
            const fileContent = fileResponse.data;

            // Parse front-matter and content
            const { data: metadata, content: markdownContent } = matter(fileContent);
            
            // Create a slug from the filename (e.g., 'my-first-post.md' -> 'my-first-post')
            const slug = file.name.replace(/\.md$/, '');

            const postData = {
                title: metadata.title || 'Untitled Post',
                date: new Date(metadata.date) || new Date(),
                tags: metadata.tags || [],
                content: markdownContent,
                slug: slug,
            };

            // 5. Upsert (update or insert) the post into the database
            await Post.findOneAndUpdate(
                { slug: postData.slug }, // Find a document with this slug
                postData, // The data to insert or update
                {
                    upsert: true, // Make this an upsert operation
                    new: true, // Return the new document if one is created
                    setDefaultsOnInsert: true // Apply default values
                }
            );
            console.log(`Successfully synced post: ${slug}`);
        }

        console.log('GitHub sync process completed successfully!');

    } catch (error: any) {
        if (error.response) {
            console.error('Error fetching from GitHub API:', error.response.status, error.response.data.message);
        } else {
            console.error('An unexpected error occurred:', error.message);
        }
    } finally {
        // 6. Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
}

// Run the sync function
syncGitHubToDB();