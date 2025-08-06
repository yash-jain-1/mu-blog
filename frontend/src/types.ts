// --- TYPES --- //
export interface Post {
  _id: string;
  slug: string;
  title: string;
  date: string;
  content: string;
  likes: number;
  tags: string[];
}
