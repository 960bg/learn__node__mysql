const {stdin, stdout}  = process;

stdin.setEncoding('utf8')

stdout.write(`\nВаш ввод, пожалуйста `);

stdin.on('data', (t)=> {
    stdout.write(t+'\n')

const tab = Array.from(t).reverse().join('');
// const tab = t.toString();
// .from(t).reverse().join('');
    stdout.write(`это таб ${tab} \n`)

    // process.exit()

    // stdin.destroy();
    // stdin.pause();

})


stdout.write("What is your name?\n");
stdin.on("data", (data) => {
  const name = data.toString();
  const reverseName = name.split("").reverse().join("");
  stdout.write(`\nYour name in reverse is ${reverseName}`);
//   process.exit();
    // stdin.pause();

});

process.on('SIGINT',()=>{
    stdout.write('Получен сигнал выхода.')
    process.exit();
})

process.on('exit', (code)=>{
    if (code === 0 ){
        stdout.write('Завершение работы выполнено успешно.');
    }else{
        stdout.write('Ошибка! Завершение работы выполнено с ошибкой.');
    }
})