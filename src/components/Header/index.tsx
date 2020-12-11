import React from 'react';
import { FullWidthCenteredContainer } from './styles';

const Header: React.FC = ({ children }) => {
  return <FullWidthCenteredContainer>{children}</FullWidthCenteredContainer>;
};

export default Header;
