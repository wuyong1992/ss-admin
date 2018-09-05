import {Component, OnInit, ViewChild} from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {SimpleTableColumn, SimpleTableComponent, SimpleTableFilter} from '@delon/abc';
import {SFSchema} from '@delon/form';
import {environment} from '@env/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
})
export class UserListComponent implements OnInit {


  url = environment.URL_PREFIX + '/backend/user/list';

  reqParams = {
  };


  searchSchema: SFSchema = {
    properties: {
      phone: {
        type: 'string',
        title: '手机号'
      },
      schoolName: {
        type: 'string',
        title: '学校'
      }
    }
  };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    {title: '昵称', index: 'nickname'},
    {title: '姓名', index: 'realName'},
    {title: '年龄', index: 'age'},
    {
      title: '性别', index: 'sex',
      format: (cell: any, row: any) => {
        switch (cell.sex) {
          case 1:
            return '男';
          case 2:
            return '女';
          default:
            return '未知';
        }
      },
      filters: [
        { text: '男', value: 1 },
        { text: '女', value: 2 },
      ],
      filterMultiple: false,
      filter: (filter: SimpleTableFilter, record: any) => {
        return true;
      },
    },
    {title: '学校', index: 'schoolName'},
    {title: '专业', index: 'major'},
    {title: 'QQ', index: 'qq'},
    {title: '联系电话', index: 'phone'},
    {title: '特长', index: 'speciality'},
    // { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    // { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {
  }

  ngOnInit() {

  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }


  startEdit(userId) {

  }

  finishEdit(userId) {

  }
}
