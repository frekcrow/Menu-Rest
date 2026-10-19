/**
 * KUDO KUDO - Product Detail Modal & Customization
 * Separated Modal Logic
 */

"use strict";

window.XFF_MODAL = (function () {
  let selectedItem = null;
  let modalQty = 1;

  function openItemModal(itemId) {
    const item = window.XFF_DATA.menu.find(i => i.id === itemId);
    if (!item) return;

    selectedItem = item;
    modalQty = 1;

    const modal = document.getElementById("itemModal");
    const skuBadge = document.getElementById("modalSkuBadge");
    const itemTitle = document.getElementById("modalItemTitle");
    const itemEnTitle = document.getElementById("modalItemEnTitle");
    const itemImage = document.getElementById("modalItemImage");
    const itemSpice = document.getElementById("modalItemSpice");
    const itemCalories = document.getElementById("modalItemCalories");
    const itemBadge = document.getElementById("modalItemBadge");
    const itemDesc = document.getElementById("modalItemDesc");
    const itemNotes = document.getElementById("itemNotes");

    if (skuBadge) skuBadge.textContent = item.sku;
    if (itemTitle) itemTitle.textContent = item.name;
    if (itemEnTitle) itemEnTitle.textContent = item.englishName;
    if (itemImage) {
      itemImage.src = item.image;
      itemImage.alt = item.englishName;
      itemImage.onerror = function () {
        if (!this.dataset.fallback && item.remoteImage) {
          this.dataset.fallback = "1";
          this.src = item.remoteImage;
        }
      };
    }
    if (itemSpice) itemSpice.textContent = item.spiceLevel;
    if (itemCalories) itemCalories.innerHTML = `<i class="ph ph-fire"></i> ${item.calories} kcal`;
    if (itemBadge) itemBadge.textContent = item.badge;
    if (itemDesc) itemDesc.textContent = item.description;
    if (itemNotes) itemNotes.value = "";

    updatePrice();

    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeItemModal() {
    const modal = document.getElementById("itemModal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
    selectedItem = null;
  }

  function updatePrice() {
    if (!selectedItem) return;
    const qtyDisplay = document.getElementById("modalQtyDisplay");
    const totalDisplay = document.getElementById("modalTotalCalculated");

    if (qtyDisplay) qtyDisplay.textContent = modalQty;
    if (totalDisplay) totalDisplay.textContent = (selectedItem.price * modalQty).toLocaleString();
  }

  function initListeners() {
    const minusBtn = document.getElementById("modalMinusBtn");
    const plusBtn = document.getElementById("modalPlusBtn");
    const addBtn = document.getElementById("modalAddToCartBtn");
    const closeBtn = document.getElementById("closeItemModalBtn");
    const modal = document.getElementById("itemModal");

    if (minusBtn) {
      minusBtn.addEventListener("click", () => {
        if (modalQty > 1) {
          modalQty -= 1;
          updatePrice();
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener("click", () => {
        modalQty += 1;
        updatePrice();
      });
    }

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        if (!selectedItem) return;
        const notesInput = document.getElementById("itemNotes");
        const notes = (notesInput ? notesInput.value : "").trim();
        const selectedRadio = document.querySelector('input[name="spiceSelection"]:checked');
        let spiceText = "حرارة أصلية (Regular)";
        if (selectedRadio) {
          if (selectedRadio.value === "mild") spiceText = "حرارة خفيفة (Mild)";
          if (selectedRadio.value === "extra") spiceText = "حار جداً بزيت الفلفل (Extra Hot)";
        }

        // Apple HIG Haptic Confirmation
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          try { navigator.vibrate(15); } catch (e) {}
        }

        window.XFF_CART.addToCart(selectedItem, modalQty, spiceText, notes);
        closeItemModal();
        window.XFF_UI.showToast(`تمت إضافة [${selectedItem.sku}] إلى طلبك!`);
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeItemModal);
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeItemModal();
      });
    }

    // Apple HIG Native Swipe-to-Dismiss Gesture
    const sheetEl = document.getElementById("modalSheet");
    if (sheetEl) setupSwipeToDismiss(sheetEl, closeItemModal);
  }

  function setupSwipeToDismiss(sheetEl, closeFn) {
    if (!sheetEl || sheetEl.dataset.swipeBound) return;
    sheetEl.dataset.swipeBound = "true";

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    sheetEl.addEventListener("touchstart", (e) => {
      if (sheetEl.scrollTop > 5) return;
      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      sheetEl.style.transition = "none";
    }, { passive: true });

    sheetEl.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchY - startY;
      if (deltaY > 0) {
        currentY = touchY;
        sheetEl.style.transform = `translateY(${deltaY}px)`;
      } else {
        sheetEl.style.transform = "translateY(0)";
      }
    }, { passive: true });

    sheetEl.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      const deltaY = currentY - startY;
      sheetEl.style.transition = "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)";
      if (deltaY > 90) {
        sheetEl.style.transform = "translateY(100%)";
        setTimeout(() => {
          closeFn();
          sheetEl.style.transform = "";
        }, 220);
      } else {
        sheetEl.style.transform = "translateY(0)";
      }
    });
  }

  return {
    open: openItemModal,
    close: closeItemModal,
    init: initListeners,
    setupSwipeToDismiss
  };
})();
