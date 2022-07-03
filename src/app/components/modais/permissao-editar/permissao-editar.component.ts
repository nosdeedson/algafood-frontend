import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissaoModel } from 'src/app/model/grupo/permissao-model';

@Component({
  selector: 'app-permissao-editar',
  templateUrl: './permissao-editar.component.html',
  styleUrls: ['./permissao-editar.component.css']
})
export class PermissaoEditarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PermissaoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public permissao: PermissaoModel,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
