// script.js
const capsule = document.getElementById('glass-capsule');
let isDragging = false;
let offset = { x: 0, y: 0 };

capsule.addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', endDrag);
document.addEventListener('mousemove', drag);

// Поддержка тач-устройств
capsule.addEventListener('touchstart', startDrag, {passive: false});
document.addEventListener('touchend', endDrag);
document.addEventListener('touchmove', drag, {passive: false});

function startDrag(e) {
    isDragging = true;
    let clientX = e.clientX || e.touches[0].clientX;
    let clientY = e.clientY || e.touches[0].clientY;
    
    // Вычисляем смещение курсора относительно центра элемента при начале перетаскивания
    const rect = capsule.getBoundingClientRect();
    offset.x = clientX - rect.left - rect.width / 2;
    offset.y = clientY - rect.top - rect.height / 2;
    
    capsule.style.cursor = 'grabbing';
}

function endDrag() {
    isDragging = false;
    capsule.style.cursor = 'grab';
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault(); // Предотвращаем скролл на тач-устройствах

    let clientX = e.clientX || e.touches[0].clientX;
    let clientY = e.clientY || e.touches[0].clientY;

    const x = clientX - offset.x;
    const y = clientY - offset.y;

    // Используем translate для плавного движения
    capsule.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
}
