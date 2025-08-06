import React from 'react';
import config from '../config';

const Header = ({ onBack }: { onBack: () => void }) => (
  <header style={{ borderColor: config.theme.borderColor }} className="py-8 border-b mb-8 flex justify-between items-center">
    <h1 style={{ color: config.theme.primaryColor }} className="text-2xl font-bold tracking-wider cursor-pointer" onClick={onBack}>
      {config.app.title}
    </h1>
    <nav>
      <a href="#" style={{ color: config.theme.secondaryColor }} className="hover:text-white transition-colors">About</a>
    </nav>
  </header>
);

export default Header;
