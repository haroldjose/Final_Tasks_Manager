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
      <h2 class="text-md text-light mb-3">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" class="form-control mb-5 mt-2"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <input type="password" class="form-control mb-5" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button class="btn btn-primary w-100" type="submit">Ingresar</button>
      </form>
      <button class="btn btn-primary mt-5 w-100 " onClick={handleRegister}>Registarse</button>
    </div>
  );
};

export default LoginPage;