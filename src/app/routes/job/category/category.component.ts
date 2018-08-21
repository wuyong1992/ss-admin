import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { JobCategoryEditComponent } from './edit/edit.component';
import { JobService } from '@core/service/job.service';
import { JobCategory } from '../../../model/job-category';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'job-category',
  templateUrl: './category.component.html',
})
export class JobCategoryComponent implements OnInit {

  jobCategoryList: JobCategory[];


  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '分类名称',
      },
    },
  };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '名称', index: 'categoryName' },
    { title: '排序', index: 'sort' },
    {
      title: '状态', index: 'status', format: (cell: any, row: any) => this.formatStatus(cell.status),
    },
    {
      title: '操作',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        {
          text: '编辑',
          type: 'static',
          component: JobCategoryEditComponent,
          click: 'reload',
          modal: { exact: false },
          paramName: 'jobCategory',
        },
      ],
    },
  ];

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private jobService: JobService,
              private msgSrv: NzMessageService) {
  }

  ngOnInit() {
    this.initData();

  }

  add() {
    this.modal
      .create(JobCategoryEditComponent, {}, { exact: false })
      .subscribe((result) => {
        if (result) {
          this.st.reload();
        }
      });
  }

  /**
   * 初始化数据
   */
  private initData() {
    this.jobService.getAllJobCategoryList().subscribe(
      res => {
        if (res.code == 0) {
          this.jobCategoryList = res.data;
        } else {
          this.msgSrv.error(res.msg);
        }
      },
    );
  }


  /**
   * 格式化状态字段显示
   * @param status
   */
  formatStatus(status: number) {
    switch (status) {
      case 0:
        return '禁用';
      case 1:
        return '正常';
      default:
        return '异常';
    }
  }

}
