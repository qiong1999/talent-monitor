const xlsx = require('node-xlsx').default;
const fs = require('fs');
const { Models, Schemas } = require('./Db');
const workSheetsFromFile = xlsx.parse('./Res/实地调研单位.xlsx');

async function test() {
  for (
    let rowIndex = -1, row = null;
    (row = workSheetsFromFile[0].data[++rowIndex]);
    rowIndex <= workSheetsFromFile[0].data.length
  ) {
    if (!rowIndex) {
      continue;
    }
    row[7] = '状态';
    let temp = await Models.quesUnitUser.findOne(
      { _user_code: row[5].toString() },
      '_id'
    );
    console.log(temp);
  }
  
}
test();
const buffer = xlsx.build(workSheetsFromFile);
fs.writeFileSync('./Res/output.xlsx', buffer);
