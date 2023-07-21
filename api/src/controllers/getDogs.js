require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getApiInfo = async () => {
  try {
    const response = await axios.get(URL);
    const apiInfo = response.data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.image?.url,
        height: `${e.height.metric} cm`,
        weight: `${e.weight.metric} kgs`,
        life_span:`${e.life_span.metric} years`,
        temperament: e.temperament
      };
    });
    return apiInfo;
  } catch (error) {
    console.log('Error al obtener datos de la API', error);
    throw error;
  }
};

const getDbInfo = async () => {
  try {
    const result = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
    return result.map((dog) => {
      return {
        id: dog.id,
        image: dog.img,
        name: dog.name,
        temperament: dog.temperaments.map((temperament) => temperament.name).join(', '),
        life_span: dog.life_span,
        weight: dog.weight,
        origin: dog.origin,
        createdinDb: true,
      };
    });
  } catch (error) {
    console.log('Error en la consulta a la base de datos', error);
    throw error;
  }
};

const getAllDogs = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allDogs = apiInfo.concat(dbInfo);
    return allDogs;
  } catch (error) {
    console.log('Error al obtener todos los perros', error);
    throw error;
  }
};

const getDogApiById = async (id) => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`);
    const apiId = response.data;
    return {
      id: apiId.id,
      name: apiId.name,
      image: apiId.image?.url,
      height: `${apiId.height.metric} cm`,
      weight: `${apiId.weight.metric} kgs`,
      life_span: `${apiId.life_span.metric} years`,
      temperament: apiId.temperament,
    };
  } catch (error) {
    console.log('Error al obtener el perro por ID', error);
    throw error;
  }
};

const getDogApiByName = async (name) => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
    const apiDogs = response.data;
    
    const matchedDogs = apiDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
    
    if (matchedDogs.length > 0) {
      const dogList = await Promise.all(matchedDogs.map((dog) => getDogApiById(dog.id)));
      return dogList;
    }

    return null;
  } catch (error) {
    console.log('Error al obtener el perro por nombre', error);
    throw error;
  }
};

const getDogDbByName = async (name) => {
  try {
    const dbName = await Dog.findOne({
      where: { name: name.toLowerCase() },
      include: [
        {
          model: Temperament,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
    return dbName;
  } catch (error) {
    console.log('Error al obtener el perro de la base de datos por nombre', error);
    throw error;
  }
};

module.exports = {
  getAllDogs,
  getDogApiById,
  getDogApiByName,
  getDogDbByName,
};
