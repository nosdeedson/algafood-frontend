import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.css']
})
export class PermissoesComponent implements OnInit {

  waitingResponse: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navegarAdicionar() {
    this.router.navigateByUrl("/adicionar-permissao")
  }

}
