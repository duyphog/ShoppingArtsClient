import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContactUs } from '../_models/contact-us';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactUsService } from '../_services/contact-us.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

 
longitude = 20.728218;
latitude = 52.128973;

markers = [
{ latitude: 12.228973, longitude: 12.728218 }
];

placeMarker(position: any) {
const lat = position.coords.lat;
const lng = position.coords.lng;

this.markers.push({ latitude: lat, longitude: lng });
}


  formDetail = this.formBuilder.group({
    'name': [null, Validators.required],
    'email': [null, Validators.required],
    'phoneNumber': [null, Validators.required],
    'subject': [null, Validators.required],
    'confirm':[null, Validators.required],
    'description' : [null, Validators.required],
    'status': true,
    
  })

  constructor(
    private contactUsService: ContactUsService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
   
  ) { 
   
  }

  ngOnInit(): void {
  }


  save() {
    if (!this.formDetail.valid) {
      this.toastr.warning("Invalid form");
      return;
    }

    let formData = new FormData();
    const data : ContactUs = this.formDetail.value;
    

    const method = data.id == undefined ? 'POST' : 'PUT';
    const accountId = this.formDetail.controls["id"] == undefined ? null : this.formDetail.controls["id"].value;
    this.contactUsService.save(accountId, data, method).subscribe(
      () => {
        this.toastr.success(`${this.formDetail.controls["id"] ? "Create" : "Update"} success`);
        this.router.navigateByUrl("account");
      }
    );
  }

}
