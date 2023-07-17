class DataService{

static getData(){

const todo1 = new ToDo('Comprare il latte', false, new Date(2023, 6, 9))
const todo2 = new ToDo('Scrivere una lettera', false, new Date(2023, 0, 16))
const todo3 = new ToDo('Guadare il lago', false, new Date(2023, 4, 1))
const todo4 = new ToDo('Chiamare l\'ospedale', true, new Date(2023, 9, 2))
const todo5 = new ToDo('Comprare il pane', false, new Date(2023, 7, 9))

const todosArray = [todo1, todo2, todo3, todo4, todo5];
return todosArray;
   

 }
}