import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class ErrorData{
  statusCode: number;
  message: string;
  data: any;
}

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  errors: ErrorData;
  constructor(private router: Router) { 
    const navigattion = this.router.getCurrentNavigation();
    this.errors = <ErrorData>navigattion?.extras?.state;
  }
  ngOnInit(): void {
  }

}
