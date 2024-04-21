import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { GrFormClose } from 'react-icons/gr';
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase.config"; 
import useThemes from '../hooks/useThemes';
import { doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

const Profile = () => {
  const { uid } = useAuth();
  const location = useLocation();
  const message = location.state?.message;
  const userPassword = location.state?.user?.password;
  const userEmail = location.state?.user?.email;
  const { bg2, bg3 } = useThemes();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    address: '',
    email: userEmail,
    password: userPassword
  });
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = doc(db, "usuarios", v4()); 
      await setDoc(docRef, {
        nombre: formData.username,
        direccion: formData.address,
        correo: formData.email,
        password: formData.password,
        telefono: formData.phone,
        uid: uid
      });
      navigate("/dashboard", { state: { message: 'Bienvenido a tu tienda Online', submessage: 'Deseas editar tu perfil?'} });
    } catch (error) {
      console.error("Error al enviar los datos del usuario a Firestore:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={`${bg2} flex flex-row items-center justify-center w-full h-screen`}>
      <div className={`relative ${bg3} w-[400px] flex flex-col justify-between py-10 px-8 mt-[50px] rounded-xl`}>
        <button 
          className="absolute -right-1 -top-1 w-5 h-5 cursor-pointer rounded-full bg-[#e6ebf5] flex flex-row items-center justify-center"
          onClick={() => navigate(-2)}
        >
          <GrFormClose size={18} />
        </button>
        <form onSubmit={onSubmit}>
          <p className="mb-8 text-[22px] text-slate-300 font-medium text-center">{message}</p>
          <div className="mb-2">
            <label htmlFor="nombre" className="block text-white mb-1">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-100 text-slate-800 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="telefono" className="block text-white mb-1">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-100 text-slate-800 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="direccion" className="block text-white mb-1">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-gray-100 text-slate-800 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-white mb-1">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 text-slate-800 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-white mb-1">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-100 text-slate-800 p-2 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-row gap-x-4 justify-between">
            <button
              type="button"
              onClick={() => navigate("/dashboard", { state: { message: 'Bienvenido a su tienda Online' } })}
              className="bg-[#ec7c6a] text-white rounded-lg p-2 w-full mt-10"
            >
              Saltar este paso
            </button>
            <button
              type="submit"
              className="bg-[#ec7c6a] text-white rounded-lg p-2 w-full mt-10"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
