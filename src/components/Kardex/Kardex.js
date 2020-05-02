import React, {useContext, useEffect, useState} from 'react';
import styles from './Kardex.module.scss';
import {useTranslation} from "react-i18next";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProductApi from "../../api/v1/Product";
import {ContextApp} from "../../constants/constans";
import CurrencyFormat from 'react-currency-format';

export default function Kardex (props) {
  const {t} = useTranslation();
  const [show, setShow] = useState(props.show);
  const [product] = useState(props.product);
  const [kardexData, setKardexData] = useState([]);
  const productApi = new ProductApi();
  const context = useContext(ContextApp);

  const handleClose = () => {
    setShow(false);
    props.setShow(false);
  }

  useEffect(() => {
    productApi.getKardexProduct(product.id, (response) => {
      setKardexData(productApi.getDataKardex(response.data));
    }, (response) => {
      context.notificationService.error(t('Actions.messages.error'));
    })
  }, [])

  return(
    <div className={styles.Kardex} data-testid="Kardex">
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{t('Actions.viewing') + ": " + product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{t('Kardex.title')}</h2>
          <hr/>
          <Table striped bordered hover size="sm">
            <thead>
            <tr align="center">
              <th rowSpan="2">{t('Kardex.date')}</th>
              <th rowSpan="2">{t('Kardex.detail')}</th>
              <th colSpan="3">{t('Kardex.in')}</th>
              <th colSpan="3">{t('Kardex.out')}</th>
              <th colSpan="3">{t('Kardex.actual')}</th>
            </tr>
            <tr align="center">
              <th>{t('Kardex.count')}</th>
              <th>{t('Kardex.price')}</th>
              <th>{t('Kardex.total')}</th>
              <th>{t('Kardex.count')}</th>
              <th>{t('Kardex.price')}</th>
              <th>{t('Kardex.total')}</th>
              <th>{t('Kardex.count_total')}</th>
            </tr>
            </thead>
            <tbody>
            {kardexData.map((kardexItem, index) =>
              <tr align="center">
                <td>{kardexItem.date}</td>
                <td>{t(kardexItem.detail)}</td>
                <td>{kardexItem.count_in}</td>
                <td>{
                  (kardexItem.price_in !== '--')? (<CurrencyFormat value={kardexItem.price_in} displayType={'text'} thousandSeparator={true} prefix={'$'} />) : kardexItem.price_in}</td>
                <td>{(kardexItem.total_in !== '--')? (<CurrencyFormat value={kardexItem.total_in} displayType={'text'} thousandSeparator={true} prefix={'$'} />) : kardexItem.total_in}</td>
                <td>{kardexItem.count_out}</td>
                <td>{(kardexItem.price_out !== '--')? (<CurrencyFormat value={kardexItem.price_out} displayType={'text'} thousandSeparator={true} prefix={'$'} />) : kardexItem.price_out}</td>
                <td>{(kardexItem.total_out !== '--')? (<CurrencyFormat value={kardexItem.total_out} displayType={'text'} thousandSeparator={true} prefix={'$'} />) : kardexItem.total_out}</td>
                <td>{kardexItem.count_now}</td>
              </tr>
            )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            {t("Actions.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
