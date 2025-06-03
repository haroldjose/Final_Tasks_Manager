import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Error en login", error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
      navigate("/register");
  };

  return (
    <div class="container auth-form auth-container">
      <h2 class="h2">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" class="input"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <input type="password" class="input" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button class="button" type="submit">Ingresar</button>
      </form>
      <button class="button" onClick={handleRegister}>Registarse</button>
    </div>
    // <div className="login-container">
    //   <h2 className="login-title">Iniciar Sesión</h2>
    //   <form className="login-form" onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       className="login-input"
    //       placeholder="Correo electrónico"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       className="login-input"
    //       placeholder="Contraseña"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button className="login-button" type="submit">
    //       Ingresar
    //     </button>
    //   </form>
    //   <button className="login-secondary-button" onClick={handleRegister}>
    //     Registrarse
    //   </button>
    // </div>
  );
};

export default LoginPage;










































// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate("/");
//     } catch (error) {
//       console.error("Error en login", error);
//     }
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     navigate("/register");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-200">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-lg" />
//           <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-lg" />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Ingresar</button>
//         </form>
//         <button onClick={handleRegister} className="w-full text-blue-500 mt-4">Registrarse</button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
