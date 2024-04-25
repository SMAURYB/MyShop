import { useState } from "react";
import { db } from "../firebase.config"; 
import { collection, getDocs } from "firebase/firestore";

function useUsers() {
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState({
        correo: "",
        direccion: "",
        nombre: "",
        password: "",
        telefono: "",
        uid: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserDataByEmail = async (userMail) => {
    //   console.log("entré a getUserDataByEmail")
        setLoading(true);
        setError(null);
        try {
            const userCollectionRef = collection(db, "usuarios");
            const userSnapshot = await getDocs(userCollectionRef);
            const userDataArray = userSnapshot.docs.map(doc => doc.data());
            // console.log("todos los users", userDataArray)
            const currentUserData = userDataArray.find(user => user?.correo === userMail);
            // console.log("currentUserData", currentUserData)
            if (currentUserData) {
                setUserData(currentUserData);
                setUserName(currentUserData.nombre);
            } else {
                setError("No se encontraron datos para el usuario con el correo electrónico proporcionado.");
            }
        } catch (error) {
            setError("Error al obtener los datos del usuario de Firestore: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        getUserDataByEmail,
        userName,
        userData,
        loading,
        error
    };
}

export default useUsers;
