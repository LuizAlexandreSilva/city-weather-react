import React from 'react';

const Header: React.FC = ({ children }) => {
  return (
    <header className="w-screen bg-blue-450 pb-32 pt-20 flex flex-col items-center">
      {children}
    </header>
  );
};

export default Header;
