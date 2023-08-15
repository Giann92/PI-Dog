import React from "react";
import { Link } from "react-router-dom";
import s from './navStyle.module.css';

export default function NavBar() {
    return (
        <header id="navegador" className={`${s.header} ${s.transparentBg}`}>
            <Link to="/">
                <img className={s.logo} src="https://www.seekpng.com/png/full/112-1121618_puppies-png-photo-pet-dog.png" alt="404" />
            </Link>
            <div>
                <Link to="/create" className={s.created}>
                    <button className={s.btn}>
                       + Agregar mascota
                    </button>
                </Link>
            </div>
        </header>
    );
}
