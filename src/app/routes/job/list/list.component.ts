import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableButton, SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { JobListEditComponent } from './edit/edit.component';
import { JobService } from '@core/service/job.service';
import { JobInfo } from '../../../model/job-info';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '@env/environment';
import { SimpleTableFilter } from '../../../../../node_modules/@delon/abc/src/simple-table/interface';
import { EnterpriseService } from '@core/service/enterprise.service';

@Component({
  selector: 'job-list',
  templateUrl: './list.component.html'
})
export class JobListComponent implements OnInit {


  url = environment.URL_PREFIX + '/backend/job/list';
  searchSchema: SFSchema = {
    properties: {
      jobCategoryId: {
        type: 'string',
        title: '所属企业',
        ui: {
          widget: 'select',
          asyncData: () => this.enterpriseService.getSimpleInfoEnum(),
          showSearch: true,
          nzSize: 'large',
          nzAllowClear: true,
        }
      },
      enterpriseId: {
        type: 'string',
        title: '所属分类',
        ui: {
          widget: 'select',
          asyncData: () => this.jobService.getJobCategoryEnum(),
        }
      },
    },
  };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '招聘标题', index: 'jobTitle' },
    { title: '所属分类', index: 'jobCategoryName' },
    { title: '发布公司', index: 'enterpriseName' },
    { title: '招聘人数（人）', index: 'recruitNum', type: 'number' },
    {
      title: '招聘时效', index: 'timelinessType', format: (cell: any, row: any) => {
        switch (cell.timelinessType) {
          case 1:
            return '短期';
          case 2:
            return '长期';
          default:
            return '';
        }
      },
    },
    { title: '招聘开始时间', index: 'startTime', type: 'date' },
    { title: '招聘结束时间', index: 'endTime', type: 'date' },
    {
      title: '薪资结算周期', index: 'payPeriodType', format: (cell: any, row: any) => {
        switch (cell.payPeriodType) {
          case 1:
            return '日结';
          case 2:
            return '周结';
          case 3:
            return '月结';
          case 4:
            return '小时';
          default:
            return '';
        }
      },
    },
    { title: '薪资（元/结算周期）', index: 'salary', type: 'number' },
    // { title: '工作时间', index: 'workTime' },
    // { title: '工作地点', index: 'workAddress' },
    // { title: '工作详情', index: 'jobDetail' },
    // { title: '实际浏览人数', index: 'browseNum' },
    // { title: '预设浏览人数', index: 'baseBrowseNum' },
    // { title: '实际申请人数', index: 'applyNum' },
    // { title: '预设申请人数', index: 'baseApplyNum' },
    { title: '排序', index: 'sort', type: 'number' },
    {
      title: '状态', index: 'status', format: (cell: any, row: any) => {
        switch (cell.status) {
          case 1:
            return '待审核';
          case 2:
            return '审核通过';
          case 3:
            return '审核未通过';
          case 4:
            return '被隐藏';
          default:
            return '';
        }
      },
      filters: [
        { text: '待审核', value: 1 },
        { text: '审核通过', value: 2 },
        { text: '被驳回', value: 3 },
        { text: '被隐藏', value: 4 },
      ],
      filterMultiple: false,
      filter: (filter: SimpleTableFilter, record: any) => {
        return true;
      },
    },
    // { title: '状态原因', index: 'statusReason' },
    // { title: '创建时间', index: 'createTime' },
    // { title: '修改时间', index: 'updateTime' },
    {
      title: '操作',
      buttons: [
        {
          text: '编辑',
          type: 'static',
          paramName: 'jobInfo',
          component: JobListEditComponent,
          click: 'reload',
          modal: { exact: false },
        },
        {
          text: '通过',
          type: 'none',
          click: (record: JobInfo, modal?: any, instance?: SimpleTableComponent) => {
            this.jobService.applySuccessByJobId(record.jobId).subscribe(
              res => {
                if (res.code == 0) {
                  this.msgService.success(res.msg);
                  instance.reload();
                } else {
                  this.msgService.error(res.msg);
                }
              },
            );
          },
          pop: true,
          popTitle: '确认通过吗？',
          iif: (item: any, btn: SimpleTableButton, column: SimpleTableColumn) => {
            return item.status == 1 || item.status == 3;
          },
        },
        {
          text: '驳回',
          type: 'none',
          click: (record: any, modal?: any, instance?: SimpleTableComponent) => {
            this.jobService.applyFailByJobId(record.jobId).subscribe(
              res => {
                if (res.code == 0) {
                  this.msgService.success(res.msg);
                  instance.reload();
                } else {
                  this.msgService.error(res.msg);
                }
              },
            );
          },
          pop: true,
          popTitle: '确认驳回吗？',
          iif: (item: any, btn: SimpleTableButton, column: SimpleTableColumn) => {
            return item.status == 1;
          },
        },
        {
          text: '隐藏',
          type: 'none',
          click: (record: any, modal?: any, instance?: SimpleTableComponent) => {
            this.jobService.hideByJobId(record.jobId).subscribe(
              res => {
                if (res.code == 0) {
                  this.msgService.success(res.msg);
                  instance.reload();
                } else {
                  this.msgService.error(res.msg);
                }
              },
            );
          },
          pop: true,
          popTitle: '确认隐藏吗？',
          iif: (item: any, btn: SimpleTableButton, column: SimpleTableColumn) => {
            return item.status == 2;
          },
        },
      ],
    },
  ];
  reqParams = {
    jobCategoryId: '',
    enterpriseId: '',
    status: '',
  };


  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private jobService: JobService,
              private msgService: NzMessageService,
              private enterpriseService:EnterpriseService) {
  }

  ngOnInit() {
  }

  add() {
    this.modal
      .createStatic(JobListEditComponent, {}, { exact: false })
      .subscribe(() => this.st.reload());
  }

  test(){}
}
