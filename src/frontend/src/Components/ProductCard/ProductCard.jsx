import React, { Component, useContext } from 'react';
import style from './styles.css';
import { BsCart4 } from "react-icons/bs";
import {CustomContext} from "../../utils/Context";

function ProductCard(props) {
  var product = props.product;

  const {addInCart, cart} = useContext(CustomContext)

  return (
    <div class="col-md-3">
      <div class="wsk-cp-product">
        <div class="wsk-cp-img">
          <img src={`http://localhost:8000/api/guest/viewImg/${product.img}`} alt="Product" class="img-responsive" />
        </div>
        <div class="wsk-cp-text">
          <div class="title-product">
            <h3>{product.name}</h3>
          </div>
          <div class="card-footer">
            <div class="wcf-left"><span class="price">{product.price}тг</span></div>
            {

              cart.findIndex(item => item.id == product.id) > -1 ? (
                <div class="wcf-right">Товар уже в корзине</div>
              ) : (
                <div class="wcf-right"><button type='button' onClick={()=> addInCart(product)} class="buy-btn"><BsCart4 size="28"/></button></div>
              )
              


            }
            
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ProductCard;