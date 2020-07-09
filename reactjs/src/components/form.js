import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Form() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    axios
    .post("http://localhost:5000/api/libro",data)
    .then(
      response => {
        console.log(response.data)
      }
    )
    .catch((error)=> {
      console.log(error);
    })
    console.log(data);
  } 
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="nombre" name="nombre" ref={register} />
        <input type="text" placeholder="autor" name="autor" ref={register} />
        <input type="number" placeholder="ano" name="ano" ref={register} />
        <select name="idioma" ref={register}>
          <option value="ingles">ingles</option>
          <option value="espanol">espanol</option>
        </select>

        <input type="submit" />
    </form>
  );
}