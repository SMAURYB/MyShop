import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
// import { useAuth } from '../../context/AuthContext'
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri'
import AdminForm from './AdminForm'
import useDataBase from '../../hooks/useDataBase'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../../firebase.config' // Importa la instancia de Firestore
import { doc, deleteDoc } from 'firebase/firestore'

import '../../App.css'

export default function Admin () {
  const [showForm, setShowForm] = useState(false)
  const [product, setProduct] = useState(false)
  const [action, setAction] = useState(null)
  // const { user } = useAuth()
  const location = useLocation()
  const { dataBase, categoryData } = useDataBase()
  const name2 = location.state?.name
  const { bg1, bg2 } = useTheme()
  const navigate = useNavigate()

  const handleDeleteButton = async (productId) => {
    // Assuming productId might be a number or another type that can be converted to string

    try {
      const productRef = doc(db, 'productos', String(productId)) // Convert to string before using in doc()
      await deleteDoc(productRef)
      console.log('Producto eliminado exitosamente')
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
    }
  }

  // Function to handle item editing
  const handleEditCreateButton = (producto) => {
    if (producto) {
      setAction('Edit')
      setProduct(producto)
    } else {
      setAction('Create')
    }
    setShowForm(true)
  }

  // Función para obtener el nombre de la categoría a partir de su ID
  const getCategoryName = (categoryId) => {
    const category = categoryData.find(cat => cat.category === categoryId)
    return category ? category.name : 'Categoría Desconocida'
  }

  const sortedDataBase = dataBase.sort((a, b) => a.id - b.id)

  return (
    <div className={`flex flex-col items-center justify-start ${bg2} w-full h-full gap-y-2 px-20`}>
      {showForm &&
        <AdminForm
          className='z-40'
          setShowForm={setShowForm}
          action={action}
          product={product}
        />
      }
      {!showForm &&
      <div className={'flex flex-col items-center justify-start w-full h-screen pb-2 gap-y-3 '}>
        <div className='flex flex-row justify-between items-center w-full'>
          <p className="text-[25px] font-semibold text-slate-300 tracking-wider mt-3">
            MÓDULO DE ADMINISTRADORES
          </p>
          <p className='text-[25px] text-slate-300'>{name2}</p>
        </div>
        <div className="overflow-y-scroll w-full h-[90%] custom-scroll">
          <table className="text-slate-300 w-full bg-zinc-400 bg-opacity-30 relative">
            <thead className={`h-[46px] ${bg1} sticky top-0 z-10`}>
              <tr>
                <th className="border border-slate-500 px-2">Id</th>
                <th className="border border-slate-500 px-0 text-center">Imagen</th>
                <th className="border border-slate-500">Referencia</th>
                <th className="border border-slate-500">Marca</th>
                <th className="border border-slate-500">Nombre</th>
                <th className="border border-slate-500">Tamaño</th>
                <th className="border border-slate-500">Imagen</th>
                <th className="border border-slate-500">Precio</th>
                <th className="border border-slate-500">Disponibilidad</th>
                <th className="border border-slate-500">Categoría</th>
                <th className="border border-slate-500">Acción</th>
              </tr>
            </thead>
            <tbody className="overflow-hidden scroll-me-48">
              {sortedDataBase.map(item => (
                <tr key={item.id} className="max-h-[46px]">
                  <td className="border border-slate-500 text-center">{item.id}</td>
                  <td className="border border-slate-500 text-center">
                    <div className="flex justify-center">
                      <img src={item.imagen} alt="Product Image" className="h-10 w-10 object-cover rounded-md" />
                    </div>
                  </td>
                  <td className="border border-slate-500 text-center">{item.ref}</td>
                  <td className="border border-slate-500 pl-4">{item.branch}</td>
                  <td className="border border-slate-500 pl-4">{item.name}</td>
                  <td className="border border-slate-500 pl-4">{item.size}</td>
                  <td className="border border-slate-500 pl-4">{item.imagen}</td>
                  <td className="border border-slate-500 text-center">{item.price}</td>
                  <td className="border border-slate-500 text-center">{item.availability}</td>
                  <td className="border border-slate-500 text-center">
                    {getCategoryName(item.category)}
                  </td>
                  <td className="border border-slate-500 h-[46px] gap-x-3 flex flex-row items-center justify-center ">
                    <button className="flex flex-row items-center justify-center w-8 h-8 rounded-md bg-red-600 text-white" onClick={() => handleDeleteButton(item.id)}>
                      <RiDeleteBin6Line />
                    </button>
                    <button className={`flex flex-row items-center justify-center w-8 h-8 rounded-md ${bg1} text-white`} onClick={() => handleEditCreateButton(item)}>
                      <RiEdit2Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='w-full flex flex-row items-center justify-between'>
          <button
            className={`${bg1}  bg-opacity-50 hover:bg-slate-300 hover:text-purple-900 rounded text-xl py-2 px-6 mb-3 text-slate-300 font-bold`}
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
          <button
            className={`${bg1}  bg-opacity-50 hover:bg-slate-300 hover:text-purple-900 rounded text-xl py-2 px-6 mb-3 text-slate-300 font-bold`}
            onClick={() => handleEditCreateButton()}
          >
            Crear Producto
          </button>
        </div>
      </div>
      }
    </div>
  )
}
