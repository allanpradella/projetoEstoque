// ============================================================
// FIREBASE CONFIG
// ============================================================
const firebaseConfig = {
    apiKey: "AIzaSyD-IR2cPcA-izNNZBP-0HZoCQ9WaR258zY",
    authDomain: "theburger-9edde.firebaseapp.com",
    projectId: "theburger-9edde",
    storageBucket: "theburger-9edde.firebasestorage.app",
    messagingSenderId: "1059185139735",
    appId: "1:1059185139735:web:5df43156f24a6281e53c52"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

// ============================================================
// ESTADO GLOBAL
// ============================================================
let currentUser   = null;
let currentRole   = 'user';
let categories    = [];
let products      = [];
let selections    = {};
let allCollapsed  = false;
let editingCatId  = null;
let editingProdId = null;

const DAYS = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];

// ============================================================
// UTILITÁRIOS
// ============================================================
function showToast(msg, type) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.background = type === 'error' ? 'var(--danger)' : type === 'warn' ? '#F5A623' : 'var(--success)';
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

function setLoading(v) {
    document.getElementById('loading-overlay').style.display = v ? 'flex' : 'none';
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// ============================================================
// AUTH — único onAuthStateChanged
// ============================================================
auth.onAuthStateChanged(async user => {
    try {
        if (user) {
            currentUser = user;
            await loadUserProfile(user.uid);
            document.getElementById('screen-login').style.display = 'none';
            document.getElementById('screen-app').style.display   = 'block';
            document.getElementById('logged-user').textContent    = user.displayName || user.email;
            if (currentRole === 'admin') document.getElementById('btn-admin').classList.remove('hidden');
            await loadData();
            showPanel('checklist');
            populateDaySelector();
        } else {
            currentUser = null;
            currentRole = 'user';
            document.getElementById('screen-login').style.display = 'flex';
            document.getElementById('screen-app').style.display   = 'none';
        }
    } catch(e) {
        console.error('Erro na inicialização:', e);
        showToast('Erro de conexão. Verifique o console.', 'error');
    } finally {
        setLoading(false);
    }
});

async function loadUserProfile(uid) {
    const doc = await db.collection('users').doc(uid).get();
    if (doc.exists) {
        currentRole = doc.data().role || 'user';
    } else {
        await db.collection('users').doc(uid).set({
            email: currentUser.email,
            name:  currentUser.displayName || currentUser.email,
            role:  'user',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        currentRole = 'user';
    }
}

document.getElementById('login-btn').onclick = async () => {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl    = document.getElementById('login-error');
    errEl.style.display = 'none';
    setLoading(true);
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch(e) {
        errEl.style.display = 'block';
        setLoading(false);
    }
};

document.getElementById('reset-password-btn').onclick = async () => {
    const email = document.getElementById('login-email').value.trim();
    if (!email) { showToast('Digite seu e-mail primeiro.', 'warn'); return; }
    try {
        await auth.sendPasswordResetEmail(email);
        showToast('E-mail de redefinição enviado!');
    } catch(e) {
        showToast('Erro ao enviar e-mail.', 'error');
    }
};

document.getElementById('logout-btn').onclick = () => auth.signOut();

document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && document.getElementById('screen-login').style.display !== 'none')
        document.getElementById('login-btn').click();
    if (e.key === 'Escape') {
        closeModal('modal-category');
        closeModal('modal-product');
        closeModal('report-modal');
    }
});

// ============================================================
// CARREGAR DADOS
// ============================================================
async function loadData() {
    setLoading(true);
    const [catSnap, prodSnap] = await Promise.all([
        db.collection('categories').orderBy('order').get(),
        db.collection('products').orderBy('order').get()
    ]);
    categories = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    products   = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    if (categories.length === 0 && currentRole === 'admin') {
        await seedInitialData();
        return loadData();
    }
    setLoading(false);
}

// ============================================================
// SEED INICIAL
// ============================================================
async function seedInitialData() {
    const catDef = [
        { name: "Carnes 🥩",              days: ["Domingo","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"], order: 0  },
        { name: "Braguini 🥬",            days: ["Domingo","Quarta-feira","Sexta-feira"],                                     order: 1  },
        { name: "Águia Frios 🦅",         days: ["Domingo","Quarta-feira","Sexta-feira"],                                     order: 2  },
        { name: "PMG — Frios 🧀",         days: ["Domingo"],                                                                  order: 3  },
        { name: "Pães 🥖",               days: ["Domingo","Quinta-feira"],                                                   order: 4  },
        { name: "Gelo 🧊",               days: ["Domingo","Sexta-feira"],                                                    order: 5  },
        { name: "Descartáveis 📦",        days: ["Domingo"],                                                                  order: 6  },
        { name: "Vegetarianos 🌱",        days: ["Domingo"],                                                                  order: 7  },
        { name: "Sorvetes 🍦",           days: ["Domingo"],                                                                  order: 8  },
        { name: "Sobremesas 🍮",          days: ["Domingo"],                                                                  order: 9  },
        { name: "Chopp 🍺",              days: ["Domingo"],                                                                  order: 10 },
        { name: "Mercado Geral 🛍️",      days: ["Domingo","Quarta-feira"],                                                   order: 11 },
        { name: "Limpeza 🧹",            days: ["Quarta-feira"],                                                              order: 12 },
        { name: "Outros Fornecedores 📋", days: ["Quarta-feira"],                                                             order: 13 },
        { name: "Bebidas — Alex 🍹",     days: ["Domingo"],                                                                  order: 14 }
    ];

    const prodDef = [
        { cat: "Carnes 🥩", name: "Tradicional",         type: "quantity" },
        { cat: "Carnes 🥩", name: "Smash",               type: "quantity" },
        { cat: "Carnes 🥩", name: "Picanha",             type: "quantity" },
        { cat: "Carnes 🥩", name: "Costela",             type: "quantity" },
        { cat: "Carnes 🥩", name: "Frango",              type: "quantity" },
        { cat: "Braguini 🥬", name: "Alface",            type: "quantity" },
        { cat: "Braguini 🥬", name: "Tomate",            type: "quantity" },
        { cat: "Braguini 🥬", name: "Rúcula",            type: "quantity" },
        { cat: "Braguini 🥬", name: "Cebola Roxa",       type: "quantity" },
        { cat: "Braguini 🥬", name: "Cebola Comum",      type: "quantity" },
        { cat: "Braguini 🥬", name: "Cheiro Verde",      type: "quantity" },
        { cat: "Braguini 🥬", name: "Limão",             type: "quantity" },
        { cat: "Braguini 🥬", name: "Maçã",              type: "quantity" },
        { cat: "Braguini 🥬", name: "Hortelã",           type: "quantity" },
        { cat: "Braguini 🥬", name: "Couve",             type: "quantity" },
        { cat: "Braguini 🥬", name: "Uva",               type: "quantity" },
        { cat: "Braguini 🥬", name: "Geleia de Pimenta", type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Alho Frito",      type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Bacon",           type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Parmesão",        type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Gouda",           type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Coalho",          type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Queijo Prato",    type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Mussarela",       type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Chantilly Spray", type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Mostarda Cepera", type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Catupiry",                 type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Cheddar Cremoso",          type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Cream Cheese",             type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Cheddar Fatiado",          type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Provolone",                type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Gorgonzola",               type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Gouda Empanado",           type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Sachês Catchup/Maionese",  type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Bag de Catchup",           type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Bag de Mostarda",          type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Tubo Catchup",             type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Tubo Mostarda",            type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Azeite",                   type: "quantity" },
        { cat: "Pães 🥖", name: "Brioche",      type: "quantity" },
        { cat: "Pães 🥖", name: "Australiano",  type: "quantity" },
        { cat: "Gelo 🧊", name: "Gelo",         type: "quantity" },
        { cat: "Descartáveis 📦", name: "Isopor",          type: "check" },
        { cat: "Descartáveis 📦", name: "Papel Embalado",  type: "check" },
        { cat: "Descartáveis 📦", name: "Pote Maionese",   type: "check" },
        { cat: "Descartáveis 📦", name: "Papel Higiênico", type: "check" },
        { cat: "Vegetarianos 🌱", name: "Feijão",   type: "quantity" },
        { cat: "Vegetarianos 🌱", name: "Lentilha", type: "quantity" },
        { cat: "Sorvetes 🍦", name: "Chocolate", type: "quantity" },
        { cat: "Sorvetes 🍦", name: "Creme",     type: "quantity" },
        { cat: "Sobremesas 🍮", name: "Pudim",        type: "check" },
        { cat: "Sobremesas 🍮", name: "Petit Gateau", type: "check" },
        { cat: "Sobremesas 🍮", name: "Brownie",      type: "check" },
        { cat: "Sobremesas 🍮", name: "Quibe",        type: "check" },
        { cat: "Chopp 🍺", name: "Chopp", type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Guardanapo Mili Salão",           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saco de Lixo",                    type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sachês (Sal/Açúcar/Adoçante)",    type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Palito de Dente",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Colherzinha p/ Maionese",         type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Colher para Pudim",               type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Prato de Bolo + Garfinho + Vela", type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Canudo Milkshake",                type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Canudo Refri",                    type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Canudo Drink",                    type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Picles",                          type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cebola Crispy",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Açúcar",                          type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Açúcar Mascavo",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sal",                             type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Pimenta Biquinho",                type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Ovo de Codorna",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Nozes Pecan",                     type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Iogurte",                         type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Vinagre Maçã",                    type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Vinagre Comum",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cerveja Preta",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Molho Inglês",                    type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Shoyu",                           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Molho para Salada",               type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Ovomaltine",                      type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Amendoim Triturado",              type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Chocolate Gotas",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Creme de Leite",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Mel",                             type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Leite",                           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cobertura Chocolate",             type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cobertura Caramelo",              type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Gordura Vegetal (balde)",         type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Papel Alumínio",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Óleo",                            type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Papel Toalha de Rolo",            type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Bobina Saquinho Cozinha",         type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Bobina Térmica Impressora",       type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saquinho de Troco",               type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Touca",                           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saco de Free",                    type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Gás Maçarico",                    type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Pimenta Jalapeño",                type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Gin",                             type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sakê",                            type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Vodka",                           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Velho Barreiro",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Amarula",                         type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Melado de Cana",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saquinho de Talher",              type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saco p/ Maionese Cozinha",        type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saquinho Maionese Salão",         type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Farinha de Empanar",              type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Palito de Lanche",                type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sacolas Grandes",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sacolas Pequenas",                type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cerealista",                      type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Copo 500/300ml Chopp",            type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Copo Milkshake 400ml c/ Tampa",   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Caneta Bic",                      type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Caneta Piloto",                   type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Pilhas",                          type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Caderno",                         type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Fita Dupla Face",                 type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Fita Isolante",                   type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Grampo",                          type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Grampeador",                      type: "check"    },
        { cat: "Limpeza 🧹", name: "Sabão em Pó",       type: "check" },
        { cat: "Limpeza 🧹", name: "Água Sanitária",     type: "check" },
        { cat: "Limpeza 🧹", name: "Pedra Sanitária",    type: "check" },
        { cat: "Limpeza 🧹", name: "Desinfetante",       type: "check" },
        { cat: "Limpeza 🧹", name: "Sapólio ou Cif",     type: "check" },
        { cat: "Limpeza 🧹", name: "Palha de Aço",       type: "check" },
        { cat: "Limpeza 🧹", name: "Escova de Broiler",  type: "check" },
        { cat: "Limpeza 🧹", name: "Luva",               type: "check" },
        { cat: "Limpeza 🧹", name: "Bombril",            type: "check" },
        { cat: "Limpeza 🧹", name: "Pasta Rosa",         type: "check" },
        { cat: "Limpeza 🧹", name: "Desengordurante",    type: "check" },
        { cat: "Limpeza 🧹", name: "Buchinha",           type: "check" },
        { cat: "Limpeza 🧹", name: "Detergente",         type: "check" },
        { cat: "Limpeza 🧹", name: "Sabonete Líquido",   type: "check" },
        { cat: "Limpeza 🧹", name: "Álcool",             type: "check" },
        { cat: "Limpeza 🧹", name: "Veja",               type: "check" },
        { cat: "Limpeza 🧹", name: "Lustra Móveis",      type: "check" },
        { cat: "Limpeza 🧹", name: "Veneno de Barata",   type: "check" },
        { cat: "Limpeza 🧹", name: "Pano de Chão",       type: "check" },
        { cat: "Limpeza 🧹", name: "Pano de Mesa",       type: "check" },
        { cat: "Limpeza 🧹", name: "Guardanapo de Pano", type: "check" },
        { cat: "Outros Fornecedores 📋", name: "Ovos",                       type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Batata Palito",               type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Batata Rústica",              type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Saco Kraft Lanche (Alex)",    type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Caixinha de Batata (Alex)",   type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Etiqueta (Rodrigo)",          type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Papel de Tábua (Rodrigo)",    type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Papel Acoplado (Rodrigo)",    type: "quantity" },
        { cat: "Bebidas — Alex 🍹", name: "Bebidas em Geral", type: "check" }
    ];

    const batch  = db.batch();
    const catIds = {};

    catDef.forEach(c => {
        const ref = db.collection('categories').doc();
        catIds[c.name] = ref.id;
        batch.set(ref, { name: c.name, days: c.days, order: c.order, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    });

    prodDef.forEach((p, i) => {
        const ref = db.collection('products').doc();
        batch.set(ref, { name: p.name, categoryId: catIds[p.cat], type: p.type, order: i, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    });

    await batch.commit();
    showToast('Dados iniciais carregados!');
}

// ============================================================
// NAVEGAÇÃO
// ============================================================
function showPanel(name) {
    document.getElementById('panel-checklist').style.display = name === 'checklist' ? 'block' : 'none';
    document.getElementById('panel-history').style.display   = name === 'history'   ? 'block' : 'none';
    document.getElementById('panel-admin').style.display     = name === 'admin'     ? 'block' : 'none';
    document.getElementById('footer-actions').style.display  = name === 'checklist' ? 'flex'  : 'none';
    document.getElementById('header-view-name').textContent  =
        name === 'history' ? 'Histórico de Pedidos' :
        name === 'admin'   ? 'Administração'         : 'Pedidos do Dia';
    if (name === 'history') renderHistory();
    if (name === 'admin')   renderAdmin()
        '<div class="admin-section">' +
    '<div class="admin-section-header"><h2>Usuários</h2>' +
        '<button class="btn-primary btn-sm" onclick="openCreateUserModal()">+ Novo Usuário</button></div>' +
    '<div id="admin-user-list"></div>' +
'</div>';;
}

document.getElementById('btn-history').onclick      = () => showPanel('history');
document.getElementById('btn-admin').onclick        = () => { if (currentRole === 'admin') showPanel('admin'); };
document.getElementById('header-view-name').onclick = () => showPanel('checklist');

// ============================================================
// SELETOR DE DIA
// ============================================================
const daySelector = document.getElementById('daySelector');

function populateDaySelector() {
    daySelector.innerHTML = '';
    DAYS.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d; opt.textContent = d;
        daySelector.appendChild(opt);
    });
    daySelector.selectedIndex = new Date().getDay();
    renderChecklist();
    daySelector.onchange = () => { selections = {}; renderChecklist(); };
}

// ============================================================
// CHECKLIST
// ============================================================
function renderChecklist() {
    const day  = daySelector.value;
    const list = document.getElementById('product-list');
    list.innerHTML = '';

    const dayCats = categories.filter(c => c.days && c.days.includes(day));

    if (dayCats.length === 0) {
        list.innerHTML = '<div class="empty-day">❗ Nenhuma categoria cadastrada para este dia.</div>';
        updateProgress([]);
        return;
    }

    dayCats.forEach(cat => {
        const prods = products.filter(p => p.categoryId === cat.id);
        renderCategory(cat, prods, day, list);
    });

    updateProgress(dayCats);
}

function renderCategory(cat, prods, day, container) {
    const n   = countSelected(cat.id, prods);
    const sec = document.createElement('section');
    sec.className  = 'categoria';
    sec.dataset.id = cat.id;

    sec.innerHTML =
        '<div class="categoria-header">' +
            '<div class="categoria-title-wrap">' +
                '<h2>' + cat.name + '</h2>' +
                '<span class="categoria-badge ' + (n > 0 ? 'has-items' : '') + '">' + n + '/' + prods.length + '</span>' +
            '</div>' +
            '<span class="categoria-toggle">▼</span>' +
        '</div>' +
        '<div class="categoria-body"></div>';

    sec.querySelector('.categoria-header').onclick = () => sec.classList.toggle('collapsed');

    const body = sec.querySelector('.categoria-body');
    prods.forEach(prod => {
        const div   = document.createElement('div');
        const value = selections[prod.id];
        div.className = 'produto';
        if (prod.type === 'quantity' && Number(value) > 0) div.classList.add('checked');
        if (prod.type === 'check'    && value === true)    div.classList.add('checked');

        if (prod.type === 'quantity') {
            div.innerHTML =
                '<span class="produto-name">' + prod.name + '</span>' +
                '<div class="qty-wrap">' +
                    '<button class="qty-btn" data-action="minus">−</button>' +
                    '<input class="qty-input" type="number" min="0" placeholder="0" inputmode="numeric" value="' + (value || '') + '">' +
                    '<button class="qty-btn" data-action="plus">+</button>' +
                '</div>';
            const input = div.querySelector('.qty-input');
            input.addEventListener('input', () => {
                const v = Number(input.value);
                if (v > 0) { selections[prod.id] = v; div.classList.add('checked'); }
                else { delete selections[prod.id]; input.value = ''; div.classList.remove('checked'); }
                refreshBadge(sec, cat.id, prods);
                updateProgress(categories.filter(c => c.days && c.days.includes(daySelector.value)));
            });
            div.querySelector('[data-action="minus"]').onclick = () => {
                input.value = Math.max(0, (Number(input.value) || 0) - 1) || '';
                input.dispatchEvent(new Event('input'));
            };
            div.querySelector('[data-action="plus"]').onclick = () => {
                input.value = (Number(input.value) || 0) + 1;
                input.dispatchEvent(new Event('input'));
            };
        } else {
            div.innerHTML =
                '<span class="produto-name">' + prod.name + '</span>' +
                '<label class="custom-checkbox">' +
                    '<input type="checkbox" ' + (value ? 'checked' : '') + '>' +
                    '<span class="check-box"></span>' +
                '</label>';
            const cb = div.querySelector('input[type="checkbox"]');
            cb.addEventListener('change', () => {
                if (cb.checked) { selections[prod.id] = true; div.classList.add('checked'); }
                else { delete selections[prod.id]; div.classList.remove('checked'); }
                refreshBadge(sec, cat.id, prods);
                updateProgress(categories.filter(c => c.days && c.days.includes(daySelector.value)));
            });
        }
        body.appendChild(div);
    });
    container.appendChild(sec);
}

function countSelected(catId, prods) {
    const list = prods || products.filter(p => p.categoryId === catId);
    return list.filter(p => {
        const v = selections[p.id];
        return p.type === 'quantity' ? Number(v) > 0 : v === true;
    }).length;
}

function refreshBadge(sec, catId, prods) {
    const badge = sec.querySelector('.categoria-badge');
    const n = countSelected(catId, prods);
    badge.textContent = n + '/' + prods.length;
    badge.classList.toggle('has-items', n > 0);
}

function updateProgress(dayCats) {
    const prods = (dayCats || []).flatMap(c => products.filter(p => p.categoryId === c.id));
    let total = prods.length, selected = 0;
    prods.forEach(p => {
        const v = selections[p.id];
        if (p.type === 'quantity' ? Number(v) > 0 : v === true) selected++;
    });
    const pct = total === 0 ? 0 : Math.round(selected / total * 100);
    document.getElementById('progress-label').textContent = selected + ' de ' + total + ' itens';
    document.getElementById('progress-bar-fill').style.width = pct + '%';
}

document.getElementById('btn-toggle-all').onclick = () => {
    allCollapsed = !allCollapsed;
    document.querySelectorAll('.categoria').forEach(el => el.classList.toggle('collapsed', allCollapsed));
    document.getElementById('btn-toggle-all').textContent = allCollapsed ? '⊕' : '⊖';
};

document.getElementById('clear-selection').onclick = () => {
    if (!confirm('Limpar todas as seleções?')) return;
    selections = {};
    renderChecklist();
};

// ============================================================
// RELATÓRIO
// ============================================================
function buildReport() {
    const day  = daySelector.value;
    const now  = new Date();
    const date = now.toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' });
    const time = now.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
    const user = currentUser.displayName || currentUser.email;

    let report   = '📋 Pedido de Compras — ' + day + '\n';
    report += '📅 ' + date + ' às ' + time + '\n';
    report += '👤 ' + user + '\n\n';

    const dayCats = categories.filter(c => c.days && c.days.includes(day));
    let hasItems  = false;

    dayCats.forEach(cat => {
        const lines = [];
        products.filter(p => p.categoryId === cat.id).forEach(prod => {
            const v = selections[prod.id];
            if (prod.type === 'quantity' && Number(v) > 0) lines.push('  • ' + prod.name + ': ' + v);
            else if (prod.type === 'check' && v === true)  lines.push('  • ' + prod.name + ' ✓');
        });
        if (lines.length) { report += '*' + cat.name + '*\n' + lines.join('\n') + '\n\n'; hasItems = true; }
    });

    return hasItems ? report.trim() : null;
}

document.getElementById('generate-report').onclick = async () => {
    const text = buildReport();
    if (!text) { showToast('Nenhum item selecionado!', 'warn'); return; }

    document.getElementById('report').value = text;
    document.getElementById('report-modal').classList.remove('hidden');

    const day   = daySelector.value;
    const items = [];
    categories.filter(c => c.days && c.days.includes(day)).forEach(cat => {
        products.filter(p => p.categoryId === cat.id).forEach(prod => {
            const v = selections[prod.id];
            if (prod.type === 'quantity' && Number(v) > 0) items.push({ name: prod.name, category: cat.name, value: v });
            else if (prod.type === 'check' && v === true)  items.push({ name: prod.name, category: cat.name, value: true });
        });
    });

    try {
        await db.collection('requests').add({
            day, date: new Date().toISOString().split('T')[0],
            userId: currentUser.uid, userEmail: currentUser.email,
            userName: currentUser.displayName || currentUser.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            items, report: text
        });
    } catch(e) { console.error('Erro ao salvar pedido:', e); }
};

document.getElementById('close-modal').onclick  = () => closeModal('report-modal');
document.getElementById('modal-overlay').onclick = () => closeModal('report-modal');

document.getElementById('copy-report').onclick = () => {
    navigator.clipboard.writeText(document.getElementById('report').value)
        .then(() => showToast('✓ Copiado!'))
        .catch(() => showToast('Erro ao copiar.', 'error'));
};

document.getElementById('whatsapp-report').onclick = () => {
    const text = document.getElementById('report').value;
    if (text) window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
};

// ============================================================
// HISTÓRICO
// ============================================================
async function renderHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = '<p class="loading-text">Carregando...</p>';
    try {
        const snap = await db.collection('requests').orderBy('createdAt', 'desc').limit(60).get();
        if (snap.empty) { list.innerHTML = '<div class="empty-day">Nenhum pedido registrado ainda.</div>'; return; }
        list.innerHTML = '';
        snap.docs.forEach(doc => {
            const r    = doc.data();
            const date = r.createdAt ? r.createdAt.toDate().toLocaleString('pt-BR') : r.date;
            const div  = document.createElement('div');
            div.className = 'history-card';
            div.innerHTML =
                '<div class="history-header">' +
                    '<div><strong>' + r.day + '</strong><span class="history-date">' + date + '</span></div>' +
                    '<span class="history-user">👤 ' + (r.userName || r.userEmail) + '</span>' +
                '</div>' +
                '<div class="history-meta">' + r.items.length + ' itens pedidos</div>' +
                '<button class="btn-link">Ver detalhes ▾</button>' +
                '<pre class="history-detail hidden">' + (r.report || '') + '</pre>';
            div.querySelector('.btn-link').onclick = function() {
                const pre = this.nextElementSibling;
                pre.classList.toggle('hidden');
                this.textContent = pre.classList.contains('hidden') ? 'Ver detalhes ▾' : 'Ocultar ▴';
            };
            list.appendChild(div);
        });
    } catch(e) {
        list.innerHTML = '<div class="empty-day">Erro ao carregar histórico.</div>';
        console.error(e);
    }
}

// ============================================================
// ADMIN PANEL
// ============================================================
function renderAdmin() {
    document.getElementById('admin-content').innerHTML =
        '<div class="admin-section">' +
            '<div class="admin-section-header"><h2>Categorias</h2>' +
                '<button class="btn-primary btn-sm" onclick="openCategoryModal()">+ Nova</button></div>' +
            '<div id="admin-cat-list"></div>' +
        '</div>' +
        '<div class="admin-section">' +
            '<div class="admin-section-header"><h2>Itens</h2>' +
                '<button class="btn-primary btn-sm" onclick="openProductModal()">+ Novo</button></div>' +
            '<div id="admin-prod-list"></div>' +
        '</div>' +
        '<div class="admin-section">' +
            '<div class="admin-section-header"><h2>Usuários</h2>' +
                '<button class="btn-primary btn-sm" onclick="openCreateUserModal()">+ Novo Usuário</button></div>' +
            '<div id="admin-user-list"></div>' +
        '</div>';

    renderAdminCats();
    renderAdminProds();
    renderAdminUsers();
}

function renderAdminCats() {
    const list = document.getElementById('admin-cat-list');
    list.innerHTML = '';
    categories.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'admin-row';
        div.innerHTML =
            '<div class="admin-row-info"><strong>' + cat.name + '</strong>' +
                '<small>' + (cat.days || []).join(', ') + '</small></div>' +
            '<button class="btn-icon-sm" onclick="openCategoryModal(\'' + cat.id + '\')">✏️ Editar</button>';
        list.appendChild(div);
    });
}

function renderAdminProds() {
    const list = document.getElementById('admin-prod-list');
    list.innerHTML = '';
    products.forEach(prod => {
        const cat = categories.find(c => c.id === prod.categoryId);
        const div = document.createElement('div');
        div.className = 'admin-row';
        div.innerHTML =
            '<div class="admin-row-info"><strong>' + prod.name + '</strong>' +
                '<small>' + (cat ? cat.name : '—') + ' · ' + (prod.type === 'quantity' ? 'Qtd' : 'Check') + '</small></div>' +
            '<button class="btn-icon-sm" onclick="openProductModal(\'' + prod.id + '\')">✏️ Editar</button>';
        list.appendChild(div);
    });
}

async function renderAdminUsers() {
    const list = document.getElementById('admin-user-list');
    list.innerHTML = '<p class="loading-text">Carregando...</p>';
    try {
        const snap = await db.collection('users').get();
        list.innerHTML = '';
        snap.docs.forEach(doc => {
            const u   = doc.data();
            const div = document.createElement('div');
            div.className = 'admin-row';
            div.innerHTML =
                '<div class="admin-row-info"><strong>' + (u.name || u.email) + '</strong>' +
                    '<small>' + u.email + ' · ' + (u.role === 'admin' ? '⭐ Admin' : 'Usuário') + '</small></div>' +
                '<button class="btn-icon-sm" onclick="toggleUserRole(\'' + doc.id + '\',\'' + u.role + '\',this)">' +
                    (u.role === 'admin' ? '→ Usuário' : '→ Admin') + '</button>';
            list.appendChild(div);
        });
    } catch(e) { console.error(e); }
}

async function toggleUserRole(uid, role, btn) {
    const newRole = role === 'admin' ? 'user' : 'admin';
    await db.collection('users').doc(uid).update({ role: newRole });
    btn.textContent = newRole === 'admin' ? '→ Usuário' : '→ Admin';
    const small = btn.previousElementSibling.querySelector('small');
    small.textContent = small.textContent.replace(/·.*$/, '· ' + (newRole === 'admin' ? '⭐ Admin' : 'Usuário'));
    showToast('Perfil atualizado!');
}

// --- Modal Categoria ---
function openCategoryModal(catId) {
    editingCatId = catId || null;
    const existing = catId ? categories.find(c => c.id === catId) : null;
    document.getElementById('modal-category-title').textContent = catId ? 'Editar Categoria' : 'Nova Categoria';
    document.getElementById('cat-name').value = existing ? existing.name : '';
    document.getElementById('cat-delete-btn').classList.toggle('hidden', !catId);

    const daysDiv = document.getElementById('cat-days');
    daysDiv.innerHTML = '';
    DAYS.forEach(day => {
        const checked = existing && existing.days && existing.days.includes(day);
        const lbl = document.createElement('label');
        lbl.className = 'day-check-label';
        lbl.innerHTML = '<input type="checkbox" value="' + day + '" ' + (checked ? 'checked' : '') + '>' + day;
        daysDiv.appendChild(lbl);
    });

    document.getElementById('modal-category').classList.remove('hidden');
    document.getElementById('cat-name').focus();
}

document.getElementById('cat-save-btn').onclick = async () => {
    const name = document.getElementById('cat-name').value.trim();
    if (!name) { showToast('Informe o nome.', 'warn'); return; }
    const days = Array.from(document.querySelectorAll('#cat-days input:checked')).map(el => el.value);
    setLoading(true);
    try {
        if (editingCatId) {
            await db.collection('categories').doc(editingCatId).update({ name, days });
        } else {
            await db.collection('categories').add({ name, days, order: categories.length, createdAt: firebase.firestore.FieldValue.serverTimestamp(), createdBy: currentUser.uid });
        }
        await loadData(); closeModal('modal-category'); renderAdmin(); renderChecklist();
        showToast('Categoria salva!');
    } catch(e) { showToast('Erro ao salvar.', 'error'); console.error(e); }
    setLoading(false);
};

document.getElementById('cat-delete-btn').onclick = async () => {
    if (!confirm('Excluir esta categoria e todos os seus itens?')) return;
    setLoading(true);
    try {
        const batch = db.batch();
        products.filter(p => p.categoryId === editingCatId).forEach(p => batch.delete(db.collection('products').doc(p.id)));
        batch.delete(db.collection('categories').doc(editingCatId));
        await batch.commit();
        await loadData(); closeModal('modal-category'); renderAdmin(); renderChecklist();
        showToast('Categoria excluída.');
    } catch(e) { showToast('Erro ao excluir.', 'error'); console.error(e); }
    setLoading(false);
};

// --- Modal Produto ---
function openProductModal(prodId) {
    editingProdId = prodId || null;
    const existing = prodId ? products.find(p => p.id === prodId) : null;
    document.getElementById('modal-product-title').textContent = prodId ? 'Editar Item' : 'Novo Item';
    document.getElementById('prod-name').value  = existing ? existing.name : '';
    document.getElementById('prod-type').value  = existing ? existing.type : 'quantity';
    document.getElementById('prod-delete-btn').classList.toggle('hidden', !prodId);

    const sel = document.getElementById('prod-category');
    sel.innerHTML = '';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id; opt.textContent = cat.name;
        if (existing && existing.categoryId === cat.id) opt.selected = true;
        sel.appendChild(opt);
    });

    document.getElementById('modal-product').classList.remove('hidden');
    document.getElementById('prod-name').focus();
}

document.getElementById('prod-save-btn').onclick = async () => {
    const name  = document.getElementById('prod-name').value.trim();
    const catId = document.getElementById('prod-category').value;
    const type  = document.getElementById('prod-type').value;
    if (!name) { showToast('Informe o nome.', 'warn'); return; }
    setLoading(true);
    try {
        if (editingProdId) {
            await db.collection('products').doc(editingProdId).update({ name, categoryId: catId, type });
        } else {
            await db.collection('products').add({ name, categoryId: catId, type, order: products.length, createdAt: firebase.firestore.FieldValue.serverTimestamp(), createdBy: currentUser.uid });
        }
        await loadData(); closeModal('modal-product'); renderAdmin(); renderChecklist();
        showToast('Item salvo!');
    } catch(e) { showToast('Erro ao salvar.', 'error'); console.error(e); }
    setLoading(false);
};

document.getElementById('prod-delete-btn').onclick = async () => {
    if (!confirm('Excluir este item?')) return;
    setLoading(true);
    try {
        await db.collection('products').doc(editingProdId).delete();
        await loadData(); closeModal('modal-product'); renderAdmin(); renderChecklist();
        showToast('Item excluído.');
    } catch(e) { showToast('Erro ao excluir.', 'error'); console.error(e); }
    setLoading(false);
};
