import React, {useContext} from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import {ROUTERS_URL} from "./constants/constans";
import Store from "./components/Store/Store.lazy";
import Product from "./components/Product/Product.lazy";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ContextApp} from './constants/constans';
import {useTranslation} from "react-i18next";
import {NotificationContainer, NotificationManager} from "react-notifications";

import 'react-notifications/lib/notifications.css';
export default function App(){
    const context = useContext(ContextApp);
    context.notificationService = NotificationManager;
    const {t} = useTranslation();
    return(
        <div>
            <Row>
                <Col>
                    <Switch>
                        <Route path={ROUTERS_URL.store_path.url}>
                            <Store />
                        </Route>
                        <Route path={ROUTERS_URL.products_path.url}>
                            <Product />
                        </Route>
                    </Switch>
                </Col>
            </Row>
            {context.loading && <h5 align="center">{t('loading')}</h5>}
            <NotificationContainer/>
        </div>
    );
}