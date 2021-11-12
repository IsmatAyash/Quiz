import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorAuthGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.userService.userInfo.UserRole === 'Admin' || this.userService.userInfo.UserRole === 'Supervisor';
  }
}
