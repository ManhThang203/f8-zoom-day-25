// hàm xử lý check box
function initCheckAll(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const checkAll = container.querySelector("#checkAll");
  const checkboxes = container.querySelectorAll(
    '.check-all-list input[type="checkbox"]'
  );
  const selectedCount = container.querySelector("#selectedCount");

  function updateCheckAll() {
    const checkedCount = Array.from(checkboxes).filter(
      (cb) => cb.checked
    ).length;
    selectedCount.textContent = checkedCount;

    if (checkedCount === checkboxes.length) {
      checkAll.checked = true;
      checkAll.indeterminate = false;
    } else if (checkedCount > 0) {
      checkAll.checked = false;
      checkAll.indeterminate = true;
    } else {
      checkAll.checked = false;
      checkAll.indeterminate = false;
    }
  }

  checkAll.addEventListener("change", () => {
    checkboxes.forEach((cb) => (cb.checked = checkAll.checked));
    checkAll.indeterminate = false;
    selectedCount.textContent = checkAll.checked ? checkboxes.length : 0;
  });

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", updateCheckAll);
  });

  updateCheckAll();
}

initCheckAll(".container");
