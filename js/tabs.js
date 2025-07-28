const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const container = $$("#container");

const param = new URLSearchParams(location.search);

console.log(param);

container.forEach((tabs) => {
  // lấy ra Id của các tab
  const tab = tabs.querySelector(".tab");
  const tabId = tab.id;

  const tabIndex = param.get(tabId) ?? 0;


  const tabItems = tabs.querySelectorAll(".tab-item");
  const contents = tabs.querySelectorAll(".content");
  if (tabItems.length) {
    tabItems[tabIndex].classList.add("active");
  }
  if (contents.length) {
    contents[tabIndex].classList.add("active");
  }
  tabItems.forEach((tabItem, tabIndex) => {
    tabItem.onclick = function () {
      if(tabIndex !== 0){
          param.set(tabId, tabIndex);
      }
      else{
        param.delete(tabId);
      }
      const paramStr = param.size ? `?${param}` : "";
      const newUrl = `${location.pathname}${paramStr}${location.hash}`;
      history.replaceState(null,null, newUrl);

      // Cách 1
      // các nút đang active thì xóa đi
      // tabItems.forEach((item) => item.classList.remove("active"));

      // Cách 2
      // Từ thẻ cha bắt active đến thẻ con xem thẻ con có active hay không
      // Nếu thẻ con có active thì xóa active ở phần từ đó đi
      const activeItem = tabs.querySelector(".tab-item.active");
      if (activeItem) {
        activeItem.classList.remove("active");
      }
      // các nút khi được bấm thì active vào
      this.classList.add("active");

      // xử lý active content
      const activeContent = tabs.querySelector(".content.active");
      if (activeContent) {
        activeContent.classList.remove("active");
      }
      contents[tabIndex].classList.add("active");
    };

    // khi click sẽ chạy lên hàm
    document.addEventListener("keydown", (e) => {
      //  chuyển chuỗi sang số  tabItem.onclick  và bỏ qua tabItems.forEach
      const keyNumber = parseInt(e.key);
      if (!isNaN(keyNumber) && keyNumber >= 1 && keyNumber <= tabItems.length) {
        tabItems[keyNumber - 1].click();
      }
    });
  });
});
