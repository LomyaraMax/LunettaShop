document.addEventListener("DOMContentLoaded", () => {
  // === Слайдер ===
  document.querySelectorAll('.prod').forEach(section => {
    const slider = section.querySelector('.slider_container');
    const prevBtn = section.querySelector('.prev_btn');
    const nextBtn = section.querySelector('.next_btn');
    if (slider && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => slider.scrollLeft -= slider.offsetWidth);
      nextBtn.addEventListener('click', () => slider.scrollLeft += slider.offsetWidth);
    }
  });

  // === КОРЗИНА ===
  const cartElement = document.querySelector(".cart");
  const cartToggleBtn = document.querySelector(".backet");
  const cartCloseBtn = document.querySelector(".cart-close-btn");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const orderForm = document.getElementById("order-form");
  const orderDetailsInput = document.getElementById("orderDetails");
  const cartCountEl = document.querySelector(".cart-count");

  if(cartElement) cartElement.style.display = "none";

  cartToggleBtn?.addEventListener("click", e => {
    e.preventDefault();
    if(cartElement) cartElement.style.display = cartElement.style.display === "block" ? "none" : "block";
  });

  cartCloseBtn?.addEventListener("click", () => {
    if(cartElement) cartElement.style.display = "none";
  });

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }
  function updateOrderDetailsField() {
    if(orderDetailsInput) orderDetailsInput.value = cart.map(i => `${i.name} x${i.quantity} = ${i.price*i.quantity} грн`).join("\n");
  }
  function updateCartCount() {
    if(cartCountEl){
      const totalItems = cart.reduce((sum,item)=>sum+item.quantity,0);
      cartCountEl.textContent = totalItems;
      cartCountEl.style.display = totalItems>0?"flex":"none";
    }
  }
  function renderCart(){
    if(!cartItemsContainer) return;
    cartItemsContainer.innerHTML = "";
    let total=0;
    cart.forEach((item,index)=>{
      total+=item.price*item.quantity;
      const itemEl=document.createElement("div");
      itemEl.className="cart-item";
      itemEl.style.cssText="display:flex; align-items:center; margin-bottom:10px;";
      itemEl.innerHTML=`
        <img src="${item.image}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; margin-right:10px;">
        <div style="flex:1;">
          <strong>${item.name}</strong><br>
          Ціна: ${item.price} грн<br>
          Кількість: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity" style="width:60px;"><br>
          Сума: ${item.price*item.quantity} грн
        </div>
        <button data-index="${index}" class="remove" style="margin-left:10px;">Х</button>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
    if(cartTotal) cartTotal.textContent=`Разом: ${total} грн`;
    updateOrderDetailsField();
    saveCart();
    updateCartCount();
  }

  document.querySelectorAll(".add-to-cart").forEach(button=>{
    button.addEventListener("click", ()=>{
      const product=button.closest(".product");
      if(!product) return;
      const nameEl=product.querySelector(".product-name");
      const priceEl=product.querySelector(".price");
      if(!nameEl || !priceEl) return;
      const name=nameEl.textContent.trim();
      const price=parseFloat(priceEl.dataset.price);
      const image=product.querySelector("img")?.src||"";
      const existing=cart.find(item=>item.name===name);
      if(existing) existing.quantity+=1;
      else cart.push({name,price,image,quantity:1});
      renderCart();
    });
  });

  cartItemsContainer?.addEventListener("click",e=>{
    if(e.target.classList.contains("remove")){
      const index=e.target.dataset.index;
      cart.splice(index,1);
      renderCart();
    }
  });

  cartItemsContainer?.addEventListener("input",e=>{
    if(e.target.classList.contains("quantity")){
      const index=e.target.dataset.index;
      const newQty=parseInt(e.target.value);
      if(newQty>0){
        cart[index].quantity=newQty;
        renderCart();
      }
    }
  });

  orderForm?.addEventListener("submit",e=>{
    if(cart.length===0){
      e.preventDefault();
      alert("Ваш кошик порожній!");
      return;
    }
    updateOrderDetailsField();
    setTimeout(()=>{
      localStorage.removeItem("cart");
      cart=[];
      renderCart();
    },2000);
  });

  renderCart();

  // === Анимация кнопки "У КОШИК" ===
  document.querySelectorAll('.add-to-cart').forEach(button=>{
    button.addEventListener('click',()=>{
      button.classList.add('added');
      const originalText=button.textContent;
      button.textContent='✅ Додано!';
      setTimeout(()=>{
        button.classList.remove('added');
        button.textContent=originalText;
      },1200);
    });
  });

  // === ПАНЕЛЬ АДМІНІСТРАТОРА ===
  const adminPassword="admin123";
  const adminPanel=document.createElement("div");
  adminPanel.style.cssText=`position: fixed; top:10%; left:50%; transform: translateX(-50%); background:#fff; padding:20px; border:1px solid #000; z-index:10000; max-width:400px; max-height:80%; overflow-y:auto; display:none;`;
  adminPanel.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3>Панель Адміністратора</h3>
      <button id="closeAdminPanel" style="font-size:16px;">✖</button>
    </div>
    <label>Пароль: <input type="password" id="adminPass"></label>
    <button id="enterAdmin">Увійти</button>
    <div id="adminControls" style="display:none; margin-top:10px;">
      <h4>Існуючі товари</h4>
      <div id="existingProducts"></div>
    </div>
  `;
  document.body.appendChild(adminPanel);

  document.getElementById("closeAdminPanel").addEventListener("click",()=>adminPanel.style.display="none");
  // Открытие админ-панели по Ctrl+Shift+F12
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.shiftKey && e.code === "F12") {
    adminPanel.style.display = adminPanel.style.display === "block" ? "none" : "block";
  }
});


  document.getElementById("enterAdmin").addEventListener("click",()=>{
    const passInput=document.getElementById("adminPass").value;
    if(passInput===adminPassword){
      document.getElementById("adminControls").style.display="block";
      renderExistingProducts();
    } else alert("Невірний пароль!");
  });

  function renderExistingProducts(){
    const container=document.getElementById("existingProducts");
    container.innerHTML="";
    document.querySelectorAll(".product").forEach(prod=>{
      const nameEl=prod.querySelector(".product-name");
      const priceEl=prod.querySelector(".price");
      const currentName=nameEl?nameEl.textContent.replace(/\s*Арт\..*$/,""):"";
      const currentArticle=nameEl?(nameEl.querySelector("span")?.textContent.replace("Арт.","")||""):"";
      const currentPrice=priceEl?parseFloat(priceEl.dataset.price):0;
      const div=document.createElement("div");
      div.style.cssText="border:1px solid #ccc; padding:5px; margin-bottom:5px;";
      div.innerHTML=`
        <input type="text" value="${currentName}" placeholder="Назва" class="editName" style="width:100%; margin-bottom:2px;">
        <input type="text" value="${currentArticle}" placeholder="Арт." class="editArticle" style="width:100%; margin-bottom:2px;">
        <input type="number" value="${currentPrice}" placeholder="Ціна" class="editPrice" style="width:100%; margin-bottom:2px;">
        <button class="saveBtn">Зберегти</button>
        <button class="deleteBtn">Видалити</button>
      `;
      div.querySelector(".saveBtn").addEventListener("click",()=>{
        const newName=div.querySelector(".editName").value.trim();
        const newArticle=div.querySelector(".editArticle").value.trim();
        const newPrice=parseFloat(div.querySelector(".editPrice").value);
        if(nameEl) nameEl.innerHTML=`${newName}<span>Арт.${newArticle}</span>`;
        if(priceEl){ priceEl.dataset.price=newPrice; priceEl.textContent=`${newPrice} грн`; }
        alert("Товар оновлено!");
      });
      div.querySelector(".deleteBtn").addEventListener("click",()=>{
        prod.remove();
        renderExistingProducts();
      });
      container.appendChild(div);
    });
  }
});
