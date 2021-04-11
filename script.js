document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.add'),
          overlay = document.querySelector('.overlay'),
          wrapper = document.querySelector('.wrapper'),
          closeBtn = document.querySelector('.close'),
          createNoteBtn = document.querySelector('.create'),
          modalTitle = document.querySelector('.modal__title'),
          modalText = document.querySelector('.modal__text'),
          modalLabel = document.querySelectorAll('.modal__label'),
          lengthLabel = document.querySelector('.length');

//делаем пустой массив для заметок
    const notes = [];
//Делаем функции для открытия и закрытия модального окна создания заметки
    function showModal() {
        overlay.classList.add('active');
        console.log(typeof modalText.value);
    }
    function closeModal() {
        overlay.classList.remove('active');
        modalTitle.value = '';
        modalText.value = '';
        removeRedCheck();
    }
    //Делаем функцию непрошедшей проверки
    function addRedCheck() {
        modalTitle.classList.add('checkred');
        modalText.classList.add('checkred');
        modalLabel.forEach(item => item.classList.add('active'));
    }
    //Убираем красные индикаторы
    function removeRedCheck() {
        modalTitle.classList.remove('checkred');
        modalText.classList.remove('checkred');
        modalLabel.forEach(item => item.classList.remove('active'));
        removeCheckTitleLength();
        // hideTitleSpaces();
        // hideTextSpaces();
    }
    //Ошибка длины заголовка
    function checkTitleLength() {
        lengthLabel.classList.add('active');
        modalTitle.classList.add('checkred');
    }
//Убираем ошибку длины заголовка
    function removeCheckTitleLength() {
        lengthLabel.classList.remove('active');
        modalTitle.classList.remove('checkred');
    }
//Показываем и убираем лейбл о пробелах в заголовке
function showTitleSpaces() {
    const titleSpaces = document.querySelector('.titlespaces');
    titleSpaces.classList.add('active');
    modalTitle.classList.add('checkred');
}
function hideTitleSpaces() {
    const titleSpaces = document.querySelector('.titlespaces');
    titleSpaces.classList.remove('active');
    modalTitle.classList.remove('checkred');
}
//Показываем и убираем лейбл о пробелах в тексте
function showTextSpaces() {
    const textSpaces = document.querySelector('.textspaces');
    textSpaces.classList.add('active');
    modalText.classList.add('checkred');
}
function hideTextSpaces() {
    const textSpaces = document.querySelector('.textspaces');
    textSpaces.classList.remove('active');
    modalText.classList.remove('checkred');
}

    function createNewNote() {
        if (modalTitle.value.length > 30) {
            checkTitleLength();
            return;
        } 
        if (modalTitle.value.length > 0 && modalTitle.value.split('').every(item => item === ' ')) {
            showTitleSpaces();
            return;
        }
        if (modalText.value.length > 0 && modalText.value.split('').every(item => item === ' ')) {
            showTextSpaces();
            return;
        }
        if (modalTitle.value.length > 0 && modalTitle.value.trim().length > 0) {
            let newNote = {
                title: modalTitle.value,
                text: modalText.value
            };
                notes.push(newNote);
                drawNote();
                closeModal();
                console.log(notes); 
        } else
        if (modalText.value.trim().length > 0 && modalText.value.trim().length > 0) {
            let newNote = {
                title: modalTitle.value,
                text: modalText.value
            };
                notes.push(newNote);
                drawNote();
                closeModal();
                console.log(notes); 
        } else {
           addRedCheck();
            return;
            }
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
    modalTitle.addEventListener('click', removeRedCheck);
    modalText.addEventListener('click', removeRedCheck);


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
    if (event.target.matches('.wrapper__note') || event.target.matches('.wrapper__note-title') || event.target.matches('.wrapper__note-text') 
    || event.target.matches('.wrapper__note-pic')) {
        noteDiv = event.target.closest('.wrapper__note');
        noteId = +event.target.closest('.wrapper__note').id;
        editOverlay.classList.add('active');
    }
}

function closeEditWindow() {
    editOverlay.classList.remove('active');
}

//Записываем измененные данные в элемент массива notes
//Меняем содержание заметки и помещаем ее в начало списка
function drawChangedNote() {
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
function changeNoteInArr() {
    if (editTitle.value.length > 30) {
        checkTitleLength();
        return;
    } 
    if (editTitle.value.length > 0 && editTitle.value.split('').every(item => item === ' ')) {
        showTitleSpaces();
        return;
    }
    if (editText.value.length > 0 && editText.value.split('').every(item => item === ' ')) {
        showTextSpaces();
        return;
    }
    if (editTitle.value.length > 0 && editTitle.value.trim().length > 0) {
        drawChangedNote();
    } else
    if (editText.value.trim().length > 0 && editText.value.trim().length > 0) {
        drawChangedNote();
    } else {
        return;
    }
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
