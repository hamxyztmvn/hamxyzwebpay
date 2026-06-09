// ======================== MULTI BAHASA =========================
const translations = {
    id: {
        menu_theme: "Custom Theme", menu_language: "Bahasa", menu_games: "Games", menu_tools: "Tools",
        select_language: "Pilih Bahasa", theme_title: "Custom Thema", theme_red: "Merah", theme_yellow: "Kuning", theme_blue: "Biru", theme_gray: "Abu-abu", theme_white: "Putih", theme_green: "Hijau", theme_purple: "Ungu", theme_confirm: "CUSTOM",
        loading_please_wait: "Please Wait...", loading_skip: "SKIP LOADING",
        home_choose_payment: "CHOOSE PAYMENT METHODS", home_all_payment: "ALL PAYMENT",
        btn_dana: "DANA PAYMENT", btn_qris: "QRIS PAYMENT",
        sosmed_title: "CONNECT WITH ME", footer_dev_by: "WEB DEVELOPED BY",
        dana_title: "DANA PAYMENT", dana_name: "A/N: ILHAM FA****I", copy_number: "COPY NUMBER",
        qris_hint: "Klik Gambar Qris Nya Untuk Memperbesar", download: "DOWNLOAD",
        copied_alert: "Nomor berhasil disalin!", download_alert: "QRIS berhasil disimpan!"
    },
    ms: {
        menu_theme: "Tema Tersuai", menu_language: "Bahasa", menu_games: "Permainan", menu_tools: "Alatan",
        select_language: "Pilih Bahasa", theme_title: "Tema Tersuai", theme_red: "Merah", theme_yellow: "Kuning", theme_blue: "Biru", theme_gray: "Kelabu", theme_white: "Putih", theme_green: "Hijau", theme_purple: "Ungu", theme_confirm: "SESUAI",
        loading_please_wait: "Sila tunggu...", loading_skip: "SKIP",
        home_choose_payment: "PILIH KAEDAH BAYARAN", home_all_payment: "SEMUA BAYARAN",
        btn_dana: "BAYARAN DANA", btn_qris: "BAYARAN QRIS",
        sosmed_title: "HUBUNGI SAYA", footer_dev_by: "DIBANGUNKAN OLEH",
        dana_title: "BAYARAN DANA", dana_name: "A/N: ILHAM FA****I", copy_number: "SALIN NOMBOR",
        qris_hint: "Klik Gambar QRIS untuk Besarkan", download: "MUAT TURUN",
        copied_alert: "Nombor berjaya disalin!", download_alert: "QRIS berjaya disimpan!"
    },
    en: {
        menu_theme: "Custom Theme", menu_language: "Language", menu_games: "Games", menu_tools: "Tools",
        select_language: "Select Language", theme_title: "Custom Theme", theme_red: "Red", theme_yellow: "Yellow", theme_blue: "Blue", theme_gray: "Gray", theme_white: "White", theme_green: "Green", theme_purple: "Purple", theme_confirm: "CUSTOM",
        loading_please_wait: "Please Wait...", loading_skip: "SKIP LOADING",
        home_choose_payment: "CHOOSE PAYMENT METHODS", home_all_payment: "ALL PAYMENT",
        btn_dana: "DANA PAYMENT", btn_qris: "QRIS PAYMENT",
        sosmed_title: "CONNECT WITH ME", footer_dev_by: "WEB DEVELOPED BY",
        dana_title: "DANA PAYMENT", dana_name: "A/N: ILHAM FA****I", copy_number: "COPY NUMBER",
        qris_hint: "Click QRIS Image to Zoom", download: "DOWNLOAD",
        copied_alert: "Number copied!", download_alert: "QRIS saved!"
    },
    pt: {
        menu_theme: "Tema Personalizado", menu_language: "Idioma", menu_games: "Jogos", menu_tools: "Ferramentas",
        select_language: "Selecionar Idioma", theme_title: "Tema Personalizado", theme_red: "Vermelho", theme_yellow: "Amarelo", theme_blue: "Azul", theme_gray: "Cinza", theme_white: "Branco", theme_green: "Verde", theme_purple: "Roxo", theme_confirm: "PERSONALIZAR",
        loading_please_wait: "Por favor, aguarde...", loading_skip: "PULAR",
        home_choose_payment: "ESCOLHA MÉTODOS DE PAGAMENTO", home_all_payment: "TODOS OS PAGAMENTOS",
        btn_dana: "PAGAMENTO DANA", btn_qris: "PAGAMENTO QRIS",
        sosmed_title: "CONECTE-SE COMIGO", footer_dev_by: "DESENVOLVIDO POR",
        dana_title: "PAGAMENTO DANA", dana_name: "A/N: ILHAM FA****I", copy_number: "COPIAR NÚMERO",
        qris_hint: "Clique na imagem QRIS para ampliar", download: "BAIXAR",
        copied_alert: "Número copiado!", download_alert: "QRIS salvo!"
    }
};
let currentLang = localStorage.getItem('app_lang') || 'id';
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('app_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[lang][key]) el.innerText = translations[lang][key];
    });
    window.alertMessage = { copied: translations[lang].copied_alert, download: translations[lang].download_alert };
}
applyLanguage(currentLang);

// ======================== TEMA =========================
let selectedTheme = localStorage.getItem('selectedTheme') || 'blue';
function applyTheme(themeColor) {
    const root = document.documentElement;
    ['red','yellow','blue','gray','black','green','purple'].forEach(t => root.classList.remove(`theme-${t}`));
    root.classList.add(`theme-${themeColor}`);
    localStorage.setItem('selectedTheme', themeColor);
}
function loadTheme() { const saved = localStorage.getItem('selectedTheme'); if(saved) applyTheme(saved); }
function openThemeSheet() {
    document.getElementById('themeSheet').classList.add('active');
    document.querySelectorAll('.theme-option').forEach(opt => { opt.classList.remove('selected'); if(opt.dataset.color === selectedTheme) opt.classList.add('selected'); });
}
function closeThemeSheet() { document.getElementById('themeSheet').classList.remove('active'); }
function selectTheme(color) { selectedTheme = color; document.querySelectorAll('.theme-option').forEach(opt => { opt.classList.remove('selected'); if(opt.dataset.color === color) opt.classList.add('selected'); }); }
function confirmTheme() { localStorage.setItem('selectedTheme', selectedTheme); window.location.reload(); }
document.querySelectorAll('.theme-option').forEach(opt => opt.addEventListener('click', (e) => { e.stopPropagation(); selectTheme(opt.dataset.color); }));
document.addEventListener('DOMContentLoaded', loadTheme);

// ======================== MENU NAVIGASI =========================
const menuBtn = document.getElementById('navMenuBtn');
const menuPanel = document.getElementById('navMenuPanel');
const closeMenuBtn = document.getElementById('closeMenuBtn');
function toggleMenu() { menuPanel.classList.toggle('open'); }
menuBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
closeMenuBtn.addEventListener('click', () => menuPanel.classList.remove('open'));
document.addEventListener('click', (e) => { if(!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) menuPanel.classList.remove('open'); });

document.getElementById('menuThemeBtn').addEventListener('click', () => { openThemeSheet(); menuPanel.classList.remove('open'); });
document.getElementById('menuLangBtn').addEventListener('click', () => { openLangPopup(); menuPanel.classList.remove('open'); });
document.getElementById('menuGamesBtn').addEventListener('click', () => { navTo('gamePage'); menuPanel.classList.remove('open'); });
document.getElementById('menuToolsBtn').addEventListener('click', () => { navTo('toolsPage'); menuPanel.classList.remove('open'); });

// ======================== POPUP BAHASA =========================
const langPopup = document.getElementById('langPopup');
function openLangPopup() { langPopup.classList.add('active'); }
function closeLangPopup() { langPopup.classList.remove('active'); }
document.querySelector('.close-lang-popup').addEventListener('click', closeLangPopup);
document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const lang = btn.getAttribute('data-lang');
        applyLanguage(lang);
        closeLangPopup();
        document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if(translations[lang][key]) el.innerText = translations[lang][key]; });
    });
});
langPopup.addEventListener('click', (e) => { if(e.target === langPopup) closeLangPopup(); });

// ======================== LOADING & VIDEO =========================
function skipInitialLoading() {
    const loader = document.getElementById('initialLoader');
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; startVideoWithSound(); }, 300);
}
function startVideoWithSound() {
    const video = document.getElementById('mainVideo');
    if(video) { video.muted = false; video.volume = 1.0; video.play().catch(()=>{}); }
}
setTimeout(() => { const l = document.getElementById('initialLoader'); if(l && l.style.display !== 'none') skipInitialLoading(); }, 10000);

// ======================== NAVIGASI DENGAN BACK FISIK HP =========================
let pageHistory = ['home']; // stack riwayat halaman
function navTo(pageId) {
    const pageLoader = document.getElementById('pageLoader');
    pageLoader.style.display = 'flex';
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    setTimeout(() => {
        document.getElementById(pageId).classList.add('active');
        pageLoader.style.display = 'none';
        if(pageId === 'home') startVideoWithSound();
        // Update history
        if(pageHistory[pageHistory.length-1] !== pageId) {
            pageHistory.push(pageId);
            // Push state ke browser agar back button berfungsi
            history.pushState({ page: pageId }, '', `#${pageId}`);
        }
        // Reset game jika keluar dari gamePage
        if(pageId !== 'gamePage' && window.gameInitialized) {
            destroyGame();
            window.gameInitialized = false;
        }
        if(pageId === 'gamePage') {
            // Tampilkan selection, sembunyikan container game
            document.querySelector('.game-selection').style.display = 'flex';
            document.getElementById('game-container').style.display = 'none';
            document.getElementById('game-container').classList.remove('active');
            if(window.gameInitialized) destroyGame();
        }
        if(pageId === 'toolsPage') {
            document.querySelector('.tools-selection').style.display = 'flex';
            document.getElementById('tool-container').style.display = 'none';
        }
    }, 150);
}
// Handle back button fisik
window.addEventListener('popstate', (event) => {
    if(pageHistory.length > 1) {
        pageHistory.pop(); // hapus halaman saat ini
        const previousPage = pageHistory[pageHistory.length-1];
        navTo(previousPage);
    } else {
        // Jika sudah di home, biarkan saja (tidak keluar aplikasi)
        if(pageHistory[0] !== 'home') {
            pageHistory = ['home'];
            navTo('home');
        }
    }
});
// Inisialisasi history pertama kali
history.replaceState({ page: 'home' }, '', '#home');

// ======================== FUNGSI COPY & DOWNLOAD =========================
function copyNum() {
    navigator.clipboard.writeText("081335783149");
    alert(window.alertMessage?.copied || "Copied!");
}
function downloadQR() {
    const link = document.createElement('a');
    link.href = document.getElementById('qrisImg').src;
    link.download = "QRIS_HAMXYZ.png";
    link.click();
    alert(window.alertMessage?.download || "Downloaded!");
}

// ======================== PREVIEW QRIS =========================
function openQrisPreview() {
    const modal = document.getElementById('qrisModal');
    const modalImg = document.getElementById('modalQrisImg');
    const qrisImg = document.getElementById('qrisImg');
    modalImg.src = qrisImg.src;
    modal.classList.add('active');
}
function closeQrisModal() { document.getElementById('qrisModal').classList.remove('active'); }
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') { closeQrisModal(); closeThemeSheet(); closeLangPopup(); } });

// ======================== GAMES (RACER & FLAPPY BIRD) =========================
window.gameInitialized = false;
let currentGameType = null;
let isGameFullscreen = false;
let gameScriptInjected = false;

function toggleGameFullscreen(enable) {
    const gameContainer = document.getElementById('game-container');
    if(enable) {
        gameContainer.classList.add('game-fullscreen');
        isGameFullscreen = true;
    } else {
        gameContainer.classList.remove('game-fullscreen');
        isGameFullscreen = false;
    }
}

function destroyGame() {
    const container = document.getElementById('game-container');
    if(container) {
        container.innerHTML = '';
        container.style.display = 'none';
        container.classList.remove('active');
    }
    window.gameInitialized = false;
    currentGameType = null;
    if(isGameFullscreen) toggleGameFullscreen(false);
}

function loadGame(gameType) {
    if(window.gameInitialized && currentGameType === gameType) return;
    destroyGame();
    currentGameType = gameType;
    const container = document.getElementById('game-container');
    container.style.display = 'block';
    container.classList.add('active');
    document.querySelector('.game-selection').style.display = 'none';
    window.gameInitialized = true;
    
    if(gameType === 'racer') {
        // Game ARCADE RACING CAR (Three.js retro racer)
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = `
            import * as THREE from 'three';
            // Setup scene
            const containerDiv = document.getElementById('game-container');
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x1a2a3a);
            scene.fog = new THREE.FogExp2(0x1a2a3a,0.008);
            const camera = new THREE.PerspectiveCamera(60, 1, 0.3, 100);
            camera.position.set(0,3.5,7);
            const renderer = new THREE.WebGLRenderer({ antialias:false });
            const resizeObserver = new ResizeObserver(() => {
                const w = containerDiv.clientWidth, h = containerDiv.clientHeight;
                renderer.setSize(w, h);
                camera.aspect = w/h;
                camera.updateProjectionMatrix();
            });
            resizeObserver.observe(containerDiv);
            renderer.setSize(containerDiv.clientWidth, containerDiv.clientHeight);
            containerDiv.appendChild(renderer.domElement);
            
            // Lighting
            const ambient = new THREE.AmbientLight(0x5a6a8a,0.9);
            scene.add(ambient);
            const mainLight = new THREE.DirectionalLight(0xffeedd,1.3);
            mainLight.position.set(5,8,3);
            scene.add(mainLight);
            
            // Road
            const canvasTex = document.createElement('canvas');
            canvasTex.width=512; canvasTex.height=512;
            const tx=canvasTex.getContext('2d');
            tx.fillStyle="#2a2a2e"; tx.fillRect(0,0,512,512);
            tx.strokeStyle="#b8b8c8"; tx.lineWidth=18; tx.setLineDash([40,60]);
            tx.beginPath(); tx.moveTo(256,0); tx.lineTo(256,512); tx.stroke();
            tx.setLineDash([]);
            tx.lineWidth=12; tx.strokeStyle="#c0c0c0";
            tx.beginPath(); tx.moveTo(80,0); tx.lineTo(80,512); tx.stroke();
            tx.beginPath(); tx.moveTo(512-80,0); tx.lineTo(512-80,512); tx.stroke();
            const roadTex = new THREE.CanvasTexture(canvasTex);
            roadTex.wrapS = THREE.RepeatWrapping; roadTex.wrapT = THREE.RepeatWrapping;
            roadTex.repeat.set(1,6);
            const roadMat = new THREE.MeshStandardMaterial({ map:roadTex, side:THREE.DoubleSide, roughness:0.8 });
            const roadPlane = new THREE.Mesh(new THREE.PlaneGeometry(10,40), roadMat);
            roadPlane.rotation.x = -Math.PI/2;
            roadPlane.position.y = -0.1;
            roadPlane.position.z = -5;
            scene.add(roadPlane);
            
            // Player car
            const playerCar = new THREE.Group();
            const bodyGeo = new THREE.BoxGeometry(0.85,0.4,1.6);
            const bodyMat = new THREE.MeshStandardMaterial({ color:0xdd3344 });
            const body = new THREE.Mesh(bodyGeo, bodyMat); body.position.y=0.2; playerCar.add(body);
            const roof = new THREE.Mesh(new THREE.BoxGeometry(0.65,0.3,0.9), new THREE.MeshStandardMaterial({ color:0x222222 }));
            roof.position.y=0.55; playerCar.add(roof);
            const wheelGeo = new THREE.CylinderGeometry(0.22,0.22,0.2,8);
            const wheelMat = new THREE.MeshStandardMaterial({ color:0x111111 });
            [[-0.55,0.1,0.65],[0.55,0.1,0.65],[-0.55,0.1,-0.65],[0.55,0.1,-0.65]].forEach(pos=>{
                const w = new THREE.Mesh(wheelGeo, wheelMat); w.rotation.z=Math.PI/2; w.position.set(pos[0],pos[1],pos[2]); playerCar.add(w);
            });
            playerCar.position.set(0,0.05,1.8);
            scene.add(playerCar);
            
            let opponents = [], score = 0, currentSpeed = 6.2, playerTargetX = 0, currentPlayerX = 0, spawnAccum = 0, baseSpawnDelay = 1.0;
            const minX=-3.2, maxX=3.2;
            let gameOverFlag = false, gameActive = true;
            
            function updateScoreUI() { const sc = document.getElementById('game-score'); if(sc) sc.innerText = score; }
            function spawnOpponent() {
                const randX = (Math.random()-0.5)*5.6;
                const car = new THREE.Group();
                const cBody = new THREE.Mesh(new THREE.BoxGeometry(0.85,0.4,1.6), new THREE.MeshStandardMaterial({ color:0x3a86ff }));
                cBody.position.y=0.2; car.add(cBody);
                const cRoof = new THREE.Mesh(new THREE.BoxGeometry(0.65,0.3,0.9), new THREE.MeshStandardMaterial({ color:0x222222 }));
                cRoof.position.y=0.55; car.add(cRoof);
                [[-0.55,0.1,0.65],[0.55,0.1,0.65],[-0.55,0.1,-0.65],[0.55,0.1,-0.65]].forEach(pos=>{
                    const w = new THREE.Mesh(wheelGeo, wheelMat); w.rotation.z=Math.PI/2; w.position.set(pos[0],pos[1],pos[2]); car.add(w);
                });
                car.rotation.y = Math.PI;
                car.position.set(randX,0.05,-12-Math.random()*5);
                scene.add(car);
                opponents.push({ mesh:car, passedFlag:false });
            }
            function checkCollision(p, o) { return Math.abs(p.position.x - o.position.x) < 0.9 && Math.abs(p.position.z - o.position.z) < 1.6; }
            function endGame() { gameOverFlag=true; gameActive=false; document.getElementById('game-over-panel').style.display='flex'; }
            function resetGame() {
                opponents.forEach(o=>scene.remove(o.mesh)); opponents=[];
                score=0; currentSpeed=6.2; baseSpawnDelay=1.0;
                playerCar.position.x=0; currentPlayerX=0; playerTargetX=0;
                spawnAccum=0; gameOverFlag=false; gameActive=true;
                updateScoreUI(); document.getElementById('game-over-panel').style.display='none';
            }
            // UI
            const scoreDiv = document.createElement('div');
            scoreDiv.id = 'game-score';
            scoreDiv.style.position='absolute'; scoreDiv.style.top='10px'; scoreDiv.style.right='10px';
            scoreDiv.style.color='#ffcc00'; scoreDiv.style.fontSize='20px'; scoreDiv.style.fontFamily='monospace';
            scoreDiv.style.fontWeight='bold'; scoreDiv.style.zIndex='20';
            containerDiv.appendChild(scoreDiv);
            const gameOverDiv = document.createElement('div');
            gameOverDiv.id = 'game-over-panel';
            gameOverDiv.style.position='absolute'; gameOverDiv.style.top='50%'; gameOverDiv.style.left='50%';
            gameOverDiv.style.transform='translate(-50%,-50%)'; gameOverDiv.style.background='rgba(0,0,0,0.85)';
            gameOverDiv.style.border='2px solid #ff3366'; gameOverDiv.style.padding='15px 30px';
            gameOverDiv.style.textAlign='center'; gameOverDiv.style.zIndex='20'; gameOverDiv.style.display='none';
            gameOverDiv.style.flexDirection='column'; gameOverDiv.style.gap='10px';
            gameOverDiv.innerHTML = '<h3 style="color:#ff3366">GAME OVER</h3><div>SKOR</div><div id="final-score-val">0</div><button id="restart-game-btn" style="background:#ff3366; border:none; padding:6px 16px; cursor:pointer;">RESTART</button>';
            containerDiv.appendChild(gameOverDiv);
            document.getElementById('restart-game-btn')?.addEventListener('click', resetGame);
            
            // Control
            let isDragging = false;
            function handleMove(clientX) { if(!gameActive) return; const rect = containerDiv.getBoundingClientRect(); const t = (clientX - rect.left) / rect.width; playerTargetX = -3.2 + (t * 6.4); }
            containerDiv.addEventListener('mousemove', (e) => { if(isDragging) handleMove(e.clientX); });
            containerDiv.addEventListener('mousedown', (e) => { isDragging=true; handleMove(e.clientX); });
            window.addEventListener('mouseup', () => isDragging=false);
            containerDiv.addEventListener('touchmove', (e) => { if(e.touches) handleMove(e.touches[0].clientX); });
            containerDiv.addEventListener('touchstart', (e) => { if(e.touches) handleMove(e.touches[0].clientX); });
            
            let lastTime = performance.now();
            function animate() {
                const now = performance.now();
                let delta = Math.min(0.033, (now-lastTime)/1000);
                lastTime = now;
                if(gameActive && !gameOverFlag) {
                    currentPlayerX += (playerTargetX - currentPlayerX) * 0.25;
                    currentPlayerX = Math.min(maxX, Math.max(minX, currentPlayerX));
                    playerCar.position.x = currentPlayerX;
                    for(let i=opponents.length-1; i>=0; i--) {
                        const opp = opponents[i];
                        opp.mesh.position.z += currentSpeed * delta;
                        if(!opp.passedFlag && opp.mesh.position.z > 1.2) { opp.passedFlag=true; score++; updateScoreUI(); currentSpeed = 6.2 + Math.floor(score/8)*0.9; if(currentSpeed>12.8) currentSpeed=12.8; }
                        if(opp.mesh.position.z > 6 || opp.mesh.position.z < -18) { scene.remove(opp.mesh); opponents.splice(i,1); continue; }
                        if(checkCollision(playerCar, opp.mesh)) endGame();
                    }
                    spawnAccum += delta;
                    if(spawnAccum >= baseSpawnDelay && opponents.length < 10) { spawnAccum=0; spawnOpponent(); }
                    roadTex.offset.y += 0.8*delta;
                    document.getElementById('final-score-val').innerText = score;
                }
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }
            animate();
            // Fullscreen otomatis
            window.parent.toggleGameFullscreenExternal(true);
        `;
        container.appendChild(script);
    } else if(gameType === 'flappy') {
        // Game FLAPPY BIRD sederhana dengan canvas 2D
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let bird = { y: canvas.height/2, vy: 0, radius: 15 };
        let pipes = [];
        let score = 0;
        let gameActive = true;
        let frame = 0;
        let pipeGap = 150;
        let pipeWidth = 60;
        let gravity = 0.4;
        let jumpPower = -7;
        function spawnPipe() {
            let height = Math.random() * (canvas.height - pipeGap - 100) + 50;
            pipes.push({ x: canvas.width, topHeight: height, bottomY: height + pipeGap, passed: false });
        }
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // background
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // bird (dove terbang)
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(100, bird.y, bird.radius, 0, Math.PI*2);
            ctx.fill();
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.moveTo(100 + bird.radius, bird.y);
            ctx.lineTo(100 + bird.radius + 12, bird.y - 5);
            ctx.lineTo(100 + bird.radius + 8, bird.y);
            ctx.lineTo(100 + bird.radius + 12, bird.y + 5);
            ctx.fill();
            // pipes
            ctx.fillStyle = '#228B22';
            pipes.forEach(pipe => {
                ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
                ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY);
            });
            // score
            ctx.fillStyle = 'white';
            ctx.font = 'bold 30px monospace';
            ctx.fillText(score, canvas.width/2, 50);
            if(!gameActive) {
                ctx.fillStyle = 'black';
                ctx.font = 'bold 40px monospace';
                ctx.fillText('GAME OVER', canvas.width/2-100, canvas.height/2);
                ctx.font = '20px monospace';
                ctx.fillText('Tap to restart', canvas.width/2-80, canvas.height/2+50);
            }
        }
        function update() {
            if(!gameActive) return;
            bird.vy += gravity;
            bird.y += bird.vy;
            if(bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) gameActive = false;
            for(let i=0; i<pipes.length; i++) {
                let p = pipes[i];
                p.x -= 3;
                if(p.x + pipeWidth < 0) { pipes.splice(i,1); i--; continue; }
                if(!p.passed && p.x + pipeWidth < 100) { p.passed = true; score++; }
                // collision
                if(100 + bird.radius > p.x && 100 - bird.radius < p.x + pipeWidth) {
                    if(bird.y - bird.radius < p.topHeight || bird.y + bird.radius > p.bottomY) gameActive = false;
                }
            }
            if(frame % 80 === 0) spawnPipe();
            frame++;
        }
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
        function restart() {
            bird.y = canvas.height/2;
            bird.vy = 0;
            pipes = [];
            score = 0;
            frame = 0;
            gameActive = true;
        }
        function handleTap(e) {
            if(!gameActive) {
                restart();
            } else {
                bird.vy = jumpPower;
            }
        }
        canvas.addEventListener('click', handleTap);
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleTap(e); });
        spawnPipe();
        gameLoop();
        // fullscreen
        window.parent.toggleGameFullscreenExternal(true);
    }
}

// Event untuk tombol PLAY di game selection (menggunakan class .play-center-btn)
document.querySelectorAll('.play-center-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const gameCard = btn.closest('.game-card');
        const gameType = gameCard.getAttribute('data-game');
        loadGame(gameType);
        // Masuk fullscreen setelah game dimuat
        setTimeout(() => {
            toggleGameFullscreen(true);
        }, 100);
    });
});

// ======================== TOOLS (Downloader & Generator) =========================
let currentTool = null;
let toolData = null;

function loadTool(toolName) {
    if(currentTool === toolName) return;
    currentTool = toolName;
    const container = document.getElementById('tool-container');
    container.style.display = 'block';
    document.querySelector('.tools-selection').style.display = 'none';
    container.innerHTML = '';
    
    let html = '';
    switch(toolName) {
        case 'tiktok':
            html = `
                <div class="tool-form">
                    <input type="text" id="tiktok-url" placeholder="Masukkan URL TikTok (contoh: https://tiktok.com/@user/video/123456789)" />
                    <button id="submit-tiktok">Download TikTok</button>
                </div>
                <div id="tiktok-result" class="tool-result"></div>
            `;
            break;
        case 'instagram':
            html = `
                <div class="tool-form">
                    <input type="text" id="instagram-url" placeholder="Masukkan URL Instagram (contoh: https://instagram.com/p/xxxxx)" />
                    <button id="submit-instagram">Download Instagram</button>
                </div>
                <div id="instagram-result" class="tool-result"></div>
            `;
            break;
        case 'brat':
            html = `
                <div class="tool-form">
                    <textarea id="brat-text" rows="3" placeholder="Masukkan teks untuk generator Brat"></textarea>
                    <button id="submit-brat">Generate Brat</button>
                </div>
                <div id="brat-result" class="tool-result"></div>
            `;
            break;
        case 'brat-bahlil':
            html = `
                <div class="tool-form">
                    <textarea id="bahlil-text" rows="3" placeholder="Masukkan teks untuk generator Bahlil Brat"></textarea>
                    <button id="submit-bahlil">Generate Bahlil Brat</button>
                </div>
                <div id="bahlil-result" class="tool-result"></div>
            `;
            break;
        case 'quote-iphone':
            html = `
                <div class="tool-form">
                    <textarea id="quote-text" rows="3" placeholder="Masukkan teks untuk Quote iPhone"></textarea>
                    <button id="submit-quote">Generate Quote iPhone</button>
                </div>
                <div id="quote-result" class="tool-result"></div>
            `;
            break;
    }
    container.innerHTML = html;
    
    // Add event listeners
    if(toolName === 'tiktok') {
        document.getElementById('submit-tiktok').addEventListener('click', () => {
            const url = document.getElementById('tiktok-url').value;
            if(!url) return alert('Masukkan URL TikTok!');
            fetch(`https://api.ikyyxd.my.id/download/tiktokkv2?url=${encodeURIComponent(url)}`)
                .then(res => res.json())
                .then(data => {
                    const resultDiv = document.getElementById('tiktok-result');
                    if(data.result && data.result.video) {
                        resultDiv.innerHTML = `<video controls src="${data.result.video}" style="max-width:100%; border-radius:16px;"></video>`;
                    } else {
                        resultDiv.innerHTML = `<p>Gagal mengambil data. Pastikan URL valid.</p>`;
                    }
                })
                .catch(err => {
                    console.error(err);
                    document.getElementById('tiktok-result').innerHTML = `<p>Error: ${err.message}</p>`;
                });
        });
    } else if(toolName === 'instagram') {
        document.getElementById('submit-instagram').addEventListener('click', () => {
            const url = document.getElementById('instagram-url').value;
            if(!url) return alert('Masukkan URL Instagram!');
            fetch(`https://api.ikyyxd.my.id/download/igv2?url=${encodeURIComponent(url)}`)
                .then(res => res.json())
                .then(data => {
                    const resultDiv = document.getElementById('instagram-result');
                    if(data.result && data.result.url) {
                        resultDiv.innerHTML = `<a href="${data.result.url}" target="_blank">Download Instagram</a>`;
                    } else {
                        resultDiv.innerHTML = `<p>Gagal mengambil data. Pastikan URL valid.</p>`;
                    }
                })
                .catch(err => {
                    console.error(err);
                    document.getElementById('instagram-result').innerHTML = `<p>Error: ${err.message}</p>`;
                });
        });
    } else if(toolName === 'brat') {
        document.getElementById('submit-brat').addEventListener('click', () => {
            const text = document.getElementById('brat-text').value;
            if(!text) return alert('Masukkan teks!');
            fetch(`https://api.ikyyxd.my.id/canvas/bratv1?apikey=kyzz&text=${encodeURIComponent(text)}`)
                .then(res => res.json())
                .then(data => {
                    const resultDiv = document.getElementById('brat-result');
                    if(data.result && data.result.url) {
                        resultDiv.innerHTML = `<img src="${data.result.url}" alt="Brat Generator" style="max-width:100%; border-radius:16px;">`;
                    } else {
                        resultDiv.innerHTML = `<p>Gagal generate. Coba lagi.</p>`;
                    }
                })
                .catch(err => {
                    console.error(err);
                    document.getElementById('brat-result').innerHTML = `<p>Error: ${err.message}</p>`;
                });
        });
    } else if(toolName === 'brat-bahlil') {
        document.getElementById('submit-bahlil').addEventListener('click', () => {
            const text = document.getElementById('bahlil-text').value;
            if(!text) return alert('Masukkan teks!');
            fetch(`https://api.ikyyxd.my.id/maker/bratbahlil?text=${encodeURIComponent(text)}`)
                .then(res => res.json())
                .then(data => {
                    const resultDiv = document.getElementById('bahlil-result');
                    if(data.result && data.result.url) {
                        resultDiv.innerHTML = `<img src="${data.result.url}" alt="Bahlil Brat Generator" style="max-width:100%; border-radius:16px;">`;
                    } else {
                        resultDiv.innerHTML = `<p>Gagal generate. Coba lagi.</p>`;
                    }
                })
                .catch(err => {
                    console.error(err);
                    document.getElementById('bahlil-result').innerHTML = `<p>Error: ${err.message}</p>`;
                });
        });
    } else if(toolName === 'quote-iphone') {
        document.getElementById('submit-quote').addEventListener('click', () => {
            const text = document.getElementById('quote-text').value;
            if(!text) return alert('Masukkan teks!');
            fetch(`https://api.ikyyxd.my.id/canvas/iphone-quoted?apikey=kyzz&messageText=${encodeURIComponent(text)}`)
                .then(res => res.json())
                .then(data => {
                    const resultDiv = document.getElementById('quote-result');
                    if(data.result && data.result.url) {
                        resultDiv.innerHTML = `<img src="${data.result.url}" alt="iPhone Quote" style="max-width:100%; border-radius:16px;">`;
                    } else {
                        resultDiv.innerHTML = `<p>Gagal generate. Coba lagi.</p>`;
                    }
                })
                .catch(err => {
                    console.error(err);
                    document.getElementById('quote-result').innerHTML = `<p>Error: ${err.message}</p>`;
                });
        });
    }
}

// Event listener untuk tools card
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
        const tool = card.getAttribute('data-tool');
        loadTool(tool);
    });
});

// Expose fungsi global untuk dipanggil dari game script
window.toggleGameFullscreenExternal = (enable) => { toggleGameFullscreen(enable); };
