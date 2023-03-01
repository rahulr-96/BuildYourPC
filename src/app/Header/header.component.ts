import { Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import { ThemeService } from "../shared/theme-service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;
    private themeSub: Subscription;
    Theme: string = 'bootstrap-dark';
    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private themeService: ThemeService){}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user =>{
            this.isAuthenticated = !!user;
        });


        this.themeSub = this.themeService.themeSelection.subscribe(theme => {
          this.Theme = theme.newValue;
        })
    }


    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.themeSub.unsubscribe();
    }
}
