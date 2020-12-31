import React, { HTMLAttributes } from 'react';
import { ICity } from '../../pages/Home';

interface Props extends HTMLAttributes<HTMLElement> {
  city: ICity;
}

const CityCard: React.FC<Props> = ({ city }) => {
  return (
    <div className="flex flex-1 h-44 bg-white rounded shadow-md p-4 justify-between mb-4">
      <div className="bg-gray-150 h-full w-52 flex justify-center items-center rounded">
        <span className="text-5xl text-gray-650">{city.main.temp}°C</span>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <strong className="text-2xl text-blue-450">
            {city.name}, {city.sys.country}
          </strong>
          <img
            src={`http://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`}
            alt={city.sys.country}
            className="w-4 h-3 ml-2"
          />
        </div>
        <div className="mt-4 w-32 flex justify-between">
          <span className="text-sm text-gray-650">Máx</span>
          <strong className="text-base text-red-850">
            {city.main.temp_max}°C
          </strong>
        </div>
        <div className="w-32 flex justify-between">
          <span className="text-sm text-gray-650 w-8 mr-12">Min</span>
          <strong className="text-base text-blue-450">
            {city.main.temp_min}°C
          </strong>
        </div>
      </div>
      <div className="flex flex-col h-full w-32 justify-center items-center">
        <img
          src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`}
          alt={city.weather[0].description}
        />
        <span className="italic text-base text-gray-650">
          {city.weather[0].description}
        </span>
      </div>
    </div>
  );
};

export default CityCard;
