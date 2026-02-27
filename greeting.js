console.log('Привет, это файл для require greeting');

const currentDate = new Date();
exports.date = currentDate;  // экспортируем константу currentDate под именем date
 
// экспортируем функцию
exports.printMessage = function (name){
    const hour = currentDate.getHours();
    if(hour >= 16)
        console.log("Добрый вечер,", name);
    else if(hour > 10)
        console.log("Добрый день,", name);
    else
        console.log("Доброе утро,", name);
}