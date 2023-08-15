import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDogs,
  Sort,
  filterCreated,
  filterDogByTemperaments,
  getTemperaments,
  orderByWeight
} from '../../redux/actions';
import DogCard from '../../components/card/DogCard';
import s from './home.module.css';
import NavBar from '../../components/nav/NavBar';
import SearchBar from '../../components/searchbar/SearchBar';
import Paginado from '../../components/paginado/Pagiando';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const loading = useSelector((state) => state.loading); 
  const [selectedTemperament, setSelectedTemperament] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [searchedDogName, setSearchedDogName] = useState('');
console.log(loading);
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function onSelectsChange(e) {
    dispatch(Sort(e.target.value));
    setCurrentPage(1);
  }

  function handleOrderByWeight(e) {
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    const selectedTemperament = e.target.value;
    dispatch(filterDogByTemperaments(selectedTemperament));
    setSelectedTemperament(selectedTemperament);
    setCurrentPage(1);
  }
  function handleSearch(e) {
    e.preventDefault();
    const searchedName = e.target.value;
    setSearchedDogName(searchedName);
    setCurrentPage(1);
  }
  // Calcular el índice del último y primer perro de la página actual
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  // Obtener la lista de perros actual de la lista ordenada paginada
  const currentDogs = searchedDogName
    ? allDogs.filter((dog) => dog.name.toLowerCase().includes(searchedDogName.toLowerCase())).slice(indexOfFirstDog, indexOfLastDog)
    : allDogs.slice(indexOfFirstDog, indexOfLastDog);
  return (
    <>
      <NavBar />
      <div>
        
        <div className={s.orden}>
          <p className={s.ordenLabel}>Orden alfabetico: </p>
          <select name="select" onChange={onSelectsChange} className="a-z">
            <option value="Filtro"> Todos:</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          </div>

          <div className={s.peso}>
          <p className={s.pesoLabel}>peso: </p>
          <select name="selects" onChange={handleOrderByWeight} className="Peso">
            <option value="Peso">Peso</option>
            <option value="Mayor peso">Mayor peso</option>
            <option value="Menor peso">Menor peso</option>
          </select>
          </div>
         <div>
          
        </div>
          <select onChange={handleFilterCreated}>
            <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existentes"> Existentes </option>
          </select>
    
          <div className={s.temperamentContainer}>
        <p className={s.temperamentLabel}>Temperaments:</p>
        <select onChange={(e) => handleFilterTemperament(e)}>
          <option value="Todos">Todos</option>
          {allTemperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
      </div>
          <SearchBar onSearch={handleSearch} />
          <div className={s.paginado}>
            <Paginado
              dogsPerPage={dogsPerPage}
              dogs={allDogs}
              paginado={paginado}
              page={currentPage}
            />
            <div className={`${s.cardList} `}>
            {loading ? (
            <div className={s.loading_container}>
              <img src="https://dogs-pi-spa.netlify.app/static/media/loading.918e8310.gif" alt="Loading" width="400px" height="360px" />
              <div className={`${s.loading} `}>Cargando Dogs...</div>
            </div>
            ) : (
                currentDogs?.map((el, index) => {
                  return (
                    <Link key={index} to={`/dogs/${el.id}`}>
                      <DogCard
                        name={el.name}
                        image={el.image}
                        weight={el.weight}
                        temperament={el.temperament}
                        selectedTemperament={selectedTemperament}
                      />
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
   
    </>
  );
}

export default Home;

