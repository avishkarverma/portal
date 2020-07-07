import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import { CommonService} from "../../services/common.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
     private router: Router,
     private commonService: CommonService) { }
  loginForm: FormGroup;
  ngOnInit() {
    this.createForm();
    if(this.commonService.getAuthentication()) {
      this.router.navigate(['track']);
    }
  }

  createForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  form() {
    return this.loginForm.controls;
  }

  login() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.commonService.login(this.loginForm.value).subscribe(res => {
        window.sessionStorage.setItem("token",res);
        this.commonService.setAuthentication(res);
        this.router.navigate(["pickup"]);
      }, err => {
        // window.sessionStorage.setItem("token","ddd");
        // this.commonService.setAuthentication("dd");
        // this.router.navigate(["pickup"]);
        console.log("error Occured")
      })
      
    } else {
      this.makeAllFieldTouched(this.loginForm);
    }
  }

  makeAllFieldTouched(formGroup:FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.makeAllFieldTouched(control);
      }
    });
  }



}
