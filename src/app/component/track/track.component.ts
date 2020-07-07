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

let ELEMENT_DATA: TrackElement[] = []

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
    this.loadDetails();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadDetails() {
    this.commonService.getAllDetail().subscribe( res => {
      ELEMENT_DATA = res;
      this.dataSource =  new MatTableDataSource<TrackElement>(ELEMENT_DATA); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log("Error Occured");
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
    this.orderStatus = "<p><strong> Arrival Date :</strong> "+ele.date+"</p> <p><strong> Delivered Date:</strong> "+ele.date+"</p>"
  }

}
