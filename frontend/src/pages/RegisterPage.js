import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch (error) {
            console.error("Error en registro", error);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
          navigate("/login");
      };

    return (
        <div class="container auth-container auth-form">
            <h2 class="h2">Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" class="input" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" class="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" class="input" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button class="button" type="submit">Registrarse</button>
            </form>
            <button class="button" onClick={handleLogin}>Inicio sesion</button>
        </div>
    );
};

export default RegisterPage;













































// import { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// const RegisterPage = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         await API.post("/auth/register", { name, email, password });
//         navigate("/login");
//       } catch (error) {
//         console.error("Error en registro", error);
//       }
//     };
  
//     const handleLogin = (e) => {
//       e.preventDefault();
//       navigate("/login");
//     };
  
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-200">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//           <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-lg" />
//             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-lg" />
//             <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-lg" />
//             <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg">Registrarse</button>
//           </form>
//           <button onClick={handleLogin} className="w-full text-green-500 mt-4">Iniciar sesión</button>
//         </div>
//       </div>
//     );
//   };
  
//   export default RegisterPage;
  