const fs = require('fs');
const path = require('path');
const utils = require('./utils.js');

main();

async function main() {
  console.log(`
    Приветствие: приложение ToDo.
    - create - создает новую заметку в файле notes.json. create принимает два аргумента: заголовок заметки и её содержимое.
    - list отображает список заметок.
    - view выводит содержимое заметки, заголовок которой передается в качестве аргумента.
    - remove удаляет заметку, заголовок которой передается в качестве аргумента.
    `);
}
