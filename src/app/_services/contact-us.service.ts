import { Injectable } from '@angular/core';
import { ContactUs } from '../_models/contact-us';
import { HttpBaseService } from '../_services/http-base.service';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactUsService extends HttpBaseService{
  private urlPatch = "contactus";
  private url = this.endpoint + this.urlPatch;

  getList(){
    return this.httpClient.get(this.url, { observe: 'response' });
  }
  save(id: string, data: ContactUs, method: string) {
    switch (method) {
      case "POST":
        return this.httpClient.post<Account>(this.url, data, { headers: this.headers });
      case "PUT":
        return this.httpClient.put<Account>(`${this.url}/${id}`, data, { headers: this.headers });
      default:
        console.log(`${method} not found!!!`);
        break;
    }
  }
  getSingle(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.get(mergedUrl);
  }
  delete(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.delete(mergedUrl);
  }

}
