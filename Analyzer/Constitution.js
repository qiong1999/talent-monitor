const { Models, Schemas } = require('../Db');

class Constitution {
  constructor() {
    this.noThisId = 0;
    this.confirmedIsTrue = 0;
    this.confirmedIsFalse = 0;
  }

  async run() {
    let temp1 = await Models.quesUnitUser.find(
      { _user_code: /(?!33|44|55)^.*$/ },
      '_id _company_name _user_code'
    );
    
    let i = 0;
    for (let curId of temp1) {
      console.log(`${i++}/${temp1.length}`);
      let curForm = await Models.quesUnitForm.findOne(
        { _from_user: curId._id },
        '_confirmed'
      );
      if (!curForm) {
        this.noThisId += 1;
      } else if (curForm._confirmed === true) {
        this.confirmedIsTrue += 1;
      } else if (curForm._confirmed === false) {
        this.confirmedIsFalse += 1;
      }
    }
  }

  async result() {
    await this.run();
    return {
      noThisId: this.noThisId,
      confirmedIsFalse: this.confirmedIsFalse,
      confirmedIsTrue: this.confirmedIsTrue,
    }
  }
}
module.exports = Constitution;