import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { CPUService } from '../products/cpu/cpu.service';
import { CPU } from '../products/cpu/cpu.model';
import { PCPartsService } from '../pcparts-list/pcparts.service';
import { CPUCooler } from '../products/cpu-cooler/cpu-cooler.model';
import { CPUCoolerService } from '../products/cpu-cooler/cpu-cooler.service';
import { MotherBoard } from '../products/motherboard/motherboard.model';
import { MotherBoardService } from '../products/motherboard/motherboard.service';
import { PCParts } from '../pcparts-list/pcparts.model';
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

@Injectable({ providedIn: 'root' })
export class DataStorageService {
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
    private pcPartsService: PCPartsService
  ) {}



  fetchCPU(){
    return this.http
      .get<CPU[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/cpu.json')
      .pipe( map((cpus) => {
          return cpus.map((cpu) => {
            return {
              ...cpu
            };
          });
        }), tap((cpus) => {
          this.cpuService.setCpus(cpus);
        })
      );
  }

  fetchCPUCooler(){
    return this.http
      .get<CPUCooler[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/cpu-cooler.json')
      .pipe( map((cpuCooler) => {
          return cpuCooler.map((cpuCooler) => {
            return {
              ...cpuCooler
            };
          });
        }), tap((cpuCooler) => {
          this.cpuCoolerService.setCPUCoolers(cpuCooler);
        })
      );
  }

  fetchMotherBoard(){
    return this.http
      .get<MotherBoard[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/motherboard.json')
      .pipe( map((motherboard) => {
          return motherboard.map((motherboard) => {
            return {
              ...motherboard
            };
          });
        }), tap((motherboard) => {
          this.motherBoardService.setMotherBoards(motherboard);
        })
      );
  }

  fetchMemory(){
    return this.http
      .get<Memory[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/memory.json')
      .pipe( map((memory) => {
          return memory.map((memory) => {
            return {
              ...memory
            };
          });
        }), tap((memory) => {
          this.memoryService.setMemorys(memory);
        })
      );
  }

  fetchStorage(){
    return this.http
      .get<Storage[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/storage.json')
      .pipe( map((storage) => {
          return storage.map((storage) => {
            return {
              ...storage
            };
          });
        }), tap((storage) => {
          this.storageService.setStorages(storage);
        })
      );
  }

  fetchVideocard(){
    return this.http
      .get<Videocard[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/videocard.json')
      .pipe( map((videocard) => {
          return videocard.map((videocard) => {
            return {
              ...videocard
            };
          });
        }), tap((videocard) => {
          this.videocardService.setVideocards(videocard);
        })
      );
  }

  fetchCase(){
    return this.http
      .get<Case[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/case.json')
      .pipe( map((Case) => {
          return Case.map((Case) => {
            return {
              ...Case
            };
          });
        }), tap((Case) => {
          this.caseService.setCases(Case);
        })
      );
  }

  fetchPowersupply(){
    return this.http
      .get<Powersupply[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/powersupply.json')
      .pipe( map((powersupply) => {
          return powersupply.map((powersupply) => {
            return {
              ...powersupply
            };
          });
        }), tap((powersupply) => {
          this.powersupplyService.setPowersupplys(powersupply);
        })
      );
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
