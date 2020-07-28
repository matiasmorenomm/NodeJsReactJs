import React, { useState, useEffect } from "react";
import MaterialDatatable from "material-datatable";
import axios from 'axios';

export default function Table() {
  
  /* Declara una variable de estado llamda item */
  /* setItem es una Funcion que permite cambiar el valor de item */
  /* Se define useState con un valor inicial [] que es vacio */
  const [item, setItem] = useState([]);

  const columns = [
    {
     name: "Nombre",
     field: "nombre",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Autor",
     field: "autor",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Año",
     field: "ano",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Idioma",
     field: "idioma",
     options: {
      filter: true,
      sort: true,
     }
    }
   ];

   /* Efectos secudarios */
   /* Se utiliza el useEfect despues de que  */
  
  useEffect(() => {
    cargar();
  }, []);

  const cargar = async() =>{
    var token = localStorage.getItem('Token');
    const { data } = await axios.get("http://localhost:5000/api/libro", {headers: {'Authorization': token}});
    /* setItem es la funcion asignada para cambiar el valor de item */
    setItem(data.libros);
    return null;
  }
  
  return (
      
      <MaterialDatatable
        title={"Libros"}
        data={item}
        columns={columns}
        options={{
          selectableRows: false,
          print: false,
          onlyOneRowCanBeSelected: false,
          textLabels: {
            body: {
              noMatch: "Lo sentimos, no se encuentran registros",
              toolTip: "Sort",
            },
            pagination: {
              next: "Siguiente",
              previous: "Página Anterior",
              rowsPerPage: "Filas por página:",
              displayRows: "de",
            },
          },
          download: false,
          pagination: true,
          rowsPerPage: 5,
          usePaperPlaceholder: true,
          rowsPerPageOptions: [5, 10, 25],
          sortColumnDirection: "desc",
        }}
      />
      
  );
}