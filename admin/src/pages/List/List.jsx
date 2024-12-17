import { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    try {
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();

    try {
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="list add flex-col">
      <p>Lista De Comida</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Imagen</b>
          <b>Nombre</b>
          <b>Categoría</b>
          <b>Precio</b>
          <b>Acción</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
