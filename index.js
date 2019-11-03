const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const path = require('path');

const transport = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secure: true,
  auth: {
    user: 'keanuoleung@qq.com',
    pass: 'ftmoqpxjixwrbicf',
  },
});

let date = new Date();
date = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

const Analyzer = require('./Analyzer');

const constitution = new Analyzer.Constitution();
const nonConstitution = new Analyzer.NonConstitution();

const run = async () => {
  let a = await constitution.result();
  let b = await nonConstitution.result();
  const mailOptions = {
    from: 'keanuoleung@qq.com',
    to:
      'machao8396@163.com,mathdou@163.com,talia215@126.com,hsdliumingji@126.com',
    cc: '464509369@qq.com',
    attachments: [
      {
        filename: '实地调研单位.xlsx',
        path: path.resolve(__dirname, 'Output/实地调研单位.xlsx'),
      },
      {
        filename: '重点调研单位.xlsx',
        path: path.resolve(__dirname, 'Output/重点调研单位.xlsx'),
      },
    ],
    subject: `🍺单位填报情况 ${date}`,
    html: `<b>体制内填报情况 未暂存 ${a.noThisId}家 已暂存 ${a.confirmedIsFalse}家 已提交 ${a.confirmedIsTrue}家</b>
    <b>实地调研单位 未暂存 ${b[0].unstore}家 已暂存 ${b[0].store}家 已提交 ${b[0].submit}家</b>
    <b>重点调研单位 未暂存 ${b[1].unstore}家 已暂存 ${b[1].store}家 已提交 ${b[1].submit}家</b>`,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  console.log(a, b);
};

run();

const startSchedule = () => {
  schedule.scheduleJob('30 1 1 * * *', () => {
    run();
  });
};

startSchedule();
