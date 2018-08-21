export class JobVO {
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
  sort: number;
  status: number;
  statusReason;
  createTime: Date;
  updateTime: Date;

  userApplyStatus: number;
  enterpriseName: string;
  jobCategoryName: string;

}
