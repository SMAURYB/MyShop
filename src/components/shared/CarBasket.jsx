import { useState, useEffect } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const CarBasket = (props) => {
  const { id, productName, price, image, inventory, deleteItem, bg1, setShowConfirmZeroPopup, si, setSi } = props
  const [cantidad, setCantidad] = useState(1)

  const handleCantidadChange = (actionType) => {
    if (actionType === 'mas') {
      if (cantidad < inventory) {
        setCantidad(cantidad + 1)
      } else {
        alert('La cantidad excede el inventario disponible')
      }
    } else if (actionType === 'menos') {
      if (cantidad === 1) {
        setShowConfirmZeroPopup(true)
      } else {
        setCantidad(cantidad - 1)
      }
    }
  }

  const handleDeleteFromCarList = (id) => {
    deleteItem(id)
    setSi(false)
    setShowConfirmZeroPopup(false)
  }

  useEffect(() => {
    console.log('entró al useEffect')
    if (si) {
      handleDeleteFromCarList(id)
    }
  }, [si])

  console.log('id en CarBasket', id)

  return (
    <div className={`${bg1} relative p-3 rounded-xl mb-[10px] border border-slate-400/10 shadow-md`}>
      <div className="mb-[7px] gap-2 flex flex-row justify-between">
        {/* Product description */}
        <div className="flex items-center gap-3">
          <img src={image} className="w-16 h-16 object-cover rounded-full" alt={productName} />
          <div className='flex flex-col justify-start items-start'>
            <h2>{productName}</h2>
            <h3 className="text-zinc-200">$ {price}</h3>
          </div>
        </div>
        {/* Qty */}
        <div className='flex flex-col justify-center items-center gap-2'>
          {/* Price */}
          <div className='h-5 px-1 flex flex-row justify-center items-center'>
            <span>$ {props.producto.valorTotal}</span>
          </div>
          <div className='h-5 flex flex-row justify-center items-center gap-x-2 font-semibold'>
            <button
              onClick={() => handleCantidadChange('menos')}
              className="text-gray-400 font-bold text-2xl w-6 h-6 bg-[rgb(80, 80, 80)]/[15%] rounded-full flex items-center justify-center pb-2 transition duration-300 ease-in-out hover:bg-[#505050]/90 hover:border-[#545554]"
            >
            -
            </button>

            <span className='w-8 flex flex-row justify-center'>{cantidad}</span>
            <button
              onClick={() => handleCantidadChange('mas')}
              className="text-gray-400 font-bold text-2xl w-6 h-6 bg-[#505050]/[15%] rounded-full flex items-center justify-center pb-2 transition duration-300 ease-in-out hover:bg-[#505050]/90 hover:border-[#545554]"
            >
              +
            </button>
          </div>

        </div>
      </div>
      {/* Note */}
      <div className="flex flex-row justify-end items-center">

        <div className=''>
          <button
            onClick={() => handleDeleteFromCarList(id)}
            className="rounded-lg hover:scale-[105%]"
          >
            <RiDeleteBin6Line className="text-red-500 w-6 h-6 " />
          </button>
        </div>
        {/* <form className="col-span-5">
          <input
            type="text"
            className="bg-[#1F1D2B] py-2 px-4 rounded-lg outline-none"
            placeholder="Order note..."
          />
        </form> */}
      </div>
    </div>
  )
}

export default CarBasket
