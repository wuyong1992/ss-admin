import {Component, OnInit, ViewChild} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {SimpleTableButton, SimpleTableColumn, SimpleTableComponent, SimpleTableFilter} from '@delon/abc';
import {SFSchema} from '@delon/form';
import {environment} from '../../../../environments/environment';
import {EnterpriseService} from '../../../core/service/enterprise.service';
import {EnterpriseInfo} from '../../../model/enterprise-info';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-enterprise-list',
  templateUrl: './list.component.html',
})
export class EnterpriseListComponent implements OnInit {
  url = environment.URL_PREFIX + '/backend/enterprise/list';
  searchSchema: SFSchema = {
    properties: {
      fullName: {
        type: 'string',
        title: '企业名称',
        ui: {
          placeholder: '模糊查询'
        }
      }
    }
  };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    {title: '企业全称', index: 'fullName'},
    {title: '联系人手机号', index: 'enterprisePhone'},
    {title: '联系人', index: 'manageName'},
    {title: '企业QQ', index: 'enterpriseQq'},
    {title: '排序', index: 'sort', type: 'number'},
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
            return '禁用';
          default:
            return '';
        }
      },
      filters: [
        {text: '待审核', value: 1},
        {text: '审核通过', value: 2},
        {text: '被驳回', value: 3},
        {text: '被隐藏', value: 4},
      ],
      filterMultiple: false,
      filter: (filter: SimpleTableFilter, record: any) => {
        return true;
      },
    },
    {
      title: '信息是否完整', index: 'isInfoComplete', type: 'number', format: (cell: any, row: any) => {
        switch (cell.isInfoComplete) {
          case 0:
            return '否';
          case 1:
            return '是';
          default:
            return '';
        }
      }
    },
    {title: '创建时间', type: 'date', index: 'createTime'},
    {
      title: '操作',
      buttons: [
        {
          text: '通过',
          type: 'none',
          click: (record: EnterpriseInfo, modal?: any, instance?: SimpleTableComponent) => {
            this.enterpriseService.applySuccessEnterprise(record.enterpriseId).subscribe(
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
          click: (record: EnterpriseInfo, modal?: any, instance?: SimpleTableComponent) => {
            this.enterpriseService.applyFailEnterprise(record.enterpriseId).subscribe(
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
            return item.status == 1 || item.status == 2;
          },
        },
      ]
    }
  ];


  reqParams = {};


  constructor(private http: _HttpClient,
              private enterpriseService: EnterpriseService,
              private msgService: NzMessageService) {
  }

  ngOnInit() {
  }

}
