const { stdin } = process;
stdin.setEncoding(`utf8`);

const _FLAGS = ['-d', '-f'];

main();

// console.log(`завершение программы`);

// ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ
// ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ
// ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ ФУНКЦИИ
async function main() {
  console.log(`Программа возвращает путь к папке, если она запущена с флагом: -d,
        или путь к файлу, если она запущена с флагом: -f`);

  let args = process.argv.slice(2);
  console.log(`args`, args);

  // нет флагов при запуске программы
  // напр. node fs1.js -f -d
  if (!checkArgsCLI(args)) {
    // ввести флаги в консоль
    args = await getArgsCLI();
  }

  getInfo(args);
}

async function getArgsCLI() {
  let args = await inputData('Сообщение!');
  args = args.trim().split(' ');
  // нет флагов при запуске программы
  // напр. node fs1.js -f -d
  if (!checkArgsCLI(args)) {
    // ввести флаги в консоль
    args = await getArgsCLI();
  }
  return args;
}

// ввод данных
function inputData(message = false) {
  return new Promise((resolve) => {
    if (message) {
      console.log(message);
    }

    stdin.resume();

    const fnOnData = (data) => {
      resolve(data);
      stdin.pause();
      // console.log('начало stdOff');
      stdin.off('data', fnOnData);
    };
    console.log('введите флаг или флаги через пробел');
    stdin.on('data', fnOnData);
  });
}

function checkArgsCLI(args = []) {
  console.log(`Вы ввели флаги:`, args);

  if (checkFlags(args)) {
    return true;
  }

  console.log(`         
                   Данные введены неверно!
        
                    Введите необходимый флаг: 
                    -d -путь к папке
                    -f -путь к файлу
        
                    `);
  return false;
}

function checkFlags(args) {
  let isCheck = true;

  if (args.length === 0) {
    isCheck = false;
    return isCheck;
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.length !== 2) {
      isCheck = false;
      break;
    }

    if (!_FLAGS.includes(arg)) {
      isCheck = false;
      return isCheck;
    }
  }

  return isCheck;
}

function getInfo(args) {
  for (const arg of args) {
    switch (arg) {
      case '-d': {
        console.log(`Путь к директории:`);
        console.log(__dirname);
        break;
      }
      case '-f': {
        console.log(`Путь к файлу:`);
        console.log(__filename);
        break;
      }

      default:
        console.log(`Введен неверный флаг`);
        break;
    }
  }
}
