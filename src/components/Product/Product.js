import React, {useEffect, useState} from 'react';
import styles from './Product.module.scss';
import Table from "react-bootstrap/Table";
import {useTranslation} from "react-i18next";
import ProductApi from "../../api/v1/Product";
import ProductForm from "../ProductForm/ProductForm";
import CurrencyFormat from 'react-currency-format';
import ProductInventoryForm from "../ProductInventoryForm/ProductInventoryForm";
import Kardex from "../Kardex/Kardex";
import Button from "react-bootstrap/Button";

export default function Product() {
  const {t} = useTranslation();
  const [productsList, setProductsList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});

  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showFormEnterInventory, setShowFormEnterInventory] = useState(false);
  const [showKardexView, setShowKardexView] = useState(false);
  const productApi = new ProductApi();

  const updateProductInList = (newProduct) => {
    let products =  productsList;
    let idxProduct = null;
    for(let idx in products) {
      if(products[idx].id === newProduct.id)
        idxProduct = idx;
    }
    products[idxProduct] = newProduct;
    setProductsList(products);
  }

  const addProductInList = (newProduct) => {
    let products =  productsList;
    products.push(newProduct);
    setProductsList(products);
  }

  const productRows = productsList.map((product, index) =>
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.count}</td>
      <td><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
      <td>{product.active? t("Actions.messages.yes"):t("Actions.messages.no") }</td>
      <td className="m3">
        <Button variant="info" onClick={(e) => getProduct(e, product, processKardex)}>{t('Actions.view_kardex')}</Button>
        <Button variant="secondary" onClick={(e) => getProduct(e, product, processFormEnterToInventory)}>{t('Actions.enter_to_inventory')}</Button>
        <Button variant="warning" onClick={(e) => getProduct(e, product, processFormEdit)}>{t('Actions.edit')}</Button>
      </td>
    </tr>
  );

  const processFormEnterToInventory = (product) => {
    setCurrentProduct(product);
    setShowFormEnterInventory(true);
  }

  const processFormEdit = (product) => {
    setCurrentProduct(product);
    setShowFormEdit(true);
  }

  const processKardex = (product) => {
    setCurrentProduct(product);
    setShowKardexView(true);
  }

  const processFormCreate = (e) => {
    setCurrentProduct(null);
    setShowFormEdit(true);
  }

  const getProduct = (e, product, callback) => {
    productApi.getProductById(product.id,
      (response) => {
        callback(response.data);
      },
      (response) => {
        console.error("Error with server communication...")
      })
  }

  const successGetProducts = (response) => {
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

  return (
    <div className={styles.Product} data-testid="Product">
      <div style={{display: 'flex'}}>
        <h2>{t('Products.title')}</h2>
        <Button variant="primary" onClick={processFormCreate}>{t("Actions.create")}</Button>
      </div>
      <hr/>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th>{t('Products.id')}</th>
          <th>{t('Products.name')}</th>
          <th>{t('Products.description')}</th>
          <th>{t('Products.count')}</th>
          <th>{t('Products.price')}</th>
          <th>{t('Products.active')}</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </Table>
      {showFormEdit && <ProductForm addProductInList={addProductInList} product={currentProduct} show={showFormEdit} setShow={setShowFormEdit} updateProductInList={updateProductInList}/>}
      {showFormEnterInventory && <ProductInventoryForm product={currentProduct} show={showFormEnterInventory} setShow={setShowFormEnterInventory} updateProductInList={updateProductInList}/>}
      {showKardexView && <Kardex product={currentProduct} show={showKardexView} setShow={setShowKardexView} />}
    </div>
  );
}
