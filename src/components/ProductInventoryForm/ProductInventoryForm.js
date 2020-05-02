import React, {useContext, useRef, useState} from 'react';
import styles from './ProductInventoryForm.module.scss';
import {useTranslation} from "react-i18next";
import {ContextApp} from "../../constants/constans";
import ProductApi from "../../api/v1/Product";
import Modal from "react-bootstrap/Modal";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const yup = require('yup')

export default function ProductInventoryForm(props) {
  const {t} = useTranslation();
  const [show, setShow] = useState(props.show);
  const [product] = useState(props.product);
  const context = useContext(ContextApp);
  const formRef = useRef(null);
  const productApi = new ProductApi();
  const schema = yup.object({
    count: yup.string().required(),
    price: yup.string().required(),
  });

  const handleClose = () => {
    setShow(false);
    props.setShow(false);
  }

  const handleSubmit = (productInventory) => {
    productApi.enterInvetory(product.id, productInventory, (response) => {
      context.notificationService.success(t('Actions.messages.save_ok'));
      props.updateProductInList(response.data);
      handleClose();
    }, (response) => {
      context.notificationService.error(t('Actions.messages.error'));
    })
  };

  return (
    <div className={styles.ProductForm} data-testid="ProductForm">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Actions.editing')}: {product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              count: "",
              price: ""
            }}
          >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
              <Form noValidate onSubmit={handleSubmit} ref={formRef}>
                <Form.Row>
                  <Form.Group controlId="count">
                    <Form.Label>{t('Products.count')}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t('Products.count')}
                      value={values.count}
                      name="count"
                      min="1"
                      step="0.1"
                      onChange={handleChange}
                      isValid={touched.count && !errors.count} />
                    {errors.count && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="price">
                    <Form.Label>{t('Products.price')}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t('Products.price')}
                      value={values.price}
                      name="price"
                      min="0"
                      step="0.1"
                      onChange={handleChange}
                      isValid={touched.price && !errors.price} />
                    {errors.price && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>
                <Modal.Footer>
                  <Button variant="secondary" type="button" onClick={handleClose}>
                    {t("Actions.close")}
                  </Button>
                  <Button variant="primary" type="submit" >
                    {t("Actions.send")}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>

      </Modal>
    </div>
  )
}
