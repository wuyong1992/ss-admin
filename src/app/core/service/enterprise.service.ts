import {Injectable} from '@angular/core';
import {HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {environment} from '@env/environment';
import {_HttpClient} from '@delon/theme';
import {Observable} from 'rxjs';
import {SFSchemaEnumType} from '../../../../node_modules/@delon/form/src/src/schema';
import {map} from 'rxjs/operators';
import {EnterpriseInfo} from '../../model/enterprise-info';
import {ServiceResponse} from '../../model/service-response';

const header = new HttpHeaders().set('Content-Type', 'application/json');
const URL_PREFIX = environment.URL_PREFIX;

@Injectable({
  providedIn: 'root',
})
export class EnterpriseService {

  constructor(private http: _HttpClient) {
  }

  /**
   * 获取简单的企业信息集合
   */
  getSimpleInfoList():Observable<ServiceResponse<EnterpriseInfo[]>> {
    return this.http.get(URL_PREFIX + '/backend/enterprise/simple-list');
  }

  /**
   * 获取下拉选择框数据
   */
  getSimpleInfoEnum():Observable<SFSchemaEnumType[]>{
    return this.getSimpleInfoList().pipe(
      map(res => {
        if (res.code == 0 && res.data) {
          let simpleEnterpriseEnum = [];
          res.data.forEach(
            item => {
              let disabled: boolean = false;
              if (item.status != 2) {
                disabled = true;
              }
              simpleEnterpriseEnum.push({ label: item.fullName, value: item.enterpriseId, disabled: disabled });
            },
          );
          return simpleEnterpriseEnum;
        }else {
          return []
        }
      })
    )
  }

  /**
   * 审核通过某个企业
   * @param enterpriseId
   */
  applySuccessEnterprise(enterpriseId: number) {
    return this.http.put(URL_PREFIX + '/backend/enterprise/apply-success/' + enterpriseId)
  }

  /**
   * 驳回某个企业申请
   * @param enterpriseId
   */
  applyFailEnterprise(enterpriseId: number) {
    return this.http.put(URL_PREFIX + '/backend/enterprise/apply-fail/' + enterpriseId)
  }

}
