import { Form } from '@unform/web';
import React, { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CityCard from '../../components/CityCard';

import Header from '../../components/Header';
import Input from '../../components/Input';
import api from '../../config/api';

export interface ICity {
  id: number;
  name: string;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
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
  timezone: number;
}

const Home: React.FC = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Header additionalClasses="pb-32 pt-20">
        <span className="text-lg text-gray-50 mb-4">WEATHER IN YOUR CITY</span>
        <Form onSubmit={handleSubmit}>
          <Input
            className="w-96 h-12 shadow-input"
            name="search"
            placeholder="Your city name"
            icon={FaSearch}
            title="Type a name and hit 'enter' to search"
          />
        </Form>
      </Header>

      {cities.length && (
        <div className="container max-w-screen-sm relative -top-16">
          {cities.map((city) => (
            <Link key={city.id} to={`details/${city.id}`}>
              <CityCard city={city} />
            </Link>
          ))}
        </div>
      )}

      {!loading && !cities.length && (
        <div className="container">
          <h6 className="text-center text-2xl font-bold mt-5">
            No results available.
          </h6>
        </div>
      )}

      {loading && !cities.length && (
        <div className="container max-w-screen-md text-center">
          <h6 className="text-2xl mt-5">Loading</h6>
        </div>
      )}
    </>
  );
};

export default Home;
