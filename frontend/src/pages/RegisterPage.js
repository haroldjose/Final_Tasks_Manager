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
        <div class="form-container">
            <h2 class="text">Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" class="form form-change" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" class="form form-change" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" class="form form-change" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button class="btn " type="submit">Registrarse</button>
            </form>
            <button class="btn " onClick={handleLogin}>Inicio sesion</button>
        </div>
    );
};

export default RegisterPage;