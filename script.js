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

// Auto hide loading awal setelah 1.5 detik
setTimeout(() => {
    const loader = document.getElementById('initialLoader');
    if (loader.style.display !== 'none') {
        skipInitialLoading();
    }
}, 1500);

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
