import React, { useState, useEffect } from 'react';
import { fetchScrapedData } from '../services/api/page.js';

const ScrapedData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const scrapedData = await fetchScrapedData();
        setData(scrapedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Scraped Data</h1>
      {data}
    </div>
  );
};

export default ScrapedData;