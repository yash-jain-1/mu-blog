import React, { useState, useEffect } from 'react';
import api from '../api';
import { Post } from '../types';
import config from '../config';
import MarkdownRenderer from './MarkdownRenderer';

const BlogPost = ({ slug }: { slug: string }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
       try {
        setLoading(true);
        setError(null);
        const fetchedPost = await api.getPostBySlug(slug);
        setPost(fetchedPost || null);
       } catch (err) {
        setError('Failed to load post.');
        console.error(err);
       } finally {
        setLoading(false);
       }
    };
    if (slug) {
      fetchPost();
    }
  }, [slug]);
  
  const handleLike = async () => {
    if(!post) return;
    try {
        const updatedPost = await api.likePost(post.slug);
        if(updatedPost) {
            setPost(updatedPost);
        }
    } catch (err) {
        console.error("Failed to like post", err);
    }
  }

  if (loading) return <div className="text-center p-10">Loading post...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!post) return <div className="text-center p-10 text-yellow-500">Post not found.</div>;

  return (
    <article className="prose prose-invert max-w-none">
      <h1 style={{ color: config.theme.primaryColor }} className="text-4xl font-bold mb-2">{post.title}</h1>
      <p style={{ color: config.theme.secondaryColor }} className="text-md mb-8">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <MarkdownRenderer content={post.content} />

      <div style={{ borderColor: config.theme.borderColor }} className="mt-12 pt-6 border-t flex items-center justify-end">
        <button onClick={handleLike} style={{ color: config.theme.secondaryColor }} className="flex items-center space-x-2 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{post.likes}</span>
        </button>
      </div>
    </article>
  );
};

export default BlogPost;
