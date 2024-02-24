import React, { useState, useContext, useEffect } from 'react';
import {CustomContext} from "../../../utils/Context";

const EditCategoryForm = ({ item }) => {
  
  const { editCategory } = useContext(CustomContext);

  const [localItem, setLocalItem] = useState({ ...item });

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
        <form action="/edititem" method="post" encType="multipart/form-data" onSubmit={(e) => editCategory(e, localItem)}>
          <input type="hidden" name="itemid" id="itemid" value={localItem.id} />
          <div className="form-group">
            <label htmlFor="item_name">Название категории</label>
            <input type="text" className="form-control" id="item_name" name="name" defaultValue={localItem.name} onChange={handleChange}/>
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

export default EditCategoryForm;
