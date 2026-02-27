// console.log(process.argv);
// console.log(process.env);

const {stdin} = process;

stdin.setEncoding('utf8');
console.log('введите два числа через пробел');

let a;
let b;
let res;
let oper;

stdin.on('data', (mas)=>{
    [a,b] = mas.split(' ');
    console.log('Первое число: '+a);
    console.log('Второе число: '+b);
   
    const param = getFlagValue('-m') || getFlagValue('-s');
            console.log('Значение параметра = ' + param);
    
    switch (param) {
        case '-m':
            res=a*b;
            oper='*';
            break;
        case '-s':
            res=(+a)+(+b);
            oper='+';

            break;
    
        default:
            console.log('Значение параметра не установлено.');
        break;
    }

    console.log(`Результат ${a} ${oper} ${b} = ${res}` );
    process.exit(0);
})



function getFlagValue(flag){
    const i = process.argv.indexOf(flag);
console.log('flag', flag);
console.log('i', i);

    if ( i === -1){
        // console.log('Значение параметра не установлено.');
    return false;
    } 

    return flag;
}

