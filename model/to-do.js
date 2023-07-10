class ToDo {
  constructor(title, isCompleted = false, creationDate = new Date()) {            //default: non completato e con la data corrente

    this.title = title;
    this.isCompleted = isCompleted;
    this.creationDate = creationDate;
  }


  compareByTitle(todo){

    return this.title.localeCompare(todo.title);

  }

  compareByDate(todo){

    return todo.creationDate.getTime() - this.creationDate.getTime();

  }

}
