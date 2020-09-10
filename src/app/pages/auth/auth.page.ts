import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private router: Router,
    public menuCtrl: MenuController
    ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  goto(link) {
    this.router.navigate(['/' + link]);
  }

}
