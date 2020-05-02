import React from 'react';
import styles from './Header.module.scss';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {ROUTERS_URL} from "../../constants/constans";
import {useTranslation} from "react-i18next";

export default function Header() {
  const {t} = useTranslation();
  return(
    <div className={styles.Header} data-testid="Header">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={ROUTERS_URL.store_path.plain_url}>{t('Header.store')}</Nav.Link>
            <Nav.Link href={ROUTERS_URL.products_path.plain_url}>{t('Products.title')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
