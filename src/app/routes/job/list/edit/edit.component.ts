import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { EnterpriseService } from '@core/service/enterprise.service';
import { JobService } from '@core/service/job.service';
import { JobInfo } from '../../../../model/job-info';

@Component({
  selector: 'job-list-edit',
  templateUrl: './edit.component.html',
})
export class JobListEditComponent implements OnInit {


  @Input() jobInfo = new JobInfo();
  loading: false;

  jobSchema: SFSchema = {
    properties: {
      enterpriseId: {
        type: 'number',
        title: '所属企业',
        ui: {
          widget: 'select',
          asyncData: () => this.enterpriseService.getSimpleInfoEnum(),
        },
      },
      jobTitle: {
        type: 'string',
        title: '招聘标题',
        maxLength: 15,
      },
      jobCategoryId: {
        type: 'number',
        title: '所属分类',
        ui: {
          widget: 'select',
          asyncData: () => this.jobService.getJobCategoryEnum(),
        },
      },
      recruitNum: {
        type: 'number',
        title: '招聘人数',
        minimum: 1,
        maximum: 999,
      },
      timelinessType: {
        type: 'number',
        title: '招聘有效期',
        enum: [
          { label: '短期', value: 1 },
          { label: '长期', value: 2 },
        ],
        ui: {
          widget: 'radio',
        },
      },
      timeliness: {
        type: 'string',
        ui: {
          widget: 'date',
          mode: 'range',
        }
      },
      payPeriodType: {
        type: 'number',
        title: '结算周期',
        enum: [
          { label: '小时', value: 4 },
          { label: '日结', value: 1 },
          { label: '周结', value: 2 },
          { label: '月结', value: 3 },
        ],
        ui: {
          widget: 'radio',
        },
      },
      salary: {
        type: 'number',
        title: '薪资',
      },
      workTime: {
        type: 'string',
        title: '工作时间',
        ui: {
          widget: 'textarea',
        },
      },
      workAddress: {
        type: 'string',
        title: '工作地点',
        ui: {
          widget: 'textarea',
        },
      },
      jobDetail: {
        type: 'string',
        title: '工作详情',
        ui: {
          widget: 'textarea',
        },
      },
      baseBrowseNum: {
        type: 'number',
        title: '设置浏览基数',
      },
      baseApplyNum: {
        type: 'number',
        title: '设置申请基数',
      },
      sort: {
        type: 'number',
        title: '排序字段，越大越靠前',
      },
      status: {
        type: 'number',
        title: '状态',
        enum: [
          { label: '待审核', value: 1 },
          { label: '审核通过', value: 2 },
          { label: '审核未通过', value: 3 },
          { label: '隐藏', value: 4 },
        ],
        ui: {
          widget: 'radio',
        },
      },
    },
    required: ['enterpriseId', 'jobTitle', 'jobCategoryId', 'recruitNum', 'timelinessType', 'timeliness',
      'payPeriodType', 'salary', 'workTime', 'workAddress', 'jobDetail', 'baseBrowseNum', 'baseApplyNum', 'sort', 'status'],
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private enterpriseService: EnterpriseService,
    private jobService: JobService,
  ) {
  }

  ngOnInit(): void {
  }

  save(value: any) {
    this.copyValue(value);
    console.log('job info :', this.jobInfo);
    this.jobService.saveJob(this.jobInfo).subscribe(
      res =>{
        if (res.code == 0) {
          this.msgSrv.success(res.msg);
          this.modal.close(true);
        }
      }
    );
  }

  close() {
    this.modal.destroy();
  }

  copyValue(value: any) {
    this.jobInfo.jobTitle = value.jobTitle;
    this.jobInfo.jobCategoryId = value.jobCategoryId;
    this.jobInfo.baseApplyNum = value.baseApplyNum;
    this.jobInfo.baseBrowseNum = value.baseBrowseNum;
    this.jobInfo.startTime = new Date(value.timeliness[0]);
    this.jobInfo.endTime = new Date(value.timeliness[1]);
    this.jobInfo.timelinessType = value.timelinessType;
    this.jobInfo.enterpriseId = value.enterpriseId;
    this.jobInfo.jobDetail = value.jobDetail;
    this.jobInfo.payPeriodType = value.payPeriodType;
    this.jobInfo.recruitNum = value.recruitNum;
    this.jobInfo.salary = value.salary;
    this.jobInfo.workTime = value.workTime;
    this.jobInfo.workAddress = value.workAddress;
    this.jobInfo.sort = value.sort;
    this.jobInfo.status = value.status;
  }
}
