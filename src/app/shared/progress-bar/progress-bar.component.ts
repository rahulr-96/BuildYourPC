import { Component, Input, OnInit } from "@angular/core";
import { Observable, interval, timer } from "rxjs";
import { map, scan, take, takeWhile } from "rxjs/operators";

@Component({
    selector: 'app-progress-bar',
    template: `
    <div class="progress" style="height: 5px;">
    <div class="progress-bar" role="progressbar" [style.width]="progress$ | async"  aria-valuemin="0" aria-valuemax="100"></div>
  </div>
    `
  })
export class AppProgressBar implements OnInit {
    progress$: Observable<string> = new Observable();

    @Input()
    time!: number;

    ngOnInit(): void {
        const numbers = interval(this.time/100);
        // this.progress$ = numbers.pipe(
        //   take(100),
        //   map((x) => x + '%')
        // );
        this.progress$ = timer(0, this.time/100).pipe(
            scan(acc => --acc, 100),
            takeWhile(x => x >= 0),
            map((a) => a + '%')
          )
    }
}