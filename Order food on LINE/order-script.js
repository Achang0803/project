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
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 3, name: '(特餐)新品蘋果汁買一送一(限大杯)', price: 0, category: '特餐', img: '../Image/01.png',
        options: [
            { name: '甜度', type: 'radio', choices: ['正常不加糖', '加微糖'], required: true }
        ]
    },
    { id: 4, name: '(特餐)雞塊(4顆)+薯條+任選飲料', price: 0, category: '特餐', img: '../Image/01.png',
        options: [
            { name: '選擇飲料', type: 'radio', choices: ['紅茶', '奶茶'], required: true },
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 5, name: '(特餐)薯條+薯餅+熱狗+任選飲料', price: 0, category: '特餐', img: '../Image/01.png',
        options: [
            { name: '選擇飲料', type: 'radio', choices: ['紅茶', '奶茶'], required: true },
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 6, name: '(特餐)抓餅+薯餅+任選飲料', price: 0, category: '特餐', img: '../Image/01.png',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '選擇飲料', type: 'radio', choices: ['紅茶', '奶茶'], required: true },
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 7, name: '(特餐)蘿蔔糕+熱狗+任選飲料', price: 0, category: '特餐', img: '../Image/01.png',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '選擇飲料', type: 'radio', choices: ['紅茶', '奶茶'], required: true },
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 8, name: '(特餐)燻雞蛋堡+柳橙汁', price: 0, category: '特餐', img: '../Image/01.png',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 9, name: '蔬菜吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
        ]
    },
    { id: 10, name: '煎蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 11, name: '果醬吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
        ]
    },
    { id: 12, name: '起司蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 13, name: '豬肉蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 14, name: '豬排蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 15, name: '肉鬆蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 16, name: '火腿蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 17, name: '培根蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 18, name: '鮪魚蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 19, name: '薯餅蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 20, name: '雞腿蛋吐司', price: 0, category: '吐司', img: '../Image/7.jpg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 21, name: '果醬厚片', price: 0, category: '厚片', img: '../Image/10.jpg',
        options: [
            { name: '烤酥選項', type: 'radio', choices: ['酥一點', '正常', '微烤'], required: true },
        ]
    },
    { id: 22, name: '起司厚片', price: 0, category: '厚片', img: '../Image/10.jpg',
        options: [
            { name: '烤酥選項', type: 'radio', choices: ['酥一點', '正常', '微烤'], required: true },
        ]
    },
    { id: 23, name: '鮪魚厚片', price: 0, category: '厚片', img: '../Image/10.jpg',
        options: [
            { name: '烤酥選項', type: 'radio', choices: ['酥一點', '正常', '微烤'], required: true },
        ]
    },
    { id: 24, name: '燻雞厚片', price: 0, category: '厚片', img: '../Image/10.jpg',
        options: [
            { name: '烤酥選項', type: 'radio', choices: ['酥一點', '正常', '微烤'], required: true },
        ]
    },
    { id: 25, name: '豬排蛋捲餅', price: 0, category: '捲餅', img: '../Image/11.png',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 26, name: '玉米蛋捲餅', price: 0, category: '捲餅', img: '../Image/11.png',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 27, name: '肉鬆蛋捲餅', price: 0, category: '捲餅', img: '../Image/11.png',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 28, name: '培根蛋捲餅', price: 0, category: '捲餅', img: '../Image/11.png',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 29, name: '鮪魚蛋捲餅', price: 0, category: '捲餅', img: '../Image/11.png',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 30, name: '薯餅蛋捲餅', price: 0, category: '捲餅', img: '../Image/11.png',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
        ]
    },
    { id: 31, name: '豬肉蛋堡', price: 0, category: '漢堡', img: '../Image/12.jpeg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
            { name: '去洋蔥選項', type: 'radio', choices: ['正常', '去洋蔥'], required: true },
            { name: '去醬料選項', type: 'radio', choices: ['去沙拉醬', '去番茄醬', '兩種都去'], required: true },
        ]
    },
    { id: 32, name: '豬排蛋堡', price: 0, category: '漢堡', img: '../Image/12.jpeg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
            { name: '去洋蔥選項', type: 'radio', choices: ['正常', '去洋蔥'], required: true },
            { name: '去醬料選項', type: 'radio', choices: ['去沙拉醬', '去番茄醬', '兩種都去'], required: true },
        ]
    },
    { id: 33, name: '火腿蛋堡', price: 0, category: '漢堡', img: '../Image/12.jpeg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
            { name: '去洋蔥選項', type: 'radio', choices: ['正常', '去洋蔥'], required: true },
            { name: '去醬料選項', type: 'radio', choices: ['去沙拉醬', '去番茄醬', '兩種都去'], required: true },
        ]
    },
    { id: 34, name: '培根蛋堡', price: 0, category: '漢堡', img: '../Image/12.jpeg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
            { name: '去洋蔥選項', type: 'radio', choices: ['正常', '去洋蔥'], required: true },
            { name: '去醬料選項', type: 'radio', choices: ['去沙拉醬', '去番茄醬', '兩種都去'], required: true },
        ]
    },
    { id: 35, name: '香雞蛋堡', price: 0, category: '漢堡', img: '../Image/12.jpeg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
            { name: '去洋蔥選項', type: 'radio', choices: ['正常', '去洋蔥'], required: true },
            { name: '去醬料選項', type: 'radio', choices: ['去沙拉醬', '去番茄醬', '兩種都去'], required: true },
        ]
    },
    { id: 36, name: '燻雞蛋堡', price: 0, category: '漢堡', img: '../Image/12.jpeg',
        options: [
            { name: '去蛋選項', type: 'radio', choices: ['正常', '不加'], required: true },
            { name: '去洋蔥選項', type: 'radio', choices: ['正常', '去洋蔥'], required: true },
            { name: '去醬料選項', type: 'radio', choices: ['去沙拉醬', '去番茄醬', '兩種都去'], required: true },
        ]
    },
    { id: 37, name: '原味蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 38, name: '起司蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 39, name: '肉鬆蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 40, name: '火腿蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 41, name: '玉米蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 42, name: '培根蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 43, name: '鮪魚蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 44, name: '燻雞蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 45, name: '薯餅蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 46, name: '豬排蛋餅', price: 0, category: '蛋餅', img: '../Image/13.png' },
    { id: 47, name: '黑胡椒鐵板麵', price: 0, category: '鐵板麵', img: '../Image/14.jpg', 
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '蛋熟度', type: 'radio', choices: ['全熟', '半熟', '炒蛋'], required: true },
        ]
    },
    { id: 48, name: '蘑菇鐵板麵', price: 0, category: '鐵板麵', img: '../Image/14.jpg',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '蛋熟度', type: 'radio', choices: ['全熟', '半熟', '炒蛋'], required: true },
        ]
    },
    { id: 49, name: '奶油鐵板麵', price: 0, category: '鐵板麵', img: '../Image/14.jpg',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '蛋熟度', type: 'radio', choices: ['全熟', '半熟', '炒蛋'], required: true },
        ]
    },
    { id: 50, name: '肉醬麵', price: 0, category: '鐵板麵', img: '../Image/14.jpg',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '蛋熟度', type: 'radio', choices: ['全熟', '半熟', '炒蛋'], required: true },
        ]
    },
    { id: 51, name: '沙茶麵', price: 0, category: '鐵板麵', img: '../Image/14.jpg',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '蛋熟度', type: 'radio', choices: ['全熟', '半熟', '炒蛋'], required: true },
        ]
    },
    { id: 52, name: '宮保麵', price: 0, category: '鐵板麵', img: '../Image/14.jpg',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
            { name: '蛋熟度', type: 'radio', choices: ['全熟', '半熟', '炒蛋'], required: true },
        ]
    },
    { id: 53, name: '荷包蛋', price: 0, category: '中式餐點', img: '../Image/15.jpg',
        options: [
            { name: '蛋熟度', type: 'radio', choices: ['全熟', '半熟',], required: true },
        ]
    },
    { id: 54, name: '熱狗', price: 0, category: '中式餐點', img: '../Image/16.jpg' },
    { id: 55, name: '薯餅', price: 0, category: '中式餐點', img: '../Image/17.jpg' },
    { id: 56, name: '薯條', price: 0, category: '中式餐點', img: '../Image/18.jpg' },
    { id: 57, name: '雞塊', price: 0, category: '中式餐點', img: '../Image/19.jpg' },
    { id: 58, name: '港式蘿蔔糕', price: 0, category: '中式餐點', img: '../Image/20.jpg' },
    { id: 59, name: '蔥油餅', price: 0, category: '中式餐點', img: '../Image/21.jpg',
        options: [
            { name: '加蛋選項', type: 'radio', choices: ['加蛋', '不加'], required: true },
        ]
    },
    { id: 60, name: '奶酪', price: 0, category: '點心', img: '../Image/22.png' },
    { id: 61, name: '布丁', price: 0, category: '點心', img: '../Image/23.jpg' },
    { id: 62, name: '紅茶', price: 0, category: '飲料', img: '../Image/8.png',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 63, name: '奶茶', price: 0, category: '飲料', img: '../Image/3.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 64, name: '鮮奶茶', price: 0, category: '飲料', img: '../Image/24.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 65, name: '綠茶', price: 0, category: '飲料', img: '../Image/2.jpg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜', '無糖'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: true }
        ]
    },
    { id: 66, name: '奶綠', price: 0, category: '飲料', img: '../Image/25.jpeg', 
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜', '無糖'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: true }
        ]
    },
    { id: 67, name: '豆漿', price: 0, category: '飲料', img: '../Image/4.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常甜', '微甜', '無糖'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 68, name: '米漿', price: 0, category: '飲料', img: '../Image/31.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
        ]
    },
    { id: 69, name: '柳橙汁', price: 0, category: '飲料', img: '../Image/26.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常不加糖', '加微糖'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: true }
        ]
    },
    { id: 70, name: '蘋果汁', price: 0, category: '飲料', img: '../Image/27.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常不加糖', '加微糖'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: true }
        ]
    },
    { id: 71, name: '美式', price: 0, category: '飲料', img: '../Image/28.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '甜度', type: 'radio', choices: ['正常不加糖', '加微糖'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 72, name: '特調', price: 0, category: '飲料', img: '../Image/30.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
    { id: 73, name: '拿鐵', price: 0, category: '飲料', img: '../Image/29.jpeg',
        options: [
            { name: '杯子大小', type: 'radio', choices: ['中杯', '大杯'], required: true },
            { name: '溫度', type: 'radio', choices: ['冰', '熱'], required: true },
            { name: '冰塊', type: 'radio', choices: ['正常冰', '微冰', '滿冰'], required: false }
        ]
    },
];

const categories = [...new Set(menuItems.map(item => item.category))];
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

// 動態生成類別標籤 (這個函數現在沒用了，但為了完整性保留)
function renderCategories() {
    // 你的 HTML 已經有靜態的類別列表，所以這裡不需要再動態生成
}

// 動態生成菜單項目
function renderMenuItems(category) {
    menuContainer.innerHTML = '';
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
        itemEl.dataset.id = item.id;
        itemEl.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
        `;
        menuContainer.appendChild(itemEl);
    });
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

// 處理餐點項目點擊事件
menuContainer.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item');
    if (menuItem) {
        const itemId = menuItem.dataset.id;
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

// 更新購物車顯示
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
                return `<br><small>${key}: ${value}</small>`;
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

// 處理購物車數量調整與移除
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

// 切換頁面
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

// 初始化時渲染全部菜單項目，並設定初始頁面顯示
renderMenuItems('all');
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
    const scriptURL = "https://script.google.com/macros/s/AKfycbwkJdrAolyZg8KdLLnn2mnt3t-sWs9Oag0lzSBLYzH1FbkwRiW-q021Tcnt_vGNAamg/exec";

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
