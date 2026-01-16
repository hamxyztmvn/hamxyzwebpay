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
    
    // Video tidak dimute sama sekali
    video.muted = false;
    video.volume = 1.0; // Volume maksimal
    
    // Coba play langsung
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Video playing with full sound");
        }).catch(error => {
            console.log("Autoplay dengan suara diblokir, coba lagi dengan sedikit delay");
            setTimeout(() => {
                video.play().catch(e => {
                    console.log("Masih diblokir, mungkin user perlu klik");
                });
            }, 300);
        });
    }
}

// Auto hide loading awal setelah 1.5 detik (jika user tidak skip)
setTimeout(() => {
    const loader = document.getElementById('initialLoader');
    if (loader.style.display !== 'none') {
        skipInitialLoading();
    }
}, 1500);

// Fungsi untuk navigasi halaman - loading cepat tanpa skip
function navTo(pageId) {
    const pageLoader = document.getElementById('pageLoader');
    
    // Tampilkan loading untuk perpindahan halaman
    pageLoader.style.display = 'flex';
    pageLoader.style.opacity = '1';

    // Sembunyikan halaman saat ini
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    setTimeout(() => {
        // Tampilkan halaman baru
        document.getElementById(pageId).classList.add('active');
        
        // Sembunyikan loading dengan cepat
        pageLoader.style.opacity = '0';
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 200);
        
        // Jika kembali ke home, play video lagi
        if (pageId === 'home') {
            setTimeout(() => {
                startVideoWithSound();
            }, 100);
        }
    }, 150); // Sangat cepat, hanya 150ms
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

// Optimasi video untuk menghindari lag
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('mainVideo');
    if (video) {
        // Preload video
        video.preload = 'auto';
        
        // Optimasi performa video
        video.playsInline = true;
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('playsinline', '');
        
        // Event listener untuk error video
        video.addEventListener('error', function(e) {
            console.error("Video error:", e);
        });
    }
});

// Tambahkan event listener untuk klik di manapun untuk trigger video sound
document.addEventListener('click', function() {
    // Jika video ada tapi belum play, coba play
    const video = document.getElementById('mainVideo');
    if (video && video.paused) {
        video.play().catch(e => {
            console.log("Butuh interaksi lebih lanjut untuk play video");
        });
    }
});
