// const todos = StorageService.loadTodos();
let manager;

DBService.getAllTodos().then(todos => {
  console.log(todos)
  manager = new Manager(todos);
  render();
});


// altro metodo 
// if (todos) {
//   manager = new Manager(todos);
// } else {                        // questo vuol dire, se passiamo il parametro todos crea il todo se non ci sono dati iniziali viene creato il manager senza niente
//   manager = new Manager();
// }


function render() {
  const todosContainer = document.getElementById("todo-container");
  todosContainer.innerHTML = "";

  for (let i = 0; i < manager.todosArray.length; i++) {
    const todo = manager.todosArray[i];
    const div = document.createElement("div");
    div.classList.add("todo-card");
    if (todo.isCompleted) {
      div.classList.add("todo-completed");
      // div.style.borderColor = "lime"; //con questo si può mettere la classe inline
    }

    const titleStrong = document.createElement("strong");
    const titleNode = document.createTextNode(todo.title);

    titleStrong.appendChild(titleNode);
    div.appendChild(titleStrong);

    const dateSpan = document.createElement("span");
    const dateNode = document.createTextNode(todo.creationDate.toISOString());

    dateSpan.appendChild(dateNode);
    div.appendChild(dateNode);

    const completeBtn = document.createElement("button"); //questo mette un bottone da premere per completare
    const completeNode = document.createTextNode(todo.isCompleted ? "Da completare" : "Completato"); //questo mette il testo al bottone
    completeBtn.addEventListener("click", () => {


      
      const modifiedTodo = {...todo};

      // if (modifiedTodo.isCompleted === true) {    questa funzione è la stessa cosa di scrivere  modifiedTodo.isCompleted = !modifiedTodo.isCompleted;
      //   modifiedTodo.isCompleted = false;       
      // } else {
      //   modifiedTodo.isCompleted = true;
      // }


      modifiedTodo.isCompleted = !modifiedTodo.isCompleted;
      DBService.updateTodo(modifiedTodo).then(res => {
        manager.changeCompleteStatus(i); 
        render();
      });
     
      // StorageService.saveData(manager.todosArray);
     
    });

    const deleteBtn = document.createElement("button");
    const deleteNode = document.createTextNode("Cancella");

    deleteBtn.addEventListener("click", () => {
      
      DBService.deleteTodo(todo.id).then(() => {
          manager.deleteTodo(i); 
          render();
      });
     
      // StorageService.saveData(manager.todosArray);
     
    });


    completeBtn.appendChild(completeNode);
    div.appendChild(completeBtn);

    deleteBtn.appendChild(deleteNode);
    div.appendChild(deleteBtn);

    todosContainer.appendChild(div);
  }
}

function addTodo() {
  const input = document.getElementById("title-input");
  const newTodoTitle = input.value;

  if (newTodoTitle.trim() !== "") {   
    
    const newTodo = new ToDo(newTodoTitle, false, new Date()); //.trim() rimuove gli spazi prima e dopo la stringa
    
    DBService.saveTodo(newTodo).then(res => {
      manager.addToDo(res);
      input.value = '';
      render();
    })
    
    // manager.addTodoWithTitle(newTodoTitle);
    // StorageService.saveData(manager.todosArray);
   // input.value = ""; // per dire di ripulire l'input una volta che è stato inserito e viene premuto aggiungi
  }
  // render();
}
//questo metodo alternativo sotto scrive l'HTML come stringhe all'interno del ciclo, ma document le andrà a inserire nell'HTML scrivendo di fatto HTML con tutti i tag funzionanti

// function render2(){

//     const todosContainer = document.getElementById('todo-container');
//     todosContainer.innerHTML = '';

//     for (const todo of manager.todosArray) {

//         let additionalClass = '';

//         if (todo.isCompleted){
//             additionalClass = 'todo-completed';
//         }

//         const template = `<div class="todo-card ${additionalClass}">
//                             <strong>${todo.title}</strong>
//                             <span>${todo.creationDate.toISOString()}</span>
//                           </div>`;

//         todosContainer.innerHTML += template;

//     }

// }

// render();

function orderByTitle() {
  manager.orderTodosByTitle();
  render();
}

function orderByDate() {
  manager.orderTodosByDate();
  render();
}
