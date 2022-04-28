const form = document.querySelector('.to-do__form');
const toDoContainer = document.querySelector('.to-do__tasks');
const inputTask = document.querySelector('.to-do-form__input-text');
const mainButton = document.querySelector('.to-do-form__btn');
const toDoContainerDone = document.querySelector('.to-do__tasks_done');

form.addEventListener('submit', createToDo);

function createToDo(e){
    e.preventDefault();
    let value;
    value = String(inputTask.value);
    if(value === '') {
        alert('Write nyancat task name');
    } else {
        const html = `
            <li class="to-do__task">
				<form class="to-do__field nes-field hidden" onsubmit="return false;">
					<label class="to-do-comm__label" for="">New title</label>
						<input type="text" id="name_field" class="to-do-edit__input nes-input">
				</form>
					<div class="to-do__buttons hidden">
						<button class="to-do-task__edit nes-btn">Edit</button>
						<button class="to-do-task__succes nes-btn is-success">
							Succes
						</button>	
					</div>
						<label class="to-do-task__body">
							<input type="checkbox" class="to-do-task__checkbox nes-checkbox is-dark">
							<span class="to-do-task__name">${value}</span>
						</label>
			</li>`
    toDoContainer.insertAdjacentHTML('afterbegin', html);

    inputTask.value = '';
    inputTask.blur();

    showLayers();

    doneTask();

    removeTask();

    editTitle();

    }
    
}



function showLayers(){

    const taskBody = document.querySelector('.to-do-task__body');
    taskBody.addEventListener('click', function(e){
    const checkbox = e.target.closest('.to-do-task__checkbox');
    if(e.target === checkbox) {
        
        const btns = e.target.closest('.to-do__task').querySelector('.to-do__buttons');
        
        hideField(e);
        btns.classList.toggle('hidden');
        
        
    }
    });

}

function doneTask() {
    const succesBtns = document.querySelector('.to-do-task__succes');

    succesBtns.addEventListener('click', function(e) {

            
            const taskName = e.target.closest('.to-do__task').querySelector('.to-do-task__name').textContent;
            const html2 = 
            `
            <li class="to-do__task to-do__task_done">
                <div class="to-do__buttons to-do__btn-done">
                    <button class="to-do-task__remove nes-btn is-error">Remove</button>
                </div>
                <label class="to-do-task__body">
                    <input type="checkbox" checked class="to-do-task__checkbox nes-checkbox is-dark">
                    <span class="to-do-task__name">${taskName}</span>
                </label>
            </li>`
            toDoContainerDone.insertAdjacentHTML('afterbegin', html2);

            const currencyTask = e.target.closest('.to-do__task');
            currencyTask.remove();

            removeTask();
        });

}

function removeTask() {
    const removeBtns = document.querySelectorAll('.to-do-task__remove');

    removeBtns.forEach(removeBtn => removeBtn.addEventListener('click', function(e) {
        const task = e.target.closest('.to-do__task');
        
        task.remove();
    }));
}

  

function showField() {
    
    const tskBody = document.querySelector('.to-do-task__edit');
    tskBody.addEventListener('click', function(e){
        const btn = e.target.closest('.to-do__task').querySelector('.to-do-task__edit');
        if(e.target === btn) {
            const field = e.target.closest('.to-do__task').querySelector('.to-do__field');
            
            field.classList.toggle('hidden');
        }
    });

}




function checkField() {
    const allFields = document.querySelectorAll('.to-do__field');

    allFields.forEach(field => field.addEventListener('submit', function(e){
    e.preventDefault();
    const inputTitle = e.target.closest('.to-do__task').querySelector('.to-do-edit__input');


    let title = e.target.closest('.to-do__task').querySelector('.to-do-task__name');
    if(inputTitle.value === '') {
        alert('Write new task name');
    } else{
        title.textContent = String(inputTitle.value);
        inputTitle.value = '';
        field.classList.add('hidden')
    }
    

    ;
    }));

    
}

function editTitle(){
    showField();

    checkField();
}

function hideField(e) {
    const field = e.target.closest('.to-do__task').querySelector('.to-do__field');
    field.classList.add('hidden');
}
