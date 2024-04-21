import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderMenus } from '../models/header-menus.dto';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  headerManagement: BehaviorSubject<HeaderMenus> =
  new BehaviorSubject<HeaderMenus>({
    status_manager: false,
    status_normal: false
  });
}
