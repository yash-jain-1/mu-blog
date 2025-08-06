import { Post } from './types';
import config from './config';

const api = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${config.app.apiUrl}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },
  getPostBySlug: async (slug: string): Promise<Post | undefined> => {
    const response = await fetch(`${config.app.apiUrl}/posts/${slug}`);
    if (!response.ok) {
      return undefined;
    }
    return response.json();
  },
  likePost: async (slug: string): Promise<Post | undefined> => {
    const response = await fetch(`${config.app.apiUrl}/posts/${slug}/like`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to like post');
    }
    return response.json();
  }
};

export default api;
