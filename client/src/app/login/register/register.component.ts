import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef ) {
    this.toastr.setRootViewContainerRef(vcr);
 }

  ngOnInit() {
  }

  register() {
    const me = this;

    me.loading = true;
    me.userService.registerUser(me.user)
      .subscribe(
        newUserAdded => {
          me.toastr.success(`User ${newUserAdded.username} was successfully added.`);
          me.router.navigate(['/login']);
        },
        error => {
          me.toastr.error(error.error);
          me.loading = false;
        }
      );
  }
}
