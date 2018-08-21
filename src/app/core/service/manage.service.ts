import {Injectable} from '@angular/core';
import {Manage} from '../../model/manage';
import {_HttpClient} from '@delon/theme';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {ServiceResponse} from '../../model/service-response';
import {HttpHeaders} from '@angular/common/http';

const URL_PREFIX = environment.URL_PREFIX;
const header = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(private http: _HttpClient) {
  }

  login(manage: Manage): Observable<ServiceResponse<string>> {
    return this.http.post(URL_PREFIX + '/backend/manage/login', JSON.stringify(manage),
      {'_allow_anonymous=true': 'true'},
      {headers: header, responseType: 'json', withCredentials: true,}
    );
  }
}
