import { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CarBasket from "./CarBasket";
import '../../App.css';

const Car = (props) => {
  const { 
    showOrder, 
    setShowOrder, 
    carList, 
    setCarList,
    filteredList,
    searchList,
    bg1,
    bg2,
    bg4
  } = props;

  const [totalCarrito, setTotalCarrito] = useState(0);
  const navigate = useNavigate();

  const updateTotalCarrito = (cant, producto, index) => {
    let total = 0;
    const lista = carList.map((item, i) => {
      if (i === index) {
        const valorTotalItem = item.price * cant;
        total += valorTotalItem;
        return {
          ...item,
          cantidad: cant,
          valorTotal: valorTotalItem
        };
      } else {
        total += (item.valorTotal);
        return item;
      }
    });

    setCarList(lista);
    setTotalCarrito(total);
  };

  // Recorre el arreglo y suma los valores
  useEffect(() => {
    const productos = carList;
    let sumaValorTotal = 0;
  
    productos.forEach(producto => {
      sumaValorTotal += producto.valorTotal;
    });
  
    setTotalCarrito(sumaValorTotal);
  }, [carList]);

  // FUNCION PARA ELIMINAR UN ITEM DE carList CUANDO SE DA CLICK EN EL ICONO 'BASURERO'
  const deleteItem = (id) => {
      const auxCarlist = [...carList]
      const elemetToDeleteIndex = auxCarlist.findIndex((e) => e.id === id)
      if (elemetToDeleteIndex > -1) {
        auxCarlist.splice(elemetToDeleteIndex, 1)
      }
      setCarList(auxCarlist)
      let elementToModify = searchList.find((e) => e.id === id)
      if (elementToModify) {
        elementToModify.checked = false
      }

      let elementToModify2 = filteredList.find((e) => e.id === id)
      if (elementToModify2) {
        elementToModify2.checked = false
      }

    // const updatedCarList = carList.filter((_, i) => i.id !== id);
    // setCarList(updatedCarList);
    // // Desmarcar el elemento correspondiente en filteredList
    // setFilteredList(updatedFilteredList);
    // // unSelectCheckbox(index);
  };

  // Efecto para actualizar el total cada vez que renderice
  useEffect(() => {
    updateTotalCarrito();
  }, []);

  return (
    <div
      className={`lg:col-span-2 fixed top-0 ${bg2} w-full lg:w-96 lg:right-0 h-full transition-all z-50 ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      {/* Orders */}
      <div className="relative pt-16 lg:pt-8 text-gray-300 p-8 h-full">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className={`lg:hidden absolute left-4 top-4 p-3 box-content text-gray-300 ${bg1} rounded-full text-xl`}
        />
        {/* <h1 className="text-2xl my-4">Orders #151416</h1> */}
        {/* Pills */}
        {/* <div className="flex items-center gap-4 flex-wrap mb-8">
          <button className={`${bg4} text-white py-2 px-4 rounded-xl`}>
            Dine In
          </button>
          <button className="text-[#ec7c6a] py-2 px-4 rounded-xl border border-gray-500">
            To Go
          </button>
          <button className="text-[#ec7c6a] py-2 px-4 rounded-xl border border-gray-500">
            Delivery
          </button>
        </div> */}
        {/* Car */}
        <div>
          <div className="grid grid-cols-6 mb-4 p-4">
            <h5 className="col-span-4">Item</h5>
            <h5>Cantidad</h5>
            <h5>{carList?.price}</h5>
          </div>
          {/* Products */}
          <div className="h-[420px] md:h-[700px] lg:h-[540px] overflow-scroll custom-scroll">
          {carList.map((item, index) => (
            <CarBasket 
              key={item.id}  // Asegúrate de agregar esta línea
              id={item.id}
              productName={item.description}
              price={item.price}
              image={item.img}
              inventory={item.inventory}
              updateTotalCarrito={(cant) => updateTotalCarrito(cant, item, index)}
              producto={item}
              index={index} // Pasa el índice al componente CarBasket
              setCarList={setCarList}
              deleteItem={() => deleteItem(item.id)}  // Agrega esta línea
              bg1={bg1}
              // deleteItemFromCar={() => deleteItemFromCar(index)}
            />
          ))}
        </div>
        </div>
        {/* Submit payment */}
        <div className={`${bg1} absolute w-full bottom-0 left-0 p-4`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Productos seleccionados: </span>
            <span>10</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-400">Subtotal</span>
            <span>$ {totalCarrito}</span>
          </div>
          <div>
            <button 
              className={`${bg4} w-full py-2 px-4 rounded-lg text-[#fefff9]`}
              onClick={() => navigate("/payment")}
            >
              Continuar con el pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
