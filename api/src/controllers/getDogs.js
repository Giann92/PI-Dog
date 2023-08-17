require('dotenv').config();
const axios = require('axios');
const uuidValidate = require('uuid-validate');
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
        life: `${e.life_span}`,
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

    const dogsInfo = result.map((dog) => {

      return {
        id: dog.id,
        image: dog.image,
        name: dog.name,
        temperament: dog.temperaments.map((temperament) => temperament.name).join(', '),
        life_span: dog.life_span,
        weight: dog.weight,
        origin: dog.origin,
        descripcion: dog.descripcion,
        createdinDb: true,
      };
    });

    return dogsInfo;

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
    const apiData = (await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`));

    if (!Array.isArray(apiData.data)) {
      throw new Error('API data format is incorrect');
    }

    const dogFilterId = apiData.data.filter(dog => parseInt(dog.id) === parseInt(id));

    if (dogFilterId.length === 0) {
      throw new Error('Dog not found');
    }

    const dogData = dogFilterId[0];

    return {
      id: dogData.id,
      name: dogData.name,
      image: dogData.image.url,
      height: `${dogData.height.metric} cm`,
      weight: `${dogData.weight.metric} kgs`,
      life: dogData.life_span,
      temperament: dogData.temperament,
      descripcion: dogData.descripcion,
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
const getDogDbById = async (id) => {
  try {
    if (uuidValidate(id)) {
      const dog = await Dog.findOne({
        where: {
          id: id
        },
        include: Temperament
      });
console.log(dog);
      if (dog) {
       
        
        const dogDb = {
          id: dog.idDog,
          name: dog.name,
          image: dog.image,
          temperament: dog.temperaments.map((temperament) => temperament.name).join(', '),
          weight: dog.weight,
          height: dog.height,
          life: dog.life,
          descripcion: dog.descripcion,
        };
        return dogDb;
      }
    }

    // Si el ID no es un UUID válido o no se encontró en la base de datos,
    // continuar buscando en la API
    return null;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAllDogs,
  getDogApiById,
  getDogApiByName,
  getDogDbByName,
  getDogDbById,
};
