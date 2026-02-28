const { checkFile, appendFile, writeFile } = require('./utils.js');
// const fs = require('fs');

// Режимы работы программы
const COMANDS = {
  1: createNote,
  create: createNote,
  //   2: listNote(pathFile),
  //   list: listNotes(pathFile),
  //   3: viewNotes(pathFile, headNote),
  //   view: viewNotes(pathFile, headNote),
  //   4: removeNotes(pathFile, headNote),
  //   remove: removeNotes(pathFile, headNote),
  //   5: continueWork(),
  //   continue: continueWork(),
  //   6: exitWork(),
  //   exit: exitWork(),
};

async function createNote(pathFile, title, content) {
  // проверим есть ли файл
  if (await checkFile(pathFile)) {
    // добавить заметку в файл
    await appendFile(pathFile, title, content);
  } else {
    // создать файл и добавить заметку
    await writeFile(pathFile, title, content);
  }
}
// EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT EXPORT
module.exports = COMANDS;
