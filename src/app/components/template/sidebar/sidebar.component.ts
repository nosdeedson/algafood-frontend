import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiderbarService } from './siderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  pageSelecionada: string = ''

  constructor(private router : Router,
    private sidebarService : SiderbarService) {  }

  ngOnInit(): void { 
    this.pageSelecionada = this.sidebarService.sidebarData.page
   }

}
