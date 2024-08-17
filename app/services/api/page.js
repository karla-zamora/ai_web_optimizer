import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchScrapedData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scrape`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scraped data:', error.response ? error.response.data : error);
    throw error;
  }
};