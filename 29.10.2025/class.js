class PicsartAcademy {
    constructor(){
        this.classroom = new Classroom(101);
        this.library = new Library();
        this.kitchen = new Kitchen();
    }
    showInfo(){
        let classroomStud = this.classroom.ListOfStudent.join(', ')
        // let libBooks = this.library.books.map(k => Object.keys())
        
        console.log(`Picsart Academy has:
            -1 classroom with students: ${classroomStud},
            -Library with books: ${this.library.books.toString()},
            -Kitchen with workers: ${this.kitchen.staff}`)
        
    }
}

class Classroom {
        constructor(roomNumber) {
        this.roomNumber = roomNumber;
        this.ListOfStudent = [];
    }
    addStudent(name){
        this.ListOfStudent.push(name);
    }

    listStudents(){
        console.log(this.ListOfStudent);
    }
}

class Library {
    constructor(){
        this.books = [];
    }
    addBook(title, author){
        this.books.push(new Book(title, author))
    }
    listBooks(){
        console.log(this.books);
    }
}

class Kitchen {
    constructor(){
        this.staff = [];
    }
    addWorker(name){
        this.staff.push(name)
    }

    listWorkers(){
        console.log(this.staff);
    }
}

class Book {
    constructor(title, author){
        this.title = title;
        this.author = author;
    }
    toString(){
        return this.title;
    }
    
}

let academy = new PicsartAcademy();
academy.classroom.addStudent("Alice");
academy.classroom.addStudent("Bob");
academy.library.addBook("Clean Code", "Robert C. Martin");
academy.library.addBook("YDNJS", "Simpson");
console.log(academy.library.books);

academy.kitchen.addWorker("Chef Bob");
academy.showInfo();
