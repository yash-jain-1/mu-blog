import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import config from './config';

const App: React.FC = () => {
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

  const handleSelectPost = (slug: string) => {
    setSelectedPostSlug(slug);
  };

  const handleBackToHome = () => {
    setSelectedPostSlug(null);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Header onBack={handleBackToHome} />
        <main>
          {selectedPostSlug ? (
            <BlogPost slug={selectedPostSlug} />
          ) : (
            <BlogList onSelectPost={handleSelectPost} />
          )}
        </main>
        <footer className="text-center py-8 mt-12 text-gray-600 border-t">
          <p>&copy; {new Date().getFullYear()} {config.app.title}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

