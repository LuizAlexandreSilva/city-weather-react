import React from 'react';
import { FaSearch } from 'react-icons/fa';

import Header from '../../components/Header';
import Input from '../../components/Input';

const Home: React.FC = () => {
  return (
    <Header>
      <span className="text-lg text-gray-50 mb-4">WEATHER IN YOUR CITY</span>
      <Input
        className="w-96 h-12 shadow-input"
        name="search"
        placeholder="Your city name"
        icon={FaSearch}
      />
    </Header>
  );
};

export default Home;
