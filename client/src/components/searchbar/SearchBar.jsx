import React, { useState } from "react";
import { useDispatch,} from "react-redux";
import { getDogByName } from "../../redux/actions";
import s from './searchStyle.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [dogFound, setDogFound] = useState(true); // State to track whether the dog is found or not

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== '') {
      const response = await dispatch(getDogByName(name));
      if (response === "Dog not found") {
        setDogFound(false);
      } else {
        setDogFound(true);
      }
      setName("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={s.search}
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Buscar Perro..."
        />
        <button className={s.boton} type="submit">Buscar</button>
      </form>
      {!dogFound && <p>No se encontró perro con ese nombre.</p>}
    </div>
  );
}
