import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {HttpHeaders} from '@angular/common/http';
import {JobCategory} from '../../model/job-category';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {SFSchemaEnumType} from '../../../../node_modules/@delon/form/src/src/schema';
import {ServiceResponse} from '../../model/service-response';
import {map} from 'rxjs/operators';
import {JobInfo} from '../../model/job-info';

const header = new HttpHeaders().set('Content-Type', 'application/json');
const URL_PREFIX = environment.URL_PREFIX;

@Injectable({
  providedIn: 'root',
})
export class JobService {

  constructor(private http: _HttpClient) {
  }

  /**
   * 保存招聘分类
   * @param jobCategory
   */
  saveJobCategory(jobCategory: JobCategory) {
    return this.http.post(URL_PREFIX + '/backend/job-category', JSON.stringify(jobCategory), {}, {
      headers: header,
      responseType: 'json',
      withCredentials: true,
    });
  }

  /**
   * 保存招聘信息
   * @param jobInfo
   */
  saveJob(jobInfo: JobInfo): Observable<ServiceResponse<JobInfo>> {
    return this.http.post(URL_PREFIX + '/backend/job', JSON.stringify(jobInfo), {}, {
      headers: header,
      responseType: 'json',
      withCredentials: true,
    });
  }

  /**
   * 获取所有的分类信息，前台分页
   */
  getAllJobCategoryList(): Observable<ServiceResponse<JobCategory[]>> {
    return this.http.get(URL_PREFIX + '/backend/job-category/list');
  }

  /**
   * 获取下拉选择框的数据
   */
  getJobCategoryEnum(): Observable<SFSchemaEnumType[]> {
    return this.getAllJobCategoryList().pipe(
      map(res => {
        if (res.code == 0 && res.data) {
          let jobCategoryEnum = [];
          res.data.forEach(
            item => {
              let disabled: boolean = item.status == 0;
              jobCategoryEnum.push({label: item.categoryName, value: item.categoryId, disabled: disabled});
            },
          );
          return jobCategoryEnum;
        } else {
          return [];
        }
      }),
    );
  }

  /**
   * 审核通过企业发布的招聘
   * @param jobId
   */
  applySuccessByJobId(jobId: number): Observable<ServiceResponse<any>> {
    return this.http.put(URL_PREFIX + '/backend/job/apply-success/' + jobId);
  }

  /**
   * 审核驳回企业发布的招聘
   * @param jobId
   */
  applyFailByJobId(jobId: number): Observable<ServiceResponse<any>> {
    return this.http.put(URL_PREFIX + '/backend/job/apply-fail/' + jobId);
  }

  /**
   * 隐藏某个企业发布的招聘信息
   * @param jobId
   */
  hideByJobId(jobId: number): Observable<ServiceResponse<any>> {
    return this.http.put(URL_PREFIX + '/backend/job/hide/' + jobId);
  }

  /**
   * 审核通过用户的求职申请
   * @param id
   */
  applySuccessUerJob(id: number) {
    return this.http.put(URL_PREFIX + '/backend/user-job/apply-success/' + id);
  }

  /**
   * 驳回用户的求职申请
   * @param id
   */
  applyFailUerJob(id: number) {
    return this.http.put(URL_PREFIX + '/backend/user-job/apply-fail/' + id);
  }


}
