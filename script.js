document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.add'),
          overlay = document.querySelector('.overlay'),
          wrapper = document.querySelector('.wrapper'),
          closeBtn = document.querySelector('.close'),
          createNoteBtn = document.querySelector('.create'),
          modalTitle = document.querySelector('.modal__title'),
          modalText = document.querySelector('.modal__text');

//делаем пустой массив для заметок
    const notes = [];
//Делаем функции для открытия и закрытия модального окна создания заметки
    function showModal() {
        overlay.classList.add('active');
    }
    function closeModal() {
        overlay.classList.remove('active');
    }
//Делаем функцию создания заметки, добавления ее в массив, вывода на экран 
    
    function createNewNote() {
        let newNote = {
            title: modalTitle.value,
            text: modalText.value
        };
        notes.push(newNote);
        drawNote();
        closeModal();
        //Очищаем инпуты модального окна
        modalTitle.value = '';
        modalText.value = '';
        console.log(notes);
    }
//Функция вывода на экран новой заметки
    function drawNote() {
        let note = document.createElement('div');
        note.className = "wrapper__note";
        notes.forEach((item, i) => {
            note.id = `${i}`;
            note.innerHTML = `
            <h2 class="wrapper__note-title">${item.title}</h2>
            <p class="wrapper__note-text">${item.text}</p>
            <div class="wrapper__note-pic">
            <button class="wrapper__note-delbtn">
                <img src="img/delete.png" alt="delete" class="wrapper__note-img">
            </button>
            </div>
            `;
            wrapper.prepend(note);
        });
    }
    
//Вешаем обработчики событий на кнопки добавить, закрыть, создать, 
    addBtn.addEventListener('click', showModal);
    closeBtn.addEventListener('click', closeModal);
    createNoteBtn.addEventListener('click', createNewNote);

//Редактируем заметку
const editOverlay = document.querySelector('.edit__overlay'),
      editTitle = document.querySelector('.edit__title'),
      editText = document.querySelector('.edit__text'),
      saveBtn = document.querySelector('.save'),
      editCloseBtn = document.querySelector('.editclose');

//Здесь будет заметка, на которую кликнули
let noteDiv;  
//Здесь ее id    
let noteId;

//Функция открытия окна редактирования, если кликнули по нужному элементу
//Приводим id к числу, чтобы найти заметку по индексу в массиве notes
function showEditWindow(event) {
    if (event.target.matches('.wrapper__note') || event.target.matches('.wrapper__note-title') || event.target.matches('.wrapper__note-text')) {
        noteDiv = event.target.closest('div');
        noteId = +event.target.closest('div').id;
        editOverlay.classList.add('active');
    }
}

function closeEditWindow() {
    editOverlay.classList.remove('active');
}

//Записываем измененные данные в элемент массива notes
//Меняем содержание заметки и помещаем ее в начало списка
function changeNoteInArr() {
    notes[noteId].title = editTitle.value;
    notes[noteId].text = editText.value;
    noteDiv.innerHTML = `
    <h2 class="wrapper__note-title">${editTitle.value}</h2>
    <p class="wrapper__note-text">${editText.value}</p>
    <div class="wrapper__note-pic">
    <button class="wrapper__note-delbtn">
        <img src="img/delete.png" alt="delete" class="wrapper__note-img">
    </button>
    </div>
    `;
    wrapper.prepend(noteDiv);
    closeEditWindow();
    editTitle.value = '';
    editText.value = '';
    console.log(notes);
}

wrapper.addEventListener('click', showEditWindow);
saveBtn.addEventListener('click', changeNoteInArr);
editCloseBtn.addEventListener('click', closeEditWindow);

//Удаляем заметку
function deleteNote(event) {
    if (event.target.matches('.wrapper__note-img') || event.target.matches('.wrapper__note-delbtn')) {
    const noteId = event.target.closest('.wrapper__note').id;
    const noteDiv = event.target.closest('.wrapper__note');
    const delRequest = confirm('Удалить заметку?');
    if (delRequest) {
        noteDiv.remove();
        notes.splice(noteId, 1);
    } else {
        return;
    }
    console.log(notes);
    }
}

wrapper.addEventListener('click', deleteNote);

//Фильтрация заметок
const searchBtn = document.querySelector('.search__wrapper-btn'),
      searchInput = document.querySelector('.search__wrapper-input');

function filter() {
    const allNotes = document.querySelectorAll('.wrapper__note');
    const reg = new RegExp(`${searchInput.value}`, 'ig');
    console.log(reg);
    allNotes.forEach(item => {
    console.log(item.innerHTML);
    console.log(searchInput.value);
    if (searchInput.value == '') {
        item.classList.remove('hide');
        item.classList.add('active');
    }
    if (!reg.test(item.innerHTML)) {
        item.classList.add('hide');
    }
});
}

searchBtn.addEventListener('click', filter);


});

