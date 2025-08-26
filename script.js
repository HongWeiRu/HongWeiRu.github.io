// ===== 全域變數 =====
let shelfCounter = 5; // 下一個貨架編號
let currentViewMode = 'grid';
let currentPage = 'dashboard';

// 貨架資料存儲
let shelvesData = {
    'A1': { 
        id: 'A1', 
        name: 'A區貨架 #1', 
        status: 'published', 
        area: 'A', 
        rows: 3,
        cols: 6,
        usage: 89,
        bestsellers: 2,
        products: generateInitialProducts('A1')
    },
    'B2': { 
        id: 'B2', 
        name: 'B區貨架 #2', 
        status: 'draft', 
        area: 'B', 
        rows: 3,
        cols: 6,
        usage: 83,
        bestsellers: 2,
        products: generateInitialProducts('B2')
    },
    'C3': { 
        id: 'C3', 
        name: 'C區貨架 #3', 
        status: 'maintenance', 
        area: 'C', 
        rows: 3,
        cols: 6,
        usage: 67,
        bestsellers: 0,
        products: generateInitialProducts('C3')
    },
    'D4': { 
        id: 'D4', 
        name: 'D區貨架 #4', 
        status: 'published', 
        area: 'D', 
        rows: 3,
        cols: 6,
        usage: 100,
        bestsellers: 3,
        products: generateInitialProducts('D4')
    }
};

// ===== 全域變數 - 庫存資料 =====
let inventoryData = [
    { id: 'P001', name: '有機拿鐵咖啡', category: 'drink', stock: 45, safeStock: 20, status: 'sufficient' },
    { id: 'P002', name: '巧克力蛋糕', category: 'food', stock: 8, safeStock: 15, status: 'low' },
    { id: 'P003', name: '有機牛奶', category: 'drink', stock: 2, safeStock: 10, status: 'critical' },
    { id: 'P004', name: '手沖濾掛咖啡', category: 'bean', stock: 65, safeStock: 25, status: 'sufficient' },
    { id: 'P005', name: '草莓起司蛋糕', category: 'food', stock: 12, safeStock: 10, status: 'low' },
    { id: 'P006', name: '季節水果茶', category: 'drink', stock: 3, safeStock: 5, status: 'critical' },
    { id: 'P007', name: '特調咖啡豆', category: 'bean', stock: 18, safeStock: 20, status: 'low' },
    { id: 'P008', name: '酪梨吐司', category: 'food', stock: 25, safeStock: 15, status: 'sufficient' },
];

// ===== 全域變數 - 銷售報表數據 =====
let salesData = [
    { date: '2025-07-29', amount: 28540, transactions: 194, aov: 147.1, topItem: '有機拿鐵咖啡', topSales: 124 },
    { date: '2025-07-28', amount: 25420, transactions: 178, aov: 142.8, topItem: '巧克力蛋糕', topSales: 89 },
    { date: '2025-07-27', amount: 29180, transactions: 203, aov: 143.7, topItem: '有機拿鐵咖啡', topSales: 135 },
    { date: '2025-07-26', amount: 27800, transactions: 185, aov: 150.3, topItem: '酪梨吐司', topSales: 78 },
    { date: '2025-07-25', amount: 31250, transactions: 210, aov: 148.8, topItem: '水果奶昔', topSales: 95 },
    { date: '2025-07-24', amount: 26500, transactions: 170, aov: 155.9, topItem: '有機拿鐵咖啡', topSales: 110 },
    { date: '2025-07-23', amount: 24800, transactions: 165, aov: 150.3, topItem: '巧克力蛋糕', topSales: 82 },
    // 添加更多模擬數據...
];

// ===== 生成初始商品資料 =====
function generateInitialProducts(shelfId) {
    const products = [];
    const totalSlots = 18; // 3x6
    
    for (let i = 0; i < totalSlots; i++) {
        const row = Math.floor(i / 6);
        const col = i % 6;
        let productData = { row, col };
        
        // 根據不同貨架設置不同的商品配置
        switch (shelfId) {
            case 'A1':
                if (i === 0 || i === 8) productData.type = 'bestseller';
                else if (i === 4 || i === 13) productData.type = 'empty';
                else productData.type = 'filled';
                break;
            case 'B2':
                if (i === 2 || i === 16) productData.type = 'bestseller';
                else if (i === 9 || i === 10) productData.type = 'empty';
                else productData.type = 'filled';
                break;
            case 'C3':
                if (i < 6) productData.type = 'empty';
                else productData.type = 'filled';
                break;
            case 'D4':
                if (i === 6 || i === 7 || i === 15) productData.type = 'bestseller';
                else if (i === 11 || i === 17) productData.type = 'low-stock';
                else productData.type = 'filled';
                break;
            default:
                productData.type = 'empty';
        }
        
        if (productData.type !== 'empty') {
            productData.productId = `P${String(i + 1).padStart(3, '0')}`;
        }
        
        products.push(productData);
    }
    
    return products;
}

// ===== 響應式功能 =====

// 側邊欄切換 (手機版)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-hidden');
}

// 商品面板切換
function toggleProductPanel() {
    const panel = document.getElementById('productPanel');
    panel.classList.toggle('open');
}

// ===== 頁面切換功能 =====
function showPage(pageId) {
    // 隱藏所有頁面
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // 移除所有導航項目的active狀態  
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 顯示目標頁面
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }
    
    // 設置對應導航項目為active
    if (event && event.target) {
        const navItem = event.target.closest('.nav-item');
        if (navItem) {
            navItem.classList.add('active');
        }
    }
    
    // 根據不同頁面執行特定初始化
    switch(pageId) {
        case 'shelf-management':
            renderManagementShelves();
            updateManagementStats();
            break;
        case 'inventory':
            // 初始化庫存頁面
            updateInventorySummary();
            renderInventoryTable();
            break;
        case 'bestsellers':
            console.log('初始化明星商品頁面');
            break;
        case 'sales-report':
            // 初始化銷售報表頁面
            initSalesReportPage();
            break;
        case 'customer-analysis':
            console.log('初始化客戶分析頁面');
            break;
        case 'profit-analysis':
            console.log('初始化獲利分析頁面');
            break;
        case 'data-sync':
            console.log('初始化資料同步頁面');
            break;
    }
    
    // 手機版自動關閉側邊欄
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.add('mobile-hidden');
        }
    }
}

// ===== 新增貨架功能 =====
function showAddShelfModal() {
    const modal = document.getElementById('addShelfModal');
    modal.classList.add('show');
    
    // 重置表單
    document.getElementById('addShelfForm').reset();
    // 設置預設值
    document.getElementById('shelfRows').value = 3;
    document.getElementById('shelfCols').value = 6;
    updateShelfPreview();
}

function hideAddShelfModal() {
    const modal = document.getElementById('addShelfModal');
    modal.classList.remove('show');
}

function updateShelfPreview() {
    const rows = parseInt(document.getElementById('shelfRows').value) || 3;
    const cols = parseInt(document.getElementById('shelfCols').value) || 6;
    
    const previewGrid = document.querySelector('.preview-grid');
    previewGrid.innerHTML = '';
    
    for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'preview-row';
        
        for (let c = 0; c < cols; c++) {
            const slotDiv = document.createElement('div');
            slotDiv.className = 'preview-slot';
            rowDiv.appendChild(slotDiv);
        }
        
        previewGrid.appendChild(rowDiv);
    }
}

function createNewShelf() {
    const form = document.getElementById('addShelfForm');
    const formData = new FormData(form);
    
    // 驗證必填欄位
    if (!formData.get('shelfName') || !formData.get('shelfArea')) {
        showNotification('error', '輸入錯誤', '請填寫所有必填欄位');
        return;
    }
    
    const shelfData = {
        id: formData.get('shelfArea') + shelfCounter,
        name: formData.get('shelfName'),
        area: formData.get('shelfArea'),
        status: 'draft',
        rows: parseInt(formData.get('shelfRows')) || 3,
        cols: parseInt(formData.get('shelfCols')) || 6,
        usage: 0,
        bestsellers: 0,
        products: []
    };
    
    // 生成空的商品位置
    for (let r = 0; r < shelfData.rows; r++) {
        for (let c = 0; c < shelfData.cols; c++) {
            shelfData.products.push({
                row: r,
                col: c,
                type: 'empty'
            });
        }
    }
    
    // 添加到資料庫
    shelvesData[shelfData.id] = shelfData;
    shelfCounter++;
    
    hideAddShelfModal();
    
    // 重新渲染貨架
    if (currentPage === 'shelf-management') {
        renderManagementShelves();
        updateManagementStats();
    } else {
        renderDashboardShelves();
    }
    
    showNotification('success', '新增成功', `貨架 "${shelfData.name}" 已成功建立`);
}

// ===== 發佈/取消發佈功能 =====
function togglePublishStatus(button) {
    const shelfCard = button.closest('.shelf-card');
    const shelfId = shelfCard.dataset.shelf;
    const shelf = shelvesData[shelfId];
    
    if (!shelf || shelf.status === 'maintenance') return;
    
    if (shelf.status === 'draft') {
        showPublishConfirmDialog(shelfId, shelf.name);
    } else if (shelf.status === 'published') {
        // 已發佈的貨架不允許取消發佈（在此示例中）
        showNotification('info', '提示', '已發佈的貨架無法取消發佈');
    }
}

function showPublishConfirmDialog(shelfId, shelfName) {
    const modal = document.getElementById('publishConfirmModal');
    document.getElementById('confirmShelfName').textContent = shelfName;
    document.getElementById('confirmPublishBtn').onclick = () => publishShelf(shelfId);
    modal.classList.add('show');
}

function hidePublishConfirmModal() {
    const modal = document.getElementById('publishConfirmModal');
    modal.classList.remove('show');
}

function publishShelf(shelfId) {
    const shelf = shelvesData[shelfId];
    shelf.status = 'published';
    
    hidePublishConfirmModal();
    
    // 重新渲染貨架
    if (currentPage === 'shelf-management') {
        renderManagementShelves();
        updateManagementStats();
    } else {
        renderDashboardShelves();
    }
    
    showNotification('success', '發佈成功', `貨架 "${shelf.name}" 已成功發佈`);
}

// ===== 刪除貨架功能 =====
function deleteShelf(button) {
    const shelfCard = button.closest('.shelf-card');
    const shelfId = shelfCard.dataset.shelf;
    const shelf = shelvesData[shelfId];
    
    if (confirm(`確定要刪除貨架 "${shelf.name}" 嗎？此操作無法恢復。`)) {
        delete shelvesData[shelfId];
        
        // 重新渲染貨架
        if (currentPage === 'shelf-management') {
            renderManagementShelves();
            updateManagementStats();
        } else {
            renderDashboardShelves();
        }
        
        showNotification('success', '刪除成功', `貨架 "${shelf.name}" 已被刪除`);
    }
}

// ===== 編輯模式切換 =====
function toggleEditMode(button) {
    const shelfCard = button.closest('.shelf-card');
    const shelfVisual = shelfCard.querySelector('.shelf-visual');
    const isEditing = button.classList.contains('editing');
    
    if (isEditing) {
        // 退出編輯模式
        button.textContent = '編輯';
        button.classList.remove('editing');
        shelfCard.classList.remove('edit-mode');
        shelfVisual.classList.remove('edit-mode');
        
        // 禁用拖拉功能
        enableDragAndDrop(shelfCard, false);
    } else {
        // 進入編輯模式
        button.textContent = '完成';
        button.classList.add('editing');
        shelfCard.classList.add('edit-mode');
        shelfVisual.classList.add('edit-mode');
        
        // 啟用拖拉功能
        enableDragAndDrop(shelfCard, true);
    }
}

// ===== 拖拉功能 =====
function enableDragAndDrop(shelfCard, enable) {
    const productSlots = shelfCard.querySelectorAll('.product-slot');
    
    productSlots.forEach(slot => {
        if (enable) {
            slot.addEventListener('dragstart', dragStart);
            slot.addEventListener('dragend', dragEnd);
            if (slot.classList.contains('empty')) {
                slot.addEventListener('dragover', allowDrop);
                slot.addEventListener('drop', drop);
            }
        } else {
            slot.removeEventListener('dragstart', dragStart);
            slot.removeEventListener('dragend', dragEnd);
            slot.removeEventListener('dragover', allowDrop);
            slot.removeEventListener('drop', drop);
        }
    });
}

// 拖拉事件處理
let draggedElement = null;

function dragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function dragEnd(e) {
    this.classList.remove('dragging');
    
    // 移除所有drop-target樣式
    document.querySelectorAll('.drop-target').forEach(el => {
        el.classList.remove('drop-target');
    });
}

function allowDrop(e) {
    e.preventDefault();
    this.classList.add('drop-target');
}

function drop(e) {
    e.preventDefault();
    this.classList.remove('drop-target');
    
    if (draggedElement && this.classList.contains('empty')) {
        // 交換位置
        const draggedProductId = draggedElement.dataset.product;
        const draggedClasses = Array.from(draggedElement.classList);
        
        // 更新目標位置
        this.className = draggedClasses.join(' ');
        this.dataset.product = draggedProductId;
        this.draggable = true;
        
        // 清空原始位置
        draggedElement.className = 'product-slot empty';
        draggedElement.dataset.slot = 'empty';
        draggedElement.dataset.product = '';
        draggedElement.draggable = false;
        
        // 重新綁定事件
        const shelfCard = this.closest('.shelf-card');
        enableDragAndDrop(shelfCard, true);
        
        // 更新統計
        updateShelfStats(shelfCard);
        
        // 同步到後台
        syncToBackend(shelfCard);
        
        console.log(`商品 ${draggedProductId} 已移動到新位置`);
    }
    
    draggedElement = null;
}

// ===== 貨架統計更新 =====
function updateShelfStats(shelfCard) {
    const allSlots = shelfCard.querySelectorAll('.product-slot');
    const filledSlots = shelfCard.querySelectorAll('.product-slot.filled, .product-slot.bestseller, .product-slot.low-stock');
    const bestsellerSlots = shelfCard.querySelectorAll('.product-slot.bestseller');
    
    const usageRate = Math.round((filledSlots.length / allSlots.length) * 100);
    const bestsellerCount = bestsellerSlots.length;
    
    const statsDiv = shelfCard.querySelector('.shelf-stats');
    statsDiv.innerHTML = `
        <span>使用率: ${usageRate}%</span>
        <span>明星商品: ${bestsellerCount}</span>
    `;
    
    // 更新資料
    const shelfId = shelfCard.dataset.shelf;
    if (shelvesData[shelfId]) {
        shelvesData[shelfId].usage = usageRate;
        shelvesData[shelfId].bestsellers = bestsellerCount;
    }
}

// ===== 後台同步 =====
function syncToBackend(shelfCard) {
    const shelfId = shelfCard.dataset.shelf;
    const products = [];
    
    shelfCard.querySelectorAll('.product-slot').forEach((slot, index) => {
        const row = Math.floor(index / 6);
        const col = index % 6;
        
        products.push({
            position: { row, col },
            productId: slot.dataset.product || null,
            status: slot.classList.contains('bestseller') ? 'bestseller' : 
                   slot.classList.contains('low-stock') ? 'low-stock' : 
                   slot.classList.contains('filled') ? 'normal' : 'empty'
        });
    });
    
    // 模擬API呼叫
    console.log('同步到後台:', {
        shelfId: shelfId,
        products: products,
        timestamp: new Date().toISOString()
    });
}

// ===== 貨架管理頁面功能 =====
function renderManagementShelves() {
    const grid = document.getElementById('managementShelfGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    Object.values(shelvesData).forEach(shelf => {
        if (shouldShowShelf(shelf)) {
            const shelfCard = createShelfCard(shelf, true);
            grid.appendChild(shelfCard);
        }
    });
}

function shouldShowShelf(shelf) {
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    const areaFilter = document.getElementById('areaFilter')?.value || 'all';
    
    if (statusFilter !== 'all' && shelf.status !== statusFilter) return false;
    if (areaFilter !== 'all' && shelf.area !== areaFilter) return false;
    
    return true;
}

function createShelfCard(shelf, isManagement = false) {
    const card = document.createElement('div');
    card.className = `shelf-card ${shelf.status}`;
    card.dataset.shelf = shelf.id;
    
    const statusText = {
        'published': '已發佈',
        'draft': '草稿',
        'maintenance': '維護中'
    };
    
    const canEdit = shelf.status !== 'maintenance';
    const canPublish = shelf.status === 'draft';
    
    card.innerHTML = `
        <div class="shelf-header">
            <h3 class="shelf-title">${shelf.name}</h3>
            <div class="shelf-controls">
                <span class="shelf-status ${shelf.status}">${statusText[shelf.status]}</span>
                <button class="edit-btn" onclick="toggleEditMode(this)" ${!canEdit ? 'disabled' : ''}>編輯</button>
                <button class="publish-btn ${shelf.status === 'published' ? 'published' : ''}" 
                        onclick="togglePublishStatus(this)" 
                        ${!canPublish ? 'disabled' : ''}>
                    ${shelf.status === 'published' ? '已發佈' : '發佈'}
                </button>
                <button class="delete-btn" onclick="deleteShelf(this)">刪除</button>
            </div>
        </div>
        <div class="shelf-visual">
            ${generateShelfRows(shelf)}
        </div>
        <div class="shelf-stats">
            <span>使用率: ${shelf.usage}%</span>
            <span>明星商品: ${shelf.bestsellers}</span>
        </div>
    `;
    
    return card;
}

function generateShelfRows(shelf) {
    const rowLabels = ['上', '中', '下', '四', '五', '六'];
    let html = '<div class="shelf-rows">';
    
    for (let r = 0; r < shelf.rows; r++) {
        html += `<div class="shelf-row">`;
        html += `<div class="row-label">${rowLabels[r] || r + 1}</div>`;
        
        for (let c = 0; c < shelf.cols; c++) {
            const product = shelf.products.find(p => p.row === r && p.col === c);
            const classes = ['product-slot'];
            
            if (product) {
                classes.push(product.type);
                if (product.productId) {
                    html += `<div class="${classes.join(' ')}" data-product="${product.productId}" draggable="true"></div>`;
                } else {
                    html += `<div class="${classes.join(' ')}" data-slot="empty" ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
                }
            } else {
                html += `<div class="product-slot empty" data-slot="empty" ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
            }
        }
        
        html += `</div>`;
    }
    
    html += '</div>';
    return html;
}
    
function renderDashboardShelves() {
    const grid = document.getElementById('shelfGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // 只顯示前4個貨架在總覽頁面
    const displayShelves = Object.values(shelvesData).slice(0, 4);
    displayShelves.forEach(shelf => {
        const shelfCard = createShelfCard(shelf, false);
        grid.appendChild(shelfCard);
    });
}

function updateManagementStats() {
    const totalShelves = Object.keys(shelvesData).length;
    const publishedShelves = Object.values(shelvesData).filter(s => s.status === 'published').length;
    const draftShelves = Object.values(shelvesData).filter(s => s.status === 'draft').length;
    const avgUsage = Math.round(Object.values(shelvesData).reduce((sum, s) => sum + s.usage, 0) / totalShelves);
    
    const totalElement = document.getElementById('totalShelves');
    const publishedElement = document.getElementById('publishedShelves');
    const draftElement = document.getElementById('draftShelves');
    const avgElement = document.getElementById('avgUsageRate');
    
    if (totalElement) totalElement.textContent = totalShelves;
    if (publishedElement) publishedElement.textContent = publishedShelves;
    if (draftElement) draftElement.textContent = draftShelves;
    if (avgElement) avgElement.textContent = avgUsage + '%';
}

// ===== 篩選功能 =====
function filterShelves() {
    if (currentPage === 'shelf-management') {
        renderManagementShelves();
    }
}

function refreshShelves() {
    if (currentPage === 'shelf-management') {
        renderManagementShelves();
        updateManagementStats();
        showNotification('success', '重新整理', '貨架資料已更新');
    }
}

function setViewMode(mode) {
    currentViewMode = mode;
    
    // 更新切換按鈕 - 只更新同一組內的按鈕
    const clickedBtn = event.target;
    const toggleGroup = clickedBtn.closest('.view-toggle');
    if (toggleGroup) {
        toggleGroup.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        clickedBtn.classList.add('active');
    }
    
    console.log('視圖模式切換為:', mode);
}

// ===== 批量操作功能 =====
function bulkPublish() {
    const draftShelves = Object.values(shelvesData).filter(s => s.status === 'draft');
    
    if (draftShelves.length === 0) {
        showNotification('info', '提示', '沒有草稿狀態的貨架需要發佈');
        return;
    }
    
    if (confirm(`確定要發佈 ${draftShelves.length} 個草稿貨架嗎？`)) {
        draftShelves.forEach(shelf => {
            shelf.status = 'published';
        });
        
        renderManagementShelves();
        updateManagementStats();
        showNotification('success', '批量發佈成功', `已發佈 ${draftShelves.length} 個貨架`);
    }
}

function exportShelves() {
    const data = Object.values(shelvesData).map(shelf => ({
        ID: shelf.id,
        名稱: shelf.name,
        區域: shelf.area,
        狀態: shelf.status,
        使用率: shelf.usage + '%',
        明星商品: shelf.bestsellers,
        規格: `${shelf.rows}x${shelf.cols}`
    }));
    
    const csv = convertToCSV(data);
    downloadCSV(csv, 'shelves-report.csv');
    showNotification('success', '匯出成功', '貨架報表已下載');
}

function convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    
    // 表頭
    const headers = Object.keys(array[0]);
    str += headers.join(',') + '\r\n';
    
    // 資料行
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line !== '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    
    return str;
}

function downloadCSV(csv, filename) {
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// ===== 通知系統 =====
function showNotification(type, title, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        'success': '✅',
        'error': '❌',
        'info': 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icons[type]}</div>
            <div class="notification-text">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 顯示動畫
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 自動隱藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// ===== 響應式處理 =====
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.add('mobile-hidden');
    } else {
        sidebar.classList.remove('mobile-hidden');
    }
}

// ===== 手動同步功能 =====
function manualSync() {
    showNotification('info', '同步中', '正在執行手動同步...');
    
    // 模擬同步過程
    setTimeout(() => {
        showNotification('success', '同步完成', '所有系統資料已同步更新');
        
        // 更新同步時間顯示
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                         now.getMinutes().toString().padStart(2, '0');
        
        // 更新日誌
        addSyncLog('success', timeString, '手動同步完成', '更新 127 筆資料');
    }, 2000);
}

function addSyncLog(type, time, message, details) {
    const logContainer = document.querySelector('.sync-log');
    if (!logContainer) return;
    
    const logItem = document.createElement('div');
    logItem.className = `log-item ${type}`;
    
    const statusIcons = {
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    };
    
    logItem.innerHTML = `
        <div class="log-time">${time}</div>
        <div class="log-content">
            <div class="log-message">${message}</div>
            <div class="log-details">${details}</div>
        </div>
        <div class="log-status">${statusIcons[type]}</div>
    `;
    
    // 插入到最前面
    logContainer.insertBefore(logItem, logContainer.firstChild);
    
    // 限制日誌數量，保持最新的10條
    const logItems = logContainer.querySelectorAll('.log-item');
    if (logItems.length > 10) {
        logContainer.removeChild(logItems[logItems.length - 1]);
    }
}

// ===== 系統設定頁面功能 =====
function showSettingsTab(tabName) {
    // 隱藏所有設定分頁
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 移除所有導航項目的active狀態
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 顯示目標分頁
    const targetTab = document.getElementById(tabName + '-settings');
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // 設置對應導航項目為active
    event.target.closest('.settings-nav-item').classList.add('active');
}

// ===== 匯出功能增強 =====
function exportData(type) {
    let data = [];
    let filename = '';
    
    switch(type) {
        case 'inventory':
            data = generateInventoryReport();
            filename = 'inventory-report.csv';
            break;
        case 'sales':
            data = generateSalesReport();
            filename = 'sales-report.csv';
            break;
        case 'customers':
            data = generateCustomerReport();
            filename = 'customer-report.csv';
            break;
        default:
            data = generateSalesReport();
            filename = 'report.csv';
    }
    
    const csv = convertToCSV(data);
    downloadCSV(csv, filename);
    showNotification('success', '匯出成功', `${filename} 已下載完成`);
}

function generateInventoryReport() {
    return [
        { 商品編號: 'P001', 商品名稱: '有機拿鐵咖啡', 分類: '飲料', 庫存數量: 45, 安全庫存: 20, 狀態: '充足' },
        { 商品編號: 'P002', 商品名稱: '巧克力蛋糕', 分類: '食品', 庫存數量: 8, 安全庫存: 15, 狀態: '不足' },
        { 商品編號: 'P003', 商品名稱: '有機牛奶', 分類: '飲料', 庫存數量: 2, 安全庫存: 10, 狀態: '緊急' }
    ];
}

function generateSalesReport() {
    return [
        { 日期: '2025-07-29', 銷售額: 'NT$28,540', 交易筆數: 194, 客單價: 'NT$147' },
        { 日期: '2025-07-28', 銷售額: 'NT$25,420', 交易筆數: 178, 客單價: 'NT$143' },
        { 日期: '2025-07-27', 銷售額: 'NT$29,180', 交易筆數: 203, 客單價: 'NT$144' }
    ];
}

function generateCustomerReport() {
    return [
        { 客戶類型: 'VIP客戶', 人數: 89, 佔比: '7.1%', 平均消費: 'NT$340', 貢獻度: '34.2%' },
        { 客戶類型: '常客', 人數: 312, 佔比: '25.0%', 平均消費: 'NT$185', 貢獻度: '42.8%' },
        { 客戶類型: '偶爾消費', 人數: 546, 佔比: '43.8%', 平均消費: 'NT$95', 貢獻度: '18.5%' },
        { 客戶類型: '新客戶', 人數: 300, 佔比: '24.1%', 平均消費: 'NT$67', 貢獻度: '4.5%' }
    ];
}

// ===== 模擬資料生成 =====
function generateMockData() {
    // 生成模擬的銷售數據、客戶數據等
    console.log('生成模擬數據完成');
}

// ===== 時間更新函數 =====
function updateDateTime() {
    const now = new Date();
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    
    const dayName = '週' + days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const dateTimeString = `${dayName}, ${month} ${date}日, ${year} • ${hours}:${minutes}:${seconds}`;
    
    const dateTimeElement = document.querySelector('.datetime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // 處理響應式
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // 綁定表單事件
    const rowsInput = document.getElementById('shelfRows');
    const colsInput = document.getElementById('shelfCols');
    if (rowsInput) rowsInput.addEventListener('input', updateShelfPreview);
    if (colsInput) colsInput.addEventListener('input', updateShelfPreview);
    
    // 初始化總覽頁面的貨架
    renderDashboardShelves();
    
    // 點擊模態框外部關閉
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('show');
        }
    });
    
    // 綁定切換檢視模式按鈕
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('toggle-btn')) {
            const toggleGroup = e.target.closest('.view-toggle');
            if (toggleGroup) {
                toggleGroup.querySelectorAll('.toggle-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        }
    });
    
    // 生成一些模擬數據
    generateMockData();
    
    // 更新時間顯示
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    console.log('系統初始化完成');
}); // <-- 注意這裡應該是 ')' 和 ';' 結束

// ===== 庫存頁面功能 =====
function updateInventorySummary() {
    const totalProducts = inventoryData.length;
    const lowStock = inventoryData.filter(p => p.status === 'low').length;
    const criticalStock = inventoryData.filter(p => p.status === 'critical').length;
    const totalStock = inventoryData.reduce((sum, p) => sum + p.stock, 0);
    const totalSafeStock = inventoryData.reduce((sum, p) => sum + p.safeStock, 0);
    const avgStockRate = totalSafeStock > 0 ? Math.round((totalStock / totalSafeStock) * 100) : 100;

    document.getElementById('totalProductsCount').textContent = totalProducts;
    document.getElementById('lowStockCount').textContent = lowStock;
    document.getElementById('outOfStockCount').textContent = criticalStock;
    document.getElementById('avgStockRate').textContent = `${avgStockRate}%`;
}

function renderInventoryTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    const statusFilter = document.getElementById('inventoryStatusFilter').value;
    const categoryFilter = document.getElementById('inventoryCategoryFilter').value;

    const filteredData = inventoryData.filter(product => {
        const statusMatch = statusFilter === 'all' || product.status === statusFilter;
        const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
        return statusMatch && categoryMatch;
    });

    filteredData.forEach(product => {
        const row = document.createElement('div');
        row.className = 'table-row';
        
        const statusText = {
            'sufficient': '充足',
            'low': '低庫存',
            'critical': '緊急'
        };

        row.innerHTML = `
            <div class="table-cell">${product.id}</div>
            <div class="table-cell">${product.name}</div>
            <div class="table-cell">${product.category}</div>
            <div class="table-cell">${product.stock}</div>
            <div class="table-cell">${product.safeStock}</div>
            <div class="table-cell">
                <span class="status-badge ${product.status}">${statusText[product.status]}</span>
            </div>
            <div class="table-cell">
                ${product.status !== 'sufficient' ? `<button class="action-btn urgent" onclick="restockItem('${product.id}')">補貨</button>` : `<button class="action-btn" disabled>補貨</button>`}
            </div>
        `;

        tableBody.appendChild(row);
    });
}
function restockItem(productId) {
    const product = inventoryData.find(p => p.id === productId);
    if (!product) return;
    
    // 模擬補貨操作：將庫存增加到安全庫存的兩倍
    const restockAmount = product.safeStock * 2;
    product.stock += restockAmount;
    product.status = 'sufficient';
    
    // 重新渲染頁面
    updateInventorySummary();
    renderInventoryTable();
    
    showNotification('success', '補貨成功', `商品 "${product.name}" 已補貨 ${restockAmount} 個`);
}

function showAddProductModal() {
    showNotification('info', '功能開發中', '新增商品的功能正在開發中');
}

// 增強匯出功能
// 在 exportData 函數中，增加 'inventory' 的 case
// 這個函數已經在您提供的 script.js 中存在
// 只需要確保 inventory 的 case 內容是正確的
function exportData(type) {
    let data = [];
    let filename = '';
    
    switch(type) {
        case 'inventory':
            data = inventoryData.map(product => ({
                '商品編號': product.id,
                '商品名稱': product.name,
                '分類': product.category,
                '庫存數量': product.stock,
                '安全庫存': product.safeStock,
                '庫存狀態': product.status
            }));
            filename = 'inventory-report.csv';
            break;
        case 'sales':
            data = generateSalesReport();
            filename = 'sales-report.csv';
            break;
        case 'customers':
            data = generateCustomerReport();
            filename = 'customer-report.csv';
            break;
        default:
            data = generateSalesReport();
            filename = 'report.csv';
    }
    
    const csv = convertToCSV(data);
    downloadCSV(csv, filename);
    showNotification('success', '匯出成功', `${filename} 已下載完成`);
}

function initSalesReportPage() {
    // 設定預設日期範圍為近7天
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    document.getElementById('endDate').valueAsDate = today;
    document.getElementById('startDate').valueAsDate = sevenDaysAgo;
    
    // 初始生成報表
    generateSalesReport();
}

function generateSalesReport() {
    // 獲取篩選條件
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const category = document.getElementById('salesCategoryFilter').value;

    // 根據日期篩選數據
    const filteredSales = salesData.filter(sale => {
        return sale.date >= startDate && sale.date <= endDate;
    });

    // 計算總覽數據
    const totalSalesAmount = filteredSales.reduce((sum, s) => sum + s.amount, 0);
    const totalTransactions = filteredSales.reduce((sum, s) => sum + s.transactions, 0);
    const averageOrderValue = totalTransactions > 0 ? (totalSalesAmount / totalTransactions).toFixed(1) : 0;
    
    // 找出熱銷商品數
    const topSellingItems = new Set(filteredSales.map(s => s.topItem)).size;

    // 更新總覽卡片
    document.getElementById('totalSalesAmount').textContent = `NT$${totalSalesAmount.toLocaleString()}`;
    document.getElementById('totalTransactions').textContent = totalTransactions;
    document.getElementById('averageOrderValue').textContent = `NT$${averageOrderValue}`;
    document.getElementById('topSellingItems').textContent = topSellingItems;
    
    // 渲染銷售趨勢圖（此處使用佔位符，實際應使用圖表庫）
    renderSalesChart(filteredSales);

    // 渲染商品銷售排名
    renderSalesRanking(filteredSales);
    
    showNotification('success', '報表生成成功', `已根據日期範圍生成銷售報表`);
}

// 全域變數來儲存圖表實例
let salesChartInstance = null;

function renderSalesChart(data) {
    const ctx = document.getElementById('salesTrendChart');
    if (!ctx) return;
    
    // 如果舊的圖表實例存在，先銷毀它
    if (salesChartInstance) {
        salesChartInstance.destroy();
    }
    
    // 準備假數據
    const labels = data.map(d => d.date);
    const sales = data.map(d => d.amount);

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '銷售額 (NT$)',
                data: sales,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true, // 啟用響應式功能
            maintainAspectRatio: false, // 不維持長寬比，讓圖表能填滿容器
            plugins: {
                legend: {
                    display: false // 隱藏圖例
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // 創建新的圖表實例並儲存到全域變數中
    salesChartInstance = new Chart(ctx, config);
}
function renderSalesRanking(data) {
    const rankingList = document.getElementById('salesRankingList');
    if (!rankingList) return;
    
    rankingList.innerHTML = '';

    // 模擬計算商品總銷售量
    const productSales = {};
    data.forEach(day => {
        if (!productSales[day.topItem]) {
            productSales[day.topItem] = 0;
        }
        productSales[day.topItem] += day.topSales;
    });
    
    const sortedProducts = Object.entries(productSales)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5); // 只顯示前5名

    if (sortedProducts.length === 0) {
        rankingList.innerHTML = '<div class="empty-state">無銷售數據</div>';
        return;
    }

    sortedProducts.forEach(([name, sales], index) => {
        const item = document.createElement('div');
        item.className = 'ranking-item';
        
        item.innerHTML = `
            <div class="rank-number">${index + 1}</div>
            <div class="item-info">
                <div class="item-name">${name}</div>
                <div class="item-amount">銷售額：NT$${(sales * 140).toLocaleString()}</div>
            </div>
            <div class="item-percentage">${sales} 件</div>
        `;
        rankingList.appendChild(item);
    });
}