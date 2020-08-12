import { BasketItem, CatalogItem } from './items';

let classes = {
    'Catalog': CatalogItem,
    'Basket': BasketItem
}

export default class List {
    constructor(url, container, basket = false) {
        this.url = url;
        this.container = container;
        this.items = [];
        this._init(basket);
    }
    _init(basket = false) {
        let url = 'https://raw.githubusercontent.com/O2xy/stattic/master/img/JS1_shop/JSON' + this.url;
        this._get(url)
        .then(data => {
            // this.items = basket ? data : data.content;
            if (basket) {
                this.items = data;
            } else {
                this.items = data.content;
                this.total = data.totalPrice;
            }
        })
        .then(() => {
            this._render();
        });
    }

    _get(url) {
        return fetch(url)
                .then(data => data.json());
    }

    _render() {
        let template = '';
        this.items.forEach(item => {
            template += new classes[this.constructor.name](item).render();
            // new Catalog()._render >> template += new classes['Catalog'](item).render()
            // new Basket()._render >> template += new classes['Basket'](item).render()
        });
        document.querySelector(this.container).innerHTML = template;
    }
}