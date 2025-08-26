// ===== 全域變數 =====
let currentView = "layout";
let currentArea = null;

// 模擬店面區域資料
const storeAreas = {
  A: {
    name: "廚房用品",
    description: "料理工具、廚房家電、烹飪用品",
    shelvesCount: 6,
    usageRate: 92,
    bestsellers: 3,
    alerts: 0,
    shelves: [
      { id: "A1", name: "廚具櫃", status: "normal", usage: 95, products: 18 },
      {
        id: "A2",
        name: "家電區",
        status: "bestseller",
        usage: 100,
        products: 20,
      },
      { id: "A3", name: "烘焙用品", status: "normal", usage: 88, products: 16 },
      {
        id: "A4",
        name: "餐具展示",
        status: "bestseller",
        usage: 92,
        products: 17,
      },
      { id: "A5", name: "保鮮用品", status: "normal", usage: 85, products: 15 },
      {
        id: "A6",
        name: "清潔用品",
        status: "bestseller",
        usage: 90,
        products: 18,
      },
    ],
  },
  B: {
    name: "居家生活",
    description: "家居裝飾、收納整理、居家用品",
    shelvesCount: 4,
    usageRate: 78,
    bestsellers: 1,
    alerts: 1,
    shelves: [
      { id: "B1", name: "收納用品", status: "normal", usage: 82, products: 14 },
      { id: "B2", name: "裝飾品", status: "normal", usage: 75, products: 12 },
      {
        id: "B3",
        name: "寢具用品",
        status: "warning",
        usage: 65,
        products: 10,
      },
      {
        id: "B4",
        name: "生活雜貨",
        status: "bestseller",
        usage: 90,
        products: 18,
      },
    ],
  },
  C: {
    name: "旅遊用品",
    description: "行李箱、旅行配件、戶外用品",
    shelvesCount: 3,
    usageRate: 85,
    bestsellers: 1,
    alerts: 0,
    shelves: [
      { id: "C1", name: "行李箱", status: "normal", usage: 88, products: 15 },
      {
        id: "C2",
        name: "旅行配件",
        status: "bestseller",
        usage: 95,
        products: 19,
      },
      { id: "C3", name: "戶外用品", status: "normal", usage: 72, products: 12 },
    ],
  },
  D: {
    name: "文具用品",
    description: "辦公文具、學習用品、創意用品",
    shelvesCount: 3,
    usageRate: 88,
    bestsellers: 1,
    alerts: 0,
    shelves: [
      { id: "D1", name: "筆類用品", status: "normal", usage: 85, products: 16 },
      { id: "D2", name: "紙製品", status: "normal", usage: 90, products: 18 },
      {
        id: "D3",
        name: "創意文具",
        status: "bestseller",
        usage: 92,
        products: 17,
      },
    ],
  },
  E: {
    name: "健康用品",
    description: "保健食品、運動器材、健康檢測",
    shelvesCount: 4,
    usageRate: 94,
    bestsellers: 2,
    alerts: 0,
    shelves: [
      {
        id: "E1",
        name: "保健食品",
        status: "bestseller",
        usage: 98,
        products: 19,
      },
      { id: "E2", name: "運動用品", status: "normal", usage: 85, products: 16 },
      {
        id: "E3",
        name: "健康檢測",
        status: "bestseller",
        usage: 100,
        products: 20,
      },
      { id: "E4", name: "個人護理", status: "normal", usage: 92, products: 17 },
    ],
  },
  F: {
    name: "美妝用品",
    description: "彩妝用品、護膚產品、美容工具",
    shelvesCount: 3,
    usageRate: 65,
    bestsellers: 0,
    alerts: 2,
    shelves: [
      { id: "F1", name: "彩妝產品", status: "normal", usage: 75, products: 13 },
      {
        id: "F2",
        name: "護膚產品",
        status: "warning",
        usage: 60,
        products: 10,
      },
      {
        id: "F3",
        name: "美容工具",
        status: "critical",
        usage: 45,
        products: 8,
      },
    ],
  },
  G: {
    name: "IP授權商品",
    description: "品牌授權、卡通周邊、收藏品",
    shelvesCount: 1,
    usageRate: 100,
    bestsellers: 1,
    alerts: 0,
    shelves: [
      {
        id: "G1",
        name: "熱門IP商品",
        status: "bestseller",
        usage: 100,
        products: 20,
      },
    ],
  },
};

// ===== 初始化函數 =====
document.addEventListener("DOMContentLoaded", function () {
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // 初始化事件監聽器
  initializeEventListeners();

  console.log("店面管理系統初始化完成");
});

// ===== 時間更新函數 =====
function updateDateTime() {
  const now = new Date();
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const dayName = "週" + days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const dateTimeString = `${dayName}, ${month} ${date}日, ${year} • ${hours}:${minutes}:${seconds}`;

  const dateTimeElement = document.getElementById("datetime");
  if (dateTimeElement) {
    dateTimeElement.textContent = dateTimeString;
  }
}

// ===== 初始化事件監聽器 =====
function initializeEventListeners() {
  // 為區域添加點擊事件監聽器
  document.querySelectorAll(".area-zone").forEach((zone) => {
    zone.addEventListener("click", function () {
      const areaId = this.dataset.area;
      enterAreaManagement(areaId);
    });

    // 添加懸停效果
    zone.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.02)";
    });

    zone.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
}

// ===== 檢視切換功能 =====
function switchView(viewName) {
  // 更新按鈕狀態
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-view="${viewName}"]`).classList.add("active");

  // 切換檢視
  if (viewName === "layout") {
    showLayoutView();
  } else if (viewName === "management") {
    if (currentArea) {
      showManagementView(currentArea);
    } else {
      // 如果沒有選擇區域，默認顯示A區
      enterAreaManagement("A");
    }
  }

  currentView = viewName;
}

function showLayoutView() {
  document.getElementById("layout-view").classList.add("active");
  document.getElementById("management-view").classList.remove("active");
}

function showManagementView(areaId) {
  document.getElementById("layout-view").classList.remove("active");
  document.getElementById("management-view").classList.add("active");

  // 更新管理檢視內容
  updateManagementView(areaId);
}

// ===== 區域管理功能 =====
function enterAreaManagement(areaId) {
  currentArea = areaId;
  showManagementView(areaId);

  // 更新檢視按鈕狀態
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector('[data-view="management"]').classList.add("active");

  // 添加進入動畫效果
  const managementView = document.getElementById("management-view");
  managementView.style.opacity = "0";
  managementView.style.transform = "translateY(20px)";

  setTimeout(() => {
    managementView.style.transition = "all 0.3s ease";
    managementView.style.opacity = "1";
    managementView.style.transform = "translateY(0)";
  }, 100);

  showNotification(
    "success",
    "進入區域管理",
    `已進入${storeAreas[areaId].name}管理模式`
  );
}

function updateManagementView(areaId) {
  const area = storeAreas[areaId];
  if (!area) return;

  // 更新區域標題和描述
  document.getElementById(
    "current-area-title"
  ).textContent = `${areaId}區 - ${area.name}`;
  document.getElementById("current-area-desc").textContent = area.description;

  // 更新統計卡片
  document.getElementById("area-shelves-count").textContent = area.shelvesCount;
  document.getElementById("area-usage-rate").textContent = area.usageRate + "%";
  document.getElementById("area-bestsellers").textContent = area.bestsellers;
  document.getElementById("area-alerts").textContent = area.alerts;

  // 渲染貨架網格
  renderShelvesGrid(area.shelves);
}

function renderShelvesGrid(shelves) {
  const grid = document.getElementById("area-shelves-grid");
  if (!grid) return;

  grid.innerHTML = "";

  shelves.forEach((shelf) => {
    const shelfCard = createShelfCard(shelf);
    grid.appendChild(shelfCard);
  });
}

function createShelfCard(shelf) {
  const card = document.createElement("div");
  card.className = `shelf-card ${shelf.status}`;
  card.dataset.shelfId = shelf.id;

  // 狀態文字映射
  const statusText = {
    normal: "正常運作",
    bestseller: "熱銷商品",
    warning: "需要關注",
    critical: "緊急處理",
  };

  // 生成貨架視覺化
  const shelfVisual = generateShelfVisual(shelf);

  card.innerHTML = `
        <div class="shelf-header">
            <div class="shelf-name">${shelf.name}</div>
            <div class="shelf-status ${shelf.status}">${
    statusText[shelf.status]
  }</div>
        </div>
        <div class="shelf-visual">
            ${shelfVisual}
        </div>
        <div class="shelf-info">
            <span>使用率: ${shelf.usage}%</span>
            <span>商品數: ${shelf.products}</span>
        </div>
        <div class="shelf-actions">
            <button class="action-btn" onclick="editShelf('${
              shelf.id
            }')">編輯</button>
            <button class="action-btn primary" onclick="manageShelfProducts('${
              shelf.id
            }')">管理商品</button>
        </div>
    `;

  // 添加點擊事件
  card.addEventListener("click", function (e) {
    // 避免按鈕點擊事件冒泡
    if (!e.target.classList.contains("action-btn")) {
      showShelfDetails(shelf);
    }
  });

  return card;
}

function generateShelfVisual(shelf) {
  const rows = 3;
  const cols = 6;
  const totalSlots = rows * cols;
  const filledSlots = Math.floor((shelf.usage / 100) * totalSlots);

  let html = "";

  for (let r = 0; r < rows; r++) {
    html += '<div class="shelf-row">';
    for (let c = 0; c < cols; c++) {
      const slotIndex = r * cols + c;
      let slotClass = "shelf-slot ";

      if (slotIndex < filledSlots) {
        // 根據貨架狀態決定商品槽的樣式
        switch (shelf.status) {
          case "bestseller":
            slotClass += Math.random() > 0.7 ? "bestseller" : "filled";
            break;
          case "warning":
            slotClass += Math.random() > 0.8 ? "warning" : "filled";
            break;
          case "critical":
            slotClass += Math.random() > 0.6 ? "critical" : "filled";
            break;
          default:
            slotClass += "filled";
        }
      } else {
        slotClass += "empty";
      }

      html += `<div class="${slotClass}"></div>`;
    }
    html += "</div>";
  }

  return html;
}

// ===== 貨架操作功能 =====
function editShelf(shelfId) {
  showNotification("info", "編輯貨架", `開始編輯貨架 ${shelfId}`);
  console.log("編輯貨架:", shelfId);
}

function manageShelfProducts(shelfId) {
  showNotification("info", "管理商品", `進入貨架 ${shelfId} 商品管理`);
  console.log("管理貨架商品:", shelfId);
}

function showShelfDetails(shelf) {
  showNotification("info", "貨架詳情", `查看 ${shelf.name} 詳細資訊`);
  console.log("顯示貨架詳情:", shelf);
}

// ===== 工具列功能 =====
function refreshAreaShelves() {
  if (!currentArea) return;

  showNotification(
    "success",
    "重新整理",
    `${storeAreas[currentArea].name}區域數據已更新`
  );

  // 重新渲染當前區域
  updateManagementView(currentArea);

  // 添加刷新動畫
  const grid = document.getElementById("area-shelves-grid");
  grid.style.opacity = "0.5";
  setTimeout(() => {
    grid.style.transition = "opacity 0.3s ease";
    grid.style.opacity = "1";
  }, 300);
}

function addNewShelf() {
  if (!currentArea) return;

  const area = storeAreas[currentArea];
  const newShelfId = `${currentArea}${area.shelves.length + 1}`;
  const newShelf = {
    id: newShelfId,
    name: `新貨架 ${area.shelves.length + 1}`,
    status: "normal",
    usage: 0,
    products: 0,
  };

  area.shelves.push(newShelf);
  area.shelvesCount++;

  // 重新渲染
  updateManagementView(currentArea);

  showNotification(
    "success",
    "新增貨架",
    `已在${area.name}區新增貨架 ${newShelfId}`
  );
}

function exportAreaData() {
  if (!currentArea) return;

  const area = storeAreas[currentArea];
  const data = area.shelves.map((shelf) => ({
    貨架編號: shelf.id,
    貨架名稱: shelf.name,
    狀態: shelf.status,
    使用率: shelf.usage + "%",
    商品數量: shelf.products,
  }));

  const csv = convertToCSV(data);
  downloadCSV(csv, `${currentArea}區貨架資料.csv`);

  showNotification("success", "匯出成功", `${area.name}區域資料已匯出`);
}

// ===== 返回功能 =====
function backToLayout() {
  showLayoutView();

  // 更新檢視按鈕狀態
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector('[data-view="layout"]').classList.add("active");

  currentView = "layout";

  // 添加返回動畫效果
  const layoutView = document.getElementById("layout-view");
  layoutView.style.opacity = "0";
  layoutView.style.transform = "translateX(-20px)";

  setTimeout(() => {
    layoutView.style.transition = "all 0.3s ease";
    layoutView.style.opacity = "1";
    layoutView.style.transform = "translateX(0)";
  }, 100);

  showNotification("info", "返回總覽", "已返回店面總覽頁面");
}

// ===== 通知系統 =====
function showNotification(type, title, message) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };

  notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icons[type] || "ℹ️"}</div>
            <div class="notification-text">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
        </div>
    `;

  // 添加樣式
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        border-left: 4px solid;
        z-index: 2000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
        border-left-color: ${getNotificationColor(type)};
    `;

  // 通知內容樣式
  const content = notification.querySelector(".notification-content");
  content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;

  const icon = notification.querySelector(".notification-icon");
  icon.style.fontSize = "20px";

  const text = notification.querySelector(".notification-text");
  text.style.flex = "1";

  const titleEl = notification.querySelector(".notification-title");
  titleEl.style.cssText = `
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
    `;

  const messageEl = notification.querySelector(".notification-message");
  messageEl.style.cssText = `
        font-size: 14px;
        color: #6b7280;
    `;

  document.body.appendChild(notification);

  // 顯示動畫
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // 自動隱藏
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function getNotificationColor(type) {
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
    warning: "#f59e0b",
  };
  return colors[type] || "#3b82f6";
}

// ===== CSV 匯出功能 =====
function convertToCSV(objArray) {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  // 表頭
  const headers = Object.keys(array[0]);
  str += headers.join(",") + "\r\n";

  // 資料行
  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line !== "") line += ",";
      line += array[i][index];
    }
    str += line + "\r\n";
  }

  return str;
}

function downloadCSV(csv, filename) {
  const csvFile = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// ===== 區域狀態更新功能 =====
function updateAreaStatus(areaId, status) {
  const area = storeAreas[areaId];
  if (!area) return;

  // 更新平面圖上的區域狀態顯示
  const areaElement = document.querySelector(`[data-area="${areaId}"]`);
  if (areaElement) {
    const statusElement = areaElement.querySelector(".area-status");
    const statusMap = {
      normal: "🟢 正常運作",
      warning: "🟡 需要關注",
      critical: "🔴 緊急處理",
      bestseller: "⭐ 熱銷區域",
    };

    if (statusElement) {
      statusElement.textContent = statusMap[status] || "🟢 正常運作";
    }
  }
}

// ===== 即時統計更新 =====
function updateRealTimeStats() {
  // 模擬即時數據更新
  Object.keys(storeAreas).forEach((areaId) => {
    const area = storeAreas[areaId];

    // 隨機微調使用率 (模擬真實變化)
    area.shelves.forEach((shelf) => {
      const variation = (Math.random() - 0.5) * 2; // -1 到 1 的變化
      shelf.usage = Math.max(0, Math.min(100, shelf.usage + variation));
      shelf.usage = Math.round(shelf.usage);
    });

    // 重新計算區域平均使用率
    const avgUsage =
      area.shelves.reduce((sum, shelf) => sum + shelf.usage, 0) /
      area.shelves.length;
    area.usageRate = Math.round(avgUsage);

    // 更新警告數量
    area.alerts = area.shelves.filter(
      (shelf) => shelf.status === "warning" || shelf.status === "critical"
    ).length;

    // 更新熱銷商品數量
    area.bestsellers = area.shelves.filter(
      (shelf) => shelf.status === "bestseller"
    ).length;
  });

  // 如果當前在管理檢視，更新顯示
  if (currentView === "management" && currentArea) {
    updateManagementView(currentArea);
  }
}

// ===== 鍵盤快捷鍵 =====
document.addEventListener("keydown", function (e) {
  // ESC 鍵返回總覽
  if (e.key === "Escape" && currentView === "management") {
    backToLayout();
  }

  // 數字鍵 1-7 快速切換區域 (Ctrl + 數字)
  if (e.ctrlKey && e.key >= "1" && e.key <= "7") {
    e.preventDefault();
    const areaKeys = ["A", "B", "C", "D", "E", "F", "G"];
    const areaIndex = parseInt(e.key) - 1;
    if (areaKeys[areaIndex]) {
      enterAreaManagement(areaKeys[areaIndex]);
    }
  }

  // F5 重新整理當前檢視
  if (e.key === "F5") {
    e.preventDefault();
    if (currentView === "management") {
      refreshAreaShelves();
    } else {
      updateRealTimeStats();
      showNotification("success", "重新整理", "店面數據已更新");
    }
  }
});

// ===== 響應式處理 =====
function handleResize() {
  const width = window.innerWidth;

  // 在小屏幕上自動切換到總覽檢視
  if (width <= 768 && currentView === "management") {
    backToLayout();
  }

  // 調整區域卡片大小
  const areaZones = document.querySelectorAll(".area-zone");
  areaZones.forEach((zone) => {
    if (width <= 480) {
      zone.style.fontSize = "12px";
      zone.style.padding = "12px";
    } else if (width <= 768) {
      zone.style.fontSize = "13px";
      zone.style.padding = "16px";
    } else {
      zone.style.fontSize = "";
      zone.style.padding = "";
    }
  });
}

// 監聽視窗大小變化
window.addEventListener("resize", handleResize);

// ===== 滑鼠懸停效果增強 =====
function enhanceHoverEffects() {
  // 為貨架卡片添加懸停時的詳細資訊提示
  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(".shelf-card")) {
      const card = e.target.closest(".shelf-card");
      const shelfId = card.dataset.shelfId;

      // 可以在這裡添加懸停提示框
      console.log(`懸停在貨架 ${shelfId} 上`);
    }
  });
}

// ===== 自動保存功能 =====
function autoSave() {
  try {
    const saveData = {
      currentView,
      currentArea,
      storeAreas,
      timestamp: new Date().toISOString(),
    };

    // 使用 sessionStorage 保存當前狀態 (僅限本地開發)
    // 在實際部署時應該使用後端 API
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem("storeManagerState", JSON.stringify(saveData));
      console.log("狀態已自動保存");
    }
  } catch (error) {
    console.warn("自動保存失敗:", error);
  }
}

// ===== 載入保存的狀態 =====
function loadSavedState() {
  try {
    if (typeof Storage !== "undefined") {
      const savedState = sessionStorage.getItem("storeManagerState");
      if (savedState) {
        const data = JSON.parse(savedState);

        // 恢復基本狀態
        currentView = data.currentView || "layout";
        currentArea = data.currentArea || null;

        // 合併保存的區域資料
        Object.assign(storeAreas, data.storeAreas || {});

        console.log("已載入保存的狀態");
        showNotification("info", "狀態恢復", "已恢復上次的工作狀態");
      }
    }
  } catch (error) {
    console.warn("載入保存狀態失敗:", error);
  }
}

// ===== 初始化完成後的設置 =====
document.addEventListener("DOMContentLoaded", function () {
  // 載入保存的狀態
  loadSavedState();

  // 增強懸停效果
  enhanceHoverEffects();

  // 設置自動保存 (每30秒)
  setInterval(autoSave, 30000);

  // 設置即時統計更新 (每5秒)
  setInterval(updateRealTimeStats, 5000);

  // 初始化響應式處理
  handleResize();

  console.log("所有功能初始化完成");
});
