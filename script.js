// ============================================================
// FIREBASE CONFIG — substitua com os dados do seu projeto
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyD-IR2cPcA-izNNZBP-0HZoCQ9WaR258zY",
  authDomain: "theburger-9edde.firebaseapp.com",
  projectId: "theburger-9edde",
  storageBucket: "theburger-9edde.firebasestorage.app",
  messagingSenderId: "1059185139735",
  appId: "1:1059185139735:web:5df43156f24a6281e53c52",
  measurementId: "G-2PK3K2XCM3"
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
// AUTH
// ============================================================
auth.onAuthStateChanged(async user => {
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
    setLoading(false);
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
// SEED INICIAL (roda apenas uma vez, para admin)
// ============================================================
async function seedInitialData() {
    const catDef = [
        { name: "Carnes 🥩",               days: ["Domingo","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"], order: 0  },
        { name: "Braguini 🥬",             days: ["Domingo","Quarta-feira","Sexta-feira"],                                     order: 1  },
        { name: "Águia Frios 🦅",          days: ["Domingo","Quarta-feira","Sexta-feira"],                                     order: 2  },
        { name: "PMG — Frios 🧀",          days: ["Domingo"],                                                                  order: 3  },
        { name: "Pães 🥖",                 days: ["Domingo","Quinta-feira"],                                                   order: 4  },
        { name: "Gelo 🧊",                 days: ["Domingo","Sexta-feira"],                                                    order: 5  },
        { name: "Descartáveis 📦",         days: ["Domingo"],                                                                  order: 6  },
        { name: "Vegetarianos 🌱",         days: ["Domingo"],                                                                  order: 7  },
        { name: "Sorvetes 🍦",             days: ["Domingo"],                                                                  order: 8  },
        { name: "Sobremesas 🍮",           days: ["Domingo"],                                                                  order: 9  },
        { name: "Chopp 🍺",               days: ["Domingo"],                                                                  order: 10 },
        { name: "Mercado Geral 🛍️",       days: ["Domingo","Quarta-feira"],                                                   order: 11 },
        { name: "Limpeza 🧹",             days: ["Quarta-feira"],                                                              order: 12 },
        { name: "Outros Fornecedores 📋",  days: ["Quarta-feira"],                                                             order: 13 },
        { name: "Bebidas — Alex 🍹",      days: ["Domingo"],                                                                  order: 14 }
    ];

    const prodDef = [
        // Carnes
        { cat: "Carnes 🥩", name: "Tradicional",        type: "quantity" },
        { cat: "Carnes 🥩", name: "Smash",              type: "quantity" },
        { cat: "Carnes 🥩", name: "Picanha",            type: "quantity" },
        { cat: "Carnes 🥩", name: "Costela",            type: "quantity" },
        { cat: "Carnes 🥩", name: "Frango",             type: "quantity" },
        // Braguini
        { cat: "Braguini 🥬", name: "Alface",           type: "quantity" },
        { cat: "Braguini 🥬", name: "Tomate",           type: "quantity" },
        { cat: "Braguini 🥬", name: "Rúcula",           type: "quantity" },
        { cat: "Braguini 🥬", name: "Cebola Roxa",      type: "quantity" },
        { cat: "Braguini 🥬", name: "Cebola Comum",     type: "quantity" },
        { cat: "Braguini 🥬", name: "Cheiro Verde",     type: "quantity" },
        { cat: "Braguini 🥬", name: "Limão",            type: "quantity" },
        { cat: "Braguini 🥬", name: "Maçã",             type: "quantity" },
        { cat: "Braguini 🥬", name: "Hortelã",          type: "quantity" },
        { cat: "Braguini 🥬", name: "Couve",            type: "quantity" },
        { cat: "Braguini 🥬", name: "Uva",              type: "quantity" },
        { cat: "Braguini 🥬", name: "Geleia de Pimenta",type: "quantity" },
        // Águia
        { cat: "Águia Frios 🦅", name: "Alho Frito",      type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Bacon",           type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Parmesão",        type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Gouda",           type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Coalho",          type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Queijo Prato",    type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Mussarela",       type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Chantilly Spray", type: "quantity" },
        { cat: "Águia Frios 🦅", name: "Mostarda Cepera", type: "quantity" },
        // PMG
        { cat: "PMG — Frios 🧀", name: "Catupiry",                type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Cheddar Cremoso",         type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Cream Cheese",            type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Cheddar Fatiado",         type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Provolone",               type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Gorgonzola",              type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Gouda Empanado",          type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Sachês Catchup/Maionese", type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Bag de Catchup",          type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Bag de Mostarda",         type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Tubo Catchup",            type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Tubo Mostarda",           type: "quantity" },
        { cat: "PMG — Frios 🧀", name: "Azeite",                  type: "quantity" },
        // Pães
        { cat: "Pães 🥖", name: "Brioche",     type: "quantity" },
        { cat: "Pães 🥖", name: "Australiano", type: "quantity" },
        // Gelo
        { cat: "Gelo 🧊", name: "Gelo", type: "quantity" },
        // Descartáveis
        { cat: "Descartáveis 📦", name: "Isopor",          type: "check" },
        { cat: "Descartáveis 📦", name: "Papel Embalado",  type: "check" },
        { cat: "Descartáveis 📦", name: "Pote Maionese",   type: "check" },
        { cat: "Descartáveis 📦", name: "Papel Higiênico", type: "check" },
        // Vegetarianos
        { cat: "Vegetarianos 🌱", name: "Feijão",   type: "quantity" },
        { cat: "Vegetarianos 🌱", name: "Lentilha", type: "quantity" },
        // Sorvetes
        { cat: "Sorvetes 🍦", name: "Chocolate", type: "quantity" },
        { cat: "Sorvetes 🍦", name: "Creme",     type: "quantity" },
        // Sobremesas
        { cat: "Sobremesas 🍮", name: "Pudim",        type: "check" },
        { cat: "Sobremesas 🍮", name: "Petit Gateau", type: "check" },
        { cat: "Sobremesas 🍮", name: "Brownie",      type: "check" },
        { cat: "Sobremesas 🍮", name: "Quibe",        type: "check" },
        // Chopp
        { cat: "Chopp 🍺", name: "Chopp", type: "quantity" },
        // Mercado Geral
        { cat: "Mercado Geral 🛍️", name: "Guardanapo Mili Salão",          type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saco de Lixo",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sachês (Sal/Açúcar/Adoçante)",   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Palito de Dente",                type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Colherzinha p/ Maionese",        type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Colher para Pudim",              type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Prato de Bolo + Garfinho + Vela",type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Canudo Milkshake",               type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Canudo Refri",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Canudo Drink",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Picles",                         type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cebola Crispy",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Açúcar",                         type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Açúcar Mascavo",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sal",                            type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Pimenta Biquinho",               type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Ovo de Codorna",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Nozes Pecan",                    type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Iogurte",                        type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Vinagre Maçã",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Vinagre Comum",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cerveja Preta",                  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Molho Inglês",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Shoyu",                          type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Molho para Salada",              type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Ovomaltine",                     type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Amendoim Triturado",             type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Chocolate Gotas",                type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Creme de Leite",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Mel",                            type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Leite",                          type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cobertura Chocolate",            type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cobertura Caramelo",             type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Gordura Vegetal (balde)",        type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Papel Alumínio",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Óleo",                           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Papel Toalha de Rolo",           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Bobina Saquinho Cozinha",        type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Bobina Térmica Impressora",      type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saquinho de Troco",              type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Touca",                          type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saco de Free",                   type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Gás Maçarico",                   type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Pimenta Jalapeño",               type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Gin",                            type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sakê",                           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Vodka",                          type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Velho Barreiro",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Amarula",                        type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Melado de Cana",                 type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saquinho de Talher",             type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saco p/ Maionese Cozinha",       type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Saquinho Maionese Salão",        type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Farinha de Empanar",             type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Palito de Lanche",               type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sacolas Grandes",                type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Sacolas Pequenas",               type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Cerealista",                     type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Copo 500/300ml Chopp",           type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Copo Milkshake 400ml c/ Tampa",  type: "quantity" },
        { cat: "Mercado Geral 🛍️", name: "Caneta Bic",                     type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Caneta Piloto",                  type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Pilhas",                         type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Caderno",                        type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Fita Dupla Face",                type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Fita Isolante",                  type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Grampo",                         type: "check"    },
        { cat: "Mercado Geral 🛍️", name: "Grampeador",                     type: "check"    },
        // Limpeza
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
        // Outros Fornecedores
        { cat: "Outros Fornecedores 📋", name: "Ovos",                      type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Batata Palito",              type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Batata Rústica",             type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Saco Kraft Lanche (Alex)",   type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Caixinha de Batata (Alex)",  type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Etiqueta (Rodrigo)",         type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Papel de Tábua (Rodrigo)",   type: "quantity" },
        { cat: "Outros Fornecedores 📋", name: "Papel Acoplado (Rodrigo)",   type: "quantity" },
        // Bebidas
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
    showToast('Dados iniciais carregados com sucesso!');
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
    if (name === 'admin')   renderAdmin();
}

document.getElementById('btn-history').onclick     = () => showPanel('history');
document.getElementById('btn-admin').onclick       = () => { if (currentRole === 'admin') showPanel('admin'); };
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
// GERAR RELATÓRIO
// ============================================================
function buildReport() {
    const day  = daySelector.value;
    const now  = new Date();
    const date = now.toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' });
    const time = now.toLocaleTime
