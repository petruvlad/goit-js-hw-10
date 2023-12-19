import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';


const apiKey =
  'live_drdbO9hNSCgFDOgjMSFrdm5Er6405Ry1BErMYmiDqRYlMCEDhVeidxC04GpVFzNL';
axios.defaults.headers.common['x-api-key'] = apiKey;

function setElementDisplay(element, displayValue) {
  if (element) {
    element.style.display = displayValue;
  }
}

function showSuccessNotification(message) {
 Notiflix.Notify.success('Cat information loaded successfully!');
}

function showErrorNotification(message) {
Notiflix.Notify.failure('Oops! Something went wrong. Try again.');
}

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  function handleCatInfo(catData) {
    setElementDisplay(loader, 'none');
    catInfo.innerHTML = `
      <img src="${catData.url}" alt="${catData.breeds[0].name}" />
      <p><strong>Name:</strong> ${catData.breeds[0].name}</p>
      <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
    `;
    setElementDisplay(catInfo, 'block');
    showSuccessNotification('Cat information loaded successfully!');
  }

  function handleError(err) {
    setElementDisplay(loader, 'none');
    setElementDisplay(error, 'block');
    console.error(err);
    showErrorNotification('Oops! Something went wrong. Try again.');
  }

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });

      breedSelect.addEventListener('change', () => {
        const selectedBreedId = breedSelect.value;
        setElementDisplay(loader, 'block');
        setElementDisplay(catInfo, 'none');
        setElementDisplay(error, 'none');

        fetchCatByBreed(selectedBreedId).then(handleCatInfo).catch(handleError);
      });
    })
    .catch(handleError);
});
