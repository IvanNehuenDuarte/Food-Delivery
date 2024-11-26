import "./Footer.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src="./images/whatafood-logo.svg" alt="" />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
              natus reiciendis, libero quis quod enim aperiam rem hic excepturi
              quidem animi eos autem delectus dolor, quo ratione laudantium
              voluptatibus sed.
            </p>
            <div className="footer-social-icons">
              <FaXTwitter />
              <FaLinkedinIn />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPAÑÍA</h2>
            <ul>
              <li>Inicio</li>
              <li>Sobre Nosotros</li>
              <li>Envío</li>
              <li>Política de privacidad</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>Ponte En Contacto</h2>
            <ul>
              <li>+54-123-456-7890</li>
              <li>contact@whatafood.com.ar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
