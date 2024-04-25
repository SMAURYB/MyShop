import { useState, useEffect } from "react";
import { db } from "../firebase.config"; 
import { collection, getDocs } from "firebase/firestore";

  export default function useDataBase() {
    const [dataBase, setDataBase] = useState([]);
    const categoryData = [
      { id: 1, name: 'Bebidas', category: '1' },
      { id: 2, name: 'Víveres', category: '2' },
      { id: 3, name: 'Aseo Personal', category: '3' },
      { id: 4, name: 'Aseo Hogar', category: '4' },
      { id: 5, name: 'Lacteos', category: '5' },
    ];

    const [selectedCategory, setSelectedCategory] = useState("1"); // Establece "Bebidas" como categoría por defecto

  useEffect(() => {
    // Función asincrónica para obtener los datos de la colección "productos" desde Firestore
    const fetchData = async () => {
      try {
        // Obtener referencia a la colección "productos" en Firestore
        const productosRef = collection(db, "productos");

        // Obtener los documentos de la colección "productos"
        const querySnapshot = await getDocs(productosRef);

        // Convertir los documentos a un array de datos y actualizar el estado con los datos obtenidos
        const productosData = querySnapshot.docs.map((doc) => doc.data());
        setDataBase(productosData);

        // Filtrar los datos de categorías para obtener solo las categorías únicas
        const uniqueCategories = [...new Set(productosData.map(item => item.category))];
        
        // Construir un arreglo de categorías con el formato esperado
        const formattedCategories = uniqueCategories.map((categoryId, index) => {
          const category = categoryData.find(cat => cat.category === categoryId);
          return category ? category : { id: index, name: 'Desconocida', category: categoryId };
        });

        // Actualizar el estado de las categorías
        setCategoryData(formattedCategories);
      } catch (error) {
        // Manejar errores
        console.error("Error al obtener la base de datos de productos:", error);
      }
    };

    // Llamar a la función para obtener los datos cuando el componente se monte
    fetchData();
  }, []); // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez al montar el componente

  return { dataBase, categoryData, selectedCategory, setSelectedCategory };
}

