/**
 * KUDO KUDO - Search Filter Module
 * Multilingual & SKU Search
 */

"use strict";

window.XFF_SEARCH = (function () {
  let debounceTimer = null;

  function initSearch(inputElement, onSearchCallback) {
    if (!inputElement) return;

    inputElement.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = e.target.value.trim().toLowerCase();
        if (typeof onSearchCallback === "function") {
          onSearchCallback(query);
        }
      }, 150);
    });
  }

  function filterItems(items, query, activeCategory) {
    return items.filter(item => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      if (!query) return true;

      const matchSku = item.sku.toLowerCase().includes(query);
      const matchName = item.name.toLowerCase().includes(query);
      const matchEn = item.englishName.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);

      return matchSku || matchName || matchEn || matchDesc;
    });
  }

  return {
    init: initSearch,
    filter: filterItems
  };
})();
