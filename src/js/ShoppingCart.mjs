import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    return `
    <li class="cart-item">
      <img src="${item.Image}" alt="${item.Name}" class="cart-item__image">
      <div class="cart-item__details">
        <h2>${item.Brand?.Name || "Unknown Brand"}</h2>
        <h3>${item.Name}</h3>
        <p class="cart-item__price">$${item.FinalPrice}</p>
        <p class="cart-item__quantity">Quantity: ${item.Quantity}</p>
      </div>
    </li>
    `;
}

export default class ShoppingCart {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const cartItems = await this.cartDataSource.getData();
        this.renderCart(cartItems);
    }

    renderCart(items) {
        renderListWithTemplate(cartItemTemplate, this.listElement, items);
    }
}