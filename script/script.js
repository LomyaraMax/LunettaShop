// const slider = document.querySelector('.news_slider');
// const prevBtn = document.querySelector('.prev_btn');
// const nextBtn = document.querySelector('.next_btn');

// prevBtn.addEventListener('click', () => {
//   slider.scrollLeft -= slider.offsetWidth;
// });
// nextBtn.addEventListener('click', () => {
//   slider.scrollLeft += slider.offsetWidth;
// }); 

// document.querySelectorAll('.prod').forEach(section => {
//   const slider = section.querySelector('.slider_container');
//   const prevBtn = section.querySelector('.prev_btn');
//   const nextBtn = section.querySelector('.next_btn');

//   if (slider && prevBtn && nextBtn) {
//     prevBtn.addEventListener('click', () => {
//       slider.scrollLeft -= slider.offsetWidth;
//     });

//     nextBtn.addEventListener('click', () => {
//       slider.scrollLeft += slider.offsetWidth;
//     });
//   }
// });






// // корзина 


// document.addEventListener("DOMContentLoaded", () => {
//   const cartItemsContainer = document.getElementById("cart-items");
//   const cartTotal = document.getElementById("cart-total");
//   const orderDetailsInput = document.getElementById("orderDetails");

//   // Загружаем корзину из localStorage
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   function saveCart() {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }

//   function renderCart() {
//     cartItemsContainer.innerHTML = "";
//     let total = 0;

//     cart.forEach((item, index) => {
//       total += item.price * item.quantity;

//       const itemEl = document.createElement("div");
//       itemEl.className = "cart-item";
//       itemEl.style.display = "flex";
//       itemEl.style.alignItems = "center";
//       itemEl.style.marginBottom = "10px";
//       itemEl.innerHTML = `
//         <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px;">
//         <div style="flex: 1;">
//           <strong>${item.name}</strong><br>
//           Ціна: ${item.price} грн<br>
//           Кількість: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity" style="width: 60px;">
//           <br>Сума: ${item.price * item.quantity} грн
//         </div>
//         <button data-index="${index}" class="remove" style="margin-left: 10px;">Видалити</button>
//       `;
//       cartItemsContainer.appendChild(itemEl);
//     });

//     cartTotal.textContent = `Разом: ${total} грн`;
//     orderDetailsInput.value = cart.map(i => `${i.name} x${i.quantity} = ${i.price * i.quantity} грн`).join(", ");
//     saveCart();
//   }

//   // Добавление товара
//   document.querySelectorAll(".add-to-cart").forEach(button => {
//     button.addEventListener("click", () => {
//       const product = button.closest(".product");
//       const name = product.querySelector(".product-name").textContent.trim();
//       const price = parseFloat(product.querySelector(".price").dataset.price);
//       const image = product.querySelector("img")?.src || "";

//       const existing = cart.find(item => item.name === name);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         cart.push({ name, price, image, quantity: 1 });
//       }

//       renderCart();
//     });
//   });

//   // Удаление товара
//   cartItemsContainer.addEventListener("click", (e) => {
//     if (e.target.classList.contains("remove")) {
//       const index = e.target.dataset.index;
//       cart.splice(index, 1);
//       renderCart();
//     }
//   });

//   // Обработка изменения количества
//   cartItemsContainer.addEventListener("input", (e) => {
//     if (e.target.classList.contains("quantity")) {
//       const index = e.target.dataset.index;
//       const newQty = parseInt(e.target.value);
//       if (newQty > 0) {
//         cart[index].quantity = newQty;
//         renderCart();
//       }
//     }
//   });

//   // Отправка формы
//   document.getElementById("order-form").addEventListener("submit", (e) => {
//     if (cart.length === 0) {
//       e.preventDefault();
//       alert("Ваш кошик порожній!");
//     } else {
//       localStorage.removeItem("cart");
//       cart = [];
//       renderCart();
//     }
//   });

//   // При загрузке страницы отрисовать корзину
//   renderCart();
// });


// // Скрытие карзины 

// document.addEventListener("DOMContentLoaded", () => {
//   const cartElement = document.querySelector(".cart");
//   const cartToggleBtn = document.querySelector(".backet");

//   cartToggleBtn.addEventListener("click", (e) => {
//     e.preventDefault(); // чтобы ссылка не срабатывала
//     if (cartElement.style.display === "block") {
//       cartElement.style.display = "none";
//     } else {
//       cartElement.style.display = "block";
//     }
//   });

//   // ... твой остальной код корзины ...
// });


// // крестик, скрытие карзины

// document.addEventListener("DOMContentLoaded", () => {
//   const cartElement = document.querySelector(".cart");
//   const cartToggleBtn = document.querySelector(".backet");
//   const cartCloseBtn = document.querySelector(".cart-close-btn");

//   cartToggleBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     cartElement.style.display = "block";
//   });

//   cartCloseBtn.addEventListener("click", () => {
//     cartElement.style.display = "none";
//   });
// });


// Слайдер
// Горизонтальный слайдер
document.querySelectorAll('.prod').forEach(section => {
  const slider = section.querySelector('.slider_container');
  const prevBtn = section.querySelector('.prev_btn');
  const nextBtn = section.querySelector('.next_btn');

  if (slider && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      slider.scrollLeft -= slider.offsetWidth;
    });

    nextBtn.addEventListener('click', () => {
      slider.scrollLeft += slider.offsetWidth;
    });
  }
});

// КОРЗИНА
document.addEventListener("DOMContentLoaded", () => {
  const cartElement = document.querySelector(".cart");
  const cartToggleBtn = document.querySelector(".backet");
  const cartCloseBtn = document.querySelector(".cart-close-btn");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const orderForm = document.getElementById("order-form");
  const orderDetailsInput = document.getElementById("orderDetails");

  cartElement.style.display = "none";

  // Переключение корзины
  cartToggleBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    cartElement.style.display = cartElement.style.display === "block" ? "none" : "block";
  });

  // Закрытие корзины
  cartCloseBtn?.addEventListener("click", () => {
    cartElement.style.display = "none";
  });

  // Загружаем корзину
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateOrderDetailsField() {
    if (orderDetailsInput) {
      orderDetailsInput.value = cart.map(i =>
        `${i.name} x${i.quantity} = ${i.price * i.quantity} грн`
      ).join("\n");
    }
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.style.display = "flex";
      itemEl.style.alignItems = "center";
      itemEl.style.marginBottom = "10px";
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px;">
        <div style="flex: 1;">
          <strong>${item.name}</strong><br>
          Ціна: ${item.price} грн<br>
          Кількість: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity" style="width: 60px;">
          <br>Сума: ${item.price * item.quantity} грн
        </div>
        <button data-index="${index}" class="remove" style="margin-left: 10px;">Х</button>
      `;
      cartItemsContainer.appendChild(itemEl);
    });

    cartTotal.textContent = `Разом: ${total} грн`;

    updateOrderDetailsField();
    saveCart();
  }

  // Добавление товара
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      const name = product.querySelector(".product-name").textContent.trim();
      const price = parseFloat(product.querySelector(".price").dataset.price);
      const image = product.querySelector("img")?.src || "";

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      renderCart();
    });
  });

  // Удаление товара
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    }
  });

  // Изменение количества
  cartItemsContainer.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity")) {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      if (newQty > 0) {
        cart[index].quantity = newQty;
        renderCart();
      }
    }
  });

  // Отправка формы
  orderForm?.addEventListener("submit", (e) => {
    if (cart.length === 0) {
      e.preventDefault();
      alert("Ваш кошик порожній!");
      return;
    }

    // 1. Обновляем поле orderDetails перед отправкой
    updateOrderDetailsField();

    // 2. Даем форме отправиться (не отменяем e.preventDefault)

    // 3. После отправки (через 2 сек) очищаем корзину
    setTimeout(() => {
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
    }, 2000);
  });

  // Первая отрисовка
  renderCart();
});

// Анимация кнопки "У КОШИК"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('added');
    const originalText = button.textContent;
    button.textContent = '✅ Додано!';

    setTimeout(() => {
      button.classList.remove('added');
      button.textContent = originalText;
    }, 1200);
  });
});



