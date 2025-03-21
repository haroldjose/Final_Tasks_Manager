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
    <div class="form-container">
      <h2 class="text">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" class="form"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <input type="password" class="form" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button class="btn btn-top" type="submit">Ingresar</button>
      </form>
      <button class="btn" onClick={handleRegister}>Registarse</button>
    </div>
  );
};

export default LoginPage;