import "./Add.css";
import { assets } from "../../assets/admin_assets/assets.js";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        // Vaciar el formulario
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);

        toast.success(response.data.message || "Producto agregado con éxito");
      } else {
        toast.error(
          response.data.message || "Hubo un problema al agregar el producto"
        );
      }
    } catch (error) {
      toast.error(
        "Error al agregar el producto. Por favor, inténtalo nuevamente."
      );
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="add">
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Subir Imagen</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
          />
        </div>
        <div className="add-product-name flex-col">
          Nombre del producto
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            required
            placeholder="Escribe un nombre"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Descripción</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Escribe una descripción"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Categoría</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Precio</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$3000"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Add;
