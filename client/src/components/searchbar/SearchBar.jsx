import React, { useEffect, useRef, useState } from "react";
import { useDispatch,} from "react-redux";
import { getDogByName } from "../../redux/actions";
import s from './searchStyle.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [dogFound, setDogFound] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      // El componente se está desmontando, actualizamos el estado de montaje a falso.
      isMountedRef.current = false;
    };
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== '') {
      try {
        const response = await dispatch(getDogByName(name));
        if (isMountedRef.current) {
          if (response === "Dog not found") {
            setDogFound(false);
          } else {
            setDogFound(true);
          }
        }
      } catch (error) {
        console.log(error);
        // Manejo del error
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
      {!dogFound && <p key="not-found-message">No se encontró perro con ese nombre.</p>}
    </div>
  );
}


