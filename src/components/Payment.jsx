import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

export default function Payment() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    
     
      <div className="flex flex-col items-center justify-start mt-[300px] bg-white w-[750px] h-[340px] rounded-3xl shadow-md gap-y-20 py-20">
        <p className="text-[60px] font-bold text-red-900">
          MÓDULO DE PAGOS
        </p>
        <button
          className="bg-blue-500 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </div>
   
  );
}