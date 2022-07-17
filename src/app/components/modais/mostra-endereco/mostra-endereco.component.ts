import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnderecoModel } from 'src/app/model/endereco/endereco-model';

@Component({
  selector: 'app-mostra-endereco',
  templateUrl: './mostra-endereco.component.html',
  styleUrls: ['./mostra-endereco.component.css']
})
export class MostraEnderecoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MostraEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public endereco: EnderecoModel,) { }

  ngOnInit(): void {
    console.log(this.endereco)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
