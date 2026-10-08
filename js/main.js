/**
 * Xi'an Famous Foods - Main Application Entry
 * Orchestrates modules across all pages
 */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize Global Mobile Drawer & Navigation
  if (window.XFF_UI && typeof window.XFF_UI.initDrawer === "function") {
    window.XFF_UI.initDrawer();
  }

  // 2. Initialize Cart State on All Pages
  if (window.XFF_CART && typeof window.XFF_CART.loadCart === "function") {
    window.XFF_CART.loadCart();
  }

  // Global Cart Modal Trigger Buttons
  const openCartBtn = document.getElementById("openCartBtn");
  const closeCartBtn = document.getElementById("closeCartModalBtn");
  const cartModal = document.getElementById("cartModal");
  const submitOrderBtn = document.getElementById("submitOrderBtn");

  if (openCartBtn) {
    openCartBtn.addEventListener("click", () => window.XFF_CART.openCartModal());
  }
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => window.XFF_CART.closeCartModal());
  }
  if (cartModal) {
    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) window.XFF_CART.closeCartModal();
    });
  }
  if (submitOrderBtn) {
    submitOrderBtn.addEventListener("click", () => {
      window.XFF_UI.showToast("تم إرسال طلبك إلى المطبخ بنجاح! شكراً لك.");
      window.XFF_CART.clearCart();
    });
  }

  // Escape key closes modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (window.XFF_MODAL) window.XFF_MODAL.close();
      if (window.XFF_CART) window.XFF_CART.closeCartModal();
      const drawer = document.getElementById("mobileDrawer");
      if (drawer) drawer.classList.remove("open");
    }
  });

  // -------------------------------------------------------------
  // 3. Menu Page Logic (if on menu.html or page with menuContainer)
  // -------------------------------------------------------------
  const menuContainer = document.getElementById("menuContainer");
  if (menuContainer && window.XFF_DATA && window.XFF_DATA.menu) {
    let currentCategory = "all";
    let currentSearch = "";

    function renderMenu() {
      const categories = ["noodles", "burgers", "liangpi", "dumplings", "drinks"];
      let anyMatches = false;

      categories.forEach(cat => {
        const section = document.getElementById("section-" + cat);
        if (!section) return;

        const grid = section.querySelector(".menu-grid");
        if (!grid) return;

        const filtered = window.XFF_SEARCH.filter(window.XFF_DATA.menu, currentSearch, currentCategory === "all" ? cat : currentCategory);

        if (filtered.length > 0 && (currentCategory === "all" || currentCategory === cat)) {
          anyMatches = true;
          section.style.display = "block";
          grid.innerHTML = filtered.map(item => `
            <article class="product-card" data-item-id="${item.id}" role="button" tabindex="0">
              <div class="product-card-thumb-wrap">
                <img class="product-card-thumb" src="${item.image}" alt="${item.englishName}" loading="lazy" width="110" height="110">
              </div>

              <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 2px;">
                        <span class="sku-badge">${item.sku}</span>
                        <span style="font-family: var(--font-chinese); font-size: 0.95rem; font-weight: 700; color: var(--xff-red);">${item.chineseName}</span>
                      </div>
                      <h3 style="font-size: 1.05rem; font-weight: 800; line-height: 1.25; margin-bottom: 2px;">${item.name}</h3>
                      <div style="font-family: var(--font-display); font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">
                        ${item.englishName}
                      </div>
                    </div>

                    <span class="chinese-seal" style="font-size: 0.72rem; padding: 0.1rem 0.35rem; white-space: nowrap;">${item.badge}</span>
                  </div>

                  <p style="font-size: 0.8rem; color: #475569; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-top: 0.35rem;">
                    ${item.description}
                  </p>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.65rem; border-top: 1px dashed #e2e8f0; padding-top: 0.45rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div>
                      <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 900; color: var(--xff-coal);">${item.price}</span>
                      <span style="font-size: 0.75rem; font-weight: 700; color: #64748b;">ر.س</span>
                    </div>
                    <span class="spice-meter">${item.spiceLevel}</span>
                  </div>

                  <button class="btn-add-mini add-direct-btn" data-item-id="${item.id}" aria-label="إضافة ${item.sku} إلى السلة">
                    <i class="ph-bold ph-plus"></i>
                  </button>
                </div>
              </div>
            </article>
          `).join("");
        } else {
          section.style.display = "none";
          grid.innerHTML = "";
        }
      });

      const noResults = document.getElementById("noResults");
      if (noResults) {
        noResults.style.display = anyMatches ? "none" : "block";
      }

      attachCardClicks();
    }

    function attachCardClicks() {
      document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", (e) => {
          if (e.target.closest(".add-direct-btn")) return;
          const itemId = card.getAttribute("data-item-id");
          window.XFF_MODAL.open(itemId);
        });
      });

      document.querySelectorAll(".add-direct-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const itemId = btn.getAttribute("data-item-id");
          const item = window.XFF_DATA.menu.find(i => i.id === itemId);
          if (item) {
            window.XFF_CART.addToCart(item, 1, "حرارة أصلية (Regular)", "");
            window.XFF_UI.showToast(`تمت إضافة [${item.sku}] إلى طلبك!`);
          }
        });
      });
    }

    // Initialize Search & Categories
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      window.XFF_SEARCH.init(searchInput, (query) => {
        currentSearch = query;
        renderMenu();
      });
    }

    window.XFF_UI.initCategoryTabs((cat) => {
      currentCategory = cat;
      renderMenu();
    });

    if (window.XFF_MODAL) {
      window.XFF_MODAL.init();
    }

    renderMenu();
  }

  // -------------------------------------------------------------
  // 4. Locations Page Logic (if on locations.html)
  // -------------------------------------------------------------
  const locationsGrid = document.getElementById("locationsGrid");
  if (locationsGrid && window.XFF_DATA && window.XFF_DATA.locations) {
    locationsGrid.innerHTML = window.XFF_DATA.locations.map(loc => `
      <div class="location-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <span class="location-status status-${loc.statusType}">
              <span style="width: 6px; height: 6px; border-radius: 50%; background-color: currentColor;"></span>
              ${loc.status}
            </span>
            <span style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--xff-red);">${loc.city}</span>
          </div>

          <h3 style="font-size: 1.25rem; font-weight: 900; margin-bottom: 0.4rem;">${loc.name}</h3>
          <p style="font-size: 0.88rem; color: #475569; margin-bottom: 0.75rem;">
            <i class="ph-bold ph-map-pin" style="color: var(--xff-red); vertical-align: middle;"></i> ${loc.address}
          </p>
          <p style="font-size: 0.82rem; color: #64748b; margin-bottom: 0.5rem;">
            <i class="ph-bold ph-clock" style="vertical-align: middle;"></i> ${loc.hours}
          </p>
          <p style="font-size: 0.82rem; color: #64748b;">
            <i class="ph-bold ph-phone" style="vertical-align: middle;"></i> ${loc.phone}
          </p>
        </div>

        <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px dashed #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem; color: #94a3b8;">${loc.note}</span>
          <a href="https://maps.google.com/?q=${encodeURIComponent(loc.address)}" target="_blank" rel="noopener" class="btn-xff-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.82rem; min-height: 32px;">
            الاتجاهات <i class="ph-bold ph-arrow-square-out"></i>
          </a>
        </div>
      </div>
    `).join("");
  }

  // -------------------------------------------------------------
  // 5. Contact / FAQ Logic (if on contact.html)
  // -------------------------------------------------------------
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector("i");
      if (!answer) return;

      const isOpen = answer.style.display !== "none";
      answer.style.display = isOpen ? "none" : "block";
      if (icon) {
        icon.className = isOpen ? "ph-bold ph-caret-down" : "ph-bold ph-caret-up";
      }
    });
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.XFF_UI.showToast("تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا قريباً.");
      contactForm.reset();
    });
  }
});
