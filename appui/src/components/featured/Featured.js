import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './featured.css';

const Featured = () => {
  const [citiesData, setCitiesData] = useState([]);

  const { data, loading, error } = useFetch('/hotels/countByCity?cities=paris,germany,austria');

  useEffect(() => {
    if (data && data.length === 3) {
      setCitiesData(data);
    }
  }, [data]);

  const cityItems = [
    { name: 'Paris', imgSrc: 'https://images.unsplash.com/photo-1609971757431-439cf7b4141b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Germany', imgSrc: 'https://images.unsplash.com/photo-1587330979470-3595ac045ab0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Austria', imgSrc: 'https://images.unsplash.com/photo-1520503922584-590e8f7a90d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
    <div className="featured">
      {loading ? (
        'Loading please wait'
      ) : (
        <>
          {cityItems.map((city, index) => (
            <div key={index} className="featuredItem">
              <img src={city.imgSrc} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>{city.name}</h1>
                <h2>{citiesData[index]} properties</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Featured;
