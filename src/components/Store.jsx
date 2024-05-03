import { useState, useEffect } from 'react'
// import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useLocation } from 'react-router-dom'
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine
} from 'react-icons/ri'
import { MdOutlineCancel } from 'react-icons/md'
import Sidebar from './shared/Sidebar'
import Car from './shared/Car'
import Header from './shared/Header'
import Card from './shared/Card'
import useDataBase from '../hooks/useDataBase'

export default function Store () {
  // const authContext = useAuth()
  const location = useLocation()
  const { dataBase, categoryData, selectedCategory, setSelectedCategory } = useDataBase()
  const { bg1, bg2, bg3, bg4 } = useTheme()
  const [showMenu, setShowMenu] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const filteredList = dataBase.filter(item => item.category === selectedCategory)
  const [searchList, setSearchList] = useState([])
  const [carList, setCarList] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [matchingCount, setMatchingCount] = useState('')
  const [showProductImage, setShowProductImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  // const userName = authContext?.user?.email
  const name = location.state?.userName
  // const message = location.state?.message

  useEffect(() => {
    // Establecer la categoría por defecto como "Bebidas" al montar el componente
    setSelectedCategory('1')
  }, [])

  useEffect(() => {
    // Filtrar los productos por la categoría seleccionada
    const filteredData = dataBase.filter((item) => item.category === selectedCategory)
    setSearchList(filteredData)
  }, [selectedCategory])

  useEffect(() => {
    // Filtrar la lista de búsqueda cuando cambie el término de búsqueda
    const searchData = dataBase.filter((item) =>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    )
    setSearchList(searchData)
    setMatchingCount(searchData.length)
  }, [searchItem])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
    setShowOrder(false)
  }

  const toggleOrders = () => {
    setShowOrder(!showOrder)
    setShowMenu(false)
  }

  return (
    <div className={`${bg1}`}>
      {showProductImage && (
        <div className="z-40 flex items-center justify-center absolute w-full">
          <div className="relative">
            <button
              onClick={() => setShowProductImage(false)}
              className="w-6 h-6 absolute right-5 top-4"
            >
              <MdOutlineCancel className="w-8 h-8 fill-neutral-600" />
            </button>
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-[270px] h-[270px] object-cover shadow-2xl rounded-lg"
            />
          </div>
        </div>
      )}
      <div className={` ${showProductImage ? 'blur-lg opacity-5' : `relative z-20 ${bg1} w-full h-screen`}`}>
        <Sidebar
          showMenu={showMenu}
          name={name}
        />
        <Car
          showOrder={showOrder}
          setShowOrder={setShowOrder}
          carList={carList}
          setCarList={setCarList}
          filteredList={filteredList}
          searchList={searchList}
          bg1={bg1}
          bg2={bg2}
          bg3={bg3}
          bg4={bg4}
        />
        {/* Menu movil */}
        <nav className={'z-20 lg:hidden fixed w-full h-screen bottom-0 left-0 text-3xl text-gray-100 py-2 px-8 flex items-end justify-between rounded-tl-xl rounded-tr-xl'}>
          <button className="p-2">
            <RiUser3Line />
          </button>
          <button className="p-2">
            <RiAddLine />
          </button>
          <button onClick={toggleOrders} className="p-2">
            <RiPieChartLine />
          </button>
          <button onClick={toggleMenu} className="text-white p-2">
            {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
          </button>
        </nav>
        <main className={`lg:pl-32 lg:pr-96 pb-0 flex flex-col items-center justify-start ${bg1}`}>
          <div className="md:px-4 w-full h-auto">
            {/* Header */}
            <div className="position-fixed h-auto w-full">
              <Header
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSearchItem={setSearchItem}
                categoryData={categoryData}
                matchingCount={matchingCount}
                bg2={bg2}
                bg4={bg4}
                name={name}
              />
            </div>
            <div className="h-full pb-8 px-8 pt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-16 gap-y-[66px]">
              {/* Muestra las cards por categorias filtradas */}
              {
                searchItem
                  ? searchList.map((item) => (
                    <Card
                      key={item.id}
                      id={item.id}
                      img={item.imagen}
                      description={item.name}
                      price={item.price}
                      inventory={item.availability}
                      setCarList={setCarList}
                      carList={carList}
                      selected={item.checked}
                      setShowProductImage={setShowProductImage}
                      setSelectedImage={setSelectedImage}
                      filteredList={filteredList}
                      searchList={searchList}
                      bg3={bg3}
                      bg2={bg2}
                    />
                  ))
                  : filteredList.map((item) => (
                    <Card
                      key={item.id}
                      id={item.id}
                      img={item.imagen}
                      description={item.name}
                      price={item.price}
                      inventory={item.availability}
                      size={item.size}
                      setCarList={setCarList}
                      carList={carList}
                      selected={item.checked}
                      setShowProductImage={setShowProductImage}
                      setSelectedImage={setSelectedImage}
                      filteredList={filteredList}
                      searchList={searchList}
                      bg3={bg3}
                      bg2={bg2}
                    />
                  ))
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
