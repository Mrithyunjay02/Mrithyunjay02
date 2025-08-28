"use strict";

/**
 * Toggle the "active" class on a given element.
 */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ===========================
// SIDEBAR TOGGLE
// ===========================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Toggle sidebar (for mobile)
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// ===========================
// PROJECT MODALS (FIXED)
// ===========================
document.querySelectorAll("[data-modal-target]").forEach((card) => {
  card.addEventListener("click", () => {
    const modalId = card.getAttribute("data-modal-target");
    const modalEl = document.querySelector(modalId);
    if (modalEl) {
      modalEl.classList.add("active");
    }
  });
});

document.querySelectorAll("[data-modal-close], .overlay").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      modal.classList.remove("active");
    });
  });
});

// ===========================
// CUSTOM SELECT & FILTER
// ===========================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

const filterFunc = function (selectedValue) {
  filterItems.forEach((item) => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// ===========================
// CONTACT FORM VALIDATION
// ===========================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      formBtn.disabled = !form.checkValidity();
    });
  });
}

// ===========================
// PAGE NAVIGATION (FIXED)
// ===========================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to switch pages
const switchPage = (targetPage) => {
  if (!targetPage) return;

  let found = false;

  pages.forEach((page) => {
    const isTarget = page.dataset.page === targetPage;
    page.classList.toggle("active", isTarget);
    if (isTarget) found = true;
  });

  navigationLinks.forEach((nav) => {
    nav.classList.toggle("active", nav.getAttribute("data-target") === targetPage);
  });

  // Fallback if not found
  if (!found) {
    pages.forEach((page) => page.classList.remove("active"));
    document.querySelector('[data-page="about"]').classList.add("active");
  }

  window.scrollTo(0, 0);
};

// Event listener for navigation links
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const targetPage = this.getAttribute("data-target");
    switchPage(targetPage);
  });
});

// ===========================
// PAGE LOAD HANDLING (ENSURES CORRECT PAGE IS ACTIVE ON REFRESH)
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = document.querySelector("[data-page].active");
  if (!currentPage) {
    switchPage("about"); // Default to 'About' if no page is active
  }
});
