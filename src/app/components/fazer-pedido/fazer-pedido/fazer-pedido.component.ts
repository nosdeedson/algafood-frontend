import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { ItensPedido } from 'src/app/model/itensPedido/itens-pedido';
import { PedidoFazer } from 'src/app/model/pedido/pedido-fazer';
import { ProdutoDto } from 'src/app/model/produto/produto-dto';
import { ProdutoModel } from 'src/app/model/produto/produto-model';
import { RestauranteModel } from 'src/app/model/restaurante/restaurante-model';
import { User } from 'src/app/model/user/user';
import { ListarProdutosComponent } from 'src/app/views/listar-produtos/listar-produtos.component';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-fazer-pedido',
  templateUrl: './fazer-pedido.component.html',
  styleUrls: ['./fazer-pedido.component.css']
})
export class FazerPedidoComponent implements OnInit {
  
  public restaurante: RestauranteModel = {};
  formEndereco: any;
  formFormaPagamento: any;
  itensFormGroup : FormGroup;
  itensFormArray: FormArray;
  usuario: User = {};
  idFormaPagamento: number = 0;
  pedido: PedidoFazer = {enderecoEntrega :{}, formaPagamento: {}, itens: [], 
      restaurante: { id: 0 }, usuarioId : this.usuario.id  };
  item: ItensPedido = {}

  displayedColumns: string[] = ['nome', 'quantidade', 'adicionar'];

  constructor(private swal: SwalService,
    private _formBuilder: FormBuilder,
    private headerService: HeaderService,
    private router: Router) {
    headerService.headerData = { title: 'Fazer Pedido', icon: 'restaurant_menu' }
    if (this.router.getCurrentNavigation().extras?.state?.restaurante === undefined) {
      this.router.navigateByUrl('listar-restaurantes')
    } else {
      this.restaurante = this.router.getCurrentNavigation().extras?.state?.restaurante;
    }
  }
  
  ngOnInit(): void {
    this.itensFormGroup = new FormGroup({
      itensFormArray : new FormArray([])
    })
    this.usuario = this.headerService.user
    this.preencherForm();
  }

  createItem(produto: any) : FormGroup{
    return this._formBuilder.group({
      nome: [{value: produto.nome, disabled: true}],
      produtoId: [produto.id, Validators.required],
      quantidade: [0, Validators.required],
      observacao: ['']
    })
  }
  
  preencherForm(){
    this.formEndereco = this._formBuilder.group({
      bairro: [ '', Validators.required],
      cep: [ '', Validators.required],
      logradouro: [ '', Validators.required],
      numero: ['', Validators.required],
      complemento: [ '', Validators.required],
      idCidade: [ '', Validators.required]
    })

    this.formFormaPagamento = this._formBuilder.group({
      idFormaPagamento: [this.idFormaPagamento, Validators.required],
    })

    this.restaurante.produtos.forEach(produto =>{
      this.itensFormArray = this.itensFormGroup.get('itensFormArray') as FormArray
      this.itensFormArray.push(this.createItem(produto))
    })
  }

  addItem(item: any, index: number){
    this.item = {
      observacao: item.value.observacao,
      produtoId: item.value.produtoId,
      quantidade: item.value.quantidade
    }
    this.pedido.itens.push(this.item)
  }
  
  enviar(){
    console.log(this.formEndereco)
    console.log(this.formFormaPagamento)
    console.log(this.pedido)
  }

}
