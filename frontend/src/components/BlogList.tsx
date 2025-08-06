import React, { useState, useEffect } from 'react';
import api from '../api';
import { Post } from '../types';
import config from '../config';

const BlogList = ({ onSelectPost }: { onSelectPost: (slug: string) => void }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await api.getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to load posts. Is the backend server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center p-10">Loading posts...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div 
          key={post.slug} 
          className="p-4 rounded-lg transition-all duration-300 hover:bg-gray-800/50 cursor-pointer flex justify-between items-center" 
          onClick={() => onSelectPost(post.slug)}
        >
          <h2 style={{ color: config.theme.primaryColor }} className="text-xl font-semibold">{post.title}</h2>
          <p style={{ color: config.theme.secondaryColor }} className="text-sm flex-shrink-0 ml-4">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
