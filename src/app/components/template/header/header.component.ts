import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/model/user/user-model';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  // user : UserDTO ={
  //   nome : 'edson'
  // }

  user: UserDTO = null;

  ngOnInit(): void {
  }

  get title(): string{
    return this.headerService.headerData.title
  }

  get icon() : string{
    return this.headerService.headerData.icon
  }

}
