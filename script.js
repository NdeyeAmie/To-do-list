const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
let toutesLesTaches = [];

// Load tasks from local storage on page load
chargerDepuisLocalStorage();

form.addEventListener('submit', event => {
    event.preventDefault();

    const text = input.value.trim();
    if (text !== '') {
        rajouterUneTache(text);
        sauvegarderDansLocalStorage();
        input.value = '';
    }
});

function rajouterUneTache(text) {
    const todo = {
        text,
        id: Date.now()
    };
    afficherListe(todo);
}

function afficherListe(todo) {
    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id);

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', tacheFaite);
    item.appendChild(input);

    const txt = document.createElement('span');
    txt.innerText = todo.text;
    item.appendChild(txt);

    const btn = document.createElement('button');
    btn.addEventListener('click', supprimerTache);
    const img = document.createElement('img');
    img.setAttribute('src', 'close.png');
    btn.appendChild(img);
    item.appendChild(btn);

    const btnModifier = document.createElement('button');
    btnModifier.textContent = 'Modifier';
    btnModifier.addEventListener('click', modifierTache);
    item.appendChild(btnModifier);

    liste.appendChild(item);
    toutesLesTaches.push(todo);
    sauvegarderDansLocalStorage();
}

function tacheFaite(e) {
    e.target.parentNode.classList.toggle('finDeTache');
    sauvegarderDansLocalStorage();
}

function supprimerTache(e) {
    const key = e.target.parentNode.getAttribute('data-key');
    toutesLesTaches = toutesLesTaches.filter(todo => todo.id != key);
    e.target.parentNode.remove();
    sauvegarderDansLocalStorage();
}

function modifierTache(e) {
    const key = e.target.parentNode.getAttribute('data-key');
    const todoToUpdate = toutesLesTaches.find(item => item.id == key);

    if (todoToUpdate) {
        const newText = prompt('Enter the new text:', todoToUpdate.text);
        if (newText !== null) {
            todoToUpdate.text = newText;
            e.target.parentNode.querySelector('span').innerText = newText;
            sauvegarderDansLocalStorage();
        }
    }
}

function sauvegarderDansLocalStorage() {
    localStorage.setItem('taches', JSON.stringify(toutesLesTaches));
}

function chargerDepuisLocalStorage() {
    const ref = localStorage.getItem('taches');
    const savedTasks = JSON.parse(ref);
    if (savedTasks) {
        savedTasks.forEach(task => {
            afficherListe(task);
        });
    }
}