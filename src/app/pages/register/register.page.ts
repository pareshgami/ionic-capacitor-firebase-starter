import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthenticationService } from 'src/service/authentication.service';
import { UtilityService } from 'src/service/utility.service';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;
  mDate;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private utilityService: UtilityService,
    public at: AngularFireAuth,
    public menuCtrl: MenuController,
    public db: AngularFireDatabase
    ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)]),
      full_name: new FormControl('', [Validators.required]),
      user_name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [this.comparePassword]),
    });
    const maxDate = new Date((new Date().getFullYear() - 13), new Date().getMonth(), new Date().getDate());
    this.mDate = moment(maxDate).format('YYYY-MM-DD');
  }

  comparePassword(control: AbstractControl): ValidationErrors {
    const confirmpassword = control.value;
    if (control.parent !== undefined) {
      const password = control.parent.get('password').value;
      if (confirmpassword !== password) {
        return { compare: true };
      }
    }
    return null;
  }

  register() {
    if (this.signupForm.valid) {
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value.email, this.signupForm.value.password)
      .then(res => {
        const user = this.signupForm.value;
        delete user.email;
        delete user.password;
        delete user.confirmpassword;

        this.db.list('user').update(res.user.uid, user);

        this.utilityService.showMessage('Successfully Registered');
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.utilityService.showMessage(err.message);
      });
    }
  }

}
