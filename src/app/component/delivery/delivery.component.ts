import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router} from '@angular/router';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) { }
  deliveryForm: FormGroup;
  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.deliveryForm = this.fb.group({
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      date: ['',[Validators.required]],
      comments: ['',[Validators.required]],
      nameoncard: ['',[Validators.required]],
      cardNo: ['',[Validators.required]],
      cvc: ['',[Validators.required]],
      expiartionMonth: ['',[Validators.required]],
      expiartionYear: ['',[Validators.required]],
    });
  }

  form() {
    return this.deliveryForm.controls;
  }

  continueToPay() {
    if(this.deliveryForm.valid) {
      console.log(this.deliveryForm.value);
      this.router.navigate(["track"]);
    } else {
      this.makeAllFieldTouched(this.deliveryForm);
    }
  }

  backToPickup() {
    this.router.navigate(["pickup"]);
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
