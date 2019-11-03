const xlsx = require('node-xlsx').default;
const fs = require('fs');
const { Models, Schemas } = require('../Db');
class NonConstitution {
  constructor() {
    this.analyzer = [];
  }
  async run(filename, subscript1, subscript2) {
    const workSheetsFromFile = xlsx.parse(`./Res/${filename}.xlsx`);
    let i = 0;
    let unstore = 0;
    let store = 0;
    let submit = 0;
    for (
      let rowIndex = -1, row = null;
      (row = workSheetsFromFile[0].data[++rowIndex]);
      rowIndex <= workSheetsFromFile[0].data.length
    ) {
      console.log(`${i++}/${workSheetsFromFile[0].data.length}`);

      if (!rowIndex) {
        continue;
      }
      let temp1 = await Models.quesUnitUser.findOne(
        { _user_code: row[subscript1].toString() },
        '_id'
      );

      let temp2 = temp1
        ? await Models.quesUnitForm.findOne(
            { _from_user: temp1._id },
            '_confirmed'
          )
        : null;
      if (!temp2) {
        row[subscript2] = '未暂存';
        unstore += 1;
      } else if (!temp2._confirmed) {
        row[subscript2] = '已暂存';
        store += 1;
      } else if (temp2._confirmed) {
        row[subscript2] = '已提交';
        submit += 1;
      }
    }

    workSheetsFromFile[0].data.unshift(['未暂存', unstore]);
    workSheetsFromFile[0].data.unshift(['已暂存', store]);
    workSheetsFromFile[0].data.unshift(['已提交', submit]);
    const buffer = xlsx.build(workSheetsFromFile);
    fs.writeFileSync(`./Output/${filename}.xlsx`, buffer);
    return {
      filename,
      unstore,
      store,
      submit,
    };
  }
  async result() {
    let a = await this.run('实地调研单位', 5, 7);
    let b = await this.run('重点调研单位', 3, 5);
    this.analyzer.push(a, b);
    return this.analyzer;
  }
}

module.exports = NonConstitution;
