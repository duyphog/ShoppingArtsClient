import { Injectable } from '@angular/core';
import { HttpBaseService } from '../_services/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends HttpBaseService{
  private urlPatch = "role";
  private url = this.endpoint + this.urlPatch;
  

  getList(){
    return this.httpClient.get(this.url, { observe: 'response' });
  }

}
