import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { CPUService } from '../products/cpu/cpu.service';
import { CPU } from '../products/cpu/cpu.model';
import { PCPartsService } from '../pcparts/pcparts.service';
import { CPUCooler } from '../products/cpu-cooler/cpu-cooler.model';
import { CPUCoolerService } from '../products/cpu-cooler/cpu-cooler.service';
import { MotherBoard } from '../products/motherboard/motherboard.model';
import { MotherBoardService } from '../products/motherboard/motherboard.service';
import { PCParts } from '../pcparts/pcparts.model';
import { Memory } from '../products/memory/memory.model';
import { MemoryService } from '../products/memory/memory.service';
import { Storage } from '../products/storage/storage.model';
import { StorageService } from '../products/storage/storage.service';
import { Videocard } from '../products/videocard/videocard.model';
import { VideocardService } from '../products/videocard/videocard.service';
import { Case } from '../products/case/case.model';
import { CaseService } from '../products/case/case.service';
import { Powersupply } from '../products/powersupply/powersupply.model';
import { PowersupplyService } from '../products/powersupply/powersupply.service';
import { SupabaseService } from '../supabase.service';
import { SearchResult } from './data-filter.service';
import * as products from 'src/app/products/products.type';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  joinQuery = `
  *,
  ComponentHead (
    ComponentName, Price
  )
`
  constructor(
    private http: HttpClient,
    private cpuService: CPUService,
    private cpuCoolerService: CPUCoolerService,
    private motherBoardService: MotherBoardService,
    private memoryService: MemoryService,
    private storageService: StorageService,
    private videocardService: VideocardService,
    private caseService: CaseService,
    private powersupplyService: PowersupplyService,
    private pcPartsService: PCPartsService,
    private supabaseService: SupabaseService
  ) {}



  // fetchCPU(){
  //   return this.http
  //     .get<CPU[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/cpu.json')
  //     .pipe( map((cpus) => {
  //         return cpus.map((cpu) => {
  //           return {
  //             ...cpu
  //           };
  //         });
  //       }), tap((cpus) => {
  //         this.cpuService.setCpus(cpus);
  //       })
  //     );
  // }

  async fetchCPU(){

    const cpus = await this.supabaseService.supabase
   
    .from('cpu')
    .select(this.joinQuery)

    .returns<CPU[]>()
    console.log(cpus)
    let lstcpus = cpus.data;
    this.cpuService.setCpus(lstcpus);
    return lstcpus
  }

  // fetchCPUCooler(){
  //   return this.http
  //     .get<CPUCooler[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/cpu-cooler.json')
  //     .pipe( map((cpuCooler) => {
  //         return cpuCooler.map((cpuCooler) => {
  //           return {
  //             ...cpuCooler
  //           };
  //         });
  //       }), tap((cpuCooler) => {
  //         this.cpuCoolerService.setCPUCoolers(cpuCooler);
  //       })
  //     );
  // }

  
  async fetchCPUCooler(){

    const cpucoolers = await this.supabaseService.supabase
    .from('cpu-cooler')
    .select(this.joinQuery)
    .returns<CPUCooler[]>()
    let lstcpucoolers = cpucoolers.data as CPUCooler[];
    console.log(lstcpucoolers)
    this.cpuCoolerService.setCPUCoolers(lstcpucoolers);
    return lstcpucoolers
  }

  // fetchMotherBoard(){
  //   return this.http
  //     .get<MotherBoard[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/motherboard.json')
  //     .pipe( map((motherboard) => {
  //         return motherboard.map((motherboard) => {
  //           return {
  //             ...motherboard
  //           };
  //         });
  //       }), tap((motherboard) => {
  //         this.motherBoardService.setMotherBoards(motherboard);
  //       })
  //     );
  // }

  async fetchMotherBoard(){
    const motherboards = await this.supabaseService.supabase
    .from('motherboard')
    .select(this.joinQuery)
    .returns<MotherBoard[]>()
    let lstmotherboards = motherboards.data;
    this.motherBoardService.setMotherBoards(lstmotherboards);
    return lstmotherboards
  }

  // fetchMemory(){
  //   return this.http
  //     .get<Memory[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/memory.json')
  //     .pipe( map((memory) => {
  //         return memory.map((memory) => {
  //           return {
  //             ...memory
  //           };
  //         });
  //       }), tap((memory) => {
  //         this.memoryService.setMemorys(memory);
  //       })
  //     );
  // }

  async fetchMemory(){
    const memorys = await this.supabaseService.supabase
    .from('memory')
    .select(this.joinQuery)
    .returns<Memory[]>()
    let lstmemorys = memorys.data;
    this.memoryService.setMemorys(lstmemorys);
    return lstmemorys
  }

  // fetchStorage(){
  //   return this.http
  //     .get<Storage[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/storage.json')
  //     .pipe( map((storage) => {
  //         return storage.map((storage) => {
  //           return {
  //             ...storage
  //           };
  //         });
  //       }), tap((storage) => {
  //         this.storageService.setStorages(storage);
  //       })
  //     );
  // }

  async fetchStorage(){
    const storages = await this.supabaseService.supabase
    .from('storage')
    .select(this.joinQuery)
    .returns<Storage[]>()
    let lststorages = storages.data;
    this.storageService.setStorages(lststorages);
    return lststorages
  }

  // fetchVideocard(){
  //   return this.http
  //     .get<Videocard[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/videocard.json')
  //     .pipe( map((videocard) => {
  //         return videocard.map((videocard) => {
  //           return {
  //             ...videocard
  //           };
  //         });
  //       }), tap((videocard) => {
  //         this.videocardService.setVideocards(videocard);
  //       })
  //     );
  // }

  async fetchVideocard(){
    const videocards = await this.supabaseService.supabase
    .from('videocard')
    .select(this.joinQuery)
    .returns<Videocard[]>()
    let lstvideocards = videocards.data;
    this.videocardService.setVideocards(lstvideocards);
    return lstvideocards
  }

  // fetchCase(){
  //   return this.http
  //     .get<Case[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/case.json')
  //     .pipe( map((Case) => {
  //         return Case.map((Case) => {
  //           return {
  //             ...Case
  //           };
  //         });
  //       }), tap((Case) => {
  //         this.caseService.setCases(Case);
  //       })
  //     );
  // }

  async fetchCase(){
      const cases = await this.supabaseService.supabase
      .from('case')
      .select(this.joinQuery)
      .returns<Case[]>()
      let lstCases = cases.data;
      this.caseService.setCases(lstCases);
      return lstCases
    }

  // fetchPowersupply(){
  //   return this.http
  //     .get<Powersupply[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/powersupply.json')
  //     .pipe( map((powersupply) => {
  //         return powersupply.map((powersupply) => {
  //           return {
  //             ...powersupply
  //           };
  //         });
  //       }), tap((powersupply) => {
  //         this.powersupplyService.setPowersupplys(powersupply);
  //       })
  //     );
  // }

  async fetchPowersupply(){
    const powersupplys = await this.supabaseService.supabase
    .from('power-supply')
    .select(this.joinQuery)
    .returns<Powersupply[]>()
    let lstpowersupplys = powersupplys.data;
    this.powersupplyService.setPowersupplys(lstpowersupplys);
    return lstpowersupplys
  }

  savePCParts() {
    const pcParts = this.pcPartsService.getPCparts();
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    this.http
      .put(
        'https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/pcBuild/'+userData.id+'/pcParts.json',
        pcParts
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchPCParts(){

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if(userData){
      return this.http
      .get<PCParts>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/pcBuild/'+userData.id+'/pcParts.json')
      // .subscribe(data => this.pcPartsService.storeAllPCparts(data))
      .pipe(map((pcparts) => {
        return pcparts
      }), tap((pcparts) => {
        this.pcPartsService.storeAllPCparts(pcparts);
      })
    );
    }
  }

  setPCPart(objSearchResult: SearchResult){
    const actionFor = objSearchResult.ComponentTypeCode

        switch(actionFor){
    
          case products.PCPART_CPU:
            var objPcParts = new PCParts();
            const cpus =  this.cpuService.getCpus()
            if(cpus.length === 0){
                this.fetchCPU()
                this.cpuService.cpusChanged.pipe(first())
                .subscribe(data => {
            
                    console.log('data')
                    const cpu =  data.find(obj => obj.id == objSearchResult.id)
                    objPcParts.CPU = cpu;
                    this.pcPartsService.storePCparts(actionFor, objPcParts);
                });
            }
            else{
               
                console.log('cpus')
                const cpu =  cpus.find(obj => obj.id == objSearchResult.id)
                objPcParts.CPU = cpu;
                this.pcPartsService.storePCparts(actionFor, objPcParts);
            }  

            break;

            case products.PCPART_CPUCOOLER:
              var objPcParts = new PCParts();
              const cpucoolers =  this.cpuCoolerService.getCPUCoolers()
              if(cpucoolers.length === 0){
                  this.fetchCPUCooler()
                  this.cpuCoolerService.CPUCoolersChanged.pipe(first())
                  .subscribe(data => {
              
                      console.log('data')
                      const cpucooler =  data.find(obj => obj.id == objSearchResult.id)
                      objPcParts.CPUCooler = cpucooler;
                      this.pcPartsService.storePCparts(actionFor, objPcParts);
                  });
              }
              else{
                 
                  console.log('cpucooler')
                  const cpucooler =  cpucoolers.find(obj => obj.id == objSearchResult.id)
                  objPcParts.CPUCooler = cpucooler;
                  this.pcPartsService.storePCparts(actionFor, objPcParts);
              }  
  
              break;

              case products.PCPART_MOTHERBOARD:
                var objPcParts = new PCParts();
                const motherboards =  this.motherBoardService.getMotherBoards()
                if(motherboards.length === 0){
                    this.fetchMotherBoard()
                    this.motherBoardService.MotherBoardsChanged.pipe(first())
                    .subscribe(data => {
                
                        console.log('data')
                        const motherboard =  data.find(obj => obj.id == objSearchResult.id)
                        objPcParts.MotherBoard = motherboard;
                        this.pcPartsService.storePCparts(actionFor, objPcParts);
                    });
                }
                else{
                   
                    console.log('motherboard')
                    const motherboard =  motherboards.find(obj => obj.id == objSearchResult.id)
                    objPcParts.MotherBoard = motherboard;
                    this.pcPartsService.storePCparts(actionFor, objPcParts);
                }  
    
                break;
    
 
                case products.PCPART_MEMORY:
                  var objPcParts = new PCParts();
                  const memorys =  this.memoryService.getMemorys()
                  if(memorys.length === 0){
                      this.fetchMemory()
                      this.memoryService.MemorysChanged.pipe(first())
                      .subscribe(data => {
                  
                          console.log('data')
                          const memory =  data.find(obj => obj.id == objSearchResult.id)
                          objPcParts.Memory = memory;
                          this.pcPartsService.storePCparts(actionFor, objPcParts);
                      });
                  }
                  else{
                     
                      console.log('memory')
                      const memory =  memorys.find(obj => obj.id == objSearchResult.id)
                      objPcParts.Memory = memory;
                      this.pcPartsService.storePCparts(actionFor, objPcParts);
                  }  
      
                  break;
    
        //   case products.PCPART_MEMORY:
        //     var objPcParts = new PCParts();
        //     objPcParts.Memory = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_STORAGE:
        //     var objPcParts = new PCParts();
        //     objPcParts.Storage = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_VIDEOCARD:
        //     var objPcParts = new PCParts();
        //     objPcParts.Videocard = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_CASE:
        //     var objPcParts = new PCParts();
        //     objPcParts.Case = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_POWERSUPPLY:
        //     var objPcParts = new PCParts();
        //     objPcParts.Powersupply = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
        }
  }

}
