// Load Config and Apply Local Overrides
const cfg = getAppConfig();

// Apply Config to Links
function applySiteConfig() {
    document.querySelectorAll('a[href*="discord.gg"]').forEach(el => el.href = cfg.discord);
    document.querySelectorAll('a[href*="tiktok.com"]').forEach(el => el.href = cfg.tiktok);
    const fullVersionEl = document.getElementById('fullVersionRange');
    if (fullVersionEl) fullVersionEl.textContent = cfg.versions;
    
    // Dynamic Gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        cfg.gallery.forEach(item => {
            const card = document.createElement('div');
            card.className = 'feature-card'; // Reusing feature-card style
            card.style.padding = '0';
            card.style.overflow = 'hidden';
            card.innerHTML = `
                <div style="height: 200px; background: url('${item.url}') center/cover no-repeat;"></div>
                <div style="padding: 20px;">
                    <h3 style="margin:0">${item.title}</h3>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }
}

// Call on startup
window.addEventListener('DOMContentLoaded', applySiteConfig);

const translations = {
    az: {
        nav_about: "Haqqımızda",
        nav_features: "Xüsusiyyətlər",
        nav_server: "Oyna",
        nav_community: "İcma",
        hero_title: "Çaycraft",
        hero_subtitle: "Azərbaycanın ən rahat və əyləncəli Minecraft serveri. Əsl macəra bir stəkan çaydan başlayır!",
        cta_discord: "Discord-a Qoşul",
        cta_tiktok: "TikTok-da İzlə",
        cta_play: "İndi Oyna",
        about_title: "Niyə Biz?",
        about_desc: "Cayxana sadəcə bir server deyil, eyni zamanda böyük bir ailədir.",
        about_card1_title: "Dostcanlı İcma",
        about_card1_desc: "Toksiklikdən uzaq, hər kəsin bir-birinə hörmət etdiyi isti mühit.",
        about_card2_title: "Unikal Gameplay",
        about_card2_desc: "Başqa heç yerdə görməyəcəyiniz xüsusi pluginlər və mexanikalar.",
        about_card3_title: "Aktiv Adminlər",
        about_card3_desc: "Suallarınızı cavablandırmağa və kömək etməyə hər zaman hazır olan heyət.",
        features_title: "Xüsusiyyətlər",
        features_desc: "Sizin üçün ən yaxşı təcrübəni hazırladıq.",
        feat_card1_title: "Özəl Pluginlər",
        feat_card1_desc: "Serverin performansını və marağını artıran xüsusi sistemlər.",
        feat_card2_title: "Turnirlər",
        feat_card2_desc: "Hər həftə sonu maraqlı yarışlar və dəyərli mükafatlar.",
        feat_card3_title: "İqtisadiyyat",
        feat_card3_desc: "Balanslaşdırılmış və maraqlı iqtisadi sistemlə öz imperiyanızı qurun.",
        feat_card4_title: "Dostluq Sistemləri",
        feat_card4_desc: "Dostlarınızla eyni komandada oynamaq üçün xüsusi əmrlər.",
        modes_title: "Oyun Rejimləri",
        modes_desc: "Hər zövqə uyğun fərqli macəralar.",
        mode1_title: "Survival",
        mode1_desc: "Klassik sağ qalma təcrübəsi, dostcanlı icma və xüsusi pluginlər.",
        mode2_title: "BoxPvP",
        mode2_desc: "Sürətli və gərgin döyüşlər, xüsusi arenalar və rütbə sistemi.",
        server_title: "Qoşul",
        stat_online: "Onlayn Oyunçu",
        stat_version: "Dəstəklənən Versiya",
        stat_uptime: "Uptime",
        ip_copied: "Kopyalandı!",
        gallery_title: "Qalereya",
        gallery_desc: "Görüntülər (Tezliklə əlavə olunacaq).",
        placeholder_text: "Görüntü (16:9)",
        comm_title: "İcmaya Qoşul",
        comm_desc: "Media kanallarımızı izləyərək yeniliklərdən xəbərdar olun.",
        comm_discord_desc: "{count} üzv ilə söhbət edin və dəstək alın.",
        comm_tiktok_desc: "Ən maraqlı anları və videoları izləyin.",
        footer_slogan: "Azərbaycanın ən keyfiyyətli Minecraft macərası.",
        policy_privacy: "Məxfilik Siyasəti",
        policy_terms: "İstifadə Şərtləri",
        policy_refund: "Geri Ödəniş Siyasəti",
        copyright_text: "Cayxana Ailəsi"
    },
    en: {
        nav_about: "About",
        nav_features: "Features",
        nav_server: "Play",
        nav_community: "Community",
        hero_title: "Caycraft",
        hero_subtitle: "The most cozy and fun Minecraft server in Azerbaijan. True adventure starts with a glass of tea!",
        cta_discord: "Join Discord",
        cta_tiktok: "Follow TikTok",
        cta_play: "Play Now",
        about_title: "Why Us?",
        about_desc: "Cayxana isn't just a server, it's a massive family.",
        about_card1_title: "Friendly Community",
        about_card1_desc: "A warm environment free from toxicity, where everyone respects each other.",
        about_card2_title: "Unique Gameplay",
        about_card2_desc: "Special plugins and mechanics you won't find anywhere else.",
        about_card3_title: "Active Admins",
        about_card3_desc: "Our staff is always ready to answer your questions and help out.",
        features_title: "Features",
        features_desc: "We've crafted the best experience just for you.",
        feat_card1_title: "Custom Plugins",
        feat_card1_desc: "Special systems that boost server performance and engagement.",
        feat_card2_title: "Tournaments",
        feat_card2_desc: "Exciting competitions and valuable rewards every weekend.",
        feat_card3_title: "Economy System",
        feat_card3_desc: "Build your empire with a balanced and interesting economy.",
        feat_card4_title: "Friendly Mechanics",
        feat_card4_desc: "Special commands to play and team up with your friends.",
        modes_title: "Game Modes",
        modes_desc: "Different adventures for every taste.",
        mode1_title: "Survival",
        mode1_desc: "Classic survival experience, friendly community and custom plugins.",
        mode2_title: "BoxPvP",
        mode2_desc: "Fast-paced intense combat, special arenas and rank system.",
        server_title: "Join Now",
        stat_online: "Online Players",
        stat_version: "Supported Version",
        stat_uptime: "Uptime",
        ip_copied: "Copied!",
        gallery_title: "Gallery",
        gallery_desc: "Screenshots from our site (Coming soon).",
        placeholder_text: "Image (16:9)",
        comm_title: "Join Community",
        comm_desc: "Stay updated by following our media channels.",
        comm_discord_desc: "Chat and get support with over {count} members.",
        comm_tiktok_desc: "Watch the most exciting moments and videos.",
        footer_slogan: "The highest quality Minecraft adventure in Azerbaijan.",
        policy_privacy: "Privacy Policy",
        policy_terms: "Terms of Service",
        policy_refund: "Refund Policy",
        copyright_text: "Cayxana Family"
    }
};

let currentLang = 'az';

// Language Switcher
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

function setLanguage(lang) {
    currentLang = lang;
    
    // Update buttons UI
    langBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (translations[lang][key]) {
            let text = translations[lang][key];
            // Handle placeholders
            if (key === 'comm_discord_desc') {
                text = text.replace('{count}', window.discordMemberCount || '...');
            }
            el.textContent = text;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Copy IP Logic
const copyIp = document.getElementById('copyIp');
const copyToast = document.getElementById('copyToast');
const cursorGlow = document.getElementById('cursorGlow');
const serverVersion = document.getElementById('serverVersion');

copyIp.addEventListener('click', () => {
    const ip = "play.caycraft.pro";
    navigator.clipboard.writeText(ip).then(() => {
        copyToast.style.display = 'block';
        setTimeout(() => {
            copyToast.style.display = 'none';
        }, 2000);
    });
});

// Advanced Server Stats Query
async function updateServerStats() {
    const playerCountEls = document.querySelectorAll('.player-count-val');
    const javaVersionEl = document.getElementById('javaVersion');
    const bedrockVersionEl = document.getElementById('bedrockVersion');
    const javaStatusEl = document.getElementById('javaStatus');
    const bedrockStatusEl = document.getElementById('bedrockStatus');
    const fullVersionEl = document.getElementById('fullVersionRange');
    const mainIndicator = document.getElementById('mainIndicator');

    const domain = 'play.caycraft.pro';
    let totalOnline = 0;
    
    try {
        // Fetch Java & Bedrock stats in parallel
        const [javaRes, bedrockRes] = await Promise.all([
            fetch(`https://api.mcsrvstat.us/2/${domain}`).then(r => r.json()),
            fetch(`https://api.mcsrvstat.us/bedrock/2/${domain}`).then(r => r.json())
        ]);

        // Java Processing
        if (javaRes.online) {
            totalOnline += javaRes.players.online;
            if (javaVersionEl) javaVersionEl.textContent = javaRes.version || "1.21";
            if (javaStatusEl) {
                javaStatusEl.textContent = "ONLINE";
                javaStatusEl.style.color = "var(--secondary)";
            }
        } else {
            if (javaVersionEl) javaVersionEl.textContent = "---";
            if (javaStatusEl) {
                javaStatusEl.textContent = "OFFLINE";
                javaStatusEl.style.color = "#888";
            }
        }

        // Bedrock Processing
        if (bedrockRes.online) {
            totalOnline += bedrockRes.players.online;
            if (bedrockVersionEl) bedrockVersionEl.textContent = bedrockRes.version || "Bilinmir";
            if (bedrockStatusEl) {
                bedrockStatusEl.textContent = "ONLINE";
                bedrockStatusEl.style.color = "var(--secondary)";
            }
        } else {
            if (bedrockVersionEl) bedrockVersionEl.textContent = "---";
            if (bedrockStatusEl) {
                bedrockStatusEl.textContent = "OFFLINE";
                bedrockStatusEl.style.color = "#888";
            }
        }

        // Animated Player Count
        animateNumber(playerCountEls, totalOnline);

        // Update main indicator based on overall availability
        if (mainIndicator) {
            mainIndicator.style.background = (javaRes.online || bedrockRes.online) ? 'var(--secondary)' : '#888';
        }

        // Update Version Range (if any)
        if (fullVersionEl && (javaRes.version || bedrockRes.version)) {
            fullVersionEl.textContent = cfg.versions || `${javaRes.version || '1.8'} - ${bedrockRes.version || '1.21.x'}`;
        }

    } catch (error) {
        console.error("Advanced fetch failed:", error);
    }
}

function animateNumber(elements, target) {
    elements.forEach(el => {
        const start = parseInt(el.textContent) || 0;
        const duration = 1000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (target - start) * progress);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// Real Discord Stats
async function updateDiscordStats() {
    try {
        const response = await fetch('https://discord.com/api/v9/invites/cayxana?with_counts=true');
        const data = await response.json();
        
        if (data.approximate_member_count) {
            window.discordMemberCount = data.approximate_member_count;
            // Refresh language to update the text with new count
            setLanguage(currentLang);
        }
    } catch (error) {
        console.error("Discord fetch failed:", error);
    }
}

// Initial fetch and 15s update
updateServerStats();
updateDiscordStats();
setInterval(updateServerStats, 15000); // More frequent updates for real-time feel
setInterval(updateDiscordStats, 300000); // Discord updates less frequently

// Scroll Animations (Simple Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .server-info-card, .section-header').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});

// Play Button Handler
function handlePlay() {
    const ip = "play.caycraft.pro";
    const statusMsg = currentLang === 'az' ? 
        "Minecraft açılır... IP kopyalandı!" : 
        "Opening Minecraft... IP copied!";
    
    // Copy to clipboard
    navigator.clipboard.writeText(ip);
    
    // Show toast
    copyToast.textContent = statusMsg;
    copyToast.style.display = 'block';
    copyToast.style.color = '#166534'; // Green for play
    
    setTimeout(() => {
        copyToast.style.display = 'none';
        copyToast.style.color = 'var(--primary)'; // Reset to original
    }, 3000);
}

// Cursor Glow Movement
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
        cursorGlow.style.opacity = '1'; // Show on move
    }
});

// Hide glow when mouse leaves window
document.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0';
});
