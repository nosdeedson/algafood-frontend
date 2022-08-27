import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  formItensArray: any;
  formItens: any;
  usuario: User = {};
  idFormaPagamento: number = 0;
  produtos: ProdutoDto[] = [];
  produtosSelecionados: ProdutoDto[] = [];
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
      this.produtos = this.restaurante.produtos
    }
  }
  
  ngOnInit(): void {
    this.usuario = this.headerService.user
    this.preencherForm();
    console.log(this.produtos)
  }

  adicionarProduto(prod){
    this.formItensArray.value.forEach(element => {
      if( element.produtoId === prod.id){
        element.quantidade = this.formItens.value.quantidade
      }
    })
    console.log(this.formItensArray)
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
    this.formItensArray = this._formBuilder.array([])
    this.restaurante.produtos.forEach(produto =>{
      this.formItens = {};
      this.formItens = this._formBuilder.group({
        produtoId: [produto.id, Validators.required],
        quantidade: [produto?.quantidade ? produto.quantidade : 0, Validators.required]
      })
      this.formItensArray.push(this.formItens)
    })
    console.log(this.formItensArray)
    console.log(this.formItens)
  }

}
