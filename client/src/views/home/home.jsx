import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, Sort, filterCreated, filterDogByTemperaments, getTemperaments } from '../../redux/actions';
import DogCard from '../../components/card/DogCard';
import s from './home.module.css';
import NavBar from '../../components/nav/NavBar';
import SearchBar from '../../components/searchbar/SearchBar';
import Paginado from '../../components/paginado/Pagiando';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1); // Reset currentPage when applying the filter
  }

  function onSelectsChange(e) {
    dispatch(Sort(e.target.value));
    setCurrentPage(1); // Reset currentPage when applying the filter
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterDogByTemperaments(e.target.value));
    setCurrentPage(1); // Reset currentPage when applying the filter
  }

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div>
        <SearchBar />
        <div>
          <select name="select" onChange={onSelectsChange} className="a-z">
            <option value="Filtro"> A-Z:</option>
            <option value="ASCENDENTE">Ascendente</option>
            <option value="DESCENDENTE">Descendente</option>
          </select>
          <select onChange={handleFilterCreated}>
            <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existentes"> Existentes </option>
          </select>
          <select onChange={(e) => handleFilterTemperament(e)}>
            <option>Temperaments</option>
            <option value="Todos">Todos</option>
            {allTemperaments.map((temperament) => (
              <option key={temperament.id} value={temperament.name}>
                {temperament.name}
              </option>
            ))}
          </select>
          <div className={s.paginado}>
            <Paginado
              dogsPerPage={dogsPerPage}
              dogs={dogs}
              paginado={paginado}
              page={currentPage}
            />
            <div className={s.cardList}>
              {currentDogs?.map(el=> {
                return(
                  <Link key={el.id} to={`/dogs/${el.id}`}>

                    <DogCard
                      key={el.id}
                      name={el.name}
                      image={el.image}
                      weight={el.weight}
                      temperament={el.temperament}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

