import React, { useState, useContext, useEffect } from 'react';
import {CustomContext} from "../../../utils/Context";

const EditItemForm = ({ item }) => {
  
  const { dataCatalog, editProduct } = useContext(CustomContext);

  const [localItem, setLocalItem] = useState({ ...item });
  const [availability, setAvailability] = useState(item.availability);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalItem(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(localItem);
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
    {localItem ? (
      <div className="col-6 offset-3">
        <form action="/edititem" method="post" encType="multipart/form-data" onSubmit={(e) => editProduct(e, localItem)}>
          <input type="hidden" name="itemid" id="itemid" value={localItem.id} />
          <div className="form-group">
            <label htmlFor="item_name">Название товара</label>
            <input type="text" className="form-control" id="item_name" name="name" defaultValue={localItem.name} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="description" defaultValue={localItem.description} onChange={handleChange}></textarea>
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
            <select className="form-control" id="category" name="category_id" defaultValue={localItem.category.id} onChange={handleChange}>
              <option disabled value=""> -- Выберите категорию -- </option>
              {dataCatalog.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Цена</label>
            <input type="number" className="form-control" id="price" name="price" defaultValue={localItem.price} onChange={handleChange}/>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="item_img">Изменить изображение</label><br />
            <input type="file" className="form-control-file" id="item_img" name="img" onChange={handleImageChange}/>
          </div>
          <br />
          <button type="submit" className="btn btn-success mb-2">Изменить</button>
        </form>
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

  );
 
};

export default EditItemForm;
