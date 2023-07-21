import React from "react";
import s from './navStyle.module.css'
import { Link } from "react-router-dom/cjs/react-router-dom";



export default function NavBar() {

    return (
        <header id="navegador" className={`${s.header} ${s.transparentBg}`}>
          <Link to="/">
            <img  className={s.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5e249tVj7q78e_8B86YahS3CYjF0NcW4DfQ&usqp=CAU" alt="404" />
          </Link>
         <div> <Link to="/create" className={s.created} >
              <button className={s.btn}>
                Crear Perro
                </button> 
              </Link></div>
    
        </header>
  
    );
}