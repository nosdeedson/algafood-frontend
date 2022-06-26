import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-reponse',
  templateUrl: './waiting-reponse.component.html',
  styleUrls: ['./waiting-reponse.component.css']
})
export class WaitingReponseComponent implements OnInit {

  @Input() waitingResponse: boolean
  @Input() temDados: boolean
  constructor() { }

  ngOnInit(): void {
  }

}
