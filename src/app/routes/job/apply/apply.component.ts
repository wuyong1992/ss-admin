import {Component, OnInit, ViewChild} from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {SimpleTableButton, SimpleTableColumn, SimpleTableComponent, SimpleTableFilter} from '@delon/abc';
import {SFSchema} from '@delon/form';
import {environment} from '@env/environment';
import {JobInfo} from '../../../model/job-info';
import {JobService} from '@core/service/job.service';
import {NzMessageService} from 'ng-zorro-antd';
import {UserJobVO} from '../../../model/user-job-vo';

@Component({
  selector: 'app-job-apply',
  templateUrl: './apply.component.html',
})
export class JobApplyComponent implements OnInit {


  url = environment.URL_PREFIX + '/backend/user-job/list';
  /*searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };*/
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    {title: '申请人姓名', index: 'realName'},
    {title: '申请人联系方式', index: 'phone'},
    {title: '招聘标题', index: 'jobTitle'},
    {title: '发布职位的企业', index: 'enterpriseFullName'},
    {title: '企业联系方式', index: 'enterprisePhone'},
    {title: '申请次数', index: 'applyCount'},
    {title: '申请成功次数', index: 'applySuccessCount'},
    {
      title: '最新申请状态', index: 'status', format: (cell: any, row: any) => {
        switch (cell.status) {
          case 1:
            return '待审核';
          case 2:
            return '审核通过';
          case 3:
            return '审核未通过';
          default:
            return '';
        }
      },
      filters: [
        { text: '待审核', value: 1 },
        { text: '审核通过', value: 2 },
        { text: '被驳回', value: 3 },
      ],
      filterMultiple: false,
      filter: (filter: SimpleTableFilter, record: any) => {
        return true;
      },
    },
    {
      title: '',
      buttons: [
        {
          text: '通过',
          type: 'none',
          click: (record: UserJobVO, modal?: any, instance?: SimpleTableComponent) => {
            this.jobService.applySuccessUerJob(record.id).subscribe(
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
          click: (record: UserJobVO, modal?: any, instance?: SimpleTableComponent) => {
            this.jobService.applyFailUerJob(record.id).subscribe(
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
      ]
    }
  ];


  reqParams = {};

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private jobService:JobService,
              private msgService:NzMessageService) {
  }

  ngOnInit() {
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
