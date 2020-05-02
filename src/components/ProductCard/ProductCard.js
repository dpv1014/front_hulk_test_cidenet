import React, {useContext, useState} from 'react';
import styles from './ProductCard.module.scss';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useTranslation} from "react-i18next";
import Form from "react-bootstrap/Form";
import ProductApi from "../../api/v1/Product";
import {} from 'react-notifications';
import {ContextApp} from "../../constants/constans";
import CurrencyFormat from 'react-currency-format';

export default function ProductCard (props){
  const {t} = useTranslation();
  const context = useContext(ContextApp);
  const [product] = useState(props.product);
  const [inventoryToSell, setInventoryToSell] = useState('');
  const productApi = new ProductApi();

  const successSellProduct = (response) => {
    props.updateProductList(response.data);
    context.notificationService.success(t('Actions.messages.save_ok'));
  }

  const errorSellProduct = (response) => {
    context.notificationService.error(t('Actions.messages.error'));
  }

  const sendForm = (e) => {
    e.preventDefault();
    if(inventoryToSell > 0) {
      let productInventory = {
        count: inventoryToSell,
        price: product.price,
        total: inventoryToSell * product.price
      }
      productApi.sellProduct(product.id, productInventory, successSellProduct, errorSellProduct);
    } else {
      context.notificationService.error(t('ProductCard.not_count_to_sent_selected'));
    }
  }

  const controlKeyPress = (e) => {
    let count = e.target.value;
    if((count === '' || /^[0-9\b]+$/.test(count)) && count <= product.count) {
      setInventoryToSell(count);
    }
  }

  return(
    <div className={styles.ProductCard} data-testid="ProductCard">
      <Col className="ColCard" style={{ 'max-width': '300px', 'min-width': '300px', height: '450px'}}>
        <Card >
          <Card.Img variant="top" src={product.imageUrl} style={{width: '100%', height: '250px'}} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            <hr/>
            {product.count > 0 && product.active &&
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      onChange={controlKeyPress}
                      type="number"
                      min="1"
                      max={product.count}
                      placeholder={t('ProductCard.count')}
                      value={inventoryToSell}/>
                    <Form.Text className="text-muted">
                      {product.count} {t('ProductCard.in_inventory')} - <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> c.u
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Button type="submit" onClick={sendForm} variant="success">{t('ProductCard.sell')}</Button>
                </Col>
              </Row>
              <Row>
                <Col align="right">
                  {t('Actions.total')}: <CurrencyFormat value={inventoryToSell * product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </Col>
              </Row>
            </Form>
            }
            { product.count === 0 &&
            <div>
              {t('ProductCard.no_inventory')}
              <br/>
              <br/>
              <br/>
            </div>
            }

            { !product.active &&
            <div>
              {t('ProductCard.no_active')}
              <br/>
              <br/>
              <br/>
            </div>
            }

          </Card.Body>
        </Card>
      </Col>
    </div>
  )
}
