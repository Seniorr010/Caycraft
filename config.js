const siteConfig = {
    discord: "https://discord.gg/cayxana",
    tiktok: "https://www.tiktok.com/@cayxana.tv",
    versions: "1.8 - 1.21.x",
    gallery: [
        { url: "https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?auto=format&fit=crop&w=800&q=80", title: "Survival Spawn" },
        { url: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&w=800&q=80", title: "Market Area" },
        { url: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&w=800&q=80", title: "BoxPvP Arena" }
    ]
};

// Initial load into localStorage if not present
if (!localStorage.getItem('caycraftAdminConfig')) {
    localStorage.setItem('caycraftAdminConfig', JSON.stringify(siteConfig));
}

function getAppConfig() {
    return JSON.parse(localStorage.getItem('caycraftAdminConfig')) || siteConfig;
}
