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
          href="#"
          className="hover:text-white transition-colors text-gray-600"
        >
          About
        </a>
      </nav>
    </header>
  );
};

export default Header;
