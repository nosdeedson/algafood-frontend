import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {

  constructor( private headerService: HeaderService) {
    this.headerService.headerData={
      title: "Esqueceu Senha",
      icon: 'warning_amber'
    }
   }

  ngOnInit(): void {
  }

}
