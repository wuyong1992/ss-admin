import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormProperty, PropertyGroup, SFSchema, SFUISchema } from '@delon/form';
import { JobCategory } from '../../../../model/job-category';
import { JobService } from '@core/service/job.service';

@Component({
  selector: 'job-category-edit',
  templateUrl: './edit.component.html',
})
export class JobCategoryEditComponent implements OnInit {

  loading = false;

  @Input() jobCategory = new JobCategory();

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private jobService: JobService,
  ) {
  }

  ngOnInit(): void {

  }

  save(result: any) {
    this.jobCategory.categoryName = result.categoryName;
    this.jobCategory.sort = result.sort;
    this.jobCategory.status = result.status;
    this.jobService.saveJobCategory(this.jobCategory).subscribe(
      res => {
        let resp = res as any;
        if (resp.code == 0) {
          this.msgSrv.success(resp.msg);
          this.modal.close(true);
        } else {
          this.msgSrv.error(resp.msg);
        }
      },
    );
  }

  closeModal() {
    this.modal.destroy();
  }

  jobCategorySchema: SFSchema = {
    properties: {
      categoryName: {
        type: 'string',
        title: '分类名称',
        maxLength: 15,
        ui: {
          placeholder: '输入分类名称',
          validator: (value: string, formProperty: FormProperty, form: PropertyGroup) => {
            if (value != null) {
              return value.trim() != '' ? [] : [{ keyword: 'notnull', message: '不能为空' }];
            }
            return [];
          },
        },
      },
      sort: {
        type: 'number',
        title: '排序字段，越大越靠前',
      },
      status: {
        type: 'number',
        title: '是否启用',
        enum: [
          { label: '否', value: 0 },
          { label: '是', value: 1 },
        ],
        ui: {
          widget: 'radio',
        },
      },
    },
    required: ['categoryName', 'sort', 'status'],
  };


}

