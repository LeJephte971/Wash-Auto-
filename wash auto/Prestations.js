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

// Ajouter un produit au panier
function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCartDisplay();
}

// Retirer un produit du panier
function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartDisplay();
}



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