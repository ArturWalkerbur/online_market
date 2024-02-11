import React, { Component, useContext } from 'react';
import style from './styles.css';
import { BsCart4 } from "react-icons/bs";
import {CustomContext} from "../../utils/Context";

function ProductCard(props) {
  var product = props.product;

  const {addInCart, cart} = useContext(CustomContext)

  return (
    <div className="col-md-3">
      <div className="wsk-cp-product">
        <div className="wsk-cp-img">
          <img src={`http://localhost:8000/api/guest/viewImg/${product.img}`} alt="Product" className="img-responsive" />
        </div>
        <div className="wsk-cp-text">
          <div className="title-product">
            <h3>{product.name}</h3>
          </div>
          <div className="card-footer">
            <div className="wcf-left"><span className="price">{product.price}тг</span></div>
            {

              cart.findIndex(item => item.id == product.id) > -1 ? (
                <div className="wcf-right">Товар уже в корзине</div>
              ) : (
                <div className="wcf-right"><button type='button' onClick={()=> addInCart(product)} className="buy-btn"><BsCart4 size="28"/></button></div>
              )
              


            }
            
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ProductCard;