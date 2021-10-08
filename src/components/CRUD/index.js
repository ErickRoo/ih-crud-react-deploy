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

  //Funcion intermedia, que nos ayuda a poder editar los campos INPUT antes de aplicar funcion editComment
  const toggleEditionMode = (event, selectedElement) => {

    event.preventDefault()

    setEditionMode(true) //Activar el modo edición

    //Al momento de que se ejecute esta función por presionar el boton Editar, se reemplazaran los valores del post por los del elemento a editar. En los INPUTS se agregan los "value" 
    setPost({
      id: selectedElement.id,
      titulo: selectedElement.titulo,
      contenido: selectedElement.contenido
    })

    setId(selectedElement.id)

  }

  //Editar un elemento de comment por su ID
  const editComment = (event) => {
    event.preventDefault();


    const arrayConElementoModificado = comments.map((element) => {
      return element.id === id ?
        {
          id: id,
          titulo: post.titulo,
          contenido: post.contenido
        }
        : element
    });

    setComments(arrayConElementoModificado);

    //SALIR DE MODO EDICIÓN
    setEditionMode(false)

    // BORRAR EL VALOR DE LOS INPUTS
    setPost({
      titulo: "",
      contenido: ""
    })
  }
  // console.log(id)
  // console.log(post)

  /* El boton del FORM elegirá una función (edit o save) dependiendo del editionMode, con esto nos permite editar los INPUTS hasta que se vuelva a presionar el boton del FORM */

  return (
    <div>

      <form onSubmit={editionMode ?
        (event) => { editComment(event) }
        :
        (event) => { saveComment(event) }}

        className={editionMode ?
          "p-10 bg-yellow-100"
          :
          null
        }>
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
            <button className="w-1/2 flex items-center justify-center rounded-md bg-black text-white" type="submit">
              {
                editionMode ?
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Edita tu publicación
                  </>
                  :
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                    Crear publicación
                  </>


              }
            </button>
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
                toggleEditionMode(event, e)
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
