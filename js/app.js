/**
 * Xi'an Famous Foods (XFF) Menu Application
 * Pure Vanilla JavaScript - iOS 15.3 WebKit Compatible
 */

"use strict";

(function () {
  // Authentic Xi'an Famous Foods Menu Dataset
  const MENU_ITEMS = [
    // -------------------------------------------------------------
    // [ N Series ] HAND-RIPPED NOODLES (扯面系列)
    // -------------------------------------------------------------
    {
      id: "N1",
      sku: "N1",
      chineseName: "孜然羊肉扯面",
      englishName: "Spicy Cumin Lamb Hand-Ripped Noodles",
      name: "نودلز لحم الضأن بالكمون الحار (بيانغ بيانغ)",
      category: "noodles",
      categoryName: "نودلز مسحوبة يدوياً",
      description: "النودلز العريضة الأشهر في شيآن تُسحب باليد عند كل طلب. تُقلب مع شرائح لحم الضأن المتبل بالكمون المحمص، البصل الأحمر، الثوم، وزيت الفلفل الحار مع الخل الأسود المعتق.",
      price: 46,
      calories: 780,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "الأكثر شهرة",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "N2",
      sku: "N2",
      chineseName: "孜然牛肉扯面",
      englishName: "Spicy Cumin Beef Hand-Ripped Noodles",
      name: "نودلز لحم البقر بالكمون الحار",
      category: "noodles",
      categoryName: "نودلز مسحوبة يدوياً",
      description: "نودلز عريضة طازجة ومطاطية مع شرائح لحم بقر أنجوس طرية متبلة بخلطة الكمون الحارة، الكرفس، والبصل الأخضر، مغمورة بصلصة شيآن الحارة الحامضة.",
      price: 44,
      calories: 740,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "توصية الشيف",
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "N3",
      sku: "N3",
      chineseName: "岐山臊子汤面",
      englishName: "Mt. Qi Savory Beef Hand-Ripped Noodles in Soup",
      name: "حساء نودلز جبل تشي بقطع اللحم والخل الأسود",
      category: "noodles",
      categoryName: "نودلز مسحوبة يدوياً",
      description: "شوربة نودلز ساخنة بطعم الخل الحامض المميز، قطع لحم مطبوخة على نار هادئة، فطر أذن الخشب الأسود، مكعبات التوفو، والبيض المقلي المقطع.",
      price: 42,
      calories: 690,
      spiceLevel: "🌶️ معتدل الحار",
      badge: "حساء ساخن",
      image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "N9",
      sku: "N9",
      chineseName: "炸酱干扯面",
      englishName: "Savory Zha Jiang Hand-Ripped Noodles",
      name: "نودلز تشا جيانغ بصلصة الفاصوليا واللحم المفروم",
      category: "noodles",
      categoryName: "نودلز مسحوبة يدوياً",
      description: "نودلز جافة مسحوبة يدوياً تعلوها صلصة فول الصويا المخمرة مع اللحم المفروم، شرائح الخيار المنعشة، وبراعم الفاصوليا المقرمشة.",
      price: 39,
      calories: 670,
      spiceLevel: "🚫 غير حار",
      badge: "كلاسيك شيآن",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },

    // -------------------------------------------------------------
    // [ B Series ] ROUJIAMO BURGERS (夹馍系列)
    // -------------------------------------------------------------
    {
      id: "B1",
      sku: "B1",
      chineseName: "腊汁牛肉夹馍",
      englishName: "Stewed Beef Roujiamo Burger",
      name: "برجر شيآن بلحم البقر المطهو ببطء (روجيامو)",
      category: "burgers",
      categoryName: "برجر وفطائر روجيامو",
      description: "خبز روجيامو المقرمش المحضر طازجاً في الفرن، محشو بلحم البقر المفروم المطهو لساعات في مرق التوابل الصينية العطرية حتى يذوب في الفم.",
      price: 28,
      calories: 450,
      spiceLevel: "🚫 غير حار",
      badge: "الأصل منذ 2005",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "B2",
      sku: "B2",
      chineseName: "孜然羊肉夹馍",
      englishName: "Spicy Cumin Lamb Roujiamo Burger",
      name: "برجر روجيامو لحم الضأن بالكمون الحار",
      category: "burgers",
      categoryName: "برجر وفطائر روجيامو",
      description: "الساندويتش الأشهر في شوارع شمال غرب الصين: خبز مسطح مقرمش محشو بشرائح لحم الضأن المقلية بالكمون الحار، الفلفل الأخضر، والبصل.",
      price: 29,
      calories: 480,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "الأكثر طلباً",
      image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80"
    },

    // -------------------------------------------------------------
    // [ A Series ] LIANG PI & COLD DISHES (凉皮凉菜)
    // -------------------------------------------------------------
    {
      id: "A1",
      sku: "A1",
      chineseName: "凉皮",
      englishName: "Liang Pi 'Cold-Skin' Noodles",
      name: "نودلز ليانغ بي الباردة بصلصة الخل وزيت الفلفل",
      category: "liangpi",
      categoryName: "ليانغ بي ومقبلات باردة",
      description: "طبق شيآن الأسطوري: نودلز قمح باردة حريرية مع مكعبات السيتان الاسفنجية التي تمتص صلصة الخل الأسود والثوم وزيت الفلفل الحار، تقدم مع الخيار والكزبرة.",
      price: 26,
      calories: 380,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "نباتي شهير",
      image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "A2",
      sku: "A2",
      chineseName: "老虎菜",
      englishName: "Tiger Vegetable Salad",
      name: "سلطة النمر المنعشة بالفلفل والكزبرة",
      category: "liangpi",
      categoryName: "ليانغ بي ومقبلات باردة",
      description: "سلطة صيفية حارقة ومنعشة مكونة من أعواد الفلفل الحار الطازج، الكزبرة الخضراء، الكراث، وزيت السمسم المحمص مع خل الأرز.",
      price: 22,
      calories: 140,
      spiceLevel: "🌶️🌶️ حار",
      badge: "منعش ومقرمش",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "A3",
      sku: "A3",
      chineseName: "蒜泥拍黄瓜",
      englishName: "Smashed Garlic Cucumbers",
      name: "خيار مكسور بصلصة الثوم والخل المعتق",
      category: "liangpi",
      categoryName: "ليانغ بي ومقبلات باردة",
      description: "قطع خيار طازجة مكسورة بالسكين لتمتص التتبيلة الغنية بالثوم المهروس، زيت الفلفل الحار، وزيت السمسم الفاخر.",
      price: 20,
      calories: 110,
      spiceLevel: "🌶️ خفيف",
      badge: "مقبلات",
      image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80"
    },

    // -------------------------------------------------------------
    // [ F Series ] DUMPLINGS & SOUPS (水饺泡馍)
    // -------------------------------------------------------------
    {
      id: "F1",
      sku: "F1",
      chineseName: "长安豆花",
      englishName: "Chang'An Spicy Tofu Custard",
      name: "حلوى التوفو الحارة الدافئة بطريقة تشانغ آن",
      category: "dumplings",
      categoryName: "زلابية وشوربات حارة",
      description: "توفو حريري ناعم يُقدم دافئاً مع مخلل الخضار المقرمش، الكزبرة، فول الصويا المحمص، وصلصات شيآن الحامضة والمالحة.",
      price: 24,
      calories: 220,
      spiceLevel: "🌶️🌶️ حار",
      badge: "توفو طازج",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "F4",
      sku: "F4",
      chineseName: "酸辣羊肉水饺",
      englishName: "Spicy & Sour Lamb Dumplings (8 pcs)",
      name: "زلابية لحم الضأن في حساء الخل وزيت الفلفل (8 قطع)",
      category: "dumplings",
      categoryName: "زلابية وشوربات حارة",
      description: "زلابية مصنوعة يدوياً ومحشوة بلحم الضأن والتوابل، تسبح في وعاء من صلصة الخل الأسود والزيت الحار مع الكزبرة وبذور السمسم.",
      price: 36,
      calories: 490,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "الأكثر مبيعاً",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
    },

    // -------------------------------------------------------------
    // [ D Series ] DRINKS & TEAS (特色饮品)
    // -------------------------------------------------------------
    {
      id: "D1",
      sku: "D1",
      chineseName: "山楂酸梅汤",
      englishName: "Sour Hawthorn & Plum Herbal Tea",
      name: "مشروب الزعرور والبرقوق المجفف (المهدئ للحرارة)",
      category: "drinks",
      categoryName: "مشروبات الشاي والباشن",
      description: "المشروب التراثي الأول لمرافقة الأطعمة الحارة في شيآن: يُغلى من ثمار الزعرور والبرقوق المدخن وسكر النبات، يُقدم مثلجاً ليهدئ الفم من حرارة الفلفل.",
      price: 18,
      calories: 130,
      spiceLevel: "🚫 غير حار",
      badge: "مهدئ للحرارة",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "D2",
      sku: "D2",
      chineseName: "百香果茉莉绿茶",
      englishName: "Iced Jasmine Green Tea with Passion Fruit",
      name: "شاي الياسمين الأخضر المنعش بالباشن فروت",
      category: "drinks",
      categoryName: "مشروبات الشاي والباشن",
      description: "شاي أخضر بزهور الياسمين الطبيعية يُحضر بارداً مع لب فاكهة الباشن فروت وأوراق النعناع الطازجة.",
      price: 22,
      calories: 140,
      spiceLevel: "🚫 غير حار",
      badge: "طازج 100%",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Application State
  const state = {
    cart: [],
    activeCategory: "all",
    searchQuery: "",
    selectedItem: null,
    selectedSpice: "regular",
    modalQty: 1
  };

  // DOM Elements
  const searchInput = document.getElementById("searchInput");
  const categoryTabs = document.querySelectorAll(".category-tab");
  const noResultsNotice = document.getElementById("noResults");
  const cartBar = document.getElementById("cartBar");
  const cartCountBadge = document.getElementById("cartCountBadge");
  const cartTotalPrice = document.getElementById("cartTotalPrice");
  const openCartBtn = document.getElementById("openCartBtn");

  // Item Modal Elements
  const itemModal = document.getElementById("itemModal");
  const modalSheet = document.getElementById("modalSheet");
  const closeItemModalBtn = document.getElementById("closeItemModalBtn");
  const modalSkuBadge = document.getElementById("modalSkuBadge");
  const modalChineseTitle = document.getElementById("modalChineseTitle");
  const modalItemTitle = document.getElementById("modalItemTitle");
  const modalItemEnTitle = document.getElementById("modalItemEnTitle");
  const modalItemImage = document.getElementById("modalItemImage");
  const modalItemSpice = document.getElementById("modalItemSpice");
  const modalItemCalories = document.getElementById("modalItemCalories");
  const modalItemBadge = document.getElementById("modalItemBadge");
  const modalItemDesc = document.getElementById("modalItemDesc");
  const modalItemNotes = document.getElementById("itemNotes");
  const modalTotalCalculated = document.getElementById("modalTotalCalculated");
  const modalQtyDisplay = document.getElementById("modalQtyDisplay");
  const modalMinusBtn = document.getElementById("modalMinusBtn");
  const modalPlusBtn = document.getElementById("modalPlusBtn");
  const modalAddToCartBtn = document.getElementById("modalAddToCartBtn");

  // Cart Modal Elements
  const cartModal = document.getElementById("cartModal");
  const closeCartModalBtn = document.getElementById("closeCartModalBtn");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartTax = document.getElementById("cartTax");
  const cartFinalTotal = document.getElementById("cartFinalTotal");
  const submitOrderBtn = document.getElementById("submitOrderBtn");

  // Toast Notice
  const toastNotice = document.getElementById("toastNotice");
  const toastMessage = document.getElementById("toastMessage");
  let toastTimer = null;

  // Render Menu Items
  function renderMenu() {
    const categories = ["noodles", "burgers", "liangpi", "dumplings", "drinks"];
    let anyMatches = false;

    categories.forEach(function (cat) {
      const section = document.getElementById("section-" + cat);
      if (!section) return;

      const grid = section.querySelector(".menu-grid");
      if (!grid) return;

      // Filter items
      const items = MENU_ITEMS.filter(function (item) {
        if (item.category !== cat) return false;
        if (state.activeCategory !== "all" && state.activeCategory !== cat) return false;
        if (state.searchQuery.trim() !== "") {
          const q = state.searchQuery.trim().toLowerCase();
          const matchSku = item.sku.toLowerCase().includes(q);
          const matchName = item.name.toLowerCase().includes(q);
          const matchEn = item.englishName.toLowerCase().includes(q);
          const matchZh = item.chineseName.includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          return matchSku || matchName || matchEn || matchZh || matchDesc;
        }
        return true;
      });

      if (items.length > 0) {
        anyMatches = true;
        section.style.display = "block";
        grid.innerHTML = items.map(function (item) {
          return `
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

                  <button class="btn-add-mini add-direct-btn" data-item-id="${item.id}" aria-label="إضافة ${item.sku} ${item.name} إلى السلة">
                    <i class="ph-bold ph-plus"></i>
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join("");
      } else {
        section.style.display = "none";
        grid.innerHTML = "";
      }
    });

    if (noResultsNotice) {
      noResultsNotice.style.display = anyMatches ? "none" : "block";
    }

    attachCardEventListeners();
  }

  function attachCardEventListeners() {
    // Open product modal when tapping a card
    document.querySelectorAll(".product-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".add-direct-btn")) return;
        const itemId = card.getAttribute("data-item-id");
        openItemModal(itemId);
      });
    });

    // Add directly to cart button
    document.querySelectorAll(".add-direct-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const itemId = btn.getAttribute("data-item-id");
        const item = MENU_ITEMS.find(function (i) { return i.id === itemId; });
        if (item) {
          addToCart(item, 1, "حرارة أصلية (Regular)", "");
          showToast(`تمت إضافة [${item.sku}] ${item.name} إلى طلبك`);
        }
      });
    });
  }

  // Open Item Detail Modal
  function openItemModal(itemId) {
    const item = MENU_ITEMS.find(function (i) { return i.id === itemId; });
    if (!item) return;

    state.selectedItem = item;
    state.modalQty = 1;

    modalSkuBadge.textContent = item.sku;
    modalChineseTitle.textContent = item.chineseName;
    modalItemTitle.textContent = item.name;
    modalItemEnTitle.textContent = item.englishName;
    modalItemImage.src = item.image;
    modalItemImage.alt = item.englishName;
    modalItemSpice.textContent = item.spiceLevel;
    modalItemCalories.innerHTML = `<i class="ph ph-fire"></i> ${item.calories} kcal`;
    modalItemBadge.textContent = item.badge;
    modalItemDesc.textContent = item.description;
    modalItemNotes.value = "";
    updateModalPrice();

    itemModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeItemModal() {
    itemModal.classList.remove("active");
    document.body.style.overflow = "";
    state.selectedItem = null;
  }

  function updateModalPrice() {
    if (!state.selectedItem) return;
    modalQtyDisplay.textContent = state.modalQty;
    modalTotalCalculated.textContent = (state.selectedItem.price * state.modalQty);
  }

  // Cart Management
  function addToCart(item, qty, spiceChoice, notes) {
    const compositeKey = `${item.id}_${spiceChoice}_${notes || ""}`;
    const existingIndex = state.cart.findIndex(function (c) {
      return c.compositeKey === compositeKey;
    });

    if (existingIndex > -1) {
      state.cart[existingIndex].qty += qty;
    } else {
      state.cart.push({
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
    if (state.cart[index]) {
      state.cart[index].qty += delta;
      if (state.cart[index].qty <= 0) {
        state.cart.splice(index, 1);
      }
      saveCart();
      renderCartBar();
      renderCartModalList();
    }
  }

  function getCartTotals() {
    const totalCount = state.cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    const subtotal = state.cart.reduce(function (sum, item) { return sum + (item.price * item.qty); }, 0);
    const tax = Math.round(subtotal * 0.15);
    const finalTotal = subtotal;

    return {
      totalCount: totalCount,
      subtotal: subtotal,
      tax: tax,
      finalTotal: finalTotal
    };
  }

  function renderCartBar() {
    const totals = getCartTotals();
    if (totals.totalCount > 0) {
      cartBar.classList.remove("hidden");
      cartCountBadge.textContent = totals.totalCount;
      cartTotalPrice.textContent = totals.finalTotal;
    } else {
      cartBar.classList.add("hidden");
      closeCartModal();
    }
  }

  function renderCartModalList() {
    if (!cartItemsList) return;
    const totals = getCartTotals();

    cartSubtotal.textContent = (totals.subtotal - totals.tax);
    cartTax.textContent = totals.tax;
    cartFinalTotal.textContent = totals.finalTotal;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: #64748b;">
          <i class="ph ph-shopping-bag" style="font-size: 3rem; color: #cbd5e1; display: block; margin-bottom: 0.5rem;"></i>
          <p style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; text-transform: uppercase;">سلة طلباتك فارغة</p>
        </div>
      `;
      submitOrderBtn.style.display = "none";
      return;
    }

    submitOrderBtn.style.display = "flex";
    cartItemsList.innerHTML = state.cart.map(function (item, index) {
      return `
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
            <button class="qty-btn" onclick="window.__updateCartQty(${index}, -1)" aria-label="تقليل">-</button>
            <span style="font-family: var(--font-mono); font-weight: 900; min-width: 18px; text-align: center; font-size: 0.95rem;">${item.qty}</span>
            <button class="qty-btn" onclick="window.__updateCartQty(${index}, 1)" aria-label="زيادة">+</button>
          </div>
        </div>
      `;
    }).join("");
  }

  // Window bridge for cart list inline click
  window.__updateCartQty = function (index, delta) {
    updateCartItemQty(index, delta);
  };

  function openCartModal() {
    renderCartModalList();
    cartModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCartModal() {
    cartModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function saveCart() {
    try {
      localStorage.setItem("xff_menu_cart", JSON.stringify(state.cart));
    } catch (e) {}
  }

  function loadCart() {
    try {
      const saved = localStorage.getItem("xff_menu_cart");
      if (saved) {
        state.cart = JSON.parse(saved);
        renderCartBar();
      }
    } catch (e) {}
  }

  // Toast System
  function showToast(msg) {
    if (!toastNotice) return;
    toastMessage.textContent = msg;
    toastNotice.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastNotice.classList.remove("show");
    }, 2800);
  }

  // Category Tabs Handling
  categoryTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      categoryTabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");

      const cat = tab.getAttribute("data-category");
      state.activeCategory = cat;

      if (cat === "all") {
        renderMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        renderMenu();
        const section = document.getElementById("section-" + cat);
        if (section) {
          const offset = section.getBoundingClientRect().top + window.pageYOffset - 130;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }
    });
  });

  // Search Input Debouncing
  let searchDebounceTimer = null;
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(function () {
        state.searchQuery = e.target.value;
        renderMenu();
      }, 150);
    });
  }

  // Stepper Listeners
  if (modalMinusBtn) {
    modalMinusBtn.addEventListener("click", function () {
      if (state.modalQty > 1) {
        state.modalQty -= 1;
        updateModalPrice();
      }
    });
  }

  if (modalPlusBtn) {
    modalPlusBtn.addEventListener("click", function () {
      state.modalQty += 1;
      updateModalPrice();
    });
  }

  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener("click", function () {
      if (state.selectedItem) {
        const notes = (modalItemNotes.value || "").trim();
        const selectedRadio = document.querySelector('input[name="spiceSelection"]:checked');
        let spiceText = "حرارة أصلية (Regular)";
        if (selectedRadio) {
          if (selectedRadio.value === "mild") spiceText = "حرارة خفيفة (Mild)";
          if (selectedRadio.value === "extra") spiceText = "حار جداً بزيت الفلفل (Extra Hot)";
        }

        addToCart(state.selectedItem, state.modalQty, spiceText, notes);
        closeItemModal();
        showToast(`تمت إضافة [${state.selectedItem.sku}] إلى طلبك بنجاح!`);
      }
    });
  }

  // Close Modal Buttons
  if (closeItemModalBtn) closeItemModalBtn.addEventListener("click", closeItemModal);
  if (itemModal) {
    itemModal.addEventListener("click", function (e) {
      if (e.target === itemModal) closeItemModal();
    });
  }

  if (openCartBtn) openCartBtn.addEventListener("click", openCartModal);
  if (closeCartModalBtn) closeCartModalBtn.addEventListener("click", closeCartModal);
  if (cartModal) {
    cartModal.addEventListener("click", function (e) {
      if (e.target === cartModal) closeCartModal();
    });
  }

  // Submit Order Action
  if (submitOrderBtn) {
    submitOrderBtn.addEventListener("click", function () {
      showToast("تم إرسال الطلب بنجاح إلى المطبخ! شكراً لزيارتك.");
      state.cart = [];
      saveCart();
      renderCartBar();
      closeCartModal();
    });
  }

  // Escape key accessibility
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeItemModal();
      closeCartModal();
    }
  });

  // Initial Load
  loadCart();
  renderMenu();
})();
