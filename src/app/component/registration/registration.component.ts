import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from "../../services/common.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService) { }
  registrationForm: FormGroup;
  ngOnInit() {
    this.createForm();
    if (this.commonService.getAuthentication()) {
      this.router.navigate(['track']);
    }
  }

  createForm() {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required]],
      contact: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(10)]],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      place: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(5)]]
    });
  }

  form() {
    return this.registrationForm.controls;
  }

  submitRegistration() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.commonService.login(this.registrationForm.value).subscribe((res => {
        window.sessionStorage.setItem("token", res);
        this.commonService.setAuthentication(res);
        this.router.navigate(["pickup"]);
      }))
    } else {
      this.makeAllFieldTouched(this.registrationForm);
    }
  }

  makeAllFieldTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.makeAllFieldTouched(control);
      }
    });
  }



}
