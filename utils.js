// export default;

const fs = require('fs');
const { stdin } = process;
stdin.setEncoding('utf8');

exports.checkFile = checkFile;
exports.addNoteFile = addNoteFile;
// exports.writeFile = writeFile;
exports.isCheckComands = isCheckComands;
exports.getInput = getInput;
exports.createNote = createNote;
exports.listNotes = listNotes;
exports.closeApp = closeApp;
exports.isContinueApp = isContinueApp;
exports.userInput = userInput;
exports.viewNote = viewNote;
exports.removeNote = removeNote;

// удаление заметки
async function removeNote(pathFile) {
  console.log(`введите номер заметки для удаления или 0 или cancel для отмены`);
  let noteNumber = (await userInput()).trim();
  if (noteNumber === '0' || noteNumber === 'cancel') {
    return;
  }

  if (isNaN(noteNumber)) {
    console.log(`Вы ввели неверный номер заметки`);
    return;
  }
  noteNumber = Number(noteNumber);

  // проверка на наличие файла
  if (!checkFile(pathFile)) {
    console.log(
      `Файл ${pathFile} не найден. Возможно вы еще не создали заметок`
    );
    return;
  }

  // прочитать заметки из файла
  const notes = JSON.parse(await readFile(pathFile));
  // найти заметку для удаления
  const noteForDelete = notes.filter((note) => note.index === noteNumber);
  // сформировать новый массив заметок без удаленной заметки
  const notesForSave = notes.filter((note) => note.index !== noteNumber);

  if (noteForDelete.length === 0) {
    console.log(`Заметка для удаления с номером ${noteNumber} не найдена`);
    return;
  }

  // перезапишем файл заметок без удаленной заметки
  const doneWriting = await writeArrayNotesToFile(
    pathFile,
    JSON.stringify(notesForSave)
  );
  // вывод заметки в консоль
  console.log(`Заметка удалена:`);
  console.log(noteForDelete);
  // вывод содержимого файла в консоль
  console.log(`Содержимого файла :`);
  console.log(JSON.parse(doneWriting));
}

// просмотр заметки по номеру
async function viewNote(pathFile) {
  console.log(`введите номер заметки для вывода`);

  let noteNumber = (await userInput()).trim();
  if (isNaN(noteNumber)) {
    console.log(`Вы ввели неверный номер заметки`);
    return;
  }

  noteNumber = Number(noteNumber);
  // проверка на наличие файла
  if (!checkFile(pathFile)) {
    console.log(
      `Файл ${pathFile} не найден. Возможно вы еще не создали заметок`
    );
    return;
  }

  const notes = JSON.parse(await readFile(pathFile));
  const note = notes.filter((note) => note.index === noteNumber);

  if (note.length === 0) {
    console.log(`Заметка с номером ${noteNumber} не найдена`);
    return;
  }

  // вывод заметки в консоль
  console.log(`Заметка:`);
  console.log(note);
}

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

// запись в файл
function writeArrayNotesToFile(pathFile, arrayJsonString) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(pathFile, arrayJsonString, (err) => {
        if (err) {
          console.log('Ошибка:', err);
        }
        resolve(arrayJsonString);
        console.log('Файл записан');
      });
    } catch (error) {
      console.log(
        `Ошибка в function writeArrayNotesToFile(pathFile, title, content)`
      );
      console.log(`Параметры path: ${pathFile}`);
      console.log(error);
      reject(error);
    }
  });
}

// добавить заметку в файл
async function addNoteFile(pathFile, arrayNotesJSON, title, content) {
  // добавим порядковый номер заметки
  const index = arrayNotesJSON.length + 1;
  // добавим дату заметки
  const date = getDateNow();
  // сформируем заметку
  const note = { index, date, title, content };
  arrayNotesJSON.push(note);
  const arrayNotesString = JSON.stringify(arrayNotesJSON);
  await writeArrayNotesToFile(pathFile, arrayNotesString);
  console.log('Запись в файл прошла успешно');
  console.log('Ваша заметка добавлена: ', note);
  console.log();
  // console.log('Содержимое файла');
  // console.log(JSON.parse(doneWriting));
}

// проверка введенных данных в консоль на соответсвие командам
function isCheckComands(COMANDS = [], inputData = '') {
  const masInputData = inputData.trim();
  // const masInputData = inputData.trim().split('#');

  if (masInputData.length !== 1) {
    return false;
  }
  if (!COMANDS.includes(masInputData)) {
    return false;
  }
  // if (!COMANDS.includes(masInputData[0])) {
  //   return false;
  // }
  return true;
}

// разбор команды \ заголовка \ контента
function getInput(inputData) {
  // разбираем введенную строку на массив с командами
  // 0 эл-т - это команда создания заметки\вывода заметок\просмотра конкретной заметки\удаления\продолжить\выхода
  // const masInputData = inputData.trim().split('#');

  const masInputData = inputData.trim();
  const analysisInput = { comand: masInputData };

  // const analysisInput = { comand: '', title: '', content: '' };
  // const countComands = masInputData.length;

  // for (let i = 0; i < countComands; i++) {
  //   const input = masInputData[i];
  //   let stopFor = false;
  //   switch (i) {
  //     case 0:
  //       analysisInput.comand = input;
  //       break;
  //     case 1:
  //       analysisInput.title = input;
  //       break;
  //     case 2:
  //       analysisInput.content = input;
  //       break;

  //     default:
  //       console.log(
  //         `Введено больше 3 параметров, остальные параметры будут проигнорированы. `
  //       );
  //       stopFor = true;
  //       break;
  //   }
  //   if (stopFor) {
  //     break;
  //   }
  // }
  return analysisInput;
}

// создать заметку
async function createNote(pathFile) {
  // async function createNote(pathFile, title, content) {

  // если выбрано добавление заметки \команда 1\ тогда запросить ввести заголовок и текст заметки
  console.log('Ввдите заголовок');
  const title = (await userInput()).trim();
  console.log('Ввдите текст заметки');
  const content = (await userInput()).trim();

  if (title === '') {
    console.log('Не введен заголовок заметки');
    return;
  }
  if (content === '') {
    console.log('Не введен текст заметки');
    return;
  }

  // проверим есть ли файл
  if (!(await checkFile(pathFile))) {
    // создать новый файл и добавить заметку
    console.log('Будет создан файл ', pathFile);
    return await addNoteFile(pathFile, [], title, content);
  }

  // получить заметки из файла
  // console.log('// получить заметки из файла');
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
  await addNoteFile(pathFile, jsonData, title, content);
}

// вывести список заметок по введенному номеру заметки
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

function readFile(pathFile) {
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
    // пробуем парсить в JSON
    JSON.parse(data);

    return true;
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
function userInput() {
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
  const input = await userInput();
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
