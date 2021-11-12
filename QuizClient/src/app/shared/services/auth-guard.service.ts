import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
  CanActivate,
  RouterStateSnapshot,
  Router,
  ActivatedRouteSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  readonly quizTaken = JSON.parse(sessionStorage.getItem("quizTaken"));
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.router.url === "/result" || this.quizTaken === "true") {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
