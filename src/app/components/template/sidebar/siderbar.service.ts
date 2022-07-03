import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SiderbarData } from './siderbar-data';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  private _sidebarData = new BehaviorSubject<SiderbarData>({
    page : '/'
  })
  constructor() { }

  get sidebarData() : SiderbarData{
    return this._sidebarData.value
  }

  set sidebarData (sidebarData: SiderbarData) {
    this._sidebarData.next(sidebarData)
  }
}
