/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Toast }from 'bootstrap';
import { EventTypes } from '../models/event-types';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  @Input()
  type!: EventTypes;

  @Input()
  title!: string;

  @Input()
  message!: string;

  toast!: Toast;

  ngOnInit() {
    this.show();
  }

  show() {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      this.type === EventTypes.Error
        ? {
            autohide: false,
          }
        : {
            delay: 5000,
          }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
