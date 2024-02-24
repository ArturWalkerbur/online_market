import React, { useState, useContext, useEffect } from 'react';
import {CustomContext} from "../../../utils/Context";

const AddCategoryForm = ({showAddToggle}) => {
  
  const { addCategory } = useContext(CustomContext);

  const [localItem, setLocalItem] = useState({
    id: 0,
    name: "",
    img: ""
  });

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
          <h2>Добавить новую категорию</h2>
          <button type="button" onClick={handleClick} className="btn btn-info mb-2">Закрыть</button>
        </div>
        <br />
        <form action="/edititem" method="post" encType="multipart/form-data" onSubmit={(e) => addCategory(e, localItem)}>
          <input type="hidden" name="itemid" id="itemid" value={localItem.id} />
          <div className="form-group">
            <label htmlFor="item_name">Название категории</label>
            <input type="text" className="form-control" id="item_name" name="name" defaultValue={localItem.name} onChange={handleChange} required/>
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

export default AddCategoryForm;