import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    axios
    .post("http://localhost:5000/api/libro", data)
    .then(
      response => {
        console.log(response.data)
      }
    )
    .catch((error) => {
      console.log(error)
    })
  } ;
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="nombre" name="nombre" ref={register} />
      <input type="text" placeholder="autor" name="autor" ref={register} />
      <input type="number" placeholder="ano" name="ano" ref={register} />
      <input type="text" placeholder="idioma" name="idioma" ref={register} />

      <input type="submit" />
    </form>
  );
}