import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { RxCross1 } from "react-icons/rx";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Acceder");

  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <RxCross1 onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Acceder" ? (
            <></>
          ) : (
            <input type="text" placeholder="Nombre" required />
          )}
          <input type="email" placeholder="Correo" required />
          <input type="password" placeholder="Contraseña" required />
        </div>
        <button>
          {currState === "Inscribirse" ? "Crear Cuenta" : "Acceder"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            Al continuar, acepto los términos de uso y política de privacidad.
          </p>
        </div>
        {currState === "Acceder" ? (
          <p>
            ¿Crear nueva cuenta?{" "}
            <span onClick={() => setCurrState("Inscribirse")}>Toque Aqui</span>
          </p>
        ) : (
          <p>
            ¿Tienes una cuenta?{" "}
            <span onClick={() => setCurrState("Acceder")}>Acceder</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
