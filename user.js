module.exports = User;

function User (name, age){
    this.age = age;
    this.name = name;
    this.print = function(){
        console.log(`Имя: ${this.name}, Возраст: ${this.age}`);
        
    }
}

User.prototype.sayHi = function(){
    console.log(`Привет, ф-я sayHi: Привет, ${this.name} !!!`);
    
}