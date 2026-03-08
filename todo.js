const path = require('path');
const utils = require('./utils.js');
const NAME_FILE = 'notes.json';
const pathFile = path.resolve(__dirname, NAME_FILE);

// Режимы работы программы
const { COMANDS } = require('./comands.js');

main();

async function main() {
  try {
    console.log(`
          -----------------------------------------------------------------------------------------------------------------------------------
          |  приложение ToDo.                                                                                                               |
          |  Доступные команды:                                                                                                             |
          |  - 1 or create - создает новую заметку в файле notes.json.                                                                      |
          |         create принимает два аргумента через символ #: заголовок заметки и её содержимое.                                       |
          |  - 2 or list отображает список заметок.                                                                                         |
          |  - 3 or view выводит содержимое заметки, заголовок которой передается в качестве аргумента.                                     |  
          |  - 4 or remove удаляет заметку, заголовок которой передается в качестве аргумента.                                              |
          |  - 5 or continue продолжить работу                                                                                              |
          |  - 6 or exit завершение работы                                                                                                  |
          |                                                                                                                                 |
          |          Пример создания заметки:                                                                                               |
          |            1#Заголовок Заметки#Текст Заметки                                                                                    |
          |                      или                                                                                                        |
          |            create#Заголовок Заметки#Текст Заметки                                                                               |
          -----------------------------------------------------------------------------------------------------------------------------------
    `);

    console.log(`Введите команду:`);
    let inputData = await utils.userInput();

    // проверка ввода
    if (!(await utils.isCheckComands(COMANDS, inputData))) {
      console.log('Не удалось распозназнать команду. Проверьте ввод');
      return await main();
    }

    // разбор команд
    const input = utils.getInput(inputData);

    switch (input.comand) {
      case '1':
        console.log();
        console.log();
        await utils.createNote(pathFile, input.title, input.content);
        console.log();
        console.log();
        await qustionContinue();
        console.log();
        console.log();
        break;

      case 'create':
        console.log();
        console.log();
        await utils.createNote(pathFile, input.title, input.content);
        console.log();
        console.log();
        await qustionContinue();
        console.log();
        console.log();
        break;

      case '2':
        console.log();
        console.log();
        await utils.listNotes(pathFile);
        console.log();
        console.log();
        await qustionContinue();
        console.log();
        console.log();
        break;

      case 'list':
        console.log();
        console.log();
        await utils.listNotes(pathFile);
        console.log();
        console.log();
        await qustionContinue();
        console.log();
        console.log();
        break;

      case '3':
        console.log();
        console.log();
        await utils.viewNote(pathFile);
        console.log();
        console.log();
        await qustionContinue();
        console.log();
        console.log();
        break;

      case 'view':
        console.log();
        console.log();
        await utils.viewNote(pathFile, input.title);
        console.log();
        console.log();
        await qustionContinue();
        console.log();
        console.log();
        break;

      case '4':
        console.log();
        console.log();
        await utils.removeNote(pathFile, input.title);
        console.log();
        console.log();
        await qustionContinue();
        console.log();
        console.log();
        break;

      case 'remove':
        console.log();
        console.log();
        await utils.removeNote(pathFile, input.title);
        console.log();
        console.log();
        await qustionContinue();
        console.log();
        console.log();
        break;

      case '5':
        console.log();
        console.log();
        await main();

        break;

      case 'continue':
        console.log();
        console.log();
        await main();
        break;

      case '6':
        utils.closeApp();
        console.log();
        console.log();
        break;

      case 'exit':
        utils.closeApp();
        console.log();
        console.log();
        break;

      default:
        console.log(`Неверный ввод. повторите ввод`);
        await qustionContinue();
        console.log();
        console.log();
        break;
    }
  } catch (error) {
    console.log('============================= error:');
    console.log(error);
    console.log();
    console.log();
    utils.closeApp();
  }
}

async function qustionContinue() {
  if (await utils.isContinueApp()) {
    await main();
  } else {
    utils.closeApp();
  }
}
