// --- Dados de Usuários
const USERS = {
    admin: { password: 'admin' },
    theburger: { password: 'theburger' }
};

// --- Dados dos Produtos
const productsByDay = {
    "Domingo": [{ category: "Produtos", products: [
        { name: "Batata Palito", requiresQuantity: true },
        { name: "Batata Rústica", requiresQuantity: true },
        { name: "Porção de Quibe", requiresCheck: true },
        { name: "Porção de Queijo Gouda", requiresCheck: true },
        { name: "Petit Gateau", requiresCheck: true },
        { name: "Pepperoni", requiresCheck: true },
        { name: "Polpas", requiresCheck: true },
        { name: "Gordura", requiresCheck: true },
        { name: "Farinha de Empanar", requiresCheck: true },
        { name: "Geléia de Pimenta", requiresCheck: true },
        { name: "Cebola Caramelizada", requiresCheck: true },
        { name: "Picles", requiresCheck: true },
        { name: "Jalapeño", requiresCheck: true },
        { name: "Ovos", requiresCheck: true },
        { name: "Bag Ketchup", requiresCheck: true },
        { name: "Bag Mostarda", requiresCheck: true },
        { name: "Caramelo Toffe", requiresCheck: true },
        { name: "Brownie", requiresCheck: true }
    ]}],
    "Segunda-feira": [],
    "Terça-feira": [
        { category: "Produtos", products: [
            { name: "Sacos Viagem", requiresCheck: true },
            { name: "Etiquetas", requiresCheck: true },
            { name: "Biquinho", requiresCheck: true },
            { name: "Pote Maionese", requiresCheck: true },
            { name: "Guardanapo Embalado", requiresCheck: true },
            { name: "Brownie", requiresCheck: true },
            { name: "Papel de Moldar Carne", requiresCheck: true },
            { name: "Retirar Óleo Usado", requiresCheck: true },
            { name: "Gás", requiresCheck: true },
            { name: "Bobina de Impressora", requiresCheck: true },
            { name: "Gás de Maçarico", requiresCheck: true }
        ]},
        { category: "Sorvetes", products: [
            { name: "Chocolate", requiresQuantity: true },
            { name: "Creme", requiresQuantity: true }
        ]},
        { category: "Veganos", products: [
            { name: "Feijão", requiresQuantity: true },
            { name: "Lentilha", requiresQuantity: true }
        ]}
    ],
    "Quarta-feira": [
        { category: "Mercado", products: [
            { name: "Molho Salada", requiresQuantity: true },
            { name: "Barbecue", requiresQuantity: true },
            { name: "Mel", requiresQuantity: true },
            { name: "Ovomaltine", requiresQuantity: true },
            { name: "Açucar", requiresQuantity: true },
            { name: "Melado de Cana", requiresQuantity: true },
            { name: "Açucar Mascavo", requiresQuantity: true },
            { name: "Cerveja Preta", requiresQuantity: true },
            { name: "Leite", requiresQuantity: true },
            { name: "Creme de Leite", requiresQuantity: true },
            { name: "Chocolate Gotas", requiresQuantity: true },
            { name: "Nutella", requiresQuantity: true },
            { name: "Iogurte", requiresQuantity: true },
            { name: "Chantilly", requiresQuantity: true },
            { name: "Sal", requiresQuantity: true },
            { name: "Sal Grosso", requiresQuantity: true },
            { name: "Vodka", requiresQuantity: true },
            { name: "Velho Barreiro", requiresQuantity: true },
            { name: "Sakê", requiresQuantity: true },
            { name: "Amarula", requiresQuantity: true },
            { name: "Gin", requiresQuantity: true },
            { name: "Amendoim", requiresQuantity: true },
            { name: "Cobertura de Chocolate", requiresQuantity: true },
            { name: "Cobertura de Caramelo", requiresQuantity: true },
            { name: "Vinagre Branco", requiresQuantity: true },
            { name: "Vinagre Maça", requiresQuantity: true },
            { name: "Shoyu", requiresQuantity: true }
        ]}
    ]
};

const commonCategories = [
    { category: "Diário", products: [
        { name: "Alface", requiresCheck: true },
        { name: "Tomate", requiresCheck: true },
        { name: "Rúcula", requiresCheck: true },
        { name: "Couve", requiresCheck: true },
        { name: "Limão", requiresCheck: true },
        { name: "Cebola Comum", requiresCheck: true },
        { name: "Cebola Roxa", requiresCheck: true },
        { name: "Cogumelo", requiresCheck: true },
        { name: "Hortelã", requiresCheck: true },
        { name: "Tomate Cereja", requiresCheck: true },
        { name: "Maçã", requiresCheck: true },
        { name: "Laranja", requiresCheck: true },
        { name: "Uva", requiresCheck: true },
        { name: "Cheiro Verde", requiresCheck: true }
    ]},
    { category: "Águia Frios 🦅", products: [
        { name: "Gorgonzola", requiresQuantity: true },
        { name: "Gouda (kg)", requiresQuantity: true },
        { name: "Coalho (kg)", requiresQuantity: true },
        { name: "Queijo Prato (kg)", requiresQuantity: true },
        { name: "Queijo Muçarela (kg)", requiresQuantity: true },
        { name: "Sachês", requiresQuantity: true },
        { name: "Catupiry", requiresQuantity: true },
        { name: "Cremoso", requiresQuantity: true },
        { name: "Cheddar Polenghi", requiresQuantity: true },
        { name: "Parmesão", requiresQuantity: true },
        { name: "Creamcheese", requiresQuantity: true },
        { name: "Bacon", requiresQuantity: true },
        { name: "Mostarda", requiresQuantity: true },
        { name: "Codorna", requiresQuantity: true },
        { name: "Alho Frito", requiresQuantity: true },
        { name: "Castanha", requiresQuantity: true },
        { name: "Pecan", requiresQuantity: true },
        { name: "Azeite", requiresQuantity: true },
        { name: "Papel Manteiga", requiresQuantity: true },
        { name: "Tabasco", requiresQuantity: true },
        { name: "Palito de Lanche", requiresQuantity: true }
    ]},
    { category: "Carnes", products: [
        { name: "Tradicional", requiresQuantity: true },
        { name: "Smash", requiresQuantity: true },
        { name: "Picanha", requiresQuantity: true },
        { name: "Costela", requiresQuantity: true },
        { name: "Frango", requiresCheck: true }
    ]},
    { category: "Pães", products: [
        { name: "Brioche", requiresQuantity: true },
        { name: "Australiano", requiresQuantity: true }
    ]}
];

// --- Controle de Seleções
const userSelections = {};

// --- Elementos da Página
const loginScreen = document.getElementById('login-screen');
const app = document.getElementById('app');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const productList = document.getElementById('product-list');
const daySelector = document.getElementById('daySelector');
const reportTextArea = document.getElementById('report');
const reportModal = document.getElementById('report-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalOverlay = document.getElementById('modal-overlay');
const copyReportBtn = document.getElementById('copy-report');
const clearSelectionBtn = document.getElementById('clear-selection');
const generateReportBtn = document.getElementById('generate-report');
const progressLabel = document.getElementById('progress-label');
const progressBarFill = document.getElementById('progress-bar-fill');

// --- Dias
function getDaysOfWeek() {
    return [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];
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

if (loginBtn) {
    loginBtn.onclick = handleLogin;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && app.style.display === 'none') {
        handleLogin();
    }

    if (event.key === 'Escape') {
        closeReportModal();
    }
});

if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
    };
}

// --- Mostrar Área de Produtos
function showProductList() {
    loginScreen.style.display = 'none';
    app.style.display = 'block';

    const loggedUser = document.getElementById('logged-user');
    const username = localStorage.getItem('loggedInUser');

    if (loggedUser && username) {
        loggedUser.textContent = `Usuário: ${username}`;
    }

    populateDaySelector();
}

// --- Preencher Selector de Dias
function populateDaySelector() {
    const days = getDaysOfWeek();
    daySelector.innerHTML = '';

    days.forEach(day => {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelector.appendChild(option);
    });

    const today = new Date().getDay();
    daySelector.selectedIndex = today;

    renderProducts(daySelector.value);

    daySelector.onchange = () => {
        renderProducts(daySelector.value);
    };
}

// --- Renderizar Produtos
function renderProducts(day) {
    productList.innerHTML = '';

    const dailyProducts = productsByDay[day] || [];

    if (dailyProducts.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-day';
        emptyMessage.textContent = '❗ Nenhum produto específico cadastrado para este dia.';
        productList.appendChild(emptyMessage);
    } else {
        dailyProducts.forEach(category => renderCategory(category, day));
    }

    commonCategories.forEach(category => renderCategory(category, day));

    updateProgress();
}

// --- Renderizar Categoria
function renderCategory(category, day) {
    const categoryDiv = document.createElement('section');
    categoryDiv.className = 'categoria';

    const selectedCount = category.products.filter(product => {
        const inputName = `${day}_${product.name}`;
        const value = userSelections[inputName];

        if (product.requiresQuantity) {
            return Number(value) > 0;
        }

        return value === true;
    }).length;

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
    const body = categoryDiv.querySelector('.categoria-body');

    header.onclick = () => {
        categoryDiv.classList.toggle('collapsed');
    };

    category.products.forEach(product => {
        const productDiv = document.createElement('div');
        const inputName = `${day}_${product.name}`;
        const value = userSelections[inputName];

        productDiv.className = 'produto';

        if (product.requiresQuantity && Number(value) > 0) {
            productDiv.classList.add('checked');
        }

        if (product.requiresCheck && value === true) {
            productDiv.classList.add('checked');
        }

        if (product.requiresQuantity) {
            productDiv.innerHTML = `
                <span class="produto-name">${product.name}</span>
                <div class="qty-wrap">
                    <button class="qty-btn" type="button" data-action="minus">−</button>
                    <input 
                        class="qty-input" 
                        type="number" 
                        min="0" 
                        name="${inputName}" 
                        placeholder="0" 
                        inputmode="numeric" 
                        value="${value || ''}"
                    >
                    <button class="qty-btn" type="button" data-action="plus">+</button>
                </div>
            `;

            const input = productDiv.querySelector('.qty-input');
            const minusBtn = productDiv.querySelector('[data-action="minus"]');
            const plusBtn = productDiv.querySelector('[data-action="plus"]');

            input.addEventListener('input', () => {
                const numberValue = Number(input.value);

                if (numberValue > 0) {
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
                const currentValue = Number(input.value) || 0;
                const newValue = Math.max(0, currentValue - 1);

                input.value = newValue === 0 ? '' : newValue;
                input.dispatchEvent(new Event('input'));
            };

            plusBtn.onclick = () => {
                const currentValue = Number(input.value) || 0;
                input.value = currentValue + 1;
                input.dispatchEvent(new Event('input'));
            };
        } else {
            productDiv.innerHTML = `
                <span class="produto-name">${product.name}</span>
                <label class="custom-checkbox">
                    <input 
                        type="checkbox" 
                        name="${inputName}" 
                        ${value ? 'checked' : ''}
                    >
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

// --- Atualizar badge da categoria
function updateCategoryBadge(categoryDiv, category, day) {
    const badge = categoryDiv.querySelector('.categoria-badge');

    const selectedCount = category.products.filter(product => {
        const inputName = `${day}_${product.name}`;
        const value = userSelections[inputName];

        if (product.requiresQuantity) {
            return Number(value) > 0;
        }

        return value === true;
    }).length;

    badge.textContent = `${selectedCount}/${category.products.length}`;

    if (selectedCount > 0) {
        badge.classList.add('has-items');
    } else {
        badge.classList.remove('has-items');
    }
}

// --- Atualizar progresso geral
function updateProgress() {
    const selectedDay = daySelector.value;
    const dayCategories = productsByDay[selectedDay] || [];
    const allCategories = [...dayCategories, ...commonCategories];

    let totalItems = 0;
    let selectedItems = 0;

    allCategories.forEach(category => {
        category.products.forEach(product => {
            totalItems++;

            const inputName = `${selectedDay}_${product.name}`;
            const value = userSelections[inputName];

            if (product.requiresQuantity && Number(value) > 0) {
                selectedItems++;
            }

            if (product.requiresCheck && value === true) {
                selectedItems++;
            }
        });
    });

    const percentage = totalItems === 0 ? 0 : Math.round((selectedItems / totalItems) * 100);

    if (progressLabel) {
        progressLabel.textContent = `${selectedItems} de ${totalItems} itens`;
    }

    if (progressBarFill) {
        progressBarFill.style.width = `${percentage}%`;
    }
}

// --- Gerar Relatório
if (generateReportBtn) {
    generateReportBtn.onclick = () => {
        const selectedDay = daySelector.value;

        let report = `📋 Lista de Compras — ${selectedDay}\n\n`;

        const categoryEmojis = {
            "Produtos": "🛒",
            "Diário": "🥗",
            "Carnes": "🥩",
            "Pães": "🥖",
            "Veganos": "🌱",
            "Sorvetes": "🍦",
            "Mercado": "🛍️",
            "Águia Frios 🦅": "🧀"
        };

        function extractProducts(day, categories) {
            categories.forEach(category => {
                const lines = [];

                category.products.forEach(product => {
                    const inputName = `${day}_${product.name}`;
                    const value = userSelections[inputName];

                    if (product.requiresQuantity && Number(value) > 0) {
                        lines.push(`* ${product.name}: (${value})`);
                    } else if (product.requiresCheck && value === true) {
                        lines.push(`* ${product.name}`);
                    }
                });

                if (lines.length > 0) {
                    report += `**${category.category}** ${categoryEmojis[category.category] || ''}\n`;
                    report += lines.join('\n') + '\n\n';
                }
            });
        }

        if (productsByDay[selectedDay]) {
            extractProducts(selectedDay, productsByDay[selectedDay]);
        }

        extractProducts(selectedDay, commonCategories);

        reportTextArea.value = report.trim() || 'Nenhum produto selecionado!';

        openReportModal();
    };
}

// --- Modal do relatório
function openReportModal() {
    if (reportModal) {
        reportModal.classList.remove('hidden');
    }
}

function closeReportModal() {
    if (reportModal) {
        reportModal.classList.add('hidden');
    }
}

if (closeModalBtn) {
    closeModalBtn.onclick = closeReportModal;
}

if (modalOverlay) {
    modalOverlay.onclick = closeReportModal;
}

// --- Copiar Relatório
if (copyReportBtn) {
    copyReportBtn.onclick = () => {
        if (!reportTextArea.value) {
            alert('Gere primeiro o relatório!');
            return;
        }

        navigator.clipboard.writeText(reportTextArea.value)
            .then(() => alert('Relatório copiado!'))
            .catch(() => alert('Erro ao copiar.'));
    };
}

// --- Limpar Seleções
if (clearSelectionBtn) {
    clearSelectionBtn.onclick = () => {
        const confirmClear = confirm('Tem certeza que deseja limpar TODAS as seleções deste uso?');

        if (confirmClear) {
            Object.keys(userSelections).forEach(key => delete userSelections[key]);
            renderProducts(daySelector.value);

            if (reportTextArea) {
                reportTextArea.value = '';
            }
        }
    };
}

// --- Inicializar
if (localStorage.getItem('loggedInUser')) {
    showProductList();
}