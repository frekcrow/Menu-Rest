/**
 * KUDO KUDO - Navigation & UI Controls
 * Mobile drawer, Category tabs, Toast notifications
 */

"use strict";

window.XFF_UI = (function () {
  let toastTimer = null;

  function showToast(msg) {
    const toast = document.getElementById("toastNotice");
    const msgEl = document.getElementById("toastMessage");
    if (!toast) return;

    if (msgEl) msgEl.textContent = msg;
    toast.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  function initMobileDrawer() {
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const drawer = document.getElementById("mobileDrawer");
    const closeBtn = document.getElementById("closeMobileDrawer");

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener("click", () => {
        drawer.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener("click", () => {
        drawer.classList.remove("open");
        document.body.style.overflow = "";
      });
    }

    if (drawer) {
      drawer.addEventListener("click", (e) => {
        if (e.target === drawer) {
          drawer.classList.remove("open");
          document.body.style.overflow = "";
        }
      });

      // Apple HIG Swipe-to-dismiss for RTL drawer
      const drawerContent = drawer.querySelector(".mobile-drawer-content");
      if (drawerContent) {
        let drawerStartX = 0;
        drawerContent.addEventListener("touchstart", (e) => {
          drawerStartX = e.touches[0].clientX;
        }, { passive: true });

        drawerContent.addEventListener("touchend", (e) => {
          const deltaX = e.changedTouches[0].clientX - drawerStartX;
          // In RTL layout with drawer on the right edge, swiping right dismisses
          if (deltaX > 60) {
            drawer.classList.remove("open");
            document.body.style.overflow = "";
          }
        });
      }
    }
  }

  function initCategoryTabs(onCategoryChange) {
    const tabs = document.querySelectorAll(".category-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const cat = tab.getAttribute("data-category");
        if (typeof onCategoryChange === "function") {
          onCategoryChange(cat);
        }

        const menuContainer = document.getElementById("menuContainer");
        if (menuContainer) {
          const offset = menuContainer.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
        }
      });
    });
  }

  return {
    showToast,
    initDrawer: initMobileDrawer,
    initCategoryTabs
  };
})();
