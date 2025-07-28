// hàm xử lý check box
function initCheckAll(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const checkAll = container.querySelector("#checkAll");
  const checkboxes = container.querySelectorAll(
    '.check-all-list input[type="checkbox"]'
  );


  const selectedCount = container.querySelector("#selectedCount");
  
  // hàm update trạng thái khi thay đổi
  function updateCheckAll() {
    const checkedCount = Array.from(checkboxes).filter(
      (cb) => cb.checked
    ).length;

    selectedCount.textContent = checkedCount;
    
    if (checkedCount === checkboxes.length) {
      checkAll.checked = true;
      // indeterminate là một thuộc tính của checkbox
      // dùng để thể hiện trạng thái trung gian
      // thường dùng trong trường hợp checkbox cha đại diện cho nhiều checkbox co
      checkAll.indeterminate = false;
    } else if (checkedCount > 0) {
      checkAll.checked = false;
      checkAll.indeterminate = true;
    } else {
      checkAll.checked = false;
      checkAll.indeterminate = false;
    }
  }
  // lắng nghe khi thay đổi 
  // khi checkboxall được bật thì checkbox con được tính hết 
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
