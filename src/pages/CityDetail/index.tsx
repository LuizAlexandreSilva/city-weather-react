import { Form } from '@unform/web';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Input from '../../components/Input';
import api from '../../config/api';
import { ICity } from '../Home';

interface IForecast {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    },
  ];
  dt_txt: string;
}

const CityDetail: React.FC = () => {
  const [city, setCity] = useState<ICity>();
  const [cityForecast, setCityForecast] = useState<IForecast[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      Promise.all([
        api.get('weather', {
          params: {
            id,
            appid: process.env.REACT_APP_API_KEY,
            units: 'metric',
          },
        }),
        api.get('forecast', {
          params: {
            id,
            appid: process.env.REACT_APP_API_KEY,
            units: 'metric',
          },
        }),
      ])
        .then((response) => {
          setCity(response[0].data);
          setCityForecast(response[1].data.list);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <>
      <Header additionalClasses="pb-8 pt-12">
        <Link to="/" className="absolute top-6 left-6">
          <FaArrowLeft size={24} color="white" />
        </Link>
        <Form onSubmit={console.log}>
          <Input
            className="w-96 h-12 shadow-input"
            name="search"
            icon={FaSearch}
            disabled
            value={`${city ? city.name + ', ' + city.sys.country : ''}`}
          />
        </Form>
      </Header>

      {city && cityForecast && (
        <div className="container max-w-screen-md pb-5">
          <div className="text-center mt-12 mb-8">
            <h6 className="text-2xl">{`Weather in ${city.name}, ${city.sys.country}`}</h6>
            <span className="">{format(new Date(), 'HH:mm LLL d')}</span>
          </div>

          <div className="bg-white rounded w-full p-12 shadow-md">
            <div className="flex">
              <div className="flex flex-col h-48 w-2/6 border border-gray-150">
                <div className="bg-gray-150 text-center py-6">
                  <strong className="text-gray-650 text-5xl">
                    {city.main.temp}°C
                  </strong>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                    alt={city.weather[0].description}
                  />
                  <span className="italic text-base text-gray-650 text-opacity-75">
                    {city.weather[0].description}
                  </span>
                </div>
              </div>
              <table className="ml-12 leading-10 w-4/6">
                <tbody>
                  <tr className="border border-t-0 border-l-0 border-r-0 border-gray-150">
                    <th className="text-left w-36">Máx</th>
                    <td className="text-base font-bold text-red-850">
                      {city.main.temp_max}°C
                    </td>
                  </tr>
                  <tr className="border border-t-0 border-l-0 border-r-0 border-gray-150">
                    <th className="text-left">Min</th>
                    <td className="text-base font-bold text-blue-450">
                      {city.main.temp_min}°C
                    </td>
                  </tr>
                  <tr className="border border-t-0 border-l-0 border-r-0 border-gray-150">
                    <th className="text-left">Sunrise</th>
                    <td>
                      {format(new Date(city.sys.sunrise * 1000), 'HH:mm')}
                    </td>
                  </tr>
                  <tr className="border border-t-0 border-l-0 border-r-0 border-gray-150">
                    <th className="text-left">Sunset</th>
                    <td>{format(new Date(city.sys.sunset * 1000), 'HH:mm')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 mb-4">
              <span className="text-2xl">5 day weather forecast</span>
              <span className="italic text-gray-650 pl-4 text-opacity-50">
                every 3 hours
              </span>
            </div>
            {cityForecast.map((forecast) => (
              <div
                key={forecast.dt_txt}
                className={`flex justify-center items-center h-24 w-full border border-t-0 border-l-0 border-r-0
              border-gray-150`}
              >
                <div className="w-3/12 flex flex-col pl-10">
                  <strong>
                    {format(
                      parseISO(forecast.dt_txt.replace(' ', 'T')).setUTCSeconds(
                        city.timezone,
                      ),
                      'EEE d LLL',
                    )}
                  </strong>
                  <span className="text-sm italic text-gray-650 text-opacity-50">
                    {format(
                      parseISO(forecast.dt_txt.replace(' ', 'T')).setUTCSeconds(
                        city.timezone,
                      ),
                      'HH:mm',
                    )}
                  </span>
                </div>
                <div className="w-4/12 flex items-center justify-center">
                  <img
                    src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt={forecast.weather[0].description}
                  />
                  <span className="italic text-gray-650 text-opacity-75">
                    {forecast.weather[0].description}
                  </span>
                </div>
                <div className="w-5/12 flex ml-8">
                  <div className="w-20">
                    <span className="text-base font-bold text-red-850">
                      {forecast.main.temp_max}°C
                    </span>
                  </div>
                  <span className="text-base font-bold text-blue-450">
                    {forecast.main.temp_min}°C
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && (!city || !cityForecast) && (
        <div className="container max-w-screen-md text-center">
          <h6 className="text-2xl font-bold mt-5">
            An error occurred during data fetching.
            <br />
            Please, try again later.
          </h6>
        </div>
      )}

      {loading && (!city || !cityForecast) && (
        <div className="container max-w-screen-md text-center">
          <h6 className="text-2xl mt-5">Loading</h6>
        </div>
      )}
    </>
  );
};

export default CityDetail;
