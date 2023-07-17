class DBService {

     // GET
    static getAllTodos(){

        const url = 'https://64b512c2f3dbab5a95c6a495.mockapi.io/todos'  // url per andare a prendere tutti i todos

        return fetch(url)
        .then(resp => resp.json())  // da oggetti generici ma noi vogliamo convertirli in oggetti todo
        .then(result => this.convertToTodoArray(result))
        .catch(error => console.log(error.message));
    }

    // DELETE 
    static deleteTodo(id) {
        
        const deleteUrl = 'https://64b512c2f3dbab5a95c6a495.mockapi.io/todos/' + id;
        console.log(deleteUrl);
        return fetch(deleteUrl, {method: 'delete'}).then(resp => resp.json()); // quando metodo diverso bisogna dirlo come in questo caso delete
    }

    // PUT
    static updateTodo(todo){
        
    }

    //UPDATE
    static saveTodo(todo){

    }


    static convertToTodoArray(genericArray){

        const tempArray = [];

        for (const obj of genericArray) {
            const newTodo = new ToDo(obj.title, obj.isCompleted, new Date(obj.creationDate), obj.id);
            tempArray.push(newTodo);
            
        }
        console.log(tempArray)
        return tempArray;
    }
}