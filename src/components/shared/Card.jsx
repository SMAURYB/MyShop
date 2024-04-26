import { useTheme } from '../../context/ThemeContext';
import '../../App.css';

const Card = (props) => {
  const { 
    id, 
    img, 
    description, 
    price, 
    inventory, 
    setCarList, 
    carList, 
    selected, 
    setShowProductImage, 
    setSelectedImage, 
    searchList, 
    filteredList,
  } = props;

  const { bg2, bg3, bg4 } = useTheme();

  const handleCheckboxChange = () => {
    if (!selected) {
      const cantidad = 1;
      const valorTotal = price * 1;
      let elementToModify = searchList.find((e) => e.id === id)
      if (elementToModify) {
        elementToModify.checked = true
      }
      let elementToModify2 = filteredList.find((e) => e.id === id)
      if (elementToModify2) {
        elementToModify2.checked = true
      }
      // Agregar el elemento a la lista carList si no está checked
      setCarList([...carList, { id, img, description, price, cantidad, valorTotal, inventory }]);
    } else {
      let elementToModify = searchList.find((e) => e.id === id)
      if (elementToModify) {
        elementToModify.checked = false
      }
      let elementToModify2 = filteredList.find((e) => e.id === id)
      if (elementToModify2) {
        elementToModify2.checked = false
      }
      // Remover el elemento de la lista carList si está checked
      const updatedCarList = carList.filter(item => item.id !== id);
      setCarList(updatedCarList);
    }
  };

  const handleShowProductImage = () => {
    setShowProductImage(true);
    setSelectedImage(img);
  }

  return (
    <div className={`${selected ? `${bg3}` : `${bg2}` } max-w-[300px] min-w-[210px] h-[300px] py-8 rounded-xl flex flex-col items-center gap-2 text-center text-slate-100 shadow-lg border border-slate-400/20`}>
      <button
        onClick={handleShowProductImage}
        className="hover:scale-[102%] duration-75 ease-out  "
      >
        <img
          src={img}
          alt={description}
          className="w-[170px] h-[170px] object-cover max-w-full -mt-[85px] shadow-2xl rounded-full border border-slate-500"
        />
      </button>
  
      <p className="text-[20px] hover:text-[#fff] hover:scale-[101%]">{description}</p>
      <span className="text-[18px] text-slate-100  hover:text-slate-300 hover:scale-[101%]">${price}</span>
      <p className="text-[14px] text-slate-100  hover:text-slate-100 hover:scale-[101%]">{inventory} disponibles</p>
  
      <label className="text-[14px] text-slate-100 hover:text-slate-200 hover:scale-[101%]">
        <div className="flex items-center">
          <span className="mr-4">
            Meter al carrito
          </span>
          <input
            type="checkbox"
            checked={selected}
            onChange={handleCheckboxChange}
            className="appearance-none checked:bg-green-400 w-4 h-4 text-green-300 bg-gray-100 border-gray-300 rounded focus:ring-green-300 dark:focus:ring-green-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          {/* <span className="checkmark"></span> */}
        </div>
      </label>
    </div>
  );
};

export default Card;
