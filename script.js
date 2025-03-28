// Variáveis para armazenar os dados de contatos
let contacts = [];
let editIndex = null; // Índice do contato que está sendo editado

// Referências aos elementos do DOM
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('search');

// Função para adicionar um novo contato
function addContact(name, email, phone) {
    const contact = { name, email, phone };
    contacts.push(contact);
    renderContactList();
}

// Função para editar um contato existente
function editContact(index) {
    const contact = contacts[index];

    // Preenche os campos de entrada com os dados do contato
    nameInput.value = contact.name;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;

    // Armazena o índice do contato sendo editado
    editIndex = index;

    // Altera o botão de adicionar para "Salvar Alterações"
    const submitButton = contactForm.querySelector('button');
    submitButton.textContent = 'Salvar Alterações';
}

// Função para atualizar um contato existente
function updateContact(name, email, phone) {
    contacts[editIndex] = { name, email, phone };
    editIndex = null; // Limpar o índice de edição
    renderContactList();

    // Restaurar o texto do botão para "Adicionar Contato"
    const submitButton = contactForm.querySelector('button');
    submitButton.textContent = 'Adicionar Contato';

    // Limpar os campos de entrada
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
}

// Função para remover um contato
function removeContact(index) {
    contacts.splice(index, 1);
    renderContactList();
}

// Função para exibir a lista de contatos
function renderContactList() {
    contactList.innerHTML = ''; // Limpa a lista antes de renderizar
    contacts.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <span>${contact.name}</span>
                <span>${contact.email}</span>
                <span>${contact.phone}</span>
            </div>
            <div class="actions">
                <button onclick="editContact(${index})">Editar</button>
                <button onclick="removeContact(${index})">Excluir</button>
            </div>
        `;
        contactList.appendChild(listItem);
    });
}

// Função para buscar contatos
function searchContacts(query) {
    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(query.toLowerCase()) || 
               contact.email.toLowerCase().includes(query.toLowerCase());
    });
    return filteredContacts;
}

// Função para lidar com o envio do formulário
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name && email && phone) {
        if (editIndex !== null) {
            updateContact(name, email, phone); // Atualiza o contato existente
        } else {
            addContact(name, email, phone); // Adiciona um novo contato
        }
    } else {
        alert('Por favor, preencha todos os campos!');
    }
});

// Função para lidar com a busca
searchInput.addEventListener('input', function(event) {
    const query = event.target.value;
    const filteredContacts = searchContacts(query);

    contactList.innerHTML = ''; // Limpar lista atual
    filteredContacts.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <span>${contact.name}</span>
                <span>${contact.email}</span>
                <span>${contact.phone}</span>
            </div>
            <div class="actions">
                <button onclick="editContact(${index})">Editar</button>
                <button onclick="removeContact(${index})">Excluir</button>
            </div>
        `;
        contactList.appendChild(listItem);
    });
});
