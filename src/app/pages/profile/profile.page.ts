import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/service/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from './../../core/app.interface';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  userData = {
    full_name : 'Paresh Gami',
    user_name : 'pareshgami',
    mobile : '9897969594',
    dob : '1985-05-01'
  };
  mDate;
  isDataLoggedIn = true;
  constructor(
    public menuCtrl: MenuController,
    public authService: AuthenticationService,
    public db: AngularFireDatabase,
    public utility: UtilityService
  ) {
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.authService.getUserData()
    .subscribe((user: User) => {
      console.log(user);
      this.isDataLoggedIn = false;
      this.profileForm = new FormGroup({
        full_name: new FormControl(user.full_name, [Validators.required]),
        user_name: new FormControl(user.user_name, [Validators.required]),
        mobile: new FormControl(user.mobile, [Validators.required]),
        dob: new FormControl(user.dob, [Validators.required])
      });
    });
    const maxDate = new Date((new Date().getFullYear() - 13), new Date().getMonth(), new Date().getDate());
    this.mDate = moment(maxDate).format('YYYY-MM-DD');
  }

  updateProfile() {
    this.db.list('user').update(this.authService.getUid, this.profileForm.value);
    this.utility.showMessage('Profile updated.');
  }

}
