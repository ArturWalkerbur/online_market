import React, { useState, useContext, useEffect } from 'react';
import {CustomContext} from "../../../utils/Context";

const AddItemForm = ({showAddToggle}) => {
  
  const { dataCatalog, addProduct } = useContext(CustomContext);

  const [localItem, setLocalItem] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    img: "", 
    availability: true,
    category_id: 0
  });
  const [availability, setAvailability] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClick = () => {
    showAddToggle();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result.split(',')[1];
          setLocalItem({ ...localItem, img: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (

    <div className="row mt-5">
      <div className="col-6 offset-3">
        <div className="second-menu">
          <h2>Добавить новый товар</h2>
          <button type="button" onClick={handleClick} className="btn btn-info mb-2">Закрыть</button>
        </div>
        <br />
        <form action="/edititem" method="post" encType="multipart/form-data" onSubmit={(e) => addProduct(e, localItem)}>
          <input type="hidden" name="itemid" id="itemid" value={localItem.id} />
          <div className="form-group">
            <label htmlFor="item_name">Название товара</label>
            <input type="text" className="form-control" id="item_name" name="name" defaultValue={localItem.name} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="description" defaultValue={localItem.description} onChange={handleChange} required></textarea>
          </div>

          <div className="form-group">
            <label>В наличии</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="true" 
              id="defaultCheck1" name="availability" checked={availability === true} 
              onChange={(e) => {setAvailability(true); handleChange(e);}} />
              <label className="form-check-label" htmlFor="defaultCheck1">Да</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="false" 
              id="defaultCheck2" name="availability" checked={availability === false} 
              onChange={(e) => {setAvailability(false); handleChange(e);}} />
              <label className="form-check-label" htmlFor="defaultCheck2">Нет</label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Категории</label>
            <select className="form-control" id="category" name="category_id" onChange={handleChange} required>
              <option disabled value=""> -- Выберите категорию -- </option>
              {dataCatalog.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Цена</label>
            <input type="number" className="form-control" id="price" name="price" defaultValue={localItem.price} onChange={handleChange} required/>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="item_img">Добавить изображение</label><br />
            <input type="file" className="form-control-file" id="item_img" name="img" onChange={handleImageChange} required/>
          </div>
          <br />
          <button type="submit" className="btn btn-success mb-2">Добавить</button>
        </form>
      </div>
    </div>

  );
 
};

export default AddItemForm;