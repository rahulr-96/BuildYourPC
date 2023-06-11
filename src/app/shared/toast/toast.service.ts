import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventTypes } from './models/event-types';
import { ToastEvent } from './models/toast-event';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  /**
   * Show success toast notification.
   * @param title Toast title
   * @param message Toast message
   */
  showSuccessToast(title: string, message: string, undoable: boolean) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Success,
      undoable
    });
  }

  /**
   * Show info toast notification.
   * @param title Toast title
   * @param message Toast message
   */
  showInfoToast(title: string, message: string, undoable: boolean) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Info,
      undoable
    });
  }

  /**
   * Show warning toast notification.
   * @param title Toast title
   * @param message Toast message
   */
  showWarningToast(title: string, message: string, undoable: boolean) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Warning,
      undoable
    });
  }

  /**
   * Show error toast notification.
   * @param title Toast title
   * @param message Toast message
   */
  showErrorToast(title: string, message: string, undoable: boolean) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Error,
      undoable
    });
  }
}
