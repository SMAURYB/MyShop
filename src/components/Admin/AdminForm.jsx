import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
// import { useAuth } from '../../context/AuthContext'
import useDataBase from '../../hooks/useDataBase'

import { db, storage } from '../../firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage' // Add getDownloadURL
import { doc, setDoc } from 'firebase/firestore'

import { v4 } from 'uuid'
import Popup from '../shared/Popup'

export default function AdminForm ({ setShowForm, action, product }) {
  // const { user } = useAuth()
  const { bg2, bg3, bg4 } = useTheme()
  const [showExitoso, setShowExitoso] = useState(false)
  const [actionText, setActionText] = useState(null)
  const [imageUrl] = useState(null)
  const { categoryData } = useDataBase()

  const [formData, setFormData] = useState({
    // Establecer la imagen del producto si estás en modo de edición
    image: action === 'Edit' ? product.image : null,
    // Agregar un campo de ID cuando se está creando un nuevo producto
    id: action === 'Create' ? v4() : null
  })

  async function onSubmit (event) {
    event.preventDefault()

    if (action === 'Create') {
      // Handle Create logic
      const imageFile = formData.image
      if (!imageFile) {
        console.error('No image selected')
        return
      }

      const imageRef = ref(storage, `images/${imageFile.name}`)
      await uploadBytes(imageRef, imageFile)
      const imageUrl = await getDownloadURL(imageRef)

      // Construct the document reference for the new product
      const docRef = doc(db, 'productos', formData.id) // Use the ID from formData

      // Set the document with form data and image URL
      await setDoc(docRef, {
        ...formData,
        image: imageUrl
      })

      // Show success message and close form
      setShowExitoso(true)
      setShowForm(false)
      return
    }

    // Handle Edit logic
    const imageFile = formData.image
    if (!imageFile) {
      console.error('No image selected')
      return
    }

    const imageRef = ref(storage, `images/${imageFile.name}`)
    await uploadBytes(imageRef, imageFile)
    const imageUrl = await getDownloadURL(imageRef)

    // Construct the document reference for the existing product
    const docRef = doc(db, 'productos', product.id) // Use product.id from props

    // Update the document with new data
    await setDoc(docRef, {
      ...formData,
      image: imageUrl
    })

    // Show success message and close form
    setShowExitoso(true)
    setShowForm(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // useEffect
  useEffect(() => {
    if (action === 'Edit') {
      setActionText('EDITAR')
      setFormData(product)
    } else if (action === 'Create') {
      setActionText('AGREGAR')
    }
  }, [action, product])

  console.log('imageUrl', imageUrl)
  console.log('formData', formData)

  return (
    <div
      className={`z-10 relative w-full h-screen ${bg2} flex items-center justify-center `}
    >
      {showExitoso && (
        <div className="z-50 absolute shadow-xl">
          <Popup message="Envio exitoso" setShowExitoso={setShowExitoso} />
        </div>
      )}
      {/* Transparencia blur para el fondo */}
      <div
        className={`flex flex-col items-center justify-center gap-x-5 rounded-3xl p-8 shadow-sm ${
          showExitoso ? 'blur-3xl' : ''
        }`}
      >
        {/* FORMULARIO PARA CREAR O EDITAR PRODUCTOS */}
        <form
          onSubmit={onSubmit}
          className={`rounded-lg ${bg3} flex flex-col p-8 shadow-md gap-y-8 `}
        >
          <p className="text-slate-300 text-2xl -mb-5 font-bold">
            FORMULARIO PARA {actionText} PRODUCTOS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex flex-col">
              <label htmlFor="ref" className="text-sm text-gray-300">
                Ref
              </label>
              <input
                name="ref"
                type="text"
                value={formData.ref || ''}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="branch" className="text-sm text-gray-300">
                Marca
              </label>
              <input
                name="branch"
                type="text"
                value={formData.branch || ''}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-300">
                Nombre
              </label>
              <input
                name="name"
                type="text"
                value={formData.name || ''}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="size" className="text-sm text-gray-400">
                Tamaño
              </label>
              <input
                name="size"
                type="text"
                value={formData.size || ''}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="text-sm text-gray-300">
                Precio
              </label>
              <input
                name="price"
                type="text"
                value={formData.price || ''}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="availability" className="text-sm text-gray-300">
                Disponibilidad
              </label>
              <input
                name="availability"
                type="text"
                value={formData.availability || ''}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-slate-200">
              <label htmlFor="image" className="text-sm text-gray-300">
                Imagen
              </label>
              <input
                name="image"
                type="file"

                className="border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                onChange={(event) =>
                  setFormData({ ...formData, image: event.target.files[0] })
                }
              />
              {/* Mostrar el nombre del archivo seleccionado */}
              {formData.image && formData.image.name && (
                <p className="text-gray-400 mt-2">Nombre del archivo: {formData.image.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm text-gray-300">
                Categoría
              </label>
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              >
                <option value="">Selecciona una categoría</option>
                {categoryData.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-[360px] flex flex-row justify-between items-center">

            {/* cuadro de la imagen */}

            <div className="w-[60%] h-[360px] bg-slate-200 rounded-md relative">
              {/* Mostrar la imagen si está seleccionada */}
              {formData?.image && (
                <img
                  // src={URL.createObjectURL(formData.image)}
                  src={formData.image}
                  alt="Selected Image"
                  className="object-cover w-full h-full rounded-md"
                />
              )}

              {/* Mostrar un mensaje si no hay imagen seleccionada */}
              {!formData.image && (
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
                  No image selected
                </p>
              )}
            </div>

            <div className="w-[40%] h-full flex justify-center items-center">
              <div className="flex flex-col items-center justify-end w-full gap-y-8">
                <button
                  className={`${bg4} hover:bg-blue-100 hover:text-red-500 text-white font-semibold py-2 px-8 rounded mt-4`}
                  type="submit"
                  onClick={onSubmit}
                >
                  {action === 'Create' ? 'Crear' : 'Editar'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className={`${bg4} hover:bg-blue-100 hover:text-red-500 text-white font-semibold py-2 px-8 rounded mt-4`}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
