import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }
  loginForm: FormGroup;
  ngOnInit() {
    this.createForm();
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
      this.router.navigate(["pickup"]);
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
