import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};


