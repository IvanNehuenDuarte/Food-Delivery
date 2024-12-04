import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "El usuario no existe" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Contraseña incorrecta" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error al iniciar sesión" });
  }
};

// Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });

    // Exist user?
    if (exists) {
      return res.json({ success: false, message: "El usuario ya existe" });
    }

    // Validate email format and password strong
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Ingrese un email válido" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "La contraseña debe contener un mínimo de 8 carácteres.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error al registrar usuario" });
  }
};

export { loginUser, registerUser };
