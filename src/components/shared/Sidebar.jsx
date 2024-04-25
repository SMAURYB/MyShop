import { useState } from 'react';
import ColorThemes from './ColorThemes';
import { useTheme } from '../../context/ThemeContext';

import {
  RiHome6Line,
  RiUserLine,
  RiPieChartLine,
  RiMailLine,
  RiAdminLine,
  RiSettings4Line,
  RiLogoutCircleRLine,
} from 'react-icons/ri';
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
  const { 
    showMenu,
    name
  } = props;
  const [showColorOptions, setShowColorOptions] = useState(false);
  const navigate = useNavigate();
  const { bg1, bg2, bg4 } = useTheme();
  const handleDashboardClick = () => {
    navigate('/dashboard', {
      state: {
        message: 'Hasta pronto.... gracias por confiar en nosotros',
      },
    });
  };

  const handlerColorOptions = () => {
    setShowColorOptions(!showColorOptions);
  };

  const hoverBg1 = `hover:${bg1}`;

  return (
    <div
      className={`${bg2} fixed lg:left-0 top-0 w-28 h-screen flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${
        showMenu ? 'left-0' : '-left-full'
      }`}
    >
      <div>
        <ul className="pl-4">
          <li className="mb-2 flex justify-center text-[#fff]">
            <TiShoppingCart className="w-[60px] h-[60px] opacity-70" />
          </li>
          <li className={`${bg2} p-4 rounded-tl-xl rounded-bl-xl group transition-colors`}>
            <button
              onClick={() => navigate("/dashboard")}
              className={`group-hover:${bg4} p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors`}
            >
              <RiHome6Line className="text-2xl" />
            </button>
          </li>
          <li className={`${hoverBg1} p-4 rounded-tl-xl rounded-bl-xl group transition-colors`}>
            <button
              onClick={() => navigate("/profile")}
              className={`group-hover:${bg4} p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors`}
            >
              <RiUserLine className="text-2xl" />
            </button>
          </li>
          <li className={`hover:${bg1} p-4 rounded-tl-xl rounded-bl-xl group transition-colors`}>
            <a
              href="#"
              className={`group-hover:${bg4} p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors`}
            >
              <RiPieChartLine className="text-2xl" />
            </a>
          </li>
          <li className={`hover:${bg1} p-4 rounded-tl-xl rounded-bl-xl group transition-colors`}>
            <a
              href="#"
              className={`group-hover:${bg4} p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors`}
            >
              <RiMailLine className="text-2xl" />
            </a>
          </li>
          <li className={`hover:${bg1} p-4 rounded-tl-xl rounded-bl-xl group transition-colors`}>
              <button
                  onClick={() => navigate("/admin", { state:{ name: name }})}
                  className={`group-hover:${bg4} p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors`}
              >
                  <RiAdminLine className="text-2xl" />
              </button>
          </li>
          <li className={`relative hover:${bg1} p-4 rounded-tl-xl rounded-bl-xl group transition-colors`}>
            {/* Botón para navegar a /dashboard */}
            <button
              onClick={handlerColorOptions}
              className={`group-hover:${bg4} p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors`}
            >
              <RiSettings4Line className="text-2xl" />
            </button>
            { showColorOptions && 
              <div className={`absolute -top-[3px] -right-[110px] group-hover:${bg1} rounded-r-xl`}>
                <ColorThemes 
                />
              </div>}
          </li>
        </ul>
      </div>
      <div>
        <ul className="pl-4">
          <li className={`hover:${bg1} p-4 rounded-tl-xl rounded-bl-xl group transition-colors`}>
            {/* Botón para navegar a /dashboard */}
            <button
              onClick={handleDashboardClick}
              className={`group-hover:${bg4} p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors`}
            >
              <RiLogoutCircleRLine className="text-2xl" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;