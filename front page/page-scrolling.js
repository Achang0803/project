// 確保 DOM 完全載入後再執行
document.addEventListener('DOMContentLoaded', () => {
    // === 圖片輪播功能 ===
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');

    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        currentSlide = index;
        const transformValue = -currentSlide * 100;
        sliderContainer.style.transform = `translateX(${transformValue}%)`;

        dots.forEach((dot) => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };

    const startSlider = () => {
        stopSlider();
        slideInterval = setInterval(nextSlide, 3000);
    };

    const stopSlider = () => {
        clearInterval(slideInterval);
    };

    rightArrow.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    leftArrow.addEventListener('click', () => {
        stopSlider();
        prevSlide();
        startSlider();
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', (event) => {
            stopSlider();
            const index = parseInt(event.target.dataset.index);
            showSlide(index);
            startSlider();
        });
    });

    showSlide(0);
    startSlider();


    // === 最新消息分頁功能 ===
    const newsItems = document.querySelectorAll('.news-item');
    const prevButton = document.querySelector('.page-arrow.prev');
    const nextButton = document.querySelector('.page-arrow.next');
    const itemsPerPage = 9;
    let currentPage = 0;

    const totalPages = Math.ceil(newsItems.length / itemsPerPage);

    const showNewsPage = (page) => {
        if (page < 0) {
            page = 0;
        } else if (page >= totalPages) {
            page = totalPages - 1;
        }

        currentPage = page;
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;

        newsItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === totalPages - 1;
    };

    prevButton.addEventListener('click', () => {
        showNewsPage(currentPage - 1);
    });

    nextButton.addEventListener('click', () => {
        showNewsPage(currentPage + 1);
    });

    showNewsPage(0);
});
