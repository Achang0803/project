// 【重要】請替換成您部署的「菜單讀取 API」網址！
// 使用 SheetDB 提供的穩定 API 端點，繞過 Apps Script 錯誤。
const MENU_API_URL = "https://sheetdb.io/api/v1/thje499fojb7a"; 


// 在最上方，其他變數宣告之後加入
const headerCartIcon = document.getElementById('header-cart-icon');


// -----------------------------------------------------------------
// 💡 移除靜態菜單資料，改為動態變數
// -----------------------------------------------------------------
let menuItems = []; 
let categories = []; 
// -----------------------------------------------------------------


const categoryTabs = document.getElementById('category-tabs');
const menuContainer = document.querySelector('.menu-items'); // 修改：使用 class
const cartItemsContainer = document.querySelector('.cart-items'); // 修改：使用 class
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');
const menuTab = document.getElementById('menu-tab');
const cartTab = document.getElementById('cart-tab');
const checkoutTab = document.getElementById('checkout-tab');
const orderForm = document.getElementById('order-form');
const checkoutSection = document.getElementById('checkout-section');
const menuSection = document.getElementById('menu-section');
const cartSection = document.getElementById('cart-section');
const itemModal = document.getElementById('item-modal');
const closeModal = document.querySelector('.close-btn'); // 修改：使用 class
const modalDetailsContainer = document.getElementById('modal-details');

// 新增一個變數來取得頂部導覽列元素
const categoryNav = document.querySelector('.category-nav');

let cart = {};

// 💡 替換/新增：動態生成類別標籤的函式
function renderCategoryTabs() {
    // 清空現有的類別標籤（這是為了替換舊的靜態 HTML 內容）
    categoryTabs.innerHTML = ''; 
    
    // 插入 '全部' 選項
    const allTab = document.createElement('li');
    allTab.classList.add('category-item', 'active');
    allTab.dataset.category = 'all';
    allTab.textContent = '全部';
    categoryTabs.appendChild(allTab);

    // 插入其他動態類別
    categories.forEach(category => {
        const tab = document.createElement('li');
        tab.classList.add('category-item');
        tab.dataset.category = category;
        tab.textContent = category;
        categoryTabs.appendChild(tab);
    });
}


// 動態生成菜單項目
function renderMenuItems(category) {
    menuContainer.innerHTML = '';
    
    // 💡 檢查 menuItems 是否已載入
    if (menuItems.length === 0) {
        menuContainer.innerHTML = '<p class="loading-message">正在載入菜單...</p>';
        return;
    }
    
    let filteredItems;

    // 如果類別是 'all'，顯示所有餐點
    if (category === 'all') {
        filteredItems = menuItems;
    } else {
        filteredItems = menuItems.filter(item => item.category === category);
    }
    
    if (filteredItems.length === 0) {
        menuContainer.innerHTML = '<p class="empty-category-message">此分類暫無餐點</p>';
        return;
    }

    filteredItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('menu-item');
        
        // 💡 SheetDB 數據都是字串，需要轉換為數字
        itemEl.dataset.id = item.id;
        
        itemEl.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
        `;
        menuContainer.appendChild(itemEl);
    });
}

// 💡 替換/新增：從 SheetDB 獲取菜單資料並初始化應用程式
async function initializeApp() {
    try {
        console.log('正在從 SheetDB 載入菜單資料...');
        
        // 顯示載入中樣式
        menuContainer.style.opacity = '0.5';

        const response = await fetch(MENU_API_URL);
        
        if (!response.ok) {
             // SheetDB 服務器端錯誤
             throw new Error(`SheetDB 服務錯誤! 狀態碼: ${response.status}`);
        }
        
        // 💡 處理 SheetDB 返回的數據
        const rawData = await response.json();
        
        // 💡 數據清洗：將 Sheets 返回的字串數字（id, price）和 options 欄位轉換為 JS 可用的格式
        const data = rawData.map(item => {
            const newItem = { ...item };
            
            // 轉換數字
            newItem.id = Number(item.id);
            newItem.price = Number(item.price);
            
            // 轉換 options 欄位 (SheetDB 返回的是單純的字串)
            // 我們需要重新解析這個 options 字串。這裡必須重寫 Apps Script 中的解析邏輯
            if (item.options) {
                // 這裡必須重現 Apps Script 中的 parseOptions 邏輯
                newItem.options = parseSheetOptions(String(item.options));
            } else {
                newItem.options = undefined;
            }
            
            return newItem;
        });

        // 將載入的資料賦值給 menuItems
        menuItems = data;
        
        // 重新計算類別
        categories = [...new Set(menuItems.map(item => item.category))];
        
        // 生成類別標籤
        renderCategoryTabs(); 
        
        // 初始化時渲染全部菜單項目
        renderMenuItems('all');
        
        // 移除載入中樣式
        menuContainer.style.opacity = '1';

        console.log('菜單資料載入成功！');
        
    } catch (error) {
        console.error("載入菜單時發生錯誤：", error);
        // 顯示錯誤訊息給使用者
        menuContainer.innerHTML = `<p class="error-message">載入菜單失敗: ${error.message}. 請檢查 SheetDB 網址或試算表共用權限。</p>`;
        menuContainer.style.opacity = '1';
    }
}


// 💡 輔助函式：必須在前端 JS 中重新定義這個函數，用於解析 SheetDB 返回的 options 字串
function parseSheetOptions(optionsStr) {
    if (!optionsStr) return [];
    const optionGroups = optionsStr.split(';'); // 以分號分隔選項組
    
    return optionGroups.map(group => {
        if (!group.trim()) return null; 
        
        const parts = group.split(':'); // 以冒號分隔選項參數
        // 格式: [名稱, 類型, 選項列表, 必填]
        if (parts.length !== 4) {
             console.warn("SheetDB 返回的選項格式錯誤:", group);
             return null;
        }
        
        const [name, type, choicesStr, requiredStr] = parts;
        
        return {
            name: name.trim(),
            type: type.trim(),
            choices: choicesStr.split(',').map(c => c.trim()), // 以逗號分隔選項
            required: requiredStr.trim().toLowerCase() === 'true' // 轉換 'true'/'false' 為布林值
        };
    }).filter(o => o !== null);
}


// 處理類別切換
categoryTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.category-item');
    if (tab) {
        document.querySelectorAll('.category-item').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderMenuItems(tab.dataset.category);
    }
});

// 處理餐點項目點擊事件 (其餘邏輯不變)
menuContainer.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item');
    if (menuItem) {
        // 💡 確保使用 Number() 轉換 dataset.id
        const itemId = Number(menuItem.dataset.id);
        const selectedItem = menuItems.find(item => item.id == itemId);

        // 動態生成選項表單和數量控制
        let modalContent = `
            <img src="${selectedItem.img}" alt="${selectedItem.name}">
            <h3>${selectedItem.name}</h3>
            <p class="modal-price">$${selectedItem.price}</p>
            <form id="item-options-form">
        `;
        
        // 檢查是否有客製化選項
        if (selectedItem.options) {
            modalContent += selectedItem.options.map(option => {
                let inputHTML = '';
                if (option.type === 'radio') {
                    inputHTML = option.choices.map(choice => `
                        <label>
                            <input type="radio" name="${option.name}" value="${choice}" ${option.required ? 'required' : ''}>
                            ${choice}
                        </label>
                    `).join('');
                } else if (option.type === 'text') {
                    inputHTML = `<input type="text" name="${option.name}" placeholder="${option.placeholder || ''}" class="modal-text-input">`;
                }
                return `
                    <div class="option-group">
                        <p><strong>${option.name}</strong>${option.required ? ' <span class="required">*</span>' : ''}</p>
                        ${inputHTML}
                    </div>
                `;
            }).join('');
        }
        
        modalContent += `
            <div class="quantity-control">
                <button type="button" class="quantity-btn decrease-modal">-</button>
                <span id="item-quantity">1</span>
                <button type="button" class="quantity-btn increase-modal">+</button>
            </div>
            <button type="submit" id="add-to-cart-modal">加入購物車</button>
            </form>
        `;

        modalDetailsContainer.innerHTML = modalContent;
        itemModal.classList.add('show');


        let quantity = 1;
        const quantityEl = document.getElementById('item-quantity');
        const form = document.getElementById('item-options-form');
        
        // 數量增加
        document.querySelector('.increase-modal').onclick = () => {
            quantity++;
            quantityEl.textContent = quantity;
        };

        // 數量減少
        document.querySelector('.decrease-modal').onclick = () => {
            if (quantity > 1) {
                quantity--;
                quantityEl.textContent = quantity;
            }
        };

        // 點擊「加入購物車」按鈕 (表單提交)
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // 防止表單預設提交行為

            const options = {};
            const formData = new FormData(form);
            for (let [key, value] of formData.entries()) {
                options[key] = value;
            }

            const item = menuItems.find(i => i.id == itemId);
            
            // 檢查購物車中是否已有相同選項的餐點
            let existingItem = null;
            for (const key in cart) {
                if (cart[key].id == itemId && JSON.stringify(cart[key].options) === JSON.stringify(options)) {
                    existingItem = cart[key];
                    break;
                }
            }
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // 使用一個唯一的key來區分不同選項的同一餐點
                const cartKey = `${itemId}-${Date.now()}`;
                cart[cartKey] = { ...item, quantity: quantity, options: options, uniqueId: cartKey };
            }
            updateCart();
            itemModal.classList.remove('show');
        });
    }
});

// 關閉彈出視窗
closeModal.addEventListener('click', () => {
    itemModal.classList.remove('show');
});

// 更新購物車顯示 (其餘邏輯不變)
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    const cartKeys = Object.keys(cart);

    if (cartKeys.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">購物車還是空的喔！</p>';
        return;
    }

    cartKeys.forEach(key => {
        const item = cart[key];
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        
        let optionsHtml = '';
        if (item.options) {
            optionsHtml = Object.entries(item.options).map(([key, value]) => {
                // 💡 修正：確保選項是字串或陣列（Apps Script 返回的是物件）
                let displayValue = (typeof value === 'object' && value !== null) ? JSON.stringify(value) : value;
                return `<br><small>${key}: ${displayValue}</small>`;
            }).join('');
        }

        itemEl.innerHTML = `
            <div>
                ${item.name} x ${item.quantity}
                ${optionsHtml}
            </div>
            <div class="item-controls">
                <span class="item-total">$${item.price * item.quantity}</span>
                <span class="item-remove" data-id="${item.uniqueId}"><i class="fas fa-trash-alt"></i></span>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
        total += item.price * item.quantity;
        count += item.quantity;
    });

    cartCount.textContent = count;
    totalPriceEl.textContent = `$${total}`;
}

// 處理購物車數量調整與移除 (其餘邏輯不變)
cartItemsContainer.addEventListener('click', (e) => {
    const target = e.target;
    const uniqueId = target.dataset.id || target.closest('.item-remove')?.dataset.id; // 修正這裡，確保點擊圖示也能抓到id

    // 這裡只需要判斷是否點擊了垃圾桶圖示或其父元素
    if (target.classList.contains('item-remove') || target.closest('.item-remove')) {
        delete cart[uniqueId];
    }
    
    // 原來的增減按鈕邏輯已移除
    updateCart();
});

// 切換頁面 (其餘邏輯不變)
menuTab.addEventListener('click', () => {
    // 點餐頁
    menuSection.style.display = 'block';
    cartSection.style.display = 'none';
    checkoutSection.style.display = 'none';
    // 點餐頁時，隱藏購物車區塊，顯示點餐類別導覽列
    cartSection.style.display = 'none';
    categoryNav.style.display = 'block';
    document.querySelectorAll('.nav-tab').forEach(item => item.classList.remove('active'));
    menuTab.classList.add('active');
});

cartTab.addEventListener('click', () => {
    // 購物車頁
    menuSection.style.display = 'none';
    cartSection.style.display = 'block';
    checkoutSection.style.display = 'none';
    // 購物車頁時，隱藏點餐類別導覽列
    categoryNav.style.display = 'none';
    document.querySelectorAll('.nav-tab').forEach(item => item.classList.remove('active'));
    cartTab.classList.add('active');
    updateCart();
});

headerCartIcon.addEventListener('click', () => {
    // 購物車頁
    menuSection.style.display = 'none';
    cartSection.style.display = 'block';
    checkoutSection.style.display = 'none';
    // 購物車頁時，隱藏點餐類別導覽列
    categoryNav.style.display = 'none';
    document.querySelectorAll('.nav-tab').forEach(item => item.classList.remove('active'));
    cartTab.classList.add('active');
    updateCart();
});

checkoutTab.addEventListener('click', (e) => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) {
        alert('請先選擇餐點後再結帳喔！');
        return;
    }
    menuSection.style.display = 'none';
    cartSection.style.display = 'none';
    checkoutSection.style.display = 'block';
    // 結帳頁面時，隱藏所有導覽列
    categoryNav.style.display = 'none';
});

// 確保剛載入時，購物車頁面是隱藏的，點餐類別導覽列是顯示的
cartSection.style.display = 'none';
categoryNav.style.display = 'block';


orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (Object.keys(cart).length === 0) {
        alert("購物車是空的，無法送出訂單！");
        return;
    }

    const orderData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        diningOption: document.getElementById("dining-option").value,
        pickupTime: document.getElementById("pickup-time").value,
        totalPrice: totalPriceEl.textContent.replace("$", ""),
        cartItems: Object.values(cart).map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            options: item.options,
            subTotal: item.price * item.quantity
        }))
    };

    // ★★★ 這裡放你的 GAS 部署網址 ★★★
    const scriptURL = "https://script.google.com/macros/s/AKfycbxIqM49jW30P0ZqitNX_Z1BN5OD81xdl32zy2UOEkyxZFzB5QTNHcTaC6eNDjN2Vo67/exec";

    try {
        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        alert("訂單已送出成功！");
        cart = {};
        updateCart();
        orderForm.reset();

    } catch (error) {
        console.error("送出失敗：", error);
        alert("送出訂單時發生錯誤！");
    }
});


// -----------------------------------------------------------------
// ★★★ 啟動應用程式 - 從 Apps Script 動態載入菜單 ★★★
// -----------------------------------------------------------------
initializeApp();