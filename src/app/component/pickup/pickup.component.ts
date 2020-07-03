import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) { }
  pickupForm: FormGroup;
  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.pickupForm = this.fb.group({
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      whatsending: ['', [Validators.required]],
      value: ['', [Validators.required]],
      date: ['',[Validators.required]],
      comments: ['',[Validators.required]]
    });
  }

  form() {
    return this.pickupForm.controls;
  }

  continueToOrder() {
    if(this.pickupForm.valid) {
      console.log(this.pickupForm.value);
      this.router.navigate(["delivery"]);
    } else {
      this.makeAllFieldTouched(this.pickupForm);
    }
  }

  replan() {
    this.pickupForm.reset();
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
