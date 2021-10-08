import React, { useState } from 'react'
import { nanoid } from "nanoid" //Para generar IDs con el objetivo de poder obtener cada elemento de un arr

function CRUD() {

  //1 -- ESTADOS LOCALES

  //Este es el formato (OBJETO) que toma de los INPUTS, cada propiedad coincide con el NAME del INPUT.
  const [post, setPost] = useState({
    titulo: "",
    contenido: ""
  });

  //Aqui se almacenaran los post
  const [comments, setComments] = useState([]);

  // Crear un ID a través de un estado local nuevo
  const [id, setId] = useState("")

  //Hook para definir un modo o estado
  const [editionMode, setEditionMode] = useState(false)


  //2 -- FUNCIONES

  //Esta función puede manejar todos los inputs
  const handleInputs = (event) => {
    // console.log(event)
    // console.log("event.target.name:", event.target.name)
    // console.log("event.target.value:", event.target.value)

    //[event.target.name] está en corchetes porque entramos a multiples resultados de una propiedad de un objeto. Nos evitamos iterar cada name para tener uno distinto.
    setPost({
      ...post,
      id: nanoid(),
      [event.target.name]: event.target.value
    })
  }
  // console.log(post);//Al acabar de ejecutar handleinputs podemos ver el cambio en "post"

  //Guardando los comentarios
  //Primero con onClick en boton
  const saveComment = (event) => {
    event.preventDefault();

    setComments([post, ...comments]);
  }
  // console.log(comments);//Despues de enviar el formulario se puede ver como en el arr "comments" se llena de elementos

  //Borrar un comentario por su boton Borrar
  const deleteComment = (event, id) => {
    event.preventDefault();

    const arrFiltrado = comments.filter((element) => {
      return element.id !== id
    })

    setComments(arrFiltrado);
  }

  //Editar un elemento de comment por su ID
  const editComment = (event, selectedElement) => {
    event.preventDefault();

    //Al momento de que se ejecute esta función por presionar el boton Editar, se reemplazaran los valores del post por los del elemento a editar. En los INPUTS se agregan los "value" 
    setPost({
      id: selectedElement.id,
      titulo: selectedElement.titulo,
      contenido: selectedElement.contenido,
    })

    // setId(selectedElement.id);

    const arrayConElementoModificado = comments.map((element) => {
      return element.id === selectedElement.id ?
        {
          id: selectedElement.id,
          titulo: post.titulo,
          contenido: post.contenido
        }
        : element
    });

    setComments(arrayConElementoModificado);

    // BORRAR EL VALOR DE LOS INPUTS
    setPost({
      titulo: "",
      contenido: ""
    })
  }
  // console.log(id)
  // console.log(post)

  return (
    <div>

      <form>
        <label for="titulo">Título</label>
        <input type="text" name="titulo" placeholder="Cuéntanos que título quieres poner" id="titulo" onChange={(event) => {
          handleInputs(event)
        }} value={post.titulo} ></input>

        <label for="contenido">Contenido</label>
        <input type="text" name="contenido" placeholder="Haz tu descripción" id="contenido" onChange={(event) => {
          handleInputs(event)
        }} value={post.contenido}></input>

        <div className="flex space-x-3 mb-4 text-sm font-medium">
          <div className="flex-auto flex space-x-3">
            <button className="w-1/2 flex items-center justify-center rounded-md bg-black text-white" type="submit" onClick={(event) => {
              saveComment(event)
            }}>Comentar</button>
          </div>
        </div>
      </form>

      <h1>Comentarios</h1>
      <ul>

        {comments.map((e, index) => {
          return (
            <li key={index}>
              <h5>{e.titulo}</h5>
              <p>{e.contenido}</p>
              <button className="w-1/2 flex items-center justify-center rounded-md bg-black text-white" onClick={(event) => {
                editComment(event, e)
              }}>Editar</button>
              <button className="w-1/2 flex items-center justify-center rounded-md bg-black text-white" onClick={(event) => {
                deleteComment(event, e.id)
              }}>Borrar</button>
            </li>
          )
        })}

      </ul>

    </div>
  )
}

export default CRUD;
