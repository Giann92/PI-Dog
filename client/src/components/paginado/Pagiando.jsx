import React from "react";
import s from './paginado.module.css';

export default function Paginado({ dogsPerPage,dogs, paginado, page }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(dogs.length / dogsPerPage);
  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (page <= 4) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...", totalPages); // Agregar "..." y el número de la última página
    } else if (page >= totalPages - 3) {
      pageNumbers.push(1,"..."); // Agregar el número de la primera página y "..."
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, "...", page - 1, page, page + 1, "...", totalPages); // Agregar "..." y los números adyacentes a la página actual
    }
  }

  return (
    <nav className={s.nav}>
      <ul className={s.number}>
        {page > 1 && (
          <div>
            <button className={s.btnNP} onClick={() => paginado(page - 1)}>
             {"<<"}Anterior
            </button>
          </div>
        )}
        {pageNumbers.map((number, index) => (
          <div key={index} >
            <button
              className={s.btn}
              onClick={() => paginado(number)}
              disabled={number === page} // Desactivar el botón si corresponde a la página actual
            >
              {number === "..." ? "..." : number}
            </button>
          </div>
        ))}
        {page < totalPages && (
          <div>
            <button className={s.btnNP} onClick={() => paginado(page + 1)}>
              Siguiente{">>"}
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
}