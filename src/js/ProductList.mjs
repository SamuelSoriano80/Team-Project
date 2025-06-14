import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        this.products = await this.dataSource.getData(this.category);
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
        this.addSortListener();
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    addSortListener() {
        const sortElement = document.getElementById("sort");
        if (sortElement) {
            sortElement.addEventListener("change", () => {
                let sorted = [...this.products];
                const value = sortElement.value;
                if (value === "name") {
                    sorted.sort((a, b) => a.Name.localeCompare(b.Name));
                } else if (value === "price") {
                    sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
                }
                this.renderList(sorted);
            });
        }
    }
}