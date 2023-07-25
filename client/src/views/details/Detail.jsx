import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions';
import { Link } from 'react-router-dom';
import styles from './detail.module.css';

const DEFAULT_IMAGE_URL = 'data:image/png;base64,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';
const Detail = (props) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  console.log(details);
  
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  
  if (!details) {
    return <div>Cargando los detalles del Perro...</div>;
  }
  
  
  return (
    <div className={styles.container}>
      <div className={styles.dogDetail}>
        <h2 className={styles.dogDetailName}>{details.name}</h2>
        <h6 className={styles.dogDetail__id}># {details.id}</h6>
        <img src={details.image} alt={details.name} width="300px" height="250px" />
        <h3 className={styles.dogDetail__temperament}>{details.temperament}</h3>
        <h4 className={styles.dogDetail__attribute}>weight: {details.weight}</h4>
        <h4 className={styles.dogDetail__attribute}>height: {details.height}</h4>
        <h4 className={styles.dogDetail__attribute}>life: {details.life}</h4>

        <div className={styles.dogDetail__closeBtn}>
          <Link to="/dogs">Volver a la lista de Perros</Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;

