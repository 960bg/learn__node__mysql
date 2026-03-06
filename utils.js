// export default;

const fs = require('fs');
const { stdin } = process;
stdin.setEncoding('utf8');

exports.checkFile = checkFile;
exports.appendFile = appendFile;
exports.writeFile = writeFile;
exports.isCheckComands = isCheckComands;
exports.getInput = getInput;
exports.createNote = createNote;
exports.listNotes = listNotes;
exports.closeApp = closeApp;
exports.isContinueApp = isContinueApp;
exports.inputCli = inputCli;

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
function appendFile(pathFile, data, title, content) {
  return new Promise((resolve, reject) => {
    try {
      // добавим порядковый номер заметки
      const index = data.length + 1;
      const date = getDateNow();
      const note = { index, date, title, content };
      data.push(note);
      const json = JSON.stringify(data);

      fs.writeFile(pathFile, json, (err) => {
        if (err) {
          console.log('Ошибка:', err);
        }
        resolve(json);
        console.log('Заметка добавлена:');
        console.log(note);
        console.log('Ваши заметки: ');
        console.log(data);
      });
      // fs.appendFile(
      //   pathFile,
      //   json,
      //   { encoding: 'utf8', mode: 0o666, flag: 'a' },
      //   (err) => {
      //     if (err) {
      //       throw new Error(
      //         `Ошибка при добавлении заметки: ${json} в файл ${pathFile}`
      //       );
      //     }
      //     console.log(`Заметка: ${json} успешно добавлена в файл ${pathFile}`);
      //     resolve(true);
      //   }
      // );
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
      const index = 1;
      const date = getDateNow();
      const note = [{ index, date, title, content }];
      const json = JSON.stringify(note);
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

  if (masInputData.length < 1) {
    return false;
  }
  if (!COMANDS.includes(masInputData[0])) {
    return false;
  }
  return true;
}

// разбор команды \ заголовка \ контента
function getInput(inputData) {
  // разбираем введенную строку на массив с командами
  // 0 эл-т - это команда создания заметки\вывода заметок\просмотра конкретной заметки\удаления\продолжить\выхода
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
  if (!(await checkFile(pathFile))) {
    // создать новый файл и добавить заметку
    console.log('Будет создан файл ', pathFile);
    return await writeFile(pathFile, title, content);
  }

  // получить заметки из файла
  console.log('// получить заметки из файла');
  const data = await readFile(pathFile);
  let jsonData;

  // проверка пустой ли файл и на соответствие JSON
  if (isEmptyData(data)) {
    jsonData = [];
  } else {
    // проверить на соответствие JSON
    if (!isJSONData(data)) {
      return closeApp('Данные не соответствуют JSON. Возможно файл пуст.');
    }

    // разобрать данные в массив
    jsonData = JSON.parse(data);
  }
  // добавить заметку в файл
  await appendFile(pathFile, jsonData, title, content);
}

async function listNotes(pathFile) {
  // проверим есть ли файл
  if (!(await checkFile(pathFile))) {
    return closeApp(`Ошибка: Файл не найден!, ${pathFile}`);
  }

  // вывести  заметки в консоль
  const data = await readFile(pathFile);

  if (isEmptyData(data)) {
    return console.log('Заметок еще нет.');
  }

  // проверить на соответствие JSON
  if (!isJSONData(data)) {
    return closeApp('Данные не соответствуют JSON.');
  }

  console.log('Заметки из файла:');
  //ВЫВОД ЗАМЕТОК В КОНСОЛЬ
  console.log(JSON.parse(data));
}

async function readFile(pathFile) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) console.log('Ошибка чтения файла:', pathFile);

        resolve(data);
      });
    } catch (error) {
      console.log(`Ошибка в function readFile(${pathFile})`);
      console.log(error);
      reject(error);
    }
  });
}

// проверка на JSON данных из файла
function isJSONData(data) {
  try {
    const json = JSON.parse(data);
    // console.log(json);
    return json;
  } catch (err) {
    if (
      err.message.includes('Unexpected end of JSON input') ||
      err.message.includes('is not valid JSON')
    ) {
      console.log(
        'Неверный формат файла, либо записи в файле не соответсвуют формату JSON [{...},{...}]'
      );
      console.log('Данные из файла:');
      console.log('========= Начало файла =========');
      console.log(data);
      console.log('========= Конец  файла =========');
    } else {
      console.log('Ошибка при чтении в файле', err);
      console.log('err.name', err.name);
      console.log('err.message', err.message);
    }

    return false;
  }
}

// закрытие приложения
function closeApp(msg = 'no message') {
  if (msg !== 'no message') {
    console.log(msg);
  }
  console.log('Завершение работы');

  // stdin.end();
  process.exit(0);
}

function isEmptyData(data) {
  return data.trim() === '';
}

// ввод данных в консоль
function inputCli() {
  return new Promise((resolve, reject) => {
    function fnInputData(data) {
      stdin.pause();
      stdin.off('data', fnInputData);
      resolve(data);
    }

    try {
      stdin.resume();
      stdin.on('data', fnInputData);
    } catch (error) {
      reject(false);
      console.error(error);
      closeApp(error);
    }
  });
}

async function isContinueApp() {
  console.log('Продолжить выполение программы? y/n');
  const input = await inputCli();
  switch (input.trim()) {
    case 'yes':
    case 'y':
      console.log('ВВЕДЕНО ДА');
      return true;

    case 'n':
    case 'no':
    case 'not':
      console.log('ВВЕДЕНО НЕТ');
      return false;

    default:
      console.log('НЕВЕРНЫЙ ВВОД!');
      return await isContinueApp();
  }
}

function getDateNow() {
  const date = new Date();
  const day = zeroInFirst(date.getDate());
  const month = zeroInFirst(Number(date.getMonth()) + 1);
  const year = date.getFullYear();
  const hh = zeroInFirst(date.getHours());
  const mm = zeroInFirst(date.getMinutes());
  const ss = zeroInFirst(date.getSeconds());
  return `${day}:${month}:${year} -- ${hh}:${mm}:${ss}`;
}

function zeroInFirst(str) {
  if (Number(str) < 10) {
    return `0${str}`;
  }
  return str;
}
