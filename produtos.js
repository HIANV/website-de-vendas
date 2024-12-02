// js/products.js

// Dados dos produtos com traduções
const products = [
    {
        id: 1,
        name: { pt: "Ginger Vermelha", en: "Red Ginger" },
        price: { pt: "R$ 25,00 - 30,00", en: "$ 25.00 - 30.00" },
        img: "../../assets/images/flor1.png",
    },
    {
        id: 2,
        name: { pt: "Protea", en: "Protea" },
        price: { pt: "R$ 45,00 - 60,00", en: "$ 45.00 - 60.00" },
        img: "../../assets/images/flor2.png",
    },
    {
        id: 3,
        name: { pt: "Antúrio", en: "Anthurium" },
        price: { pt: "R$ 30,00 - 35,00", en: "$ 30.00 - 35.00" },
        img: "../../assets/images/flor3.png",
    },
    {
        id: 4,
        name: { pt: "Helicônia", en: "Heliconia" },
        price: { pt: "R$ 20,00 - 40,00", en: "$ 20.00 - 40.00" },
        img: "../../assets/images/flor4.png",
    },
    {
        id: 5,
        name: { pt: "Hibisco", en: "Hibiscus" },
        price: { pt: "R$ 15,00", en: "$ 15.00" },
        img: "../../assets/images/flor5.png",
    },
    {
        id: 6,
        name: { pt: "Azaleia", en: "Azalea" },
        price: { pt: "R$ 18,00", en: "$ 18.00" },
        img: "../../assets/images/flor6.png",
    },
];

// Idioma atual (padrão: português)
let currentLanguage = "pt";

// Alterar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    renderProductsHome("product-container");
}

// Renderizar produtos na Home com tradução
function renderProductsHome(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products
        .map(
            (product) => `
        <a href="../produto/index.html?id=${product.id}" class="product">
            <img src="${product.img}" alt="${product.name[currentLanguage]}">
            <h3>${product.name[currentLanguage]}</h3>
            <p>${product.price[currentLanguage]}</p>
        </a>
    `
        )
        .join("");
}

// Renderizar detalhes do produto com tradução
function renderProductDetails(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Obter o ID do produto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get("id"));

    // Encontrar o produto correspondente
    const product = products.find((p) => p.id === productId);

    if (product) {
        container.innerHTML = `
            <div class="product-detail">
                <img src="${product.img}" alt="${product.name[currentLanguage]}">
                <h1>${product.name[currentLanguage]}</h1>
                <p>${product.price[currentLanguage]}</p>
                <button onclick="addToCart(${product.id})">${
            currentLanguage === "pt" ? "Adicionar ao Carrinho" : "Add to Cart"
        }</button>
            </div>
        `;
    } else {
        container.innerHTML = `<p>${
            currentLanguage === "pt" ? "Produto não encontrado." : "Product not found."
        }</p>`;
    }
}

// Adicionar produto ao carrinho com mensagem traduzida
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    alert(
        `${product.name[currentLanguage]} ${
            currentLanguage === "pt" ? "foi adicionado ao carrinho!" : "was added to the cart!"
        }`
    );
}

// Inicializa os produtos na Home
document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("language-selector");

    // Renderiza os produtos inicialmente
    renderProductsHome("product-container");

    // Alterar idioma dinamicamente
    if (languageSelector) {
        languageSelector.addEventListener("change", (e) => {
            changeLanguage(e.target.value);
        });
    }
});
