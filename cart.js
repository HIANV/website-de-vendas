document.addEventListener("DOMContentLoaded", () => {
    const cartItemsSection = document.querySelector('.cart-details');
    const totalPriceElement = document.getElementById('summary-total');
    const subtotalElement = document.getElementById('summary-subtotal');
    const checkoutBtn = document.querySelector('.checkout-button');
    const languageSelector = document.getElementById('language-selector'); // Dropdown de idiomas


    const translations = {
        en: {
            subtotal: "Subtotal",
            total: "Total",
            remove: "Remove",
            quantity: "Quantity",
            price: "Price",
            emptyCart: "Your cart is empty!",
            checkoutSuccess: "Purchase completed! Thank you for shopping with us.",
            finalizePurchase: "Finalize Purchase",
        },
        pt: {
            subtotal: "Subtotal",
            total: "Total",
            remove: "Remover",
            quantity: "Quantidade",
            price: "Preço",
            emptyCart: "Seu carrinho está vazio!",
            checkoutSuccess: "Compra finalizada! Obrigado por comprar conosco.",
            finalizePurchase: "Finalizar Compra",
        },
    };

    let currentLanguage = "pt";

    // Recuperar o carrinho do localStorage ou inicializar um vazio
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    /**
     * Atualiza a interface do carrinho na página
     */
    function updateCartUI() {
        cartItemsSection.innerHTML = ''; 
        let subtotal = 0;

        cart.forEach((item, index) => {
            const cartItemElement = createCartItemElement(item, index);
            cartItemsSection.appendChild(cartItemElement);

            subtotal += item.price * item.quantity;
        });

    
        updateSummary(subtotal);
    }

    /**
     * Cria o elemento HTML para um item do carrinho
     * @param {Object} item - Objeto do item no carrinho
     * @param {number} index - Índice do item no array
     * @returns {HTMLElement} - Elemento HTML do item
     */
    function createCartItemElement(item, index) {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${translations[currentLanguage].price}: R$ ${item.price.toFixed(2)}</p>
                <div>
                    ${translations[currentLanguage].quantity}: 
                    <button class="quantity-btn" data-index="${index}" data-delta="-1">-</button>
                    ${item.quantity}
                    <button class="quantity-btn" data-index="${index}" data-delta="1">+</button>
                </div>
            </div>
            <button class="remove-btn" data-index="${index}">${translations[currentLanguage].remove}</button>
        `;
        return cartItemElement;
    }

    /**
     * Atualiza os valores do subtotal e total no resumo do carrinho
     * @param {number} subtotal - Valor do subtotal
     */
    function updateSummary(subtotal) {
        subtotalElement.textContent = `${translations[currentLanguage].subtotal}: R$ ${subtotal.toFixed(2)}`;
        totalPriceElement.textContent = `${translations[currentLanguage].total}: R$ ${subtotal.toFixed(2)}`;
    }

    /**
     * Atualiza a quantidade de um item do carrinho
     * @param {number} index - Índice do item no array
     * @param {number} delta - Mudança na quantidade (+1 ou -1)
     */
    function updateQuantity(index, delta) {
        const item = cart[index];
        if (item.quantity + delta > 0) { 
            item.quantity += delta;
            saveCart();
            updateCartUI();
        }
    }

    /**
     * Remove um item do carrinho pelo índice
     * @param {number} index - Índice do item no array
     */
    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function checkout() {
        if (cart.length === 0) {
            alert(translations[currentLanguage].emptyCart);
            return;
        }
        alert(translations[currentLanguage].checkoutSuccess);
        cart = [];
        saveCart();
        updateCartUI();
    }
    function changeLanguage(lang) {
        currentLanguage = lang;
        checkoutBtn.textContent = translations[lang].finalizePurchase; 
        updateCartUI(); 
    }
    // Evento para troca de idioma
    languageSelector.addEventListener("change", (event) => {
        changeLanguage(event.target.value);
    });
    checkoutBtn.addEventListener("click", checkout);
    
    updateCartUI();
});
