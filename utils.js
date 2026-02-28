// export default;

const fs = require('fs');
const { stdin } = process;
stdin.setEncoding('utf8');
exports.checkFile = checkFile;
exports.appendFile = appendFile;
exports.writeFile = writeFile;
exports.isCheckComands = isCheckComands;
exports.cliIn = cliIn;

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
function isCheckComands(COMANDS, inputData) {
  const masInputData = inputData.trim().split(' ');

  console.log('isCheckComands(COMANDS::', COMANDS);

  if (masInputData.length < 2) {
    return false;
  }
  if (!Object.hasOwn(COMANDS, masInputData[0])) {
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

      function fnOnData(data) {
        resolve(data);
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
