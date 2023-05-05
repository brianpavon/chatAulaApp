import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  swiperModules = [IonicSlides];
  constructor() { }

  ngOnInit() {
  }

}
