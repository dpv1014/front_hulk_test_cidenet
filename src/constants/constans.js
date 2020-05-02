import React from "react";

export const PRODUCT_INVENTORY_ENTRY_TYPE = 'inventory_entry';
export const PRODUCT_INVENTORY_RELEASE_TYPE = 'inventory_release';

export const ROUTERS_URL = {
    store_path: {
        url: '/(|store)',
        plain_url: '/store'
    },
    products_path: {
        url: '/products',
        plain_url: '/products',
        childs: {
            new: {
                url: '/products/new',
                plain_url: '/products/new',
            }
        }
    },
    kardex_path: {
        url: '/kardex',
        plain_url: '/kardex',
    }
};

export const ContextApp = React.createContext({
    loading: false,
    notificationService: null
});