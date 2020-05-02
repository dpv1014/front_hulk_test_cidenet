import React, {useContext, useRef, useState} from 'react';
import styles from './ProductForm.module.scss';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import Form from "react-bootstrap/Form";
import { Formik } from 'formik';
import ProductApi from "../../api/v1/Product";
import {ContextApp} from "../../constants/constans";
const yup = require('yup')

export default function ProductForm(props) {
  const {t} = useTranslation();
  const [show, setShow] = useState(props.show);

  let n_product = props.product;
  if(n_product == null){
    n_product = {
      isNew: true,
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      active: true
    }
  } else {
    n_product.isNew = false;
  }
  const [product] = useState(n_product);

  const context = useContext(ContextApp);
  const formRef = useRef(null);
  const productApi = new ProductApi();
  const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().min("0").required(),
    imageUrl: yup.string().required(),
    active: yup.bool().required(),
  });

  const handleClose = () => {
    setShow(false);
    props.setShow(false);
  }

  const handleSubmit = (newProduct) => {
    if(!product.isNew){
      productApi.updateProduct(newProduct, (response) => {
        context.notificationService.success(t('Actions.messages.save_ok'));
        props.updateProductInList(response.data);
        handleClose();
      }, (response) => {
        context.notificationService.error(t('Actions.messages.error'));
      })
    } else {
      productApi.createProduct(newProduct, (response) => {
        context.notificationService.success(t('Actions.messages.save_ok'));
        props.addProductInList(response.data);
        handleClose();
      }, (response) => {
        context.notificationService.error(t('Actions.messages.error'));
      })
    }
  };

  return (
    <div className={styles.ProductForm} data-testid="ProductForm">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{(product.isNew)?  t('Actions.create') + " " + t('Products.title'): t('Actions.editing') + ":" + product.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={product}
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
                      <Form.Group controlId="name">
                        <Form.Label>{t('Products.name')}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={t('Products.name')}
                          value={values.name}
                          name="name"
                          onChange={handleChange}
                          isValid={errors.name == null && touched.name} />
                        {errors.name && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group controlId="description">
                        <Form.Label>{t('Products.description')}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={t('Products.description')}
                          value={values.description}
                          name="description"
                          onChange={handleChange}
                          isValid={touched.description && !errors.description} />
                        {errors.description && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
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
                    <Form.Row>
                      <Form.Group controlId="imageUrl">
                        <Form.Label>{t('Products.imageUrl')}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={t('Products.imageUrl')}
                          name="imageUrl"
                          value={values.imageUrl}
                          onChange={handleChange}
                          isValid={touched.imageUrl && !errors.imageUrl} />
                        {errors.imageUrl && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                      </Form.Group>
                    </Form.Row>
                    <Form.Check
                      label={t('Products.active')}
                      onChange={handleChange}
                      isInvalid={!!errors.terms}
                      defaultChecked={product.active}
                      name="active"
                    />
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
