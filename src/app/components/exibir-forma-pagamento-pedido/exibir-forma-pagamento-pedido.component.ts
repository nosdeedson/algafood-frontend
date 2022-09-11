import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormaPagamentoModel } from 'src/app/model/forma-pagamento/forma-pagamento-model';

@Component({
  selector: 'app-exibir-forma-pagamento-pedido',
  templateUrl: './exibir-forma-pagamento-pedido.component.html',
  styleUrls: ['./exibir-forma-pagamento-pedido.component.css']
})
export class ExibirFormaPagamentoPedidoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExibirFormaPagamentoPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public formaPag:FormaPagamentoModel) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
