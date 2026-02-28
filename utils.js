// export default;

const fs = require('fs');
const { stdin } = process;
stdin.setEncoding('utf8');
exports.checkFile = checkFile;
exports.appendFile = appendFile;
exports.writeFile = writeFile;
exports.isCheckComands = isCheckComands;
exports.cliIn = cliIn;
exports.getInput = getInput;
exports.createNote = createNote;

//Проверка на наличие файла по пути
function checkFile(pathFile) {
  return new Promise((resolve, reject) => {
    try {
      fs.access(pathFile, fs.constants.F_OK, (err) => {
        if (err) {
          console.log('Файла не существует:', pathFile);
          resolve(false);
          return;
        }
        console.log('Файл существует:', pathFile);
        resolve(true);
      });
    } catch (error) {
      console.log(`
            Ошибка в function checkFile(pathFile).
            Передан путь к файлу: ${pathFile}
            error: ${error}
            `);
      reject('Ошибка function checkFile(pathFile) Секция reject');
    }
  });
}

// добавить заметку в файл
function appendFile(pathFile, title, content) {
  return new Promise((resolve, reject) => {
    try {
      const notes = { title, content };
      const json = JSON.stringify(notes);
      fs.appendFile(
        pathFile,
        json,
        { encoding: 'utf8', mode: 0o666, flag: 'a' },
        (err) => {
          if (err) {
            throw new Error(
              `Ошибка при добавлении заметки: ${json} в файл ${pathFile}`
            );
          }
          console.log(`Заметка: ${json} успешно добавлена в файл ${pathFile}`);
          resolve(true);
        }
      );
    } catch (error) {
      console.log(`Ошибка в function appendFile(pathFile, title, content)`);
      console.log(`Параметры path: ${pathFile}`);
      console.log(error);
      reject(error);
    }
  });
}
// записать заметку в файл с нуля
function writeFile(pathFile, title, content) {
  return new Promise((resolve, reject) => {
    try {
      const notes = { title, content };
      const json = JSON.stringify(notes);
      fs.writeFile(pathFile, json, (err) => {
        if (err) {
          throw new Error(
            `Ошибка при добавлении заметки: ${json} в файл ${pathFile}`
          );
        }
        console.log(`Заметка: ${json} успешно добавлена в файл ${pathFile}`);
        resolve(true);
      });
    } catch (error) {
      console.log(`Ошибка в function writeFile(pathFile, title, content)`);
      console.log(`Параметры path: ${pathFile}`);
      console.log(error);
      reject(error);
    }
  });
}

// проверка введенных данных в консоль на соответсвие командам
function isCheckComands(COMANDS = [], inputData = '') {
  const masInputData = inputData.trim().split('#');

  console.log('isCheckComands(COMANDS::', COMANDS);
  console.log('masInputData[0]::', masInputData[0]);
  console.log('typeof COMANDS', typeof COMANDS);
  console.log('isArray COMANDS', Array.isArray(COMANDS));

  if (masInputData.length < 1) {
    return false;
  }
  if (!COMANDS.includes(masInputData[0])) {
    return false;
  }
  return true;
}

// ввод пользователя в консоль
function cliIn() {
  return new Promise((resolve, reject) => {
    try {
      stdin.resume();

      stdin.on('data', fnOnData);

      function fnOnData(consoleInput) {
        resolve(consoleInput);
        stdin.pause();
        stdin.off('data', fnOnData);
      }
    } catch (error) {
      console.log(`Ошибка в function cliIn()`);
      console.log(error);
      reject(error);
    }
  });
}

// разбор команды \ заголовка \ контента
function getInput(inputData) {
  const masInputData = inputData.trim().split('#');
  const analysisInput = { comand: '', title: '', content: '' };
  const countComands = masInputData.length;
  for (let i = 0; i < countComands; i++) {
    const input = masInputData[i];
    let stopFor = false;
    switch (i) {
      case 0:
        analysisInput.comand = input;
        break;
      case 1:
        analysisInput.title = input;
        break;
      case 2:
        analysisInput.content = input;
        break;

      default:
        console.log(
          `Введено больше 3 параметров, остальные параметры будут проигнорированы. `
        );
        stopFor = true;
        break;
    }
    if (stopFor) {
      break;
    }
  }
  return analysisInput;
}

// создать заметку
async function createNote(pathFile, title, content) {
  // проверим есть ли файл
  if (await checkFile(pathFile)) {
    // добавить заметку в файл
    await appendFile(pathFile, title, content);
  } else {
    // создать файл и добавить заметку
    console.log('Будет создан файл');

    await writeFile(pathFile, title, content);
  }
}
