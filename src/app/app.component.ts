import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/service/authentication.service';
import { UtilityService } from 'src/service/utility.service';
import { User } from './core/app.interface';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'mail'
    },
    {
      title: 'Profile',
      url: 'profile',
      icon: 'paper-plane'
    },
  ];
  user;
  userDetails: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticationService,
    private utility: UtilityService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      const user = localStorage.getItem('user');
      if (user && user !== 'null') {
        this.user = JSON.parse(user);
        this.authService.getUserData()
        .subscribe( (usr: User) => {
          this.user.full_name = usr.full_name;
        });
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      }, err => {
        this.utility.showMessage('Something went wrong. Try again later.');
      });
  }
}
