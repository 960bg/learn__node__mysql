const fs = require('fs');
const path = require('path');
const utils = require('./utils.js');
const NAME_FILE = 'notes.txt';

// Режимы работы программы
const { COMANDS } = require('./comands.js');

main();

async function main() {
  try {
    console.log(`
    Приветствие: приложение ToDo.
    Доступные команды:
    - 1 or create - создает новую заметку в файле notes.json. create принимает два аргумента: заголовок заметки и её содержимое.
    - 2 or list отображает список заметок.
    - 3 or view выводит содержимое заметки, заголовок которой передается в качестве аргумента.
    - 4 or remove удаляет заметку, заголовок которой передается в качестве аргумента.
    - 5 or continue продолжить работу 
    - 6 or exit завершение работы

            Пример создания заметки:
              1#Заголовок Заметки#Текст Заметки
                         или
              create#Заголовок Заметки#Текст Заметки
    `);

    console.log(`Введите команду:`);
    let inputData = await utils.cliIn();

    // проверка ввода
    if (await utils.isCheckComands(COMANDS, inputData)) {
      console.log('Все норм');
    } else {
      console.log(' чтото не так');
    }

    // разбор команд
    const input = utils.getInput(inputData);
    const pathFile = path.resolve(__dirname, NAME_FILE);
    switch (input.comand) {
      case '1':
        await utils.createNote(pathFile, input.title, input.content);
        break;
      case 'create':
        await utils.createNote(pathFile, input.title, input.content);
        break;
      case '2':
        await utils.listNotes(pathFile);
        break;
      case 'list':
        await utils.listNotes(pathFile);
        break;
      case '3':
        await utils.viewtNote(pathFile, input.title);
        break;
      case 'view':
        await utils.viewNote(pathFile, input.title);
        break;
      case '4':
        await utils.removeNote(pathFile, input.title);
        break;
      case 'remove':
        await utils.removeNote(pathFile, input.title);
        break;
      case '5':
        await main();
        break;
      case 'continue':
        await main();
        break;
      case '6':
        console.log('Завершение работы');
        process.exit(0);
        break;
      case 'exit':
        console.log('Завершение работы');
        process.exit(0);
        break;

      default:
        console.log(`Неверный ввод. повторите ввод`);
        await main();
        break;
    }
  } catch (error) {
    console.log('============================= error:');
    console.log(error);

    process.exit(0);
  }
}
