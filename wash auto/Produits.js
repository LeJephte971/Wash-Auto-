let cartItems = [];
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const cartContainer = document.querySelector('.cart-container'); // Conteneur du panier

// Mettre à jour l'affichage du panier
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Vider le panier avant de le reconstruire
    let totalPrice = 0;

    // Recréer chaque élément du panier
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.price.toFixed(2)}€ 
                        <span class="remove-btn" onclick="removeFromCart(${index})">X</span>`;
        cartItemsContainer.appendChild(li);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2) + "€";

    // Vérifier si le panier est vide et cacher le panier si nécessaire
    if (cartItems.length === 0) {
        cartContainer.style.display = 'none'; // Cacher le panier
    } else {
        cartContainer.style.display = 'block'; // Afficher le panier
    }
}



// Initialisation du panier
let cart = [];

// Fonction pour ajouter un produit au panier
function addToCart(name, price) {
    const item = cart.find(product => product.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
}

// Fonction pour mettre à jour l'affichage du panier
function updateCartDisplay() {
    const cartElement = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    if (cart.length === 0) {
        // Si le panier est vide, on le cache
        cartElement.style.display = 'none';
    } else {
        // Si le panier contient des éléments, on l'affiche
        cartElement.style.display = 'block';
    }

    cartItems.innerHTML = '';
    let total = 0;
    let itemCount = 0;
    
    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        itemCount += product.quantity;
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product.name} - ${product.quantity} x ${product.price.toFixed(2)}€ 
            <button onclick="decreaseQuantity(${index})">-</button>
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="removeFromCart(${index})">Supprimer</button>
        `;
        cartItems.appendChild(listItem);
    });

    cartTotal.textContent = `${total.toFixed(2)}€`;
    cartCount.textContent = itemCount;
}

// Fonction pour augmenter la quantité d'un produit
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCartDisplay();
}

// Fonction pour diminuer la quantité d'un produit
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

// Fonction pour supprimer un produit du panier
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Fonction pour passer à la caisse
function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide.');
        return;
    }

    let orderDetails = 'Résumé de votre commande :\n';
    cart.forEach(product => {
        orderDetails += `${product.name} - ${product.quantity} x ${product.price.toFixed(2)}€\n`;
    });
    orderDetails += `\nTotal : ${document.getElementById('cart-total').textContent}`;
    alert(orderDetails);
}

// Mise à jour initiale du panier
updateCartDisplay();


document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.link');
    const page = document.getElementById('page');
  
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
  
        // Ajoute l'effet de fondu en sortie
        page.classList.add('fade-out');
  
        // Attends la fin de l'animation avant de rediriger
        setTimeout(() => {
          window.location.href = this.href;
        }, 800); // Correspond à la durée de la transition (0.5s)
      });
    });
  });