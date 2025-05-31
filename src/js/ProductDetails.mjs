import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        console.log("Looking for product ID:", this.productId);
        this.product = await this.dataSource.findProductById(this.productId);
        console.log("Product fetched:", this.product);

        if (!this.product) {
            document.body.innerHTML = "<p>Product not found.</p>";
            return;
        }

        this.renderProductDetails();

        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        if (!this.product || !this.product.Brand) {
            console.error("Product data is missing or malformed:", this.product);
            document.body.innerHTML = "<p>Sorry, product details could not be loaded.</p>";
            return;
        }
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    if (!product?.Brand?.Name || !product.NameWithoutBrand) {
        console.error("Incomplete product data:", product);
        return;
    }

    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}