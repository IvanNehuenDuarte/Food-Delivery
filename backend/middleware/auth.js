import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Obtén el token del encabezado "Authorization" o "token"
  const token = req.headers.token;

  if (!token) {
    return res.json({
      success: false,
      message: "No Autorizado, Accede Nuevamente",
    });
  }

  try {
    // Verifica el token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Agrega el ID de usuario decodificado al cuerpo de la solicitud
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("Error al verificar el token:", error);
    res.json({ success: false, message: "Token inválido o expirado" });
  }
};

export default authMiddleware;
