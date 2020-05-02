import React, {useEffect, useState} from 'react';
import styles from './Store.module.scss';
import ProductCard from "../ProductCard/ProductCard.lazy";
import Row from "react-bootstrap/Row";
import {useTranslation} from "react-i18next";
import ProductApi from "../../api/v1/Product";

export default function Store() {
  const {t} = useTranslation();
  const [productsList, setProductsList] = useState([]);
  const productApi = new ProductApi();

  const updateProductList = (newProduct) => {
    let products =  JSON.parse(JSON.stringify(productsList));
    setProductsList([]);
    let idxProduct = null;
    for(let idx in products) {
      if(products[idx].id === newProduct.id)
        idxProduct = idx;
    }
    products[idxProduct] = newProduct;
    setProductsList(products);
  }

  const successGetProducts = (response) => {
    console.log(response);
    if(response.status === 200){
      setProductsList(response.data);
    } else {
      console.error("Error with server communication...")
    }
  }

  const errorGetProducts = (response) => {
    console.error(response);
  }

  useEffect(() => {
    productApi.getProducts(successGetProducts, errorGetProducts);
  }, [])
  return(
    <div className={styles.Store} data-testid="Store" >
      <h2>{t('Store.title')}</h2>
      <hr/>
      <Row>
        {productsList.map((product, index) =>
          <ProductCard key={index} product={product} updateProductList={updateProductList}/>
        )}
        {productsList.length === 0 && <p>{t('Actions.messages.no_registers')}</p>}
      </Row>
    </div>
  );
}
