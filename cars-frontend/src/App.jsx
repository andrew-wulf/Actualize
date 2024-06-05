import { useState, useEffect } from 'react';
import {CarsIndex} from './CarsIndex.jsx';
import axios from 'axios';
import './App.css';
import { CarsNew } from './CarsNew.jsx';
import { Modal } from './modal.jsx';
import { CarsShow } from './CarsShow.jsx';


export function Content() {

  const [cars, setCars] = useState({});
  const [modalVisible, setmodalVisible] = useState(false);
  const [currentCar, setCurrentCar] = useState({});
  const [url, setUrl] = useState("");

  const carsIndex = () => {
    axios.get('http://localhost:3000/cars.json')
    .then(response => {
      console.log(response);
      setCars(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }
  useEffect(carsIndex, []);

  const handleCarCreate = (params) => {
    axios.post('http://localhost:3000/cars/create.json', params)
    .then(response => {
      console.log(response);
      window.location.href('/');
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleCarShow = (id) => {
    cars.forEach(car => {
      if (car.id === id) {
        setCurrentCar(car);
        setUrl(car.image_url);
      }
    })
    setmodalVisible(true);
  }

  const handleCarUpdate = (params) => {
    axios.patch(`http://localhost:3000/cars/${currentCar.id}.json`, params)
    .then(response => {
      console.log(response);
      window.location.href('/');
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleCarDelete = () => {
    axios.delete(`http://localhost:3000/cars/${currentCar.id}.json`)
    .then(response => {
      console.log(response);
      handleModalClose();
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleModalClose = () => {
    setmodalVisible(false);
  }

  return (
    <div>
      <CarsNew create={handleCarCreate}/>
      <CarsIndex cars={cars} view={handleCarShow}/>

      <Modal show={modalVisible} onClose={handleModalClose}>
        <CarsShow car={currentCar} url={url} setUrl={setUrl} update={handleCarUpdate} delete={handleCarDelete}/>
      </Modal>
    </div>
  )
}



function App() {

  return (
    <>
      <Content />
    </>
  )
}

export default App
