import {
  Router,
  NavigationEnd,
  RouterEvent,
  ActivatedRoute,
} from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { environment } from "environments/environment";
import { UserService } from "shared/services/user.service";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public destroyed = new Subject<any>();
  navbarBackgroundColor = environment.navBarBackgroundColor;
  isLogged = false;
  isAgent: boolean;
  isAdmin: boolean;
  fullName: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroyed)
      )
      .subscribe(() => {
        this.fetchData();
      });
  }

  fetchData() {
    this.userService.get().subscribe((user) => {
      if (user) {
        this.userService.userInfo = user;
        sessionStorage.setItem("username", JSON.stringify(user.ParticipantID));
        this.isAgent = this.userService.userInfo.UserRole === "Agent";
        this.isAdmin = this.userService.userInfo.UserRole === "Admin";
        this.isLogged =
          this.userService.userInfo.Email !== "" ||
          this.userService.userInfo.FullName !== "";
        this.fullName = this.userService.userInfo.FullName;
      }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
