require('dotenv').config();
const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getTemperament = async (req ,res) => {
  try {
    const response = await axios.get(URL);
    const apiInfo = response.data;

    const temperaments = apiInfo.map((breed) => {
      const breedTemperament = breed.temperament;
      if (!breedTemperament) {
        return [undefined];
      }
      return breedTemperament.split(',').map((t) => t.trim());
    });

    const flattenedTemperaments = flattenArray(temperaments);
    const uniqueTemperaments = [...new Set(flattenedTemperaments)].filter(
      (t) => t !== null && t !== undefined
    );

    const createdTemperaments = await Promise.all(
      uniqueTemperaments.map((temperament) =>
        Temperament.findOrCreate({ where: { name: temperament } })
      )
    );

    const result = await Temperament.findAll();
    res.send(result)
  } catch (error) {
    console.log('Error al obtener datos de la API', error);
    throw error;
  }
};

// Función auxiliar para aplanar un array multidimensional
function flattenArray(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
  }, []);
}

module.exports = { getTemperament };
