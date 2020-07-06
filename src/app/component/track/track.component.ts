import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonService} from "../../services/common.service";
import { Router} from '@angular/router';

export interface TrackElement {
  sno: string;
  orderby: string;
  mobile: string;
  date: string;
  pickupAdd: string;
  deliveryAdd: string;
}

const ELEMENT_DATA: TrackElement[] = [
  { sno: "1", orderby: 'Hydrogen', mobile: "1.0079", date: '17/03/2020', pickupAdd: "ddd", deliveryAdd: "ddd" },
  { sno: "2", orderby: 'Helium', mobile: "4.0026", date: '18/02/2019', pickupAdd: "ddd", deliveryAdd: "ddd" },
  { sno: "3", orderby: 'Lithium', mobile: "6.941", date: '17/04/2019', pickupAdd: "ddd", deliveryAdd: "ddd" },
  { sno: "4", orderby: 'Beryllium', mobile: "9.0122", date: '14/05/2019', pickupAdd: "ddd", deliveryAdd: "ddd" },
  { sno: "5", orderby: 'Boron', mobile: "10.811", date: '01/12/2018', pickupAdd: "ddd", deliveryAdd: "ddd" },
  { sno: "6", orderby: 'Carbon', mobile: "12.0107", date: '04/11/2018', pickupAdd: "ddd", deliveryAdd: "ddd" },
  { sno: "7", orderby: 'Boron', mobile: "10.811", date: '01/07/2020', pickupAdd: "ddd", deliveryAdd: "ddd" },
  { sno: "8", orderby: 'Carbon', mobile: "12.0107", date: '04/06/2020', pickupAdd: "ddd", deliveryAdd: "ddd" },
];

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'orderby', 'mobile', 'date', 'pickupAdd', 'deliveryAdd', 'action'];
  dataSource = new MatTableDataSource<TrackElement>(ELEMENT_DATA);
  orderStatus = "";
  year = "2020";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private commonService:CommonService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.validateLogin();
  }

  validateLogin() {
    if(!window.sessionStorage.getItem('token')) {
      this.router.navigate(["login"]);
    }
    this.commonService.getAuthentication().subscribe(res => {
      if(!res){
        this.router.navigate(["login"]);
      }
    })
  
  }

  filterData(month) {
    //  alert(this.year + ":" + month)
    if (this.year == "all") {
      this.dataSource =  new MatTableDataSource<TrackElement>(ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } else {
    //  let newData= ELEMENT_DATA;
      let filteredData:TrackElement[] = [];

      ELEMENT_DATA.map((obj)=> {
        if(parseInt(obj.date.split("/")[1]) == month && obj.date.split("/")[2] == this.year) {
          filteredData.push(obj );
        }
      })

      this.dataSource =  new MatTableDataSource<TrackElement>(filteredData); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }
  checkYear() {
    if (this.year == "all") {
      this.filterData('all')
    }
  }
  checkStatus(ele) {
    console.log(ele);
    this.orderStatus = "Sno: " + ele.sno + "Order By" + ele.orderby;
  }

}
