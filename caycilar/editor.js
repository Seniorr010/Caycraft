// Visual Editor Logic for Çaycraft
const editCfg = getAppConfig();
let cropper = null;
let activeSlotIndex = null; // -1 for new, number for replace
let sortableInstance = null;

function initVisualEditor() {
    // 1. Initial Render
    renderGalleryVisual();

    // 2. Initialize Sortable for Drag and Drop
    const grid = document.getElementById('galleryGrid');
    if (grid) {
        sortableInstance = new Sortable(grid, {
            animation: 300,
            ghostClass: 'sortable-ghost',
            onEnd: function() {
                // Reorder array based on new DOM positions
                const newOrder = [];
                grid.querySelectorAll('.gal-card-admin').forEach(el => {
                    const originalIndex = parseInt(el.getAttribute('data-original-index'));
                    newOrder.push(editCfg.gallery[originalIndex]);
                });
                editCfg.gallery = newOrder;
                renderGalleryVisual(); // Refresh to update internal indices
            }
        });
    }

    // 3. Add Floating Editor Toolbar (Save/Download/Exit)
    const toolbar = document.createElement('div');
    toolbar.id = 'editorToolbar';
    toolbar.style.cssText = `
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.85); backdrop-filter: blur(20px);
        padding: 15px 30px; border-radius: 50px; border: 1px solid var(--primary);
        display: flex; gap: 20px; align-items: center; z-index: 100000;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    `;
    toolbar.innerHTML = `
        <span style="color: var(--primary); font-weight: 800; font-size: 0.8rem;">VİZUAL EDITOR</span>
        <div style="width: 1px; height: 20px; background: rgba(255,255,255,0.1);"></div>
        <button class="btn btn-outline" onclick="saveVisual()" style="padding: 8px 16px; font-size: 0.75rem;">
            <i class="fas fa-save"></i> Yadda Saxla
        </button>
        <button class="btn btn-primary" onclick="downloadConfig()" style="padding: 8px 16px; font-size: 0.75rem;">
            <i class="fas fa-download"></i> config.js Yüklə
        </button>
        <button class="btn btn-outline" onclick="window.location.href='../index.html'" style="padding: 8px 16px; font-size: 0.75rem; background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: rgba(239, 68, 68, 0.2);">
            <i class="fas fa-times"></i> Çıx
        </button>
    `;
    document.body.appendChild(toolbar);

    // 4. Make all text elements editable
    const editableSelectors = 'h1, h2, h3, p, .val, .lbl, .btn span';
    document.querySelectorAll(editableSelectors).forEach(el => {
        el.contentEditable = "true";
        el.style.outline = "none";
        el.addEventListener('focus', () => el.style.boxShadow = "0 0 10px var(--primary)");
        el.addEventListener('blur', () => el.style.boxShadow = "none");
    });

    // 5. Image Input listener for cropping
    document.getElementById('imageInput').addEventListener('change', handleImageSelect);
}

function renderGalleryVisual() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    // Render existing images from config
    editCfg.gallery.forEach((item, index) => {
        if (!item || !item.url) return;
        const slot = document.createElement('div');
        slot.className = 'image-placeholder gal-card-admin';
        slot.setAttribute('data-original-index', index);
        slot.title = "Yerini dəyişmək üçün basılı tutub sürükləyin";
        slot.style.position = 'relative';
        slot.style.border = "2px solid rgba(255,255,255,0.05)";
        slot.style.background = "none";
        
        slot.innerHTML = `
            <div onclick="replaceGalleryItem(${index}); event.stopPropagation();" 
                 style="width:100%; height:100%; min-height:180px; background: url('${item.url}') center/cover no-repeat; border-radius: 20px; cursor: pointer; border: 1px solid rgba(255,255,255,0.1);" 
                 title="Fotorəsmi Dəyiş"></div>
            
            <!-- Admin Actions Overlays -->
            <div style="position:absolute; top:-12px; right:-12px; display:flex; gap:8px; z-index:100;">
                <button title="Başlığı Redaktə Et" style="background:#059669; color:white; border:none; width:36px; height:36px; border-radius:50%; cursor:default; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
                    <i class="fas fa-pencil" style="font-size:0.9rem;"></i>
                </button>
                <button onclick="deleteGalleryItem(${index}); event.stopPropagation();" title="Şəkli Sil" 
                        style="background:#ef4444; color:white; border:none; width:36px; height:36px; border-radius:50%; cursor:pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
                    <i class="fas fa-trash" style="font-size:0.9rem;"></i>
                </button>
            </div>

            <!-- Title Overlay (Inline Editable) -->
            <div style="position:absolute; bottom:0; left:0; width:100%; background:linear-gradient(transparent, rgba(0,0,0,1)); padding:20px 15px 15px; border-radius: 0 0 20px 20px; z-index:20;">
                <h4 contentEditable="true" onblur="updateTitleFromDOM(${index}, this)" onfocus="event.stopPropagation()" 
                    style="margin:0; font-size: 0.85rem; text-align:center; color:white; outline:none; cursor:text; text-shadow: 0 2px 4px rgba(0,0,0,0.5);" 
                    title="Klikləyərək adı dəyişin">${item.title}</h4>
            </div>
        `;
        grid.appendChild(slot);
    });
}

function updateTitleFromDOM(index, el) {
    const newTitle = el.innerText.trim();
    if (newTitle) {
        editCfg.gallery[index].title = newTitle;
    } else {
        el.innerText = editCfg.gallery[index].title; // Revert if empty
    }
}

function replaceGalleryItem(index) {
    activeSlotIndex = index;
    document.getElementById('imageInput').click();
}

function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = document.getElementById('imageToCrop');
        img.src = event.target.result;
        document.getElementById('cropModal').style.display = 'flex';
        
        if (cropper) cropper.destroy();
        cropper = new Cropper(img, {
            aspectRatio: 16 / 9,
            viewMode: 2,
            autoCropArea: 1,
            background: false,
            responsive: true
        });
    };
    reader.readAsDataURL(file);
}

function closeCropper() {
    document.getElementById('cropModal').style.display = 'none';
    if (cropper) cropper.destroy();
    document.getElementById('imageInput').value = '';
}

function confirmCrop() {
    const canvas = cropper.getCroppedCanvas({ width: 1280, height: 720 });
    const b64 = canvas.toDataURL('image/jpeg', 0.9);
    
    if (activeSlotIndex === -1) {
        // Add with a default title, edit inline later
        editCfg.gallery.push({ url: b64, title: "Yeni Görüntü (Dəyişmək üçün kliklə)" });
        renderGalleryVisual();
        closeCropper();
    } else {
        // Keep existing title
        editCfg.gallery[activeSlotIndex].url = b64;
        renderGalleryVisual();
        closeCropper();
    }
}

function deleteGalleryItem(index) {
    if (confirm("Bu şəkli qalereyadan silmək istədiyinizə əminsiniz?")) {
        editCfg.gallery.splice(index, 1);
        renderGalleryVisual();
    }
}

function saveVisual() {
    // Collect Discord/TikTok links if updated in DOM
    const discordLink = document.querySelector('a[href*="discord.gg"]')?.href;
    const tiktokLink = document.querySelector('a[href*="tiktok.com"]')?.href;
    
    if (discordLink) editCfg.discord = discordLink;
    if (tiktokLink) editCfg.tiktok = tiktokLink;
    
    localStorage.setItem('caycraftAdminConfig', JSON.stringify(editCfg));
    alert('Bütün dəyişikliklər brauzer yaddaşında saxlanıldı! Daimi olması üçün config.js yükləyin.');
}

function downloadConfig() {
    const configCode = `const siteConfig = ${JSON.stringify(editCfg, null, 4)};\n\n// Initial load into localStorage if not present\nif (!localStorage.getItem('caycraftAdminConfig')) {\n    localStorage.setItem('caycraftAdminConfig', JSON.stringify(siteConfig));\n}\n\nfunction getAppConfig() {\n    return JSON.parse(localStorage.getItem('caycraftAdminConfig')) || siteConfig;\n}`;
    const blob = new Blob([configCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.js';
    a.click();
}

function tryLogin() {
    const input = document.getElementById('adminPass');
    const error = document.getElementById('loginError');
    const pass = input.value;

    if (pass === 'salamqaradovsan') {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('mainBody').style.overflow = 'auto';
        initVisualEditor();
    } else {
        error.style.display = 'block';
        input.style.borderColor = '#ef4444';
        input.value = '';
    }
}

// Ensure login is ready on start
window.onload = () => {
    document.getElementById('adminPass').focus();
};
