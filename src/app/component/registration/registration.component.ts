import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }
  registrationForm: FormGroup;
  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required]],
      place: ['', [Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  form() {
    return this.registrationForm.controls;
  }

  submitRegistration() {
    if(this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.router.navigate(["pickup"]);
    } else {
      this.makeAllFieldTouched(this.registrationForm);
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
