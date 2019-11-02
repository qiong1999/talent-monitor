const { Models, Schemas } = require('../Db');
async function test() {
  let temp1 = await Models.quesUnitUser.find(
    { _user_code: /(?!33|44|55)^.*$/ },
    '_id _company_name _user_code'
  );
  let result = {
    noThisId: 0,
    confirmedIsTrue: 0,
    confirmedIsFalse: 0,
  };
  let i = 0;
  for (let curId of temp1) {
    console.log(`${i++}/${temp1.length}`);
    let curForm = await Models.quesUnitForm.findOne(
      { _from_user: curId._id },
      '_confirmed'
    );
    if (!curForm) {
      result.noThisId += 1;
    } else if (curForm._confirmed === true) {
      result.confirmedIsTrue += 1;
    } else if (curForm._confirmed === false) {
      result.confirmedIsFalse += 1;
    }
  }
  console.log(result);
}
test();
