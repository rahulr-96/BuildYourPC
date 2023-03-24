import {style,transition,trigger,animate,state,} from '@angular/animations';
import {Component,ElementRef,Input,OnInit,ViewChild,} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { PCParts } from 'src/app/pcparts/pcparts.model';
import { PCPartsService } from 'src/app/pcparts/pcparts.service';
import * as products from 'src/app/products/products.type';
import { Column, DataTableType } from './datatabletype.model';

@Component({
  selector: 'data-table-wrapper',
  templateUrl: './data-table-wrapper.component.html',
  animations: [
    trigger('contentExpansion', [
      state('collapsed', style({ width: '0' })),
      state('expanded', style({ width: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DataTableWrapperComponent implements OnInit{

  page: number = 1;

  @Input()
  public title: string;

  @Input()
  public tableConfig: DataTableType;

  @Input()
  public tableContent: products.Products[];

  public pageList: number[];

  public filter: number;

  public tableContentObs: BehaviorSubject<products.Products[]> = new BehaviorSubject(null);


  tableFilter = new FormControl();
  @ViewChild('testInput', { static: false }) tableFilterElem: ElementRef;

  constructor(private pcPartsService: PCPartsService, private router:Router) {}

  public ngOnInit(): void {

    this.tableFilter.valueChanges.
    pipe(startWith(''), debounceTime(500))
      .subscribe((val: string) => {
          if(val != ""){
            this.tableContentObs.next(
              this.tableContent.filter(
                (data) => data[this.tableConfig.columns[0].dataProperty].toLowerCase().indexOf(val.toLowerCase()) !== -1
              )
            );
          }
          else{
            this.tableContentObs.next(this.tableContent);
          }
      });
  }

  toggle(index: number) {
    if (this.filter == index) {
      this.filter = null;
    } else {
      this.filter = index;
      this.tableFilterElem.nativeElement.focus();

    }
  }

  sort(column: Column){

    if(column.sortable){
      const sortArr = this.tableContentObs.value.slice();

      if (column.sortOrder == true){
        this.tableContentObs.next(sortArr.sort((a, b) =>
        a[column.dataProperty] < b[column.dataProperty] ? 1 : a[column.dataProperty] > b[column.dataProperty] ? -1 : 0));
        column.sortOrder = !column.sortOrder;
      }
      else{
        this.tableContentObs.next(sortArr.sort((a, b) =>
        a[column.dataProperty] > b[column.dataProperty] ? 1 : a[column.dataProperty] < b[column.dataProperty] ? -1 : 0))
        column.sortOrder = !column.sortOrder
      }
    }
  }

  rowAction(actionFor: string, columnData:any){
    switch(actionFor){

      case products.PCPART_CPU:
        var objPcParts = new PCParts();
        objPcParts.CPU = columnData;
        this.pcPartsService.storePCparts(actionFor, objPcParts);
        this.router.navigate(['/list']);
        break;

      case products.PCPART_CPUCOOLER:
        var objPcParts = new PCParts();
        objPcParts.CPUCooler = columnData;
        this.pcPartsService.storePCparts(actionFor, objPcParts);
        this.router.navigate(['/list']);
        break;

      case products.PCPART_MOTHERBOARD:
        var objPcParts = new PCParts();
        objPcParts.MotherBoard = columnData;
        this.pcPartsService.storePCparts(actionFor, objPcParts);
        this.router.navigate(['/list']);
        break;

      case products.PCPART_MEMORY:
        var objPcParts = new PCParts();
        objPcParts.Memory = columnData;
        this.pcPartsService.storePCparts(actionFor, objPcParts);
        this.router.navigate(['/list']);
        break;

      case products.PCPART_STORAGE:
        var objPcParts = new PCParts();
        objPcParts.Storage = columnData;
        this.pcPartsService.storePCparts(actionFor, objPcParts);
        this.router.navigate(['/list']);
        break;

      case products.PCPART_VIDEOCARD:
        var objPcParts = new PCParts();
        objPcParts.Videocard = columnData;
        this.pcPartsService.storePCparts(actionFor, objPcParts);
        this.router.navigate(['/list']);
        break;

      case products.PCPART_CASE:
        var objPcParts = new PCParts();
        objPcParts.Case = columnData;
        this.pcPartsService.storePCparts(actionFor, objPcParts);
        this.router.navigate(['/list']);
        break;

      case products.PCPART_POWERSUPPLY:
        var objPcParts = new PCParts();
        objPcParts.Powersupply = columnData;
        this.pcPartsService.storePCparts(actionFor, objPcParts);
        this.router.navigate(['/list']);
        break;
    }

  }
}
