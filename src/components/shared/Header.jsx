import { RiSearch2Line } from "react-icons/ri";
import { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import useDataBase from '../../hooks/useDataBase';

const Header = (props) => {
  const { selectedCategory, setSelectedCategory, setSearchItem, matchingCount, bg2, bg4, name } = props;
  const [searchText, setSearchText] = useState(''); // Agregado estado para el texto de búsqueda
  const { categoryData } = useDataBase()

  const hoy = new Date().toLocaleDateString();
  const authContext = useAuth()
  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchItem(inputValue);
    setSearchText(inputValue); // Actualiza el estado del texto de búsqueda
    // Puedes realizar más acciones con el valor del input si es necesario
  };

  return (
    <header>
      {/* Title and search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 ">
        <div>
          <h1 className="text-2xl text-[#f4f9fa] opacity-90">Tienda Virtual</h1>
          <p className="text-[#f4f9fa] opacity-80">Fecha: {hoy}</p>
        </div>
        <div className="flex flex-col items-start justify-center mt-3 pt-3 h-[50px]">
          <form >
            <div className="w-full relative flex flex-row items-center justify-between ">
              <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f4f9fa]" />
              <input
                onChange={handleSearch}
                value={searchText}
                type="text"
                className={`${bg2} w-full py-2 pl-10 pr-4 rounded-lg text-[#f4f9fa] outline-none border border-slate-400/10`}
                placeholder="Buscar"
              />
            </div>
          </form>
          <div className='w-full h-7 mt-2 font-sans tracking-widest text-[#f4f9fa]'>
            <p>{name}</p>
          </div>
        </div>
      </div>
      {/* Tabs */}
        {searchText ?
          <nav className='text-slate-100 flex items-center justify-between md:justify-start md:gap-8 border-b mb-6 '>
            <p className='py-2 pr-4'>
              {`Búsqueda por palabra '${searchText}', entrega '${matchingCount}' resultados`}
            </p>
          </nav>
        :
          <nav className='text-slate-100 flex items-center justify-between md:justify-start md:gap-8 border-b mb-3'>
            {categoryData.map(item => (
              <button
                key={item.id}
                className={`py-2 pr-4 ${selectedCategory === item.category ? `relative before:w-1/2 before:h-[2px] before:absolute before:${bg4} before:left-0 before:rounded-full before:-bottom-[1px] text-[#ec7c6a]` : ''}`}
                onClick={() => setSelectedCategory(item.category)}
              >
                {item.name}
              </button>
            ))}
          </nav>
        }
    </header>
  );
};

export default Header;
