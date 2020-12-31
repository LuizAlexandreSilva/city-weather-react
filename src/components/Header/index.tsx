import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLHeadElement> {
  additionalClasses?: string;
}

const Header: React.FC<Props> = ({ additionalClasses, children }) => {
  return (
    <header
      className={
        'w-screen bg-blue-450 flex flex-col items-center ' + additionalClasses
      }
    >
      {children}
    </header>
  );
};

export default Header;
