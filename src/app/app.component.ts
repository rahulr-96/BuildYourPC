import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ThemeService } from './shared/theme-service';
import {routeAnimations} from "./shared/shared.module";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {

  constructor(private authService:AuthService, private themeService: ThemeService, private renderer: Renderer2){}
  ngOnInit(): void {
    this.authService.autoLogin();
    this.themeService.themeChanges().subscribe(theme => {
      if (theme.oldValue) {
        this.renderer.removeClass(document.body, theme.oldValue);

        this.renderer.removeStyle(document.body,'color-scheme')
        this.renderer.setStyle(document.documentElement, 'color-scheme', 'light')
      }
      if(theme.newValue == "bootstrap-dark"){
        this.renderer.setStyle(document.documentElement, 'color-scheme', 'dark')
      }
      else{
        this.renderer.setStyle(document.documentElement, 'color-scheme', 'light')
      }
      this.renderer.addClass(document.body, theme.newValue);

    })
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['title'];
   }
}

