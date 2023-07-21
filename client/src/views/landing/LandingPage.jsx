import React from "react";
import { Link } from "react-router-dom";

import s from './Landing.module.css';

function LandingPage() {
  return (
    <div>
      <Link to='/dogs'>
        <button className={s.btn}>ENTER</button>
      </Link>
    </div>
  );
}

export default LandingPage;
