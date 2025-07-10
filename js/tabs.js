function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const tabItems = container.querySelectorAll(".tab-item");
  const tabPanes = container.querySelectorAll(".tab-pane");

  function activateTab(tabIndex) {
    tabItems.forEach((item) => item.classList.remove("active"));
    tabPanes.forEach((pane) => pane.classList.remove("active"));

    const targetItem = container.querySelector(
      `.tab-item[data-tab="${tabIndex}"]`
    );
    const targetPane = container.querySelector(
      `.tab-pane[data-tab="${tabIndex}"]`
    );

    if (targetItem && targetPane) {
      targetItem.classList.add("active");
      targetPane.classList.add("active");
    }
  }

  tabItems.forEach((item) => {
    item.addEventListener("click", () => {
      activateTab(item.dataset.tab);
    });
  });

  document.addEventListener("keydown", (e) => {
    const tabIndex = parseInt(e.key);
    if (
      !isNaN(tabIndex) &&
      container.querySelector(`.tab-item[data-tab="${tabIndex}"]`)
    ) {
      activateTab(tabIndex);
    }
  });

  // Initialize active tab
  const activeItem = container.querySelector(".tab-item.active");
  if (activeItem) {
    activateTab(activeItem.dataset.tab);
  }
}

initTabs(".tabs-container");
