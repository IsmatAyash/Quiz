import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserInfo } from "./user-info";
import { UserService } from "shared/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  emailPattern = "^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$";

  constructor(public userService: UserService, private router: Router) {}

  onSubmit(f: NgForm) {
    f.value.FullName = this.toProperCase(f.value.FullName);
    this.userService.save(f.value).subscribe((userinfo: UserInfo) => {
      sessionStorage.setItem(
        "username",
        JSON.stringify(userinfo.ParticipantID)
      );
      this.router.navigate(["/"]);
    });
  }

  toProperCase(anyText: string) {
    return anyText
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(" ");
  }

  onCancel() {
    this.router.navigate(["/"]);
  }
}
