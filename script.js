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
const productList = document.getElementById('product-list');
const daySelector = document.getElementById('daySelector');
const reportTextArea = document.getElementById('report');

// --- Funções de Login
loginBtn.onclick = () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    if (USERS[username] && USERS[username].password === password) {
        localStorage.setItem('loggedInUser', username);
        showProductList();
    } else {
        loginError.style.display = 'block';
    }
};

document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
};

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
function getDaysOfWeek() {
    return ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
}

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

    const renderCategory = (category) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'categoria';
        categoryDiv.innerHTML = `<h2>${category.category}</h2>`;

        category.products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'produto';

            const inputName = `${day}_${product.name}`;

            const input = product.requiresQuantity
                ? `<input type="number" min="0" name="${inputName}" placeholder="Qtd" inputmode="numeric" value="${userSelections[inputName] || ''}">`
                : `<input type="checkbox" name="${inputName}" ${userSelections[inputName] ? 'checked' : ''}>`;

            productDiv.innerHTML = `<label>${product.name} ${input}</label>`;
            categoryDiv.appendChild(productDiv);
        });

        productList.appendChild(categoryDiv);
    };

    const dailyProducts = productsByDay[day] || [];

    if (dailyProducts.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'categoria';
        emptyMessage.innerHTML = `<h2 style="text-align:center; font-weight:normal;">❗ Nenhum produto cadastrado para este dia.</h2>`;
        productList.appendChild(emptyMessage);
    } else {
        dailyProducts.forEach(renderCategory);
    }

    commonCategories.forEach(renderCategory);

    setupInputListeners(day);
}

// --- Monitorar Inputs e Salvar Seleções
function setupInputListeners(day) {
    const inputs = productList.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const name = input.name;
            if (input.type === 'checkbox') {
                userSelections[name] = input.checked;
            } else if (input.type === 'number') {
                userSelections[name] = input.value;
            }
        });
    });
}

// --- Gerar Relatório
document.getElementById('generate-report').onclick = () => {
    // Atualiza todas as seleções ANTES de montar o relatório
    document.querySelectorAll('#product-list input').forEach(input => {
        const name = input.name;
        if (input.type === 'checkbox') {
            userSelections[name] = input.checked;
        } else if (input.type === 'number') {
            userSelections[name] = input.value;
        }
    });

    let report = `📋 Lista de Compras:\n\n`;

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
            let lines = [];
            category.products.forEach(product => {
                const inputName = `${day}_${product.name}`;
                const value = userSelections[inputName];

                if (product.requiresQuantity && value) {
                    lines.push(`* ${product.name}: (${value})`);
                } else if (product.requiresCheck && value) {
                    lines.push(`* ${product.name}`);
                }
            });

            if (lines.length > 0) {
                report += `**${category.category}** ${categoryEmojis[category.category] || ''}\n`;
                report += lines.join('\n') + '\n\n';
            }
        });
    }

    const selectedDay = daySelector.value;
    
    if (productsByDay[selectedDay]) {
        extractProducts(selectedDay, productsByDay[selectedDay]);
    }

    // Sempre renderiza as categorias comuns
    commonCategories.forEach(category => {
        let lines = [];
        category.products.forEach(product => {
            const inputName = `${selectedDay}_${product.name}`;
            const value = userSelections[inputName];

            if (product.requiresQuantity && value) {
                lines.push(`* ${product.name}: (${value})`);
            } else if (product.requiresCheck && value) {
                lines.push(`* ${product.name}`);
            }
        });

        if (lines.length > 0) {
            report += `**${category.category}** ${categoryEmojis[category.category] || ''}\n`;
            report += lines.join('\n') + '\n\n';
        }
    });

    reportTextArea.value = report.trim() || 'Nenhum produto selecionado!';
};


// --- Copiar Relatório
document.getElementById('copy-report').onclick = () => {
    if (!reportTextArea.value) {
        alert('Gere primeiro o relatório!');
        return;
    }
    navigator.clipboard.writeText(reportTextArea.value)
        .then(() => alert('Relatório copiado!'))
        .catch(() => alert('Erro ao copiar.'));
};

// --- Limpar Seleções
document.getElementById('clear-selection').onclick = () => {
    const confirmClear = confirm("Tem certeza que deseja limpar TODAS as seleções?");
    if (confirmClear) {
        Object.keys(userSelections).forEach(key => delete userSelections[key]);
        renderProducts(daySelector.value);
        reportTextArea.value = '';
    }
};

// --- Inicializar
if (localStorage.getItem('loggedInUser')) {
    showProductList();
}
