import { Component, OnInit } from '@angular/core';
import {CommonService} from "../services/common.service"

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    if(window.sessionStorage.getItem('token')) {
     this.commonService.setAuthentication(window.sessionStorage.getItem('token'));
    }
  }

}
