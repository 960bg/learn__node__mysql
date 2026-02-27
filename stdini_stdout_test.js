const { stdin } = process;
stdin.setEncoding('utf8');

function read() {
  console.log('Введите чтонить');
  return new Promise((resolve, reject) => {
    try {
      stdin.on('data', (data) => {
        data = data.trim();
        if (data === '1') {
          console.log('data:', data);
          resolve(data);
          stdin.pause();
          console.log('после resolve()');

          // return data;
        } else {
          console.log('Введите снова');
          resolve(data);
          console.log('после resolve() 2');

          stdin.pause();
        }
      });
    } catch (error) {
      console.log('error:', error);

      reject('Bad response');
    }
  });
}

async function main() {
  const b = await read();
  console.log('read() == ', b);
  if (b !== '1') {
    console.log('Секция: if (b !== "1")');
    stdin.resume();
    return await main();
  }
  console.log('main END');
}

main();
console.log('END');
