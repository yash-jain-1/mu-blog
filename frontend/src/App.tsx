import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import config from "./config";
import Dither from "./components/items/Dither";
import Particles from "./components/items/Particles";

const App: React.FC = () => {
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

  const handleSelectPost = (slug: string) => {
    setSelectedPostSlug(slug);
  };

  const handleBackToHome = () => {
    setSelectedPostSlug(null);
  };

  return (
    <div
      className="min-h-screen"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Header onBack={handleBackToHome} />
        <main>
          {selectedPostSlug ? (
            <BlogPost slug={selectedPostSlug} />
          ) : (
            <BlogList onSelectPost={handleSelectPost} />
          )}
        </main>
        <footer className="text-center py-8 mt-12 text-gray-600 border-t">
          <p>
            &copy; {new Date().getFullYear()} {config.app.title}. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
