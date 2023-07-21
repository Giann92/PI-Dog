import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions';
import { Link } from 'react-router-dom';
import s from './detail.module.css';

export default function Detail(props) {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (!details) {
    return <div>Cargando los detalles del Perro...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.dogDetail}>
        <h2 className={s.dogDetailName}>{details.name}</h2>
        <h6 className={s.dogDetail__name}># {details.id}</h6>
        <img src={details.image} alt={details.name} />
        <h3 className={s.dogDetail__name}>{details.temperament}</h3>
        <h4 className={s.dogDetail__name}>weight: {details.weight}</h4>
        <h4 className={s.dogDetail__name}>height: {details.height}</h4>
        <h4 className={s.dogDetail__name}>life: {details.life}</h4>

        <div className={s.dogDetail__closeBtn}>
          <Link to="/dogs">Volver a la lista de Perros</Link>
        </div>
      </div>
    </div>
  );
}
