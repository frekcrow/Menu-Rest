/**
 * Xi'an Famous Foods - Product Detail Modal & Customization
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
    const chineseTitle = document.getElementById("modalChineseTitle");
    const itemTitle = document.getElementById("modalItemTitle");
    const itemEnTitle = document.getElementById("modalItemEnTitle");
    const itemImage = document.getElementById("modalItemImage");
    const itemSpice = document.getElementById("modalItemSpice");
    const itemCalories = document.getElementById("modalItemCalories");
    const itemBadge = document.getElementById("modalItemBadge");
    const itemDesc = document.getElementById("modalItemDesc");
    const itemNotes = document.getElementById("itemNotes");

    if (skuBadge) skuBadge.textContent = item.sku;
    if (chineseTitle) chineseTitle.textContent = item.chineseName;
    if (itemTitle) itemTitle.textContent = item.name;
    if (itemEnTitle) itemEnTitle.textContent = item.englishName;
    if (itemImage) {
      itemImage.src = item.image;
      itemImage.alt = item.englishName;
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
    if (totalDisplay) totalDisplay.textContent = (selectedItem.price * modalQty);
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
  }

  return {
    open: openItemModal,
    close: closeItemModal,
    init: initListeners
  };
})();
