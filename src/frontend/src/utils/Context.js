import {createContext, useEffect, useState} from "react";

export const CustomContext = createContext()

export const Context = (props) => {


	const [data, setData] = useState(null);
	const [dataCatalog, setDataCatalog] = useState(null);
	const [cart, setCart] = useState([]);


	useEffect(() => {
	    fetch('http://localhost:8000/api/guest/getAllProducts')
	      .then(response => response.json()) 
	      .then(result => setData(result)) 
	      .catch(error => console.error('Error fetching data:', error));
  	}, []);


	useEffect(() => {
	    fetch('http://localhost:8000/api/guest/getAllCategory')
	      .then(response => response.json()) 
	      .then(result => setDataCatalog(result)) 
	      .catch(error => console.error('Error fetching data:', error));

	}, []);


  	console.log(data);
  	console.log(dataCatalog);


	const addInCart = (product) => {

		if(cart.includes(product)){
			// Ничего не делаем, так как продукт уже в корзине
		} else {
			setCart(prev => [...prev, product]);	
		}

	}


  	




	const value = {

		data,
		dataCatalog,
		cart,
		addInCart

	}

	return <CustomContext.Provider value={value}>

		{props.children}

	</CustomContext.Provider>


}

