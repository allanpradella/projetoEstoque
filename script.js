// Simulação de um banco de dados simples com usuários e senhas
const USERS = {
    user1: { password: 'senha123' },
    user2: { password: 'senha456' }
};

// Função de login
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('login-error');
const productListContainer = document.getElementById('product-list-container');
const loginFormContainer = document.getElementById('login-form');

// Verifica o login
loginForm.onsubmit = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (USERS[username] && USERS[username].password === password) {
        // Salva o usuário no localStorage para sessão
        localStorage.setItem('loggedInUser', username);
        loginFormContainer.style.display = 'none';
        productListContainer.style.display = 'block';
        renderProductList();
    } else {
        loginError.style.display = 'block';
    }
};

// Função de logout
document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('loggedInUser');
    productListContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
};

// Função para adicionar um novo produto à lista
document.getElementById('add-product-btn').onclick = () => {
    const productName = prompt('Digite o nome do produto:');
    if (productName) {
        const userProducts = JSON.parse(localStorage.getItem('products') || '[]');
        userProducts.push({ name: productName, checked: false });
        localStorage.setItem('products', JSON.stringify(userProducts));
        renderProductList();
    }
};

// Função para renderizar a lista de produtos
function renderProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const userProducts = JSON.parse(localStorage.getItem('products') || '[]');
    userProducts.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = product.checked;
        checkbox.onchange = () => toggleProduct(index);

        const label = document.createElement('label');
        label.textContent = product.name;

        productDiv.appendChild(checkbox);
        productDiv.appendChild(label);
        productList.appendChild(productDiv);
    });
}

// Função para marcar/desmarcar produtos
function toggleProduct(index) {
    const userProducts = JSON.parse(localStorage.getItem('products') || '[]');
    userProducts[index].checked = !userProducts[index].checked;
    localStorage.setItem('products', JSON.stringify(userProducts));
    renderProductList();
}

// Verificar se o usuário está logado
if (localStorage.getItem('loggedInUser')) {
    loginFormContainer.style.display = 'none';
    productListContainer.style.display = 'block';
    renderProductList();
} else {
    loginFormContainer.style.display = 'block';
    productListContainer.style.display = 'none';
}
