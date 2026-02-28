const fs = require('fs');
const path = require('path');
const utils = require('./utils.js');

// Режимы работы программы
const COMANDS = require('./comands.js');

main();

async function main() {
  console.log(`
    Приветствие: приложение ToDo.
    - 1 or create - создает новую заметку в файле notes.json. create принимает два аргумента: заголовок заметки и её содержимое.
    - 2 or list отображает список заметок.
    - 3 or view выводит содержимое заметки, заголовок которой передается в качестве аргумента.
    - 4 or remove удаляет заметку, заголовок которой передается в качестве аргумента.
    - 5 or continue продолжить работу 
    - 6 or exit завершение работы
    `);

  console.log(`Введите команду:`);
  let inputData = await utils.cliIn();

  if (await utils.isCheckComands(COMANDS, inputData)) {
    console.log('Все норм');
  } else {
    console.log(' чтото не так');
  }
}
