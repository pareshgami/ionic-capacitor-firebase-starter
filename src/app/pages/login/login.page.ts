import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/service/utility.service';
import { AuthenticationService } from 'src/service/authentication.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private utilityService: UtilityService,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(res => {
          console.log(res);
          this.utilityService.showMessage('Successfully Logged In');
          this.router.navigate(['/home']);
        }, err => {
          console.log(err);
          this.utilityService.showMessage(err.message);
        });
    }
  }

  goto(link) {
    this.router.navigate(['/' + link]);
  }

}
