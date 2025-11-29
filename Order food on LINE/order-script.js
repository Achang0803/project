// 範例菜單資料，你的資料不需要修改
// 在最上方，其他變數宣告之後加入
const headerCartIcon = document.getElementById('header-cart-icon');


const menuItems = [
    { id: 1, name: '(特餐)豬排蛋餅+中杯紅(奶)茶', price: 0, category: '特餐', img: '../Image/01.png',
        options: [
            { name: '選擇飲料', type: 'radio', choices: ['紅茶', '奶茶'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 2, name: '(特餐)鐵板麵+豬排+任選飲料', price: 0, category: '特餐', img: '../Image/01.png',
        options: [
            { name: '麵種類', type: 'radio', choices: ['黑胡椒', '蘑菇','奶油', '肉醬','沙茶', '宮保'], required: true },
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '選擇飲料', type: 'radio', choices: ['紅茶', '奶茶'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 3, name: '招牌豬排堡', price: 55, category: '漢堡', img: '../Image/02.png', options: [] },
    { id: 4, name: '紐約辣雞腿堡', price: 70, category: '漢堡', img: '../Image/02.png', options: [] },
    { id: 5, name: '原味蛋餅', price: 25, category: '蛋餅', img: '../Image/03.png', options: [] },
    { id: 6, name: '起司蛋餅', price: 35, category: '蛋餅', img: '../Image/03.png', options: [] },
    { id: 7, name: '大杯紅茶', price: 25, category: '飲品', img: '../Image/04.png', 
        options: [
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜', '半糖', '無糖'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '去冰'], required: false }
        ]
    },
    { id: 8, name: '中杯奶茶', price: 30, category: '飲品', img: '../Image/04.png', 
        options: [
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '去冰'], required: false }
        ]
    }
];

// --- Modal Helper Functions (取代 alert/confirm) ---

const customAlert = document.getElementById('custom-alert');
const alertMessage = document.getElementById('alert-message');
const alertOkBtn = document.getElementById('alert-ok-btn');

function showAlert(message) {
    return new Promise(resolve => {
        alertMessage.textContent = message;
        customAlert.style.display = 'flex';
        
        const closeHandler = () => {
            customAlert.style.display = 'none';
            alertOkBtn.removeEventListener('click', closeHandler);
            resolve();
        };

        alertOkBtn.addEventListener('click', closeHandler);
    });
}

// --- 主要應用程式邏輯 ---

let cart = {}; // 用於儲存購物車項目的物件
let currentCategory = '特餐'; // 預設顯示特餐分類

// DOM 元素快取
const menuList = document.getElementById('menu-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalCountEl = document.getElementById('cart-total-count');
const totalPriceEl = document.getElementById('total-price');
const categoryNav = document.getElementById('category-tabs');
const menuSection = document.getElementById('menu-section');
const cartSection = document.getElementById('cart-section');
const checkoutSection = document.getElementById('checkout-section');
const orderResultSection = document.getElementById('order-result-section'); // 新增
const orderResultMessage = document.getElementById('order-result-message'); // 新增
const backToMenuBtn = document.getElementById('back-to-menu'); // 新增
const orderForm = document.getElementById('order-form');
const goToCheckoutBtn = document.getElementById('go-to-checkout');
const bottomNavTabs = document.querySelectorAll('.bottom-nav .nav-tab');

const itemModal = document.getElementById('item-modal');
const closeModalBtn = itemModal.querySelector('.close-btn');
const modalDetails = document.getElementById('modal-details');

// 顯示或隱藏區塊
function showSection(targetSectionId) {
    const sections = [menuSection, cartSection, checkoutSection, orderResultSection];
    sections.forEach(section => {
        if (section.id === targetSectionId) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });

    // 更新底部導航列的 active 狀態
    bottomNavTabs.forEach(tab => {
        if (tab.getAttribute('data-target') === targetSectionId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // 結帳頁和結果頁隱藏分類導航
    if (targetSectionId === 'checkout-section' || targetSectionId === 'order-result-section') {
        categoryNav.style.display = 'none';
    } else {
        categoryNav.style.display = 'block';
    }
}

// 根據當前分類渲染菜單
function renderMenu() {
    const items = menuItems.filter(item => item.category === currentCategory);
    menuList.innerHTML = items.map(item => `
        <div class="menu-item" data-id="${item.id}">
            <img src="${item.img || 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=No+Image'}" 
                 alt="${item.name}" 
                 onerror="this.onerror=null; this.src='https://placehold.co/100x100/A0A0A0/FFFFFF?text=No+Image';">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">${item.price > 0 ? '$' + item.price : '請選擇規格'}</p>
            </div>
            <button class="add-to-cart-btn" data-id="${item.id}">加入購物車</button>
        </div>
    `).join('');

    // 重新綁定加入購物車按鈕事件
    menuList.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            openModal(id);
        });
    });
}

// 渲染購物車
function renderCart() {
    const items = Object.values(cart);
    
    // 根據 cartItems: [{ id, name, options, price, quantity, subTotal }] 格式渲染
    cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-options">${item.options}</p>
                <p class="item-price">$${item.price.toFixed(0)} x ${item.quantity}</p>
            </div>
            <div class="item-actions">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">移除</button>
            </div>
        </div>
    `).join('');

    // 更新總計
    updateCartSummary();

    // 重新綁定購物車按鈕事件
    cartItemsContainer.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const action = e.currentTarget.classList.contains('increase') ? 'increase' : 'decrease';
            updateCartQuantity(id, action);
        });
    });

    cartItemsContainer.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            removeFromCart(id);
        });
    });
}

// 更新購物車摘要
function updateCartSummary() {
    const items = Object.values(cart);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCountEl.textContent = totalQuantity;
    cartTotalCountEl.textContent = totalQuantity;
    totalPriceEl.textContent = `$${totalPrice.toFixed(0)}`;
    
    // 根據購物車數量啟用/禁用結帳按鈕
    goToCheckoutBtn.disabled = totalQuantity === 0;
}

// 開啟選項彈出視窗
function openModal(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    // 清空並準備內容
    modalDetails.innerHTML = '';

    // 標題和價格
    let html = `<h3>${item.name}</h3>`;
    html += `<p class="modal-base-price">基本單價: <span>$${item.price.toFixed(0)}</span></p>`;
    
    // 選項表單
    html += '<form id="modal-options-form">';
    item.options.forEach(option => {
        html += `<div class="option-group">`;
        html += `<h4>${option.name} ${option.required ? '<span class="required-star">*</span>' : ''}</h4>`;
        option.choices.forEach(choice => {
            // 使用 name 屬性來分組 radio 按鈕
            html += `
                <label>
                    <input type="${option.type}" name="${option.name}" value="${choice}" ${option.required ? 'required' : ''}>
                    ${choice}
                </label>
            `;
        });
        html += `</div>`;
    });
    
    // 數量控制
    html += `<div class="quantity-control-group">
                <h4>數量</h4>
                <div class="item-actions">
                    <button type="button" class="quantity-btn decrease-modal">-</button>
                    <input type="number" id="modal-quantity" value="1" min="1" readonly>
                    <button type="button" class="quantity-btn increase-modal">+</button>
                </div>
            </div>`;
    
    html += '</form>';

    // 確定按鈕 (將項目加入購物車)
    html += `<button id="add-item-to-cart-btn" class="add-to-cart-btn" data-id="${item.id}">確定加入購物車</button>`;

    modalDetails.innerHTML = html;
    
    // 數量控制邏輯
    const quantityInput = document.getElementById('modal-quantity');
    const increaseBtn = modalDetails.querySelector('.increase-modal');
    const decreaseBtn = modalDetails.querySelector('.decrease-modal');
    
    increaseBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
    
    decreaseBtn.addEventListener('click', () => {
        let current = parseInt(quantityInput.value);
        if (current > 1) {
            quantityInput.value = current - 1;
        }
    });

    // 綁定「確定加入購物車」按鈕事件
    const addItemBtn = document.getElementById('add-item-to-cart-btn');
    addItemBtn.addEventListener('click', () => {
        const form = document.getElementById('modal-options-form');
        // 檢查必填選項
        if (!form.checkValidity()) {
            // 觸發表單驗證錯誤訊息
            form.reportValidity();
            return;
        }
        
        // 收集選項
        let optionsText = '';
        let optionsMap = {};
        item.options.forEach(option => {
            const selected = form.querySelector(`input[name="${option.name}"]:checked`);
            if (selected) {
                optionsMap[option.name] = selected.value;
            } else if (!option.required) {
                 optionsMap[option.name] = '無'; // 可選項目未選
            }
        });
        
        // 將選項整理成一個字串作為購物車項目的唯一識別符的一部分
        // 格式: 選擇飲料:紅茶, 甜度:正常甜, ...
        optionsText = Object.entries(optionsMap).map(([key, value]) => `${key}:${value}`).join(', ');
        
        const key = `${item.id}-${optionsText}`;
        const quantity = parseInt(quantityInput.value);
        
        // 將項目加入購物車
        if (cart[key]) {
            cart[key].quantity += quantity;
        } else {
            cart[key] = {
                key: key, // 唯一識別鍵
                id: item.id,
                name: item.name,
                price: item.price,
                options: optionsText,
                quantity: quantity
            };
        }

        itemModal.style.display = 'none';
        updateCartSummary();
        // 顯示一個提示
        showAlert(`已將 ${quantity} 份 ${item.name} (${optionsText}) 加入購物車！`);
    });

    itemModal.style.display = 'flex';
}

// 更新購物車項目數量
function updateCartQuantity(key, action) {
    if (cart[key]) {
        if (action === 'increase') {
            cart[key].quantity++;
        } else if (action === 'decrease') {
            cart[key].quantity--;
            if (cart[key].quantity < 1) {
                removeFromCart(key);
                return;
            }
        }
        renderCart();
    }
}

// 從購物車移除項目
function removeFromCart(key) {
    delete cart[key];
    renderCart();
}


// --- 事件監聽器 ---

// 底部導覽列切換
bottomNavTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.dataset.target;
        showSection(targetId);
        // 如果切換到購物車，則重新渲染
        if (targetId === 'cart-section') {
            renderCart();
        }
    });
});

// 類別標籤切換
document.getElementById('category-tabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('category-item')) {
        currentCategory = e.target.dataset.category;
        
        // 更新 active 狀態
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        e.target.classList.add('active');

        // 重新渲染菜單
        renderMenu();
    }
});

// 彈出視窗關閉按鈕
closeModalBtn.addEventListener('click', () => {
    itemModal.style.display = 'none';
});

// 點擊 Modal 外部關閉
window.addEventListener('click', (event) => {
    if (event.target === itemModal) {
        itemModal.style.display = 'none';
    }
    if (event.target === customAlert) {
        customAlert.style.display = 'none';
    }
});

// 前往結帳按鈕
goToCheckoutBtn.addEventListener('click', () => {
    showSection('checkout-section');
});

// 返回菜單按鈕 (新增)
backToMenuBtn.addEventListener('click', () => {
    showSection('menu-section');
});


// --- 訂單提交邏輯 ---

orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (Object.keys(cart).length === 0) {
        await showAlert("購物車是空的，無法送出訂單！"); // 改用自訂 Modal
        return;
    }
    
    // 檢查取餐時間是否已填
    const pickupTime = document.getElementById("pickup-time").value;
    if (!pickupTime) {
         await showAlert("請填寫取餐時間！"); // 改用自訂 Modal
         return;
    }

    const orderData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        diningOption: document.getElementById("dining-option").value,
        pickupTime: pickupTime,
        // 移除 $ 符號，確保後端接收的是數字字符串
        totalPrice: totalPriceEl.textContent.replace("$", ""),
        // 準備 cartItems 格式以符合 Apps Script 後端需求
        cartItems: Object.values(cart).map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            options: item.options,
            // 計算小計
            subTotal: item.price * item.quantity 
        }))
    };

    // ★★★ 這裡放你的 GAS 部署網址 (請自行替換) ★★★
    // 注意：部署後需將網址替換為您的實際執行網址
    const scriptURL = "https://script.google.com/macros/s/AKfycbwkJdrAolyZg8KdLLnn2mnt3t-sWs9Oag0lzSBLYzH1FbkwRiW-q021Tcnt_vGNAamg/exec"; 
    // 建議將上方預設值替換為您提供的範例網址 (但不應包含在代碼中)
    // 範例網址: "https://script.google.com/macros/s/AKfycbwkJdrAolyZg8KdLLnn2mnt3t-sWs9Oag0lzSBLYzH1FbkwRiW-q021Tcnt_vGNAamg/exec";

    // 禁用按鈕並顯示載入狀態
    const submitBtn = document.getElementById('submit-order');
    submitBtn.disabled = true;
    submitBtn.textContent = '訂單處理中...';
    
    // 為了處理 no-cors 模式，我們不會檢查 response.ok，只需等待請求完成
    try {
        await fetch(scriptURL, {
            method: "POST",
            // 由於 GAS 的 Web App 限制，通常建議使用 no-cors
            mode: "no-cors", 
            headers: {
                "Content-Type": "text/plain", // 避免瀏覽器預檢 (preflight)
            },
            body: JSON.stringify(orderData), // 發送 JSON 字串
        });
        
        // 由於 no-cors 無法讀取回應，我們假設寫入成功並顯示成功訊息
        orderResultMessage.innerHTML = `
            <i class="fas fa-check-circle success-icon"></i>
            <h3>訂單送出成功！</h3>
            <p>您的訂單已送達廚房。請準備於取餐時間取餐。</p>
            <p><strong>請記下您的訂單號碼:</strong> 系統將自動產生，請以店家的確認為主。</p>
            <p>感謝您的訂購！</p>
        `;

        // 清空購物車和表單
        cart = {};
        orderForm.reset();
        updateCartSummary();
        showSection('order-result-section');

    } catch (error) {
        console.error("提交訂單失敗:", error);
        orderResultMessage.innerHTML = `
            <i class="fas fa-times-circle error-icon"></i>
            <h3>訂單送出失敗！</h3>
            <p>伺服器連線或處理發生錯誤，請稍後再試或直接撥打電話訂購。</p>
            <p>錯誤詳情: ${error.message}</p>
        `;
        showSection('order-result-section');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '送出訂單';
    }
});

// --- 應用程式初始化 ---

document.addEventListener('DOMContentLoaded', () => {
    // 初始化渲染
    renderMenu();
    updateCartSummary();
    showSection('menu-section'); // 確保從菜單頁開始
});