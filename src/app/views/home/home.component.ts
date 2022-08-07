import { Component, OnInit } from '@angular/core';
import { UserEndPointService } from 'src/app/backend/user-end-point-service.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  links : string[] = [];

  constructor(private headerService: HeaderService,
    private userEndPointService: UserEndPointService) {
    this.headerService.headerData={
      title: 'Home',
      icon: 'home'
    }
   }

  ngOnInit(): void {
    this.userEndPointService.getEndPoints()
      .toPromise()
      .then(resp =>{
        Object.keys(resp._links).forEach(item =>{
          this.links.push(resp._links[item].href)
        })
      })
  }

}
