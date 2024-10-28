import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzDividerModule } from 'ng-zorro-antd/divider';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    TranslateModule,
    NzDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  _isCollapsed = false;

  _year = new Date().getFullYear();

  _i18n = 'pt-BR';

  private mobileWidth = 768;

  constructor(public translate: TranslateService) {
    translate.addLangs(['pt-BR', 'en-US']);
    translate.setDefaultLang('pt-BR');
    translate.use('pt-BR');
  }

  private handleSplashscreen() {
    const splashEl = document.getElementById('xbri-splash-screen');
    setTimeout(() => {
      splashEl?.remove();
    }, 1600);
  }

  ngOnInit(): void {
    this.handleSplashscreen();
  }

  onChangeLang(lang: string) {
    this.translate.use(lang);
    this._i18n = lang;
  }

  onHandleClickToNavigate() {
    if (window.innerWidth <= this.mobileWidth) {
      this._isCollapsed = true;
    }
  }
}
