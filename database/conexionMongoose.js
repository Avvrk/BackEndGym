import mongoose from "mongoose";

const dbConexion = async () => {
    try {
        await mongoose.connect(process.env.CONEXIONMONGO);
        console.log("Conexión a base de datos establecida :D");
    } catch (error) {
        console.log(error);
        console.log("Error al conectar la base de datos -_-");
    }
};

export default dbConexion;
