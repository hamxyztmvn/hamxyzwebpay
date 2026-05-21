// Variabel untuk menyimpan tema yang dipilih
let selectedTheme = localStorage.getItem('selectedTheme') || 'blue';

// Fungsi untuk menerapkan tema ke root
function applyTheme(themeColor) {
    const root = document.documentElement;
    // Hapus semua class tema yang ada
    const themeClasses = ['theme-red', 'theme-yellow', 'theme-blue', 'theme-gray', 'theme-black', 'theme-green', 'theme-purple'];
    themeClasses.forEach(cls => root.classList.remove(cls));
    
    // Tambahkan class tema yang dipilih
    root.classList.add(`theme-${themeColor}`);
    
    // Simpan ke localStorage
    localStorage.setItem('selectedTheme', themeColor);
}

// Fungsi untuk load tema saat halaman dimuat
function loadTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        selectedTheme = savedTheme;
        applyTheme(selectedTheme);
    }
}

// Fungsi untuk membuka bottom sheet tema
function openThemeSheet() {
    const sheet = document.getElementById('themeSheet');
    sheet.classList.add('active');
    
    // Tandai opsi yang sedang dipilih
    const options = document.querySelectorAll('.theme-option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        const color = opt.getAttribute('data-color');
        if (color === selectedTheme) {
            opt.classList.add('selected');
        }
    });
}

// Fungsi untuk menutup bottom sheet tema
function closeThemeSheet() {
    const sheet = document.getElementById('themeSheet');
    sheet.classList.remove('active');
}

// Fungsi untuk memilih tema (tanpa refresh dulu)
function selectTheme(color) {
    selectedTheme = color;
    
    // Update tampilan selected di bottom sheet
    const options = document.querySelectorAll('.theme-option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        if (opt.getAttribute('data-color') === color) {
            opt.classList.add('selected');
        }
    });
}

// Fungsi confirm tema - refresh dan terapkan tema baru
function confirmTheme() {
    // Simpan tema yang dipilih ke localStorage
    localStorage.setItem('selectedTheme', selectedTheme);
    // Refresh halaman untuk menerapkan tema
    window.location.reload();
}

// Event listener untuk klik opsi tema
document.addEventListener('DOMContentLoaded', function() {
    // Load tema yang tersimpan
    loadTheme();
    
    // Setup event listener untuk opsi tema
    const options = document.querySelectorAll('.theme-option');
    options.forEach(opt => {
        opt.addEventListener('click', function(e) {
            e.stopPropagation();
            const color = this.getAttribute('data-color');
            selectTheme(color);
        });
    });
    
    // Tutup bottom sheet saat klik overlay
    const overlay = document.querySelector('.theme-sheet-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeThemeSheet);
    }
    
    // Animasi teks "please wait..." dengan titik-titik yang berubah
    startWaitingTextAnimation();
});

// Fungsi untuk animasi teks "please wait..." dengan titik-titik
function startWaitingTextAnimation() {
    const waitingText = document.getElementById('waitingText');
    if (!waitingText) return;
    
    let dotCount = 0;
    const maxDots = 3;
    
    setInterval(() => {
        dotCount = (dotCount + 1) % (maxDots + 1);
        let dots = '.'.repeat(dotCount);
        waitingText.textContent = `Please Wait${dots}`;
    }, 500);
}

// Fungsi untuk skip loading awal
function skipInitialLoading() {
    const loader = document.getElementById('initialLoader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        startVideoWithSound();
    }, 300);
}

// Fungsi untuk memulai video dengan sound langsung
function startVideoWithSound() {
    const video = document.getElementById('mainVideo');
    if (!video) return;
    
    video.muted = false;
    video.volume = 1.0;
    
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Video playing with full sound");
        }).catch(error => {
            console.log("Autoplay dengan suara diblokir");
            setTimeout(() => {
                video.play().catch(e => {
                    console.log("Masih diblokir");
                });
            }, 300);
        });
    }
}

// Auto hide loading awal setelah 10 detik (durasi bar loading selesai)
setTimeout(() => {
    const loader = document.getElementById('initialLoader');
    if (loader && loader.style.display !== 'none') {
        skipInitialLoading();
    }
}, 10000);

// Fungsi untuk navigasi halaman
function navTo(pageId) {
    const pageLoader = document.getElementById('pageLoader');
    
    pageLoader.style.display = 'flex';
    pageLoader.style.opacity = '1';

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    setTimeout(() => {
        document.getElementById(pageId).classList.add('active');
        
        pageLoader.style.opacity = '0';
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 200);
        
        if (pageId === 'home') {
            setTimeout(() => {
                startVideoWithSound();
            }, 100);
        }
    }, 150);
}

function copyNum() {
    navigator.clipboard.writeText("081335783149");
    alert("Copied!");
}

function downloadQR() {
    const link = document.createElement('a');
    link.href = document.getElementById('qrisImg').src;
    link.download = "QRIS_HAMXYZ.png";
    link.click();
}

// Fungsi untuk preview QRIS fullscreen
function openQrisPreview() {
    const modal = document.getElementById('qrisModal');
    const modalImg = document.getElementById('modalQrisImg');
    const qrisImg = document.getElementById('qrisImg');
    
    modalImg.src = qrisImg.src;
    modal.classList.add('active');
}

function closeQrisModal() {
    const modal = document.getElementById('qrisModal');
    modal.classList.remove('active');
}

// Tutup modal dengan tombol ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQrisModal();
        closeThemeSheet();
    }
});

// Optimasi video
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('mainVideo');
    if (video) {
        video.preload = 'auto';
        video.playsInline = true;
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('playsinline', '');
        
        video.addEventListener('error', function(e) {
            console.error("Video error:", e);
        });
    }
});

// Event listener untuk klik di manapun untuk trigger video sound
document.addEventListener('click', function() {
    const video = document.getElementById('mainVideo');
    if (video && video.paused) {
        video.play().catch(e => {
            console.log("Butuh interaksi lebih lanjut");
        });
    }
});
