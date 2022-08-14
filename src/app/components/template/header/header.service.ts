import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { UserDTO } from 'src/app/model/user/user-model';
import { HeaderData } from './headerData';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    title : 'Início',
    icon: 'home'
  })

  user: User = {}

  constructor() { }

  get headerData() : HeaderData{
    return this._headerData.value
  }

  set headerData(headerData: HeaderData){
    this._headerData.next(headerData);
  }
}
