
let inEl = document.getElementById('inputEl');
let btn = document.querySelector('.btn');
let todoList = document.querySelector('.todoList');


btn.addEventListener('click', () => {
  if (inEl.value.trim() === '') return;
  inEl.focus();
  let myInput = JSON.parse(localStorage.getItem('inputs')) || [];
  // console.log(myInput);
  if (myInput.some(item => item.text === inEl.value.trim())) {
    inEl.value = "";
    return;
}
  let task = {
    text: inEl.value.trim(), 
    
  }
  myInput.push(task)
  // myInput.push(inEl.value);
  localStorage.setItem('inputs', JSON.stringify(myInput));
  createTask(task);

 
});

let createTask = (task) => {
  let paraEl = document.createElement('p');
  paraEl.addEventListener('click', () => {
    paraEl.classList.toggle('done');
  })

  let deleteBtn = document.createElement('button');
  let taskDiv = document.createElement('div');
  deleteBtn.innerText = 'Delete';
  deleteBtn.classList.add('deleteBtn');

  paraEl.innerText = task.text;

  deleteBtn.addEventListener('click', () => {
    taskDiv.remove();
    let myInput = JSON.parse(localStorage.getItem('inputs')) || [];
    console.log(myInput);
    myInput = myInput.filter(item => item.text !== task.text);
    localStorage.setItem('inputs', JSON.stringify(myInput));
  })
  taskDiv.appendChild(paraEl);
  taskDiv.appendChild(deleteBtn);
  todoList.appendChild(taskDiv);
  inEl.value = '';
}

inEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btn.click();
  }
});
// SHOW SAVED TASKS
let savedTasks = JSON.parse(localStorage.getItem('inputs')) || [];

savedTasks.forEach(a => {
  createTask(a);
});