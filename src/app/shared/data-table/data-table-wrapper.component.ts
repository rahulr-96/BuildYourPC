import { style, transition, trigger, animate, state, } from '@angular/animations';
import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, SimpleChanges, ViewChild, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { PCParts } from 'src/app/pcparts/pcparts.model';
import { PCPartsService } from 'src/app/pcparts/pcparts.service';
import * as products from 'src/app/products/products.type';
import { routeAnimations } from '../animations/route.animations';
import { PlaceholderDirective } from '../placeholder/placeholder.directive';

import { Column, DataTableType } from './datatabletype.model';
import { ToastService } from '../toast/toast.service';
import { Case } from 'src/app/products/case/case.model';
import { CPUCooler } from 'src/app/products/cpu-cooler/cpu-cooler.model';
import { CPU } from 'src/app/products/cpu/cpu.model';
import { Memory } from 'src/app/products/memory/memory.model';
import { MotherBoard } from 'src/app/products/motherboard/motherboard.model';
import { Powersupply } from 'src/app/products/powersupply/powersupply.model';
import { Videocard } from 'src/app/products/videocard/videocard.model';
import { Storage } from 'src/app/products/storage/storage.model';

@Component({
  selector: 'data-table-wrapper',
  templateUrl: './data-table-wrapper.component.html',
  animations: [
    routeAnimations,
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
export class DataTableWrapperComponent implements OnInit {

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
  @ViewChild('tableInput', { static: false }) tableFilterElem: ElementRef;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  constructor(private pcPartsService: PCPartsService, private router: Router, private toastService: ToastService) { }

  public ngOnInit(): void {

    this.tableFilter.valueChanges.
      pipe(startWith(''), debounceTime(500))
      .subscribe((val: string) => {
        if (val != "") {
          this.tableContentObs.next(
            this.tableContent.filter(
              (data) => data[this.tableConfig.columns[0].dataProperty].toLowerCase().indexOf(val.toLowerCase()) !== -1
            )
          );
        }
        else {
          this.tableContentObs.next(this.tableContent);
        }
      });
  }

  toggle(index: number) {
    if (this.filter == index) {
      this.filter = null;
    } else {
      this.filter = index;
      //this.tableFilterElem.nativeElement.focus();
      setTimeout(() => {
        this.tableFilterElem.nativeElement.focus();
      }, 100)

    }
  }

  sort(column: Column) {

    if (column.sortable) {
      const sortArr = this.tableContentObs.value.slice();

      if (column.sortOrder == true) {
        this.tableContentObs.next(sortArr.sort((a, b) =>
          a[column.dataProperty] < b[column.dataProperty] ? 1 : a[column.dataProperty] > b[column.dataProperty] ? -1 : 0));
        column.sortOrder = !column.sortOrder;
      }
      else {
        this.tableContentObs.next(sortArr.sort((a, b) =>
          a[column.dataProperty] > b[column.dataProperty] ? 1 : a[column.dataProperty] < b[column.dataProperty] ? -1 : 0))
        column.sortOrder = !column.sortOrder
      }
    }
  }

  // rowAction(actionFor: string, columnData: any) {
  //   switch (actionFor) {

  //     case products.PCPART_CPU:
  //       var objPcParts = new PCParts();
  //       objPcParts.CPU = columnData;
  //       this.pcPartsService.storePCparts(actionFor, objPcParts);
  //       this.router.navigate(['/list']);
  //       break;

  //     case products.PCPART_CPUCOOLER:
  //       var objPcParts = new PCParts();
  //       objPcParts.CPUCooler = columnData;
  //       this.pcPartsService.storePCparts(actionFor, objPcParts);
  //       this.router.navigate(['/list']);
  //       break;

  //     case products.PCPART_MOTHERBOARD:
  //       var objPcParts = new PCParts();
  //       objPcParts.MotherBoard = columnData;
  //       this.pcPartsService.storePCparts(actionFor, objPcParts);
  //       this.router.navigate(['/list']);
  //       break;

  //     case products.PCPART_MEMORY:
  //       var objPcParts = new PCParts();
  //       objPcParts.Memory = columnData;
  //       this.pcPartsService.storePCparts(actionFor, objPcParts);
  //       this.router.navigate(['/list']);
  //       break;

  //     case products.PCPART_STORAGE:
  //       var objPcParts = new PCParts();
  //       objPcParts.Storage = columnData;
  //       this.pcPartsService.storePCparts(actionFor, objPcParts);
  //       this.router.navigate(['/list']);
  //       break;

  //     case products.PCPART_VIDEOCARD:
  //       var objPcParts = new PCParts();
  //       objPcParts.Videocard = columnData;
  //       this.pcPartsService.storePCparts(actionFor, objPcParts);
  //       this.router.navigate(['/list']);
  //       break;

  //     case products.PCPART_CASE:
  //       var objPcParts = new PCParts();
  //       objPcParts.Case = columnData;
  //       this.pcPartsService.storePCparts(actionFor, objPcParts);
  //       this.router.navigate(['/list']);
  //       break;

  //     case products.PCPART_POWERSUPPLY:
  //       var objPcParts = new PCParts();
  //       objPcParts.Powersupply = columnData;
  //       this.pcPartsService.storePCparts(actionFor, objPcParts);
  //       this.router.navigate(['/list']);
  //       break;
  //   }

  //   this.showToast(actionFor);

  // }

  showToast(pcPart: string) {
    this.toastService.showInfoToast('PC Build', pcPart + ' Added');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges")
    this.tableContentObs.next(this.tableContent);
  }

  findColumnValue = (element: unknown, column: string): string => column.split('.').reduce((acc, cur) => acc[cur], element) as string;

  addBuild(columnData: CPU | CPUCooler | MotherBoard | Memory | Storage | Videocard | Case | Powersupply) {
    this.pcPartsService.setBuilld(columnData);
    this.router.navigate(['/list']);
    this.showToast(columnData.ComponentHead.ComponentName)
  }

}
