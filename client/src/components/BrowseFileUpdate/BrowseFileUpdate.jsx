import React, { useState } from 'react';
import axios from 'axios';
import styles from './BrowseFileUpdate.module.css';

const BrowseFileUpdate = ({ onImageUpload }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const submitImage = () => {
        if (!imageFile) return;

        const data = new FormData();
        data.append("file", imageFile);

        axios.post('/create', data) // Ajusta la ruta de la API según tu configuración
            .then((res) => {
                console.log(res.data);
                setImagePreview(res.data.secure_url);
                if (onImageUpload) {
                    onImageUpload(res.data.secure_url);
                }
            })
            .catch((err) => {
                console.log(err.response ? err.response.data : err);
            });
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
        onImageUpload("");
    };

    return (
        <div className={styles.containerCloud}>
            <label className={styles.customFileUpload} htmlFor="file">
                <div className={styles.icon}>
                    <input type="file" id="file" onChange={handleImageChange} />
                    {/* SVG del ícono para cargar imagen */}
                </div>
                <div className={styles.text}>
                    <span>Click to upload image</span>
                </div>
                {imagePreview && <img src={imagePreview} className={styles.imageUrl} alt="Uploaded preview" />}
            </label>
            <div className={styles.buttonContainerUpdate}>
                <button type="button" className={styles.buttonCreateUpdate} onClick={removeImage}>Eliminar</button>
                <button type="button" className={styles.buttonCreateUpdate} onClick={submitImage}>Confirmar</button>
            </div>
        </div>
    );
};

export default BrowseFileUpdate;