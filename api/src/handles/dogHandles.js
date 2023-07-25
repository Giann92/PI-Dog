const { getDogApiById, getDogApiByName, getDogDbByName, getAllDogs, getDogDbById } = require('../controllers/getDogs');
const { Dog, Temperament } = require('../db');

const getDogHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const allDogs = await getAllDogs();

    if (name) {
      const dogApiName = await getDogApiByName(name.toLowerCase());
      const dogDbName = await getDogDbByName(name.toLowerCase());
      
      if (dogApiName) {
        res.status(200).json(dogApiName);
      } else if (dogDbName) {
        res.status(200).json(dogDbName);
      } else {
        res.status(404).json("No se encontró el nombre del perro");
      }
    } else {
      res.status(200).json(allDogs);
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener los perros', message: error.message });
  }
};

const getDogIdHandler = async (req, res) => {
  const { id } = req.params;
  
  if (id) {
    
   const dogId = await getDogApiById(id);

    if(!dogId){
      dogId = await getDogDbById(id);
    }
    if(dogId){
      res.status(200).json(dogId);
    } else{
      res.status(400).json('No se encontro un Dog con ese ID')
    }
    }
  };

const createDogs = async (req, res) => {
  try {
    const { name, height_min, 
      height_max, 
      weight_min, 
      weight_max, 
      life_span_min, 
      life_span_max, 
      temperaments,
      image} = req.body;
    const temperamentsArray = Array.isArray(temperaments) ? temperaments : [temperaments];

    const newDog = await Dog.create({
      name,
      height: `${height_min} - ${height_max} cm`,
      weight: `${weight_min} - ${weight_max} kg`,
      life: `${life_span_min} - ${life_span_max} years`,
      image,
    });

    const dogTemperaments = await Temperament.findAll({
      where: { name: temperamentsArray },
    });

    await newDog.setTemperaments(dogTemperaments);

    const dogResult = await Dog.findOne({
      where: { id: newDog.id },
      include: [
        {
          model: Temperament,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });

    res.status(201).json(dogResult);
  } catch (error) {
    console.log('Error creating dog', error);
    res.status(500).json({ message: 'Failed to create dog' });
  }
};

module.exports = {
  getDogHandler,
  getDogIdHandler,
  createDogs,
};
