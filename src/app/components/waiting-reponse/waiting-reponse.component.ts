import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting-reponse',
  templateUrl: './waiting-reponse.component.html',
  styleUrls: ['./waiting-reponse.component.css']
})
export class WaitingReponseComponent implements OnInit {

  @Input() waitingResponse: boolean
  @Input() temDados: boolean
  @Input() urlToGo: string

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  adicionar(){
    this.router.navigateByUrl(this.urlToGo)
  }
}
