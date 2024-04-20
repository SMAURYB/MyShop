import { useState, useEffect } from "react";
import { db } from "../firebase.config"; 
import { collection, getDocs } from "firebase/firestore";

function useDataBase() {
  const [dataBase, setDataBase] = useState([]);

  useEffect(() => {
    // Función para obtener la base de datos de productos desde Firestore
    const fetchData = async () => {
      try {
        // Obtener referencia a la colección "productos" en Firestore
        const productosRef = collection(db, "productos");

        // Obtener los documentos de la colección "productos"
        const querySnapshot = await getDocs(productosRef);

        // Convertir los documentos a un array de datos
        const productosData = querySnapshot.docs.map((doc) => doc.data());

        // Actualizar el estado con los datos obtenidos
        setDataBase(productosData);
      } catch (error) {
        console.error("Error al obtener la base de datos de productos:", error);
      }
    };

    // Llamar a la función para obtener los datos cuando el componente se monte
    fetchData();
  }, []); // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez al montar el componente

  return { dataBase };
}

export default useDataBase;
