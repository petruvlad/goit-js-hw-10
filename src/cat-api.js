import axios from 'axios';
import Notiflix from 'notiflix';


const apiKey =
  'live_drdbO9hNSCgFDOgjMSFrdm5Er6405Ry1BErMYmiDqRYlMCEDhVeidxC04GpVFzNL';
axios.defaults.headers.common['x-api-key'] = apiKey;

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw new Error('Failed to fetch cat breeds. Please try again.');
  }
}

export async function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  try {
    const response = await axios.get(url);

    if (response.data.length === 0) {
      throw new Error('No cat data found for the selected breed.');
    }

    return response.data[0];
  } catch (error) {
    console.error('Error fetching cat data:', error);
    throw new Error('Failed to fetch cat information. Please try again.');
  }
}
