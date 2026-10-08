/**
 * Xi'an Famous Foods - Cart State & Calculation Module
 * Separated Cart Logic
 */

"use strict";

window.XFF_CART = (function () {
  let cart = [];

  function loadCart() {
    try {
      const saved = localStorage.getItem("xff_menu_cart");
      if (saved) {
        cart = JSON.parse(saved);
      }
    } catch (e) {}
    renderCartBar();
  }

  function saveCart() {
    try {
      localStorage.setItem("xff_menu_cart", JSON.stringify(cart));
    } catch (e) {}
  }

  function addToCart(item, qty, spiceChoice, notes) {
    const compositeKey = `${item.id}_${spiceChoice}_${notes || ""}`;
    const existingIndex = cart.findIndex(c => c.compositeKey === compositeKey);

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        compositeKey: compositeKey,
        id: item.id,
        sku: item.sku,
        chineseName: item.chineseName,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: qty,
        spiceChoice: spiceChoice,
        notes: notes || ""
      });
    }

    saveCart();
    renderCartBar();
  }

  function updateCartItemQty(index, delta) {
    if (cart[index]) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
      saveCart();
      renderCartBar();
      renderCartModalList();
    }
  }

  function getCartTotals() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.15);
    const finalTotal = subtotal;

    return { totalCount, subtotal, tax, finalTotal };
  }

  function renderCartBar() {
    const cartBar = document.getElementById("cartBar");
    const countBadge = document.getElementById("cartCountBadge");
    const totalDisplay = document.getElementById("cartTotalPrice");
    if (!cartBar) return;

    const totals = getCartTotals();
    if (totals.totalCount > 0) {
      cartBar.classList.remove("hidden");
      if (countBadge) countBadge.textContent = totals.totalCount;
      if (totalDisplay) totalDisplay.textContent = totals.finalTotal;
    } else {
      cartBar.classList.add("hidden");
      closeCartModal();
    }
  }

  function renderCartModalList() {
    const listEl = document.getElementById("cartItemsList");
    const subtotalEl = document.getElementById("cartSubtotal");
    const taxEl = document.getElementById("cartTax");
    const finalTotalEl = document.getElementById("cartFinalTotal");
    const submitBtn = document.getElementById("submitOrderBtn");
    if (!listEl) return;

    const totals = getCartTotals();
    if (subtotalEl) subtotalEl.textContent = (totals.subtotal - totals.tax);
    if (taxEl) taxEl.textContent = totals.tax;
    if (finalTotalEl) finalTotalEl.textContent = totals.finalTotal;

    if (cart.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: #64748b;">
          <i class="ph ph-shopping-bag" style="font-size: 3rem; color: #cbd5e1; display: block; margin-bottom: 0.5rem;"></i>
          <p style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; text-transform: uppercase;">سلة طلباتك فارغة</p>
        </div>
      `;
      if (submitBtn) submitBtn.style.display = "none";
      return;
    }

    if (submitBtn) submitBtn.style.display = "flex";
    listEl.innerHTML = cart.map((item, index) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; background-color: #ffffff; border-radius: 6px; border: 2px solid var(--xff-border-heavy); box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.08);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid var(--xff-border-warm);">
          <div>
            <div style="display: flex; align-items: center; gap: 0.35rem;">
              <span class="sku-badge" style="font-size: 0.75rem; padding: 0.1rem 0.35rem;">${item.sku}</span>
              <span style="font-weight: 800; font-size: 0.95rem;">${item.name}</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--xff-red); font-weight: 800; margin-top: 2px;">
              ${item.price * item.qty} ر.س <span style="font-weight: 400; color: #64748b;">(${item.price} × ${item.qty})</span>
            </div>
            <div style="font-size: 0.72rem; color: #475569; margin-top: 2px;">
              <span style="color: var(--xff-chili); font-weight: 700;">${item.spiceChoice}</span>
              ${item.notes ? ` • ملاحظة: ${item.notes}` : ""}
            </div>
          </div>
        </div>

        <div class="qty-control" style="padding: 0.15rem 0.35rem;">
          <button class="qty-btn" onclick="window.XFF_CART.updateQty(${index}, -1)" aria-label="تقليل">-</button>
          <span style="font-family: var(--font-mono); font-weight: 900; min-width: 18px; text-align: center; font-size: 0.95rem;">${item.qty}</span>
          <button class="qty-btn" onclick="window.XFF_CART.updateQty(${index}, 1)" aria-label="زيادة">+</button>
        </div>
      </div>
    `).join("");
  }

  function openCartModal() {
    const modal = document.getElementById("cartModal");
    if (!modal) return;
    renderCartModalList();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCartModal() {
    const modal = document.getElementById("cartModal");
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function clearCart() {
    cart = [];
    saveCart();
    renderCartBar();
    closeCartModal();
  }

  return {
    loadCart,
    addToCart,
    updateQty: updateCartItemQty,
    openCartModal,
    closeCartModal,
    clearCart,
    getTotals: getCartTotals,
    getItems: () => cart
  };
})();
