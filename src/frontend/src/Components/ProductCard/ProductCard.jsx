import React, { Component } from 'react';
import style from './styles.css';
import { BsCart4 } from "react-icons/bs";


function ProductCard(props) {
  var product = props.product;

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
            <div class="wcf-right"><button  class="buy-btn"><BsCart4 size="28"/></button></div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ProductCard;