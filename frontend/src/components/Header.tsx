import React, { useState } from "react";
import config from "../config";
import GlitchText from "./items/GlitchText";

const Header = ({ onBack }: { onBack: () => void }) => {
  const [hoverIntensity] = useState(0.5);
  const [enableHover] = useState(true);

  return (
    <header className="py-8 border-b mb-8 flex justify-between items-center">
      <div onClick={onBack} className="cursor-pointer">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="custom-class"
        >
          {config.app.title}
        </GlitchText>
      </div>
      <nav>
        <a
          href="https://yash-jain-1.github.io/Insightful-Muon/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          About
        </a>
      </nav>
    </header>
  );
};

export default Header;
