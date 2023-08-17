import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './views/landing/LandingPage';
import Home from './views/home/home'
import AddDogsForm from './views/create/CreateForm';
import Detail from './views/details/Detail';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const url = "https://pi-dog-production-7a02.up.railway.app/"// eslint-disable-next-line 
const local = 'http://localhost:3001'

axios.defaults.baseURL = url;
const backgroundImages = {
  '/': 'https://helios-i.mashable.com/imagery/articles/07CIEf4aHNEhXeK7MSpNYt5/hero-image.fill.size_1248x702.v1648747007.jpg',
  '/dogs': 'https://t3.ftcdn.net/jpg/05/52/99/70/360_F_552997034_k5EkYzAnUnZVpnsbuQHz1ue4QJCWdDsV.jpg'
}
function App() {
  
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);
  
  const getBackgroundImage = (route) => {
    if (route === '/dogs/:id') {
      return `url(${backgroundImages['/']})`;
    }
    return `url(${backgroundImages[route]})`;
  };
  useEffect(() => {
    const backgroundImage = getBackgroundImage(currentRoute);
    document.body.style.backgroundImage = backgroundImage;
  }, [currentRoute]);
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/dogs' component={Home}/>
      <Route exact path='/dogs/:id' component={Detail}/>
      <Route exact path='/create' component={AddDogsForm}/>
    </div>
  );
}

export default App;
