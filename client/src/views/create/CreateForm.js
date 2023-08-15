import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './create.module.css';
import { useHistory } from 'react-router-dom';
import { getTemperaments, addDog } from '../../redux/actions';
import NavBar from '../../components/nav/NavBar';

const AddDogsForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);

    const [error, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span_min: 0,
        life_span_max: 0,
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    const handleTemperamentSelect = (e) => {
        const selectedTemperament = e.target.value;
        console.log(selectedTemperament);
        setFormData((prevFormData) => ({
            ...prevFormData,
            temperaments: [...prevFormData.temperaments, selectedTemperament],
        }));
    };

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: '',
        }));
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file,
        }));
    };

    function validate(data) {
        let errors = {};

        if (!data.name) errors.name = "Debes ingresar una raza o nombre";

        if (!data.height_min) errors.height_min = "Debes ingresar una altura mínima";
        if (!data.height_max) errors.height_max = "Debes ingresar una altura máxima";
        if (data.height_min >= data.height_max) {
            errors.height_min = "La altura mínima debe ser menor que la altura máxima";
            errors.height_max = "La altura máxima debe ser mayor que la altura mínima";
        }

        if (!data.weight_min) errors.weight_min = "Debes ingresar un peso mínimo";
        if (!data.weight_max) errors.weight_max = "Debes ingresar un peso máximo";
        if (data.weight_min >= data.weight_max) {
            errors.weight_min = "El peso mínimo debe ser menor que el peso máximo";
            errors.weight_max = "El peso máximo debe ser mayor que el peso mínimo";
        }

        if (!data.life_span_min) errors.life_span_min = "Debes ingresar una esperanza de vida mínima";
        if (!data.life_span_max) errors.life_span_max = "Debes ingresar una esperanza de vida máxima";
        if (data.life_span_min >= data.life_span_max) {
            errors.life_span_min = "La esperanza de vida mínima debe ser menor que la esperanza de vida máxima";
            errors.life_span_max = "La esperanza de vida máxima debe ser mayor que la esperanza de vida mínima";
        }

        if (!data.descripcion) errors.descripcion = "Debes ingresar una descripción";

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validate(formData);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            if (
                formData.height_min >= formData.height_max ||
                formData.weight_min >= formData.weight_max ||
                formData.life_span_min >= formData.life_span_max
            ) {
                alert("Los valores mínimos no pueden ser mayores que los valores máximos.");
                return;
            }

            const imageData = new FormData();
            imageData.append('image', formData.image);
            imageData.append('name', formData.name);

            await dispatch(addDog(formData));
            await dispatch(getTemperaments());

            alert('Mascota agregada con éxito.');
            resetForm();
            history.push('/dogs');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            image: '',
            height_min: 0,
            height_max: 0,
            weight_min: 0,
            weight_max: 0,
            life_span_min: 0,
            life_span_max: 0,
            descripcion: '', // Reiniciar campo de descripción
            temperaments: [],
        });
    };

    return (
        <>
        <NavBar/>
        <div className={`${s['form-container']}`}>
            <form onSubmit={handleSubmit}>
                <h2>Agregar Mascota</h2>

                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {error.name && <span className={s.errorMessage}>{error.name}</span>}
                </div>

                <div>
                    <label>Imagen:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {error.image && <span className={s.errorMessage}>{error.image}</span>}
                </div>

                <div>
                    <label>Altura Mínima:</label>
                    <input
                        type="number"
                        name="height_min"
                        value={formData.height_min}
                        onChange={handleInputChange}
                    />
                    {error.height_min && <span className={s.errorMessage}>{error.height_min}</span>}
                </div>

                <div>
                    <label>Altura Máxima:</label>
                    <input
                        type="number"
                        name="height_max"
                        value={formData.height_max}
                        onChange={handleInputChange}
                    />
                    {error.height_max && <span className={s.errorMessage}>{error.height_max}</span>}
                </div>

                <div>
                    <label>Peso Mínimo:</label>
                    <input
                        type="number"
                        name="weight_min"
                        value={formData.weight_min}
                        onChange={handleInputChange}
                    />
                    {error.weight_min && <span className={s.errorMessage}>{error.weight_min}</span>}
                </div>

                <div>
                    <label>Peso Máximo:</label>
                    <input
                        type="number"
                        name="weight_max"
                        value={formData.weight_max}
                        onChange={handleInputChange}
                    />
                    {error.weight_max && <span className={s.errorMessage}>{error.weight_max}</span>}
                </div>

                <div>
                    <label>Vida Mínima:</label>
                    <input
                        type="number"
                        name="life_span_min"
                        value={formData.life_span_min}
                        onChange={handleInputChange}
                    />
                    {error.life_span_min && <span className={s.errorMessage}>{error.life_span_min}</span>}
                </div>

                <div>
                    <label>Vida Máxima:</label>
                    <input
                        type="number"
                        name="life_span_max"
                        value={formData.life_span_max}
                        onChange={handleInputChange}
                    />
                    {error.life_span_max && <span className={s.errorMessage}>{error.life_span_max}</span>}
                </div>

                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                    />
                    {error.description && <span className={s.errorMessage}>{error.description}</span>}
                </div>

                <div>
                    <label>Temperamentos:</label>
                    <select onChange={handleTemperamentSelect}>
                        {temperaments.map((temperament) => (
                            <option key={temperament.id} value={temperament.name}>
                                {temperament.name}
                            </option>
                        ))}
                    </select>
                    <ul>
                        {formData?.temperaments.map((temperament) => (
                            <li key={temperament}>{temperament}</li>
                        ))}
                    </ul>
                </div>

                <button className={s['submit-button']} type="submit">
                    Agregar Mascota
                </button>
            </form>
            <button className={s['backBtn']}>
                <Link className={s['link']} to="/dogs">Volver a la lista de perros</Link>
            </button>
        </div>
         </>
    );
};

export default AddDogsForm;
