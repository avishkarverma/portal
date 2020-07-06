import { Component, OnInit } from '@angular/core';
import { CommonService} from "../../services/common.service"
import { Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  brandmg = "../../../assets/deloitte.png"
  constructor(
    private commonService: CommonService,
    private router: Router,
  ) { }
 isLogin =  false;
  ngOnInit() {
    if(window.sessionStorage.getItem('token')) {
      this.isLogin = true;
    } 
    this.commonService.getAuthentication().subscribe( res => {
      if(res){
        this.isLogin = true;
      }  else {
        this.isLogin = false;
      }
    })
  
   
     
    
  }

  logout() {
    this.commonService.setAuthentication("");
    window.sessionStorage.removeItem('token');
    this.router.navigate(["login"]);
  }

}
