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
exports.listNotes = listNotes;

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
function appendFile(pathFile, data, title, content) {
  return new Promise((resolve, reject) => {
    try {
      console.log('data');
      console.log(data);
      const index = data.length + 1;
      data.push({ index, title, content });
      const json = JSON.stringify(data);
      console.log('data из appendFile');
      console.log(data);
      console.log('json из appendFile');
      console.log(json);
      fs.writeFile(pathFile, json, (err) => {
        if (err) {
          console.log('Ошибка:', err);
        }
        console.log(
          'function appendFile: В файл успешно добавлена новая заметка'
        );
        resolve(json);
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
      const notes = [{ index: '1', title, content }];
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
  if (await checkFile(pathFile)) {
    // получить заметки из файла
    const data = await readFile(pathFile);

    console.log('// получить заметки из файла');
    console.log(data);

    // добавить заметку в файл
    await appendFile(pathFile, data, title, content);
  } else {
    // создать файл и добавить заметку
    console.log('Будет создан файл');

    await writeFile(pathFile, title, content);
  }
}

async function listNotes(pathFile) {
  // проверим есть ли файл
  if (await checkFile(pathFile)) {
    // вывести  заметки в консоль
    await readFile(pathFile);
  } else {
    console.log('Ошибка: Файл не найден!', pathFile);
  }
}

async function readFile(pathFile) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) {
          console.log('Ошибка чтения файла:', pathFile);
        }
        console.log(`Файл ${pathFile} успешно прочитан`);
        console.log('data = ', data);

        // if (data === '') {
        //   data = [];
        //   resolve(data);
        //   return;
        // }

        try {
          console.log(JSON.parse(data));
          resolve(JSON.parse(data));
        } catch (err) {
          console.log('Ошибка при чтении в файле', err);
          console.log('err.name', err.name);
          console.log('err.message', err.message);

          if (err.message.includes('Unexpected end of JSON input')) {
            console.log(
              'Неверный формат файла, либо записи не соответсвуют формату JSON [{...},{...}]'
            );
          }
          data = [];
          resolve(data);
        }
        // const notes = [];
        // notes.push(JSON.parse(data));
        // console.log('notes:\n', notes);
        // console.log(typeof notes);
      });
    } catch (error) {
      console.log(`Ошибка в function readFile(${pathFile})`);
      console.log(error);
      reject(error);
    }
  });
}
