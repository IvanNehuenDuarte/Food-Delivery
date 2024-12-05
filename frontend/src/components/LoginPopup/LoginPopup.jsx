import { useContext, useState } from "react";
import "./LoginPopup.css";
import { RxCross1 } from "react-icons/rx";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Acceder");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;

    if (currState === "Acceder") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(`Error en la solicitud. Error: ${error}`);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <RxCross1 onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Acceder" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Nombre"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Correo"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Contraseña"
            required
          />
        </div>
        <button type="submit">
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
