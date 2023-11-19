const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
let toutesLesTaches = [];

//  chargerDepuisLocalStorage();

form.addEventListener('submit',event => {
    event.preventDefault();

    const text = input.value.trim();
    if(text !== '') {
        rajouterUneTache(text);
        input.value = '';
    }
}); 

function rajouterUneTache(text) {
    const todo = {
    text,
//La methode Date.now() renvoie le nb de millisecondes ecoulees
    id: Date.now()
} 
   afficherListe(todo);
}

function afficherListe(todo) {
const item = document.createElement('li');
item.setAttribute('data-key',todo.id);

const input = document.createElement('input');
input.setAttribute('type', 'checkbox');
input.addEventListener('click',tacheFaite);
item.appendChild(input);

const txt = document.createElement('span');
txt.innerText = todo.text;
item.appendChild(txt);

const btn = document.createElement('button');
btn.addEventListener('click', supprimerTache);
const img = document.createElement('img');
img.setAttribute('src','close.png');
btn.appendChild(img);
item.appendChild(btn);

liste.appendChild(item);
toutesLesTaches.push(item);

const btnModifier = document.createElement('button');
btnModifier.textContent = 'Modifier';
btnModifier.addEventListener('click', modifierTache);
item.appendChild(btnModifier);

liste.appendChild(item);
toutesLesTaches.push(item);
// localStorage.setItem('ajoutLocalStorage',JSON.stringify(toutesLesTaches))
}

function tacheFaite(e) {
    e.target.parentNode.classlist.toggle('finDeTache');
}

function supprimerTache(e) { 
  
    toutesLesTaches.forEach(el => {
        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute
        ('data-key')){
            el.remove();
        }
    })
}


function modifierTache(e) {
    const key = e.target.parentNode.getAttribute('data-key');
    
    
    const taskToUpdate = toutesLesTaches.find(item => item.getAttribute('data-key') === key);

    if (taskToUpdate) {

        const newText = prompt('Enter the new task text:', taskToUpdate.querySelector('span').innerText);
        if (newText !== null) {
            taskToUpdate.querySelector('span').innerText = newText;
        }
    }
}

console.log(toutesLesTaches);
