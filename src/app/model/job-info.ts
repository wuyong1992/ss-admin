export class JobInfo {
  jobId: number;
  enterpriseId: number;
  jobTitle: string;
  jobCategoryId: number;
  recruitNum: number;
  timelinessType: number;
  startTime: Date;
  endTime: Date;
  payPeriodType: number;
  salary: number;
  workTime: string;
  workAddress: string;
  jobDetail: string;
  browseNum: number;
  baseBrowseNum: number;
  applyNum: number;
  baseApplyNum: number;
  sort: number = 0;
  status: number = 1;
  statusReason;
  createTime: Date;
  updateTime: Date;


  // timeliness: any[];
}
