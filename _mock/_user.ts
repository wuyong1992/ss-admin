import { MockRequest } from '@delon/mock';

const jobList = [];
const total = 50;

for (let i = 0; i < total; i += 1) {
  jobList.push({
    jobId: i + 1,
    enterpriseId: i + 1,
    enterpriseName: '企业名称' + (i + 1),
    jobTile: '招聘标题' + (i + 1),
    jobCategoryId: i + 1,
    jobCategoryName: '招聘分类'+(i + 1),
    recruitNum: '招聘人数'+(i + 1),
    timelinessType: '招聘有效期'+(i + 1),
    startTime: '开始时间'+(i + 1),
    endTime: '开始时间'+(i + 1),
    payPeriodType: i + 1,
    salary: i + 1,
    workTime:"工作时间段",
    workAddress:"工作地点",
    jobDetail:"工作描述",
    browseNum: i + 1,
    baseBrowseNum: i + 10,
    applyNum: i + 1,
    baseApplyNum: i + 10,
    sort: i,
    status: Math.floor(Math.random() * 10) % 4,
    statusReason:"状态原因",
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}



const list = [];

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function genData(params: any) {
  let ret = [...list];
  const pi = +params.pi,
    ps = +params.ps,
    start = (pi - 1) * ps;

  if (params.no) {
    ret = ret.filter(data => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function saveData(id: number, value: any) {
  const item = list.find(w => w.id === id);
  if (!item) return { msg: '无效用户信息' };
  Object.assign(item, value);
  return { msg: 'ok' };
}


function getJobList(queryString: any) {
  console.log('query');
}

export const USERS = {
  '/user': (req: MockRequest) => genData(req.queryString),
  'GET /job/list': (req: MockRequest) => getJobList(req.queryString),
  '/user/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /user/:id': (req: MockRequest) => saveData(+req.params.id, req.body),
};
