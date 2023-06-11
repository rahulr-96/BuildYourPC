import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastEvent } from '../models/toast-event';
import { ToastService } from '../toast.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent implements OnInit, OnDestroy {
  currentToasts: ToastEvent[] = [];
  private readonly destroy$ = new Subject();

  constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toastEvents
    .pipe(takeUntil(this.destroy$))
    .subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
        undoable: toasts.undoable
      };
      this.currentToasts.unshift(currentToast);
      this.cdr.detectChanges();
    });
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    console.log('currentToasts', this.currentToasts)
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
  }
}
