const { Dog, Temperament } = require("../db");




const createDog = async (name, height_min, height_max, weight_min, weight_max, life, temperaments, image, descripcion) => {
    try {
        const existingTemperaments = await Temperament.findOne({ where: { name: temperaments } });
   
        if (!existingTemperaments) {
            throw new error('El temperamento no existe');
        }

        const newDog = await Dog.create({
            name,
            height: `${height_min}-${height_max}`,
            weight: `${weight_min}-${weight_max}`,
            life,
            image,
            descripcion,

        });

        await newDog.addTemperament(existingTemperaments);
        return newDog;
    } catch (error) {
        throw error;
    }
};

module.exports = createDog;