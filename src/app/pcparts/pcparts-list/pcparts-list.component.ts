import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { CPU } from "../../products/cpu/cpu.model";
import { PCParts } from "../pcparts.model";
import { PCPartsService } from "../pcparts.service";
import { Router } from "@angular/router";
import { DataStorageService } from "../../shared/data-storage.service";
import { Subscription } from "rxjs";

import { routeAnimations } from '../../shared/shared.module';
import { ToastService } from "src/app/shared/toast/toast.service";

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { FileUpload } from "../file-upload";
import { FileUploadService } from "../file-upload.service";
import { Modal } from 'bootstrap';
import { BuildDetails } from "../build-details.model";
import { ComponentHead } from "src/app/shared/component-head.model";
import { ComponentType } from "src/app/shared/component-type.model";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-pcparts-list',
  templateUrl: './pcparts-list.component.html',
  animations: [routeAnimations]
})
export class PCPartsListComponent implements OnDestroy {

  @ViewChild('modal', { static: true })
  modalEl!: ElementRef;

  //@ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  //subscription: Subscription;
  buildSubscription: Subscription;

  constructor(private pcPartsService: PCPartsService, private router: Router,
    private dataStorageService: DataStorageService, private toastService: ToastService,
    private uploadService: FileUploadService, private cdr: ChangeDetectorRef) { }

  _pcparts: PCParts = new PCParts();
  _build: BuildDetails[] = [];

  total: number = 0;

  displayStyle = "none";

  downloadUrl = "";

  private closeSub: Subscription;
  private urlSub: Subscription;

  qrLoading: boolean = false;
  saveLoading: boolean = false;

  lstComponentType: ComponentType[];

  ngOnInit() {

    //this.fetch();

    //this._pcparts = this.pcPartsService.getPCparts();
    const tempbuild = this.pcPartsService.getBuild();
    this.checkBuild(tempbuild ?? [])
    // this._build = [...tempbuild, ...this.checkBuild(tempbuild)] ;
    this.findTotal();

    // this.subscription = this.pcPartsService.pcPartsChanged.subscribe(data => {
    //   this._pcparts = data;
    //   this.findTotal();
    // })

    this.buildSubscription = this.pcPartsService.buildChanged.subscribe(data => {
      this._build =data
      this.checkBuild(data.slice())
      //this._build =[...data, ...this.checkBuild(data.slice())] ;
      //this.findTotal();
    })

    this.urlSub = this.uploadService.downloadURLChanges().subscribe(url => {


      //this.openPopup();
      const myModal = new Modal(this.modalEl.nativeElement);
      myModal.show();
      this.downloadUrl = url;
      this.qrLoading = false;
      this.cdr.detectChanges();
      // this.showErrorAlert(this.downloadUrl);
    })

  }

  addPcPart(rowIndex: number) {
    switch (rowIndex) {
      case 1:
        this.router.navigate(['/products/cpu'])
        break;
      case 2:
        this.router.navigate(['/products/cpuCooler'])
        break;
      case 3:
        this.router.navigate(['/products/motherboard'])
        break;
      case 4:
        this.router.navigate(['/products/memory'])
        break;
      case 5:
        this.router.navigate(['/products/storage'])
        break;
      case 6:
        this.router.navigate(['/products/case'])
        break;
      case 7:
        this.router.navigate(['/products/powersupply'])
        break;
      case 8:
        this.router.navigate(['/products/videocard'])
        break;
    }
  }

  save() {
    if(JSON.parse(localStorage.getItem('userData'))){
      this.saveLoading = true;
      this.dataStorageService.savePCParts().then(data=>{
        this.saveLoading = false;
      })
    }
    else{
      this.router.navigate(['/auth'])
    }
  }

  // fetch() {
  //   this.dataStorageService.fetchPCParts();
  // }

  ngOnDestroy(): void {
    //this.subscription?.unsubscribe();
    this.urlSub.unsubscribe();
    this.buildSubscription.unsubscribe();
  }

  findTotal() {

    this.total = 0;
    let i: number = 0;

    if (this._pcparts.CPU) {
      this.total += +this._pcparts.CPU.ComponentHead?.Price;
    }
    if (this._pcparts.CPUCooler) {
      this.total += +this._pcparts.CPUCooler.ComponentHead?.Price;
    }
    if (this._pcparts.Case) {
      this.total += +this._pcparts.Case.ComponentHead?.Price;
    }
    if (this._pcparts.Memory) {
      this.total += +this._pcparts.Memory.ComponentHead?.Price;
    }
    if (this._pcparts.MotherBoard) {
      this.total += +this._pcparts.MotherBoard.ComponentHead?.Price;
    }
    if (this._pcparts.Powersupply) {
      this.total += +this._pcparts.Powersupply.ComponentHead?.Price;

    }
    if (this._pcparts.Storage) {
      this.total += +this._pcparts.Storage.ComponentHead?.Price;

    }
    if (this._pcparts.Videocard) {
      this.total += +this._pcparts.Videocard.ComponentHead?.Price;

    }

  }

  // removePart(rowIndex: number) {
  //   switch (rowIndex) {
  //     case 1:
  //       this._pcparts.CPU = null;
  //       this.pcPartsService.storePCparts(PCPART_CPU, this._pcparts);
  //       this.showToast(PCPART_CPU)
  //       break;
  //     case 2:
  //       this._pcparts.CPUCooler = null;
  //       this.pcPartsService.storePCparts(PCPART_CPUCOOLER, this._pcparts);
  //       this.showToast(PCPART_CPUCOOLER)
  //       break;
  //     case 3:
  //       this._pcparts.MotherBoard = null;
  //       this.pcPartsService.storePCparts(PCPART_MOTHERBOARD, this._pcparts);
  //       this.showToast(PCPART_MOTHERBOARD)
  //       break;
  //     case 4:
  //       this._pcparts.Memory = null;
  //       this.pcPartsService.storePCparts(PCPART_MEMORY, this._pcparts);
  //       this.showToast(PCPART_MEMORY)
  //       break;
  //     case 5:
  //       this._pcparts.Storage = null;
  //       this.pcPartsService.storePCparts(PCPART_STORAGE, this._pcparts);
  //       this.showToast(PCPART_STORAGE)
  //       break;
  //     case 6:
  //       this._pcparts.Videocard = null;
  //       this.pcPartsService.storePCparts(PCPART_VIDEOCARD, this._pcparts);
  //       this.showToast(PCPART_VIDEOCARD)
  //       break;
  //     case 7:
  //       this._pcparts.Case = null;
  //       this.pcPartsService.storePCparts(PCPART_CASE, this._pcparts);
  //       this.showToast(PCPART_CASE)
  //       break;
  //     case 8:
  //       this._pcparts.Powersupply = null;
  //       this.pcPartsService.storePCparts(PCPART_POWERSUPPLY, this._pcparts);
  //       this.showToast(PCPART_POWERSUPPLY)
  //       break;
  //   }

  //   this.findTotal();
  // }

  showToast(pcPart: string) {
    this.toastService.showInfoToast('PC Build', pcPart + ' Removed');
  }

  download() {
    this.qrLoading = true;
    this.downloadUrl = undefined;
    this.cdr.detectChanges();
    let doc = new jsPDF();
    autoTable(doc, { html: '#table' });
    let pdf = doc.output("blob");
    this.upload(pdf);
  }

  upload(blob: Blob): void {
    // const file = this.selectedFiles.item(0);
    var file = new File([blob], "name.pdf");
    let currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(currentFileUpload);

  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  // private showErrorAlert(message: string){
  //   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(QrModalComponent);

  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //   const componentRef =  hostViewContainerRef.createComponent(alertCmpFactory);

  //   componentRef.instance.qrData = message;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   })
  // }

  checkBuild(lstBuildDetails: BuildDetails[]){
    
    if(this.pcPartsService.lstComponentType){
      this.lstComponentType= this.pcPartsService.lstComponentType
    }
    else{
      this.pcPartsService.ObslstComponentType
      .pipe(take(2))
      .subscribe(data => {
        this.lstComponentType = data
        this.makeTable(lstBuildDetails)
      })
    }
      return this.makeTable(lstBuildDetails);
  }

  removePart(componentHead: ComponentHead) {
    
    this.pcPartsService.updateBuild(this._build.filter(a=> a.ComponentHead.ComponentTypeID != componentHead.ComponentType.ComponentTypeID && a.ComponentHead.ComponentName != ''))
    this.findTotal();
    this.showToast(componentHead.ComponentName)
  }

  makeTable( lstBuildDetails: BuildDetails[]){
    let tmpResultlst: BuildDetails[] = [];
    const arr = this.lstComponentType
    if(arr){
      arr.forEach(a => {

        const found = lstBuildDetails.find(b => b.ComponentHead?.ComponentTypeID == a.ComponentTypeID)
  
        if (!found) {
  
          const objComponentHead = new ComponentHead();
          
          objComponentHead.ComponentName = '';
          objComponentHead.ComponentType = new ComponentType();
          objComponentHead.ComponentType.ComponentTypeID = a.ComponentTypeID;
          objComponentHead.ComponentType.ComponentTypeName = a.ComponentTypeName;
          objComponentHead.ComponentType.image = a.image;

          const objBuild:BuildDetails = {
            ComponentHead: objComponentHead,
            BuildDetailsID: 0,
            ComponentHeadID: 0,
            quantity: 0,
            details: undefined,
            build_headid: 0
          }
  
          tmpResultlst.push(objBuild)
        }
  
        
      })
    }

    this._build = [...lstBuildDetails, ...tmpResultlst] ;
    //return tmpResultlst

  }

}
