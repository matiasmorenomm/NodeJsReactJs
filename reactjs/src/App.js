import React from 'react';
import logo from './logo.svg';
import './App.css';
import MaterialDatatable from "material-datatable";
import axios from 'axios';

function App() {
  var data;
  const onInit = axios.get("http://localhost:5000/api/libro").then(
      (response) => {
        data = response.data.libros
      }
    )
    .catch((error) => {
      console.log(error)
    }
    )
  const columns = [
    {   
        name: 'Nombre', 
        field: 'nombre',
    },
    {
        name: 'Title', 
        field: 'autor'
    },
    {
        name: 'Location', 
        field: 'idioma',
    }
    
];
 
  return (   
    <MaterialDatatable
    title={"Employee List"}
    data={data}
    columns={columns}
    />
  );
}

export default App;
