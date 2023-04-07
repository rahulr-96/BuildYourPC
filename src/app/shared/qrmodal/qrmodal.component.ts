import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-qrnodal',
    templateUrl: './qrmodal.component.html'
})
export class QrModalComponent{
    @Input() qrData: string;
    @Output() close = new EventEmitter<void>();

    onClose(){
        this.close.emit();
    }
}
