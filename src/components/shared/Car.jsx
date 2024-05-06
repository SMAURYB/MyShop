import { useState, useEffect } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import CarBasket from './CarBasket'
import EmptyCarBasket from './EmptyCarBasket'
import '../../App.css'

const Car = (props) => {
  const {
    showOrder,
    setShowOrder,
    setShowConfirmZeroPopup,
    carList,
    si,
    setSi,
    setCarList,
    filteredList,
    searchList,
    bg1,
    bg2,
    bg3,
    bg4
  } = props

  const [totalCarrito, setTotalCarrito] = useState(0)
  const [itemsQty, setItemsQty] = useState(0)
  const navigate = useNavigate()

  const updateTotalCarrito = (cant, producto, index) => {
    let total = 0
    const lista = carList.map((item, i) => {
      if (i === index) {
        const valorTotalItem = item.price * cant
        total += valorTotalItem
        return {
          ...item,
          cantidad: cant,
          valorTotal: valorTotalItem
        }
      } else {
        total += (item.valorTotal)
        return item
      }
    })
    setCarList(lista)
    setTotalCarrito(total)
  }

  // Recorre el arreglo y suma los valores
  useEffect(() => {
    const productos = carList
    let sumaValorTotal = 0

    productos.forEach(producto => {
      sumaValorTotal += producto.valorTotal
    })

    setTotalCarrito(sumaValorTotal)
  }, [carList])

  // FUNCION PARA ELIMINAR UN ITEM DE carList CUANDO SE DA CLICK EN EL ICONO 'BASURERO o CUANDO
  // SE INTENTA COLOCAR LA CANTIDAD EN CERO Y SE CONFIRMA SU ELIMINACION EN EL POPUP
  const deleteItem = (id) => {
    const auxCarlist = [...carList]
    const elementToDeleteIndex = auxCarlist.findIndex((e) => e.id === id)
    if (elementToDeleteIndex > -1) {
      auxCarlist.splice(elementToDeleteIndex, 1)
    }
    setCarList(auxCarlist)
    const elementToModify = searchList.find((e) => e.id === id)
    if (elementToModify) {
      elementToModify.checked = false
    }

    const elementToModify2 = filteredList.find((e) => e.id === id)
    if (elementToModify2) {
      elementToModify2.checked = false
    }
  }

  useEffect(() => {
    const qty = carList.length
    setItemsQty(qty)
  }, [carList])

  // Efecto para actualizar el total cada vez que renderice
  useEffect(() => {
    updateTotalCarrito()
  }, [])

  return (
    <div
      className={`lg:col-span-2 fixed top-0 ${bg2} w-full lg:w-96 lg:right-0 h-full transition-all border border-slate-400/10 ${
        showOrder ? 'right-0' : '-right-full'
      }`}
    >
      {/* Orders */}
      <div className="relative pt-16 lg:pt-8 text-slate-300 p-8 h-full border border-slate-400/10">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className={`lg:hidden absolute left-4 top-4 p-3 box-content text-slate-300 ${bg1} rounded-full text-xl`}
        />
        <div className="">
          <div className="relative h-[420px] md:h-[700px] lg:h-[560px] overflow-scroll custom-scroll">
            {carList.length > 0
              ? carList.map((item, index) => (
                <CarBasket
                  key={item.id}
                  id={item.id}
                  si={si}
                  setSi={setSi}
                  productName={item.description}
                  setShowConfirmZeroPopup={setShowConfirmZeroPopup}
                  price={item.price}
                  image={item.img}
                  inventory={item.inventory}
                  updateTotalCarrito={(cant) => updateTotalCarrito(cant, item, index)}
                  producto={item}
                  setCarList={setCarList}
                  deleteItem={deleteItem}
                  bg1={bg1}
                />

              ))
              : (
                <>
                  <EmptyCarBasket key={1} /> {/* Asegúrate de agregar una clave única */}
                  <EmptyCarBasket key={2} /> {/* Asegúrate de agregar una clave única */}
                  <EmptyCarBasket key={3} /> {/* Asegúrate de agregar una clave única */}
                </>
              )
            }

          </div>
        </div>
        {/* Submit payment */}
        <div className={`${bg3} absolute w-full bottom-0 left-0 p-4 border border-slate-400/10`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#fff]">Productos seleccionados: </span>
            <span>{itemsQty}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-[#fff]">Subtotal</span>
            <span>$ {totalCarrito}</span>
          </div>
          <div>
            <button
              className={`${bg4} w-full py-2 px-4 rounded-lg text-[#fff] font-bold`}
              onClick={() => navigate('/payment')}
            >
              Continuar con el pago
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Car
