/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, fromEvent, interval } from 'rxjs';
import { Toast }from 'bootstrap';
import { EventTypes } from '../models/event-types';
import { take } from 'rxjs/operators';
import { CommandService } from '../../command.service';

export const toasterDelay = 5000;

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

  @Input()
  undoable!: boolean;

  toast!: Toast;
  
  maxStyleWidth: string;

  takeFourNumbers: Observable<number>;

  delay = toasterDelay;

  constructor(private commandService: CommandService){}

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
            delay: this.delay,
          }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();

    // this.takeFourNumbers.subscribe(x =>{
    //   this.maxStyleWidth = x + '%'
    //   console.log(this.maxStyleWidth)
    // } );
  }

  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }

  public onUndoClick(){
    this.commandService.undo();
    this.hide();
  }
}
