import axios from 'axios';
import {PRODUCT_INVENTORY_ENTRY_TYPE} from "../../constants/constans";

//Singleton Class
export default class ProductApi {

  static instance;

  constructor() {
    if(this.instance){
      return this.instance;
    }
    this.END_POINT = process.env.REACT_APP_API_ENDPOINT;
  }

  getProducts = (successCallback, errorCallback) => {
    axios.get(`${this.END_POINT}/api/v1/products`).then(successCallback).catch(errorCallback);
  }

  getProductById = (productId, successCallback, errorCallback) => {
    axios.get(`${this.END_POINT}/api/v1/products/${productId}`).then(successCallback).catch(errorCallback);
  }

  createProduct = (newProduct, successCallback, errorCallback) => {
    axios.post(`${this.END_POINT}/api/v1/products/`, newProduct)
      .then(successCallback)
      .catch(errorCallback);
  }

  updateProduct = (newProduct, successCallback, errorCallback) => {
    axios.put(`${this.END_POINT}/api/v1/products/${newProduct.id}`, newProduct)
      .then(successCallback)
      .catch(errorCallback);
  }

  enterInvetory = (productId, productInventory, successCallback, errorCallback)=> {
    axios.post(`${this.END_POINT}/api/v1/products/${productId}/purchase_product`, productInventory)
      .then(successCallback)
      .catch(errorCallback);
  }

  sellProduct = (productId, productInventory, successCallback, errorCallback) => {
    axios.post(`${this.END_POINT}/api/v1/products/${productId}/sell_product`, productInventory).then(successCallback).catch(errorCallback);
  }

  getKardexProduct = (productId, successCallback, errorCallback) => {
    axios.get(`${this.END_POINT}/api/v1/products/${productId}/kardex`).then(successCallback).catch(errorCallback);
  }

  getDataKardex = (data) => {
    let newData = [];
    let count_now = 0;
    for(let i in data) {
      let d = data[i];
      let kardex = {
        date: new Date(d[0]).toDateString(),
        detail: "",
        count_in: "--",
        price_in: "--",
        total_in: "--",
        count_out: "--",
        price_out: "--",
        total_out: "--",
        count_now: "--",
      }
      if(d[1] == PRODUCT_INVENTORY_ENTRY_TYPE) {
        kardex.detail = "Kardex.inventory_entry";
        kardex.count_in = d[2];
        kardex.price_in = d[4];
        kardex.total_in = kardex.count_in * kardex.price_in;
        count_now += kardex.count_in;
      } else {
        kardex.detail = "Kardex.inventory_release";
        kardex.count_out = d[2];
        kardex.price_out = d[4];
        kardex.total_out = kardex.count_out * kardex.price_out;
        count_now -= kardex.count_out;
      }
      kardex.count_now = count_now;
      newData.push(kardex);
    }

      newData.push({
        date: new Date().toDateString(),
        detail: "Kardex.inventory_final_balance",
        count_in: "--",
        price_in: "--",
        total_in: "--",
        count_out: "--",
        price_out: "--",
        total_out: "--",
        count_now: count_now,
      });

    return newData;
  }

}