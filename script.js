// --- Usuários
const USERS = {
    admin: { password: 'admin' },
    theburger: { password: 'theburger' }
};

// --- Definição de Categorias (templates reutilizáveis por dia)
const CAT = {
    carnes: {
        category: "Carnes 🥩",
        products: [
            { name: "Tradicional", requiresQuantity: true },
            { name: "Smash", requiresQuantity: true },
            { name: "Picanha", requiresQuantity: true },
            { name: "Costela", requiresQuantity: true },
            { name: "Frango", requiresQuantity: true }
        ]
    },
    braguini: {
        category: "Braguini 🥬",
        products: [
            { name: "Alface", requiresQuantity: true },
            { name: "Tomate", requiresQuantity: true },
            { name: "Rúcula", requiresQuantity: true },
            { name: "Cebola Roxa", requiresQuantity: true },
            { name: "Cebola Comum", requiresQuantity: true },
            { name: "Cheiro Verde", requiresQuantity: true },
            { name: "Limão", requiresQuantity: true },
            { name: "Maçã 🍎", requiresQuantity: true },
            { name: "Hortelã", requiresQuantity: true },
            { name: "Couve 🥬", requiresQuantity: true },
            { name: "Uva", requiresQuantity: true },
            { name: "Geleia de Pimenta 🌶️", requiresQuantity: true }
        ]
    },
    aguia: {
        category: "Águia Frios 🦅",
        products: [
            { name: "Alho Frito", requiresQuantity: true },
            { name: "Bacon 🥓", requiresQuantity: true },
            { name: "Parmesão", requiresQuantity: true },
            { name: "Gouda", requiresQuantity: true },
            { name: "Coalho", requiresQuantity: true },
            { name: "Queijo Prato", requiresQuantity: true },
            { name: "Mussarela", requiresQuantity: true },
            { name: "Chantilly Spray", requiresQuantity: true },
            { name: "Mostarda Cepera", requiresQuantity: true }
        ]
    },
    pmg: {
        category: "PMG — Frios 🧀",
        products: [
            { name: "Catupiry", requiresQuantity: true },
            { name: "Cheddar Cremoso", requiresQuantity: true },
            { name: "Cream Cheese", requiresQuantity: true },
            { name: "Cheddar Fatiado", requiresQuantity: true },
            { name: "Provolone", requiresQuantity: true },
            { name: "Gorgonzola", requiresQuantity: true },
            { name: "Gouda Empanado", requiresQuantity: true },
            { name: "Sachês Catchup/Maionese", requiresQuantity: true },
            { name: "Bag de Catchup", requiresQuantity: true },
            { name: "Bag de Mostarda", requiresQuantity: true },
            { name: "Tubo Catchup", requiresQuantity: true },
            { name: "Tubo Mostarda", requiresQuantity: true },
            { name: "Azeite", requiresQuantity: true }
        ]
    },
    pao: {
        category: "Pães 🥖",
        products: [
            { name: "Brioche", requiresQuantity: true },
            { name: "Australiano", requiresQuantity: true }
        ]
    },
    gelo: {
        category: "Gelo 🧊",
        products: [
            { name: "Gelo 🧊", requiresQuantity: true }
        ]
    },
    descartaveis: {
        category: "Descartáveis 📦",
        products: [
            { name: "Isopor", requiresCheck: true },
            { name: "Papel Embalado", requiresCheck: true },
            { name: "Pote Maionese", requiresCheck: true },
            { name: "Papel Higiênico", requiresCheck: true }
        ]
    },
    vegetarianos: {
        category: "Vegetarianos 🌱",
        products: [
            { name: "Feijão", requiresQuantity: true },
            { name: "Lentilha", requiresQuantity: true }
        ]
    },
    sorvetes: {
        category: "Sorvetes 🍦",
        products: [
            { name: "Chocolate", requiresQuantity: true },
            { name: "Creme", requiresQuantity: true }
        ]
    },
    sobremesas: {
        category: "Sobremesas 🍮",
        products: [
            { name: "Pudim", requiresCheck: true },
            { name: "Petit Gateau", requiresCheck: true },
            { name: "Brownie", requiresCheck: true },
            { name: "Quibe", requiresCheck: true }
        ]
    },
    chopp: {
        category: "Chopp 🍺",
        products: [
            { name: "Chopp", requiresQuantity: true }
        ]
    },
    mercado: {
        category: "Mercado Geral 🛍️",
        products: [
            { name: "Guardanapo Mili Salão", requiresQuantity: true },
            { name: "Saco de Lixo 🗑️", requiresQuantity: true },
            { name: "Sachês (Sal / Açúcar / Adoçante)", requiresQuantity: true },
            { name: "Palito de Dente", requiresQuantity: true },
            { name: "Colherzinha p/ Maionese", requiresQuantity: true },
            { name: "Colher para Pudim", requiresQuantity: true },
            { name: "Prato de Bolo + Garfinho + Vela 🕯️", requiresCheck: true },
            { name: "Canudo Milkshake", requiresQuantity: true },
            { name: "Canudo Refri", requiresQuantity: true },
            { name: "Canudo Drink", requiresQuantity: true },
            { name: "Picles 🥒", requiresQuantity: true },
            { name: "Cebola Crispy", requiresQuantity: true },
            { name: "Açúcar", requiresQuantity: true },
            { name: "Açúcar Mascavo", requiresQuantity: true },
            { name: "Sal", requiresQuantity: true },
            { name: "Pimenta Biquinho", requiresQuantity: true },
            { name: "Ovo de Codorna", requiresQuantity: true },
            { name: "Nozes Pecan", requiresQuantity: true },
            { name: "Iogurte", requiresQuantity: true },
            { name: "Vinagre Maçã", requiresQuantity: true },
            { name: "Vinagre Comum", requiresQuantity: true },
            { name: "Cerveja Preta", requiresQuantity: true },
            { name: "Molho Inglês", requiresQuantity: true },
            { name: "Shoyu", requiresQuantity: true },
            { name: "Molho para Salada 🥗", requiresQuantity: true },
            { name: "Ovomaltine", requiresQuantity: true },
            { name: "Amendoim Triturado", requiresQuantity: true },
            { name: "Chocolate Gotas", requiresQuantity: true },
            { name: "Creme de Leite", requiresQuantity: true },
            { name: "Mel 🍯", requiresQuantity: true },
            { name: "Leite", requiresQuantity: true },
            { name: "Cobertura Chocolate", requiresQuantity: true },
            { name: "Cobertura Caramelo", requiresQuantity: true },
            { name: "Gordura Vegetal (balde)", requiresQuantity: true },
            { name: "Papel Alumínio", requiresQuantity: true },
            { name: "Óleo", requiresQuantity: true },
            { name: "Papel Toalha de Rolo", requiresQuantity: true },
            { name: "Bobina Saquinho Cozinha", requiresQuantity: true },
            { name: "Bobina Térmica Impressora", requiresQuantity: true },
            { name: "Saquinho de Troco", requiresQuantity: true },
            { name: "Touca", requiresQuantity: true },
            { name: "Saco de Free", requiresQuantity: true },
            { name: "Gás Maçarico", requiresCheck: true },
            { name: "Pimenta Jalapeño", requiresQuantity: true },
            { name: "Gin", requiresQuantity: true },
            { name: "Sakê", requiresQuantity: true },
            { name: "Vodka", requiresQuantity: true },
            { name: "Velho Barreiro", requiresQuantity: true },
            { name: "Amarula", requiresQuantity: true },
            { name: "Melado de Cana", requiresQuantity: true },
            { name: "Saquinho de Talher", requiresQuantity: true },
            { name: "Saco p/ Maionese Cozinha", requiresQuantity: true },
            { name: "Saquinho Maionese Salão", requiresQuantity: true },
            { name: "Farinha de Empanar", requiresQuantity: true },
            { name: "Palito de Lanche", requiresQuantity: true },
            { name: "Sacolas Grandes", requiresQuantity: true },
            { name: "Sacolas Pequenas", requiresQuantity: true },
            { name: "Cerealista", requiresCheck: true },
            { name: "Copo 500/300ml Chopp", requiresQuantity: true },
            { name: "Copo Milkshake 400ml c/ Tampa", requiresQuantity: true },
            { name: "Caneta Bic", requiresCheck: true },
            { name: "Caneta Piloto", requiresCheck: true },
            { name: "Pilhas 🔋", requiresCheck: true },
            { name: "Caderno", requiresCheck: true },
            { name: "Fita Dupla Face", requiresCheck: true },
            { name: "Fita Isolante", requiresCheck: true },
            { name: "Grampo", requiresCheck: true },
            { name: "Grampeador", requiresCheck: true }
        ]
    },
    limpeza: {
        category: "Limpeza 🧹",
        products: [
            { name: "Sabão em Pó", requiresCheck: true },
            { name: "Água Sanitária", requiresCheck: true },
            { name: "Pedra Sanitária", requiresCheck: true },
            { name: "Desinfetante", requiresCheck: true },
            { name: "Sapólio ou Cif", requiresCheck: true },
            { name: "Palha de Aço", requiresCheck: true },
            { name: "Escova de Broiler", requiresCheck: true },
            { name: "Luva", requiresCheck: true },
            { name: "Bombril", requiresCheck: true },
            { name: "Pasta Rosa", requiresCheck: true },
            { name: "Desengordurante", requiresCheck: true },
            { name: "Buchinha", requiresCheck: true },
            { name: "Detergente", requiresCheck: true },
            { name: "Sabonete Líquido", requiresCheck: true },
            { name: "Álcool", requiresCheck: true },
            { name: "Veja", requiresCheck: true },
            { name: "Lustra Móveis", requiresCheck: true },
            { name: "Veneno de Barata 🪳", requiresCheck: true },
            { name: "Pano de Chão", requiresCheck: true },
            { name: "Pano de Mesa", requiresCheck: true },
            { name: "Guardanapo de Pano", requiresCheck: true }
        ]
    },
    outrosItens: {
        category: "Outros Fornecedores 📋",
        products: [
            { name: "Ovos", requiresQuantity: true },
            { name: "Batata Palito", requiresQuantity: true },
            { name: "Batata Rústica", requiresQuantity: true },
            { name: "Saco Kraft Lanche (Alex)", requiresQuantity: true },
            { name: "Caixinha de Batata (Alex)", requiresQuantity: true },
            { name: "Etiqueta (Rodrigo)", requiresQuantity: true },
            { name: "Papel de Tábua (Rodrigo)", requiresQuantity: true },
            { name: "Papel Acoplado (Rodrigo)", requiresQuantity: true }
        ]
    },
    bebidas: {
        category: "Bebidas — Alex 🍹",
        products: [
            { name: "Bebidas em Geral", requiresCheck: true }
        ]
    }
};

// --- Produtos por Dia
const productsByDay = {
    "Domingo": [
        CAT.carnes,
        CAT.braguini,
        CAT.aguia,
        CAT.pmg,
        CAT.descartaveis,
        CAT.vegetarianos,
        CAT.sorvetes,
        CAT.sobremesas,
        CAT.chopp,
        CAT.mercado,
        CAT.pao,
        CAT.gelo,
        CAT.bebidas
    ],
    "Segunda-feira": [],
    "Terça-feira": [
        CAT.carnes
    ],
    "Quarta-feira": [
        CAT.carnes,
        CAT.braguini,
        CAT.mercado,
        CAT.outrosItens,
        CAT.aguia,
        CAT.limpeza
    ],
    "Quinta-feira": [
        CAT.carnes,
        CAT.pao
    ],
    "Sexta-feira": [
        CAT.carnes,
        CAT.aguia,
        CAT.braguini,
        CAT.gelo
    ],
    "Sábado": [
        CAT.carnes
    ]
};

const commonCategories = [];

// --- Seleções do usuário (memória de sessão)
const userSelections = {};

// --- Elementos
const loginScreen    = document.getElementById('login-screen');
const app            = document.getElementById('app');
const loginBtn       = document.getElementById('login-btn');
const logoutBtn      = document.getElementById('logout-btn');
const productList    = document.getElementById('product-list');
const daySelector    = document.getElementById('daySelector');
const reportTextArea = document.getElementById('report');
const reportModal    = document.getElementById('report-modal');
const closeModalBtn  = document.getElementById('close-modal');
const modalOverlay   = document.getElementById('modal-overlay');
const copyReportBtn  = document.getElementById('copy-report');
const clearSelectionBtn = document.getElementById('clear-selection');
const generateReportBtn = document.getElementById('generate-report');
const progressLabel  = document.getElementById('progress-label');
const progressBarFill = document.getElementById('progress-bar-fill');

// --- Toast
function showToast(msg, color = 'var(--success)') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.background = color;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// --- Dias da semana
function getDaysOfWeek() {
    return ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
}

// --- Login
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    if (USERS[username] && USERS[username].password === password) {
        localStorage.setItem('loggedInUser', username);
        if (loginError) loginError.style.display = 'none';
        showProductList();
    } else {
        if (loginError) loginError.style.display = 'block';
    }
}

if (loginBtn) loginBtn.onclick = handleLogin;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && app.style.display === 'none') handleLogin();
    if (e.key === 'Escape') closeReportModal();
});

if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
    };
}

// --- Mostrar app
function showProductList() {
    loginScreen.style.display = 'none';
    app.style.display = 'block';

    const loggedUser = document.getElementById('logged-user');
    const username = localStorage.getItem('loggedInUser');
    if (loggedUser && username) loggedUser.textContent = `Usuário: ${username}`;

    populateDaySelector();
}

// --- Selector de Dias
function populateDaySelector() {
    const days = getDaysOfWeek();
    daySelector.innerHTML = '';
    days.forEach(day => {
        const opt = document.createElement('option');
        opt.value = day;
        opt.textContent = day;
        daySelector.appendChild(opt);
    });

    daySelector.selectedIndex = new Date().getDay();
    renderProducts(daySelector.value);
    daySelector.onchange = () => renderProducts(daySelector.value);
}

// --- Renderizar Produtos
function renderProducts(day) {
    productList.innerHTML = '';
    const dailyProducts = productsByDay[day] || [];
    const allCategories = [...dailyProducts, ...commonCategories];

    if (allCategories.length === 0) {
        const msg = document.createElement('div');
        msg.className = 'empty-day';
        msg.textContent = '❗ Nenhum produto cadastrado para este dia.';
        productList.appendChild(msg);
    } else {
        allCategories.forEach(cat => renderCategory(cat, day));
    }

    updateProgress();
}

// --- Renderizar Categoria
function renderCategory(category, day) {
    const categoryDiv = document.createElement('section');
    categoryDiv.className = 'categoria';

    const selectedCount = countSelected(category, day);

    categoryDiv.innerHTML = `
        <div class="categoria-header">
            <div class="categoria-title-wrap">
                <h2>${category.category}</h2>
                <span class="categoria-badge ${selectedCount > 0 ? 'has-items' : ''}">
                    ${selectedCount}/${category.products.length}
                </span>
            </div>
            <span class="categoria-toggle">▼</span>
        </div>
        <div class="categoria-body"></div>
    `;

    const header = categoryDiv.querySelector('.categoria-header');
    const body   = categoryDiv.querySelector('.categoria-body');

    header.onclick = () => categoryDiv.classList.toggle('collapsed');

    category.products.forEach(product => {
        const productDiv = document.createElement('div');
        const inputName  = `${day}_${product.name}`;
        const value      = userSelections[inputName];

        productDiv.className = 'produto';
        if (product.requiresQuantity && Number(value) > 0) productDiv.classList.add('checked');
        if (product.requiresCheck && value === true) productDiv.classList.add('checked');

        if (product.requiresQuantity) {
            productDiv.innerHTML = `
                <span class="produto-name">${product.name}</span>
                <div class="qty-wrap">
                    <button class="qty-btn" type="button" data-action="minus">−</button>
                    <input class="qty-input" type="number" min="0" name="${inputName}"
                        placeholder="0" inputmode="numeric" value="${value || ''}">
                    <button class="qty-btn" type="button" data-action="plus">+</button>
                </div>
            `;

            const input    = productDiv.querySelector('.qty-input');
            const minusBtn = productDiv.querySelector('[data-action="minus"]');
            const plusBtn  = productDiv.querySelector('[data-action="plus"]');

            input.addEventListener('input', () => {
                const n = Number(input.value);
                if (n > 0) {
                    userSelections[inputName] = input.value;
                    productDiv.classList.add('checked');
                } else {
                    delete userSelections[inputName];
                    input.value = '';
                    productDiv.classList.remove('checked');
                }
                updateCategoryBadge(categoryDiv, category, day);
                updateProgress();
            });

            minusBtn.onclick = () => {
                const cur = Number(input.value) || 0;
                input.value = Math.max(0, cur - 1) || '';
                input.dispatchEvent(new Event('input'));
            };
            plusBtn.onclick = () => {
                input.value = (Number(input.value) || 0) + 1;
                input.dispatchEvent(new Event('input'));
            };
        } else {
            productDiv.innerHTML = `
                <span class="produto-name">${product.name}</span>
                <label class="custom-checkbox">
                    <input type="checkbox" name="${inputName}" ${value ? 'checked' : ''}>
                    <span class="check-box"></span>
                </label>
            `;

            const checkbox = productDiv.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    userSelections[inputName] = true;
                    productDiv.classList.add('checked');
                } else {
                    delete userSelections[inputName];
                    productDiv.classList.remove('checked');
                }
                updateCategoryBadge(categoryDiv, category, day);
                updateProgress();
            });
        }

        body.appendChild(productDiv);
    });

    productList.appendChild(categoryDiv);
}

// --- Contar selecionados em uma categoria
function countSelected(category, day) {
    return category.products.filter(p => {
        const v = userSelections[`${day}_${p.name}`];
        return p.requiresQuantity ? Number(v) > 0 : v === true;
    }).length;
}

// --- Atualizar badge da categoria
function updateCategoryBadge(categoryDiv, category, day) {
    const badge = categoryDiv.querySelector('.categoria-badge');
    const n = countSelected(category, day);
    badge.textContent = `${n}/${category.products.length}`;
    badge.classList.toggle('has-items', n > 0);
}

// --- Progresso geral
function updateProgress() {
    const day = daySelector.value;
    const all = [...(productsByDay[day] || []), ...commonCategories];

    let total = 0, selected = 0;
    all.forEach(cat => {
        cat.products.forEach(p => {
            total++;
            const v = userSelections[`${day}_${p.name}`];
            if (p.requiresQuantity && Number(v) > 0) selected++;
            if (p.requiresCheck && v === true) selected++;
        });
    });

    const pct = total === 0 ? 0 : Math.round((selected / total) * 100);
    if (progressLabel) progressLabel.textContent = `${selected} de ${total} itens`;
    if (progressBarFill) progressBarFill.style.width = `${pct}%`;
}

// --- Gerar Relatório
function buildReport() {
    const day = daySelector.value;
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let report = `📋 Lista de Compras — ${day}\n📅 ${dateStr} às ${timeStr}\n\n`;

    const emojiMap = {
        "Carnes 🥩": "🥩",
        "Braguini 🥬": "🥬",
        "Águia Frios 🦅": "🦅",
        "PMG — Frios 🧀": "🧀",
        "Pães 🥖": "🥖",
        "Gelo 🧊": "🧊",
        "Descartáveis 📦": "📦",
        "Vegetarianos 🌱": "🌱",
        "Sorvetes 🍦": "🍦",
        "Sobremesas 🍮": "🍮",
        "Chopp 🍺": "🍺",
        "Mercado Geral 🛍️": "🛍️",
        "Limpeza 🧹": "🧹",
        "Outros Fornecedores 📋": "📋",
        "Bebidas — Alex 🍹": "🍹"
    };

    const allCats = [...(productsByDay[day] || []), ...commonCategories];

    allCats.forEach(cat => {
        const lines = [];
        cat.products.forEach(p => {
            const v = userSelections[`${day}_${p.name}`];
            if (p.requiresQuantity && Number(v) > 0) lines.push(`• ${p.name}: ${v}`);
            else if (p.requiresCheck && v === true) lines.push(`• ${p.name} ✓`);
        });
        if (lines.length > 0) {
            report += `${emojiMap[cat.category] || '▪'} *${cat.category}*\n`;
            report += lines.join('\n') + '\n\n';
        }
    });

    return report.trim() || 'Nenhum produto selecionado!';
}

if (generateReportBtn) {
    generateReportBtn.onclick = () => {
        reportTextArea.value = buildReport();
        openReportModal();
    };
}

// --- Modal
function openReportModal()  { reportModal && reportModal.classList.remove('hidden'); }
function closeReportModal() { reportModal && reportModal.classList.add('hidden'); }

if (closeModalBtn)  closeModalBtn.onclick  = closeReportModal;
if (modalOverlay)   modalOverlay.onclick   = closeReportModal;

// --- Copiar Relatório
if (copyReportBtn) {
    copyReportBtn.onclick = () => {
        if (!reportTextArea.value) { showToast('Gere o relatório primeiro!', 'var(--danger)'); return; }
        navigator.clipboard.writeText(reportTextArea.value)
            .then(() => showToast('✓ Relatório copiado!'))
            .catch(() => showToast('Erro ao copiar.', 'var(--danger)'));
    };
}

// --- Compartilhar no WhatsApp
const whatsappBtn = document.getElementById('whatsapp-report');
if (whatsappBtn) {
    whatsappBtn.onclick = () => {
        const text = reportTextArea.value || buildReport();
        if (!text || text === 'Nenhum produto selecionado!') {
            showToast('Nenhum item selecionado!', 'var(--danger)');
            return;
        }
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };
}

// --- Colapsar / Expandir todos
const toggleAllBtn = document.getElementById('toggle-all');
if (toggleAllBtn) {
    let collapsed = false;
    toggleAllBtn.onclick = () => {
        collapsed = !collapsed;
        document.querySelectorAll('.categoria').forEach(el => {
            el.classList.toggle('collapsed', collapsed);
        });
        toggleAllBtn.textContent = collapsed ? '⊕ Expandir' : '⊖ Recolher';
    };
}

// --- Limpar seleções
if (clearSelectionBtn) {
    clearSelectionBtn.onclick = () => {
        if (!confirm('Limpar TODAS as seleções deste uso?')) return;
        Object.keys(userSelections).forEach(k => delete userSelections[k]);
        renderProducts(daySelector.value);
        if (reportTextArea) reportTextArea.value = '';
    };
}

// --- Init
if (localStorage.getItem('loggedInUser')) showProductList();
