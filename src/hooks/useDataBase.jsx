import { useState, useEffect } from "react";
import { db } from "../firebase.config"; 
import { collection, getDocs } from "firebase/firestore";

export function useDataBase() {
  const [dataBase, setDataBase] = useState([]);
  const categoryData = [
    { id: 1, name: 'Bebidas', category: '1' },
    { id: 2, name: 'Víveres', category: '2' },
    { id: 3, name: 'Aseo Personal', category: '3' },
    { id: 4, name: 'Aseo Hogar', category: '4' },
    { id: 5, name: 'Lacteos', category: '5' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosRef = collection(db, "productos");
        const querySnapshot = await getDocs(productosRef);
        const productosData = querySnapshot.docs.map((doc) => doc.data());
        setDataBase(productosData);
      } catch (error) {
        console.error("Error al obtener la base de datos de productos:", error);
      }
    };

    fetchData();
  }, []);

  return { dataBase, categoryData };
}
