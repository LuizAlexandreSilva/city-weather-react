import { Form } from '@unform/web';
import React, { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import CityCard from '../../components/CityCard';

import Header from '../../components/Header';
import Input from '../../components/Input';
import api from '../../config/api';

export interface ICity {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: [
    {
      description: string;
      icon: string;
      id: 501;
      main: string;
    },
  ];
}

const Home: React.FC = () => {
  const [cities, setCities] = useState<ICity[]>([]);

  const handleSubmit = useCallback(async (data) => {
    try {
      const response = await api.get('find', {
        params: {
          q: data.search,
          appid: process.env.REACT_APP_API_KEY,
          units: 'metric',
        },
      });

      if (response.data && response.data.list) {
        setCities(response.data.list);
      }
    } catch (err) {
      setCities([]);
    }
  }, []);

  return (
    <>
      <Header>
        <span className="text-lg text-gray-50 mb-4">WEATHER IN YOUR CITY</span>
        <Form onSubmit={handleSubmit}>
          <Input
            className="w-96 h-12 shadow-input"
            name="search"
            placeholder="Your city name"
            icon={FaSearch}
          />
        </Form>
      </Header>

      {cities.length && (
        <div className="container max-w-screen-sm relative -top-16">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      )}

      {!cities.length && (
        <div className="container">
          <h3 className="text-center">No results available.</h3>
        </div>
      )}
    </>
  );
};

export default Home;
