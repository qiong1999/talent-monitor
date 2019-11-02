const {Models, Schemas} = require('../Db');
async function test () {
let temp = await Models.quesUnitUser.find({_user_code: /(?!33|44|55)^.*$/});
console.log(temp);
}
test();