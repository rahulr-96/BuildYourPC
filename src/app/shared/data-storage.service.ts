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
import * as products from 'src/app/products/products.type';
import { BuildDetails } from '../pcparts/build-details.model';
import { ComponentHead } from './component-head.model';
import { BuildHead } from '../pcparts/build-head.model';
import { ComponentType } from './component-type.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  joinQuery = `
  *,
  ComponentHead (
    *, ComponentType(*)
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
  ) { }



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

  async fetchCPU() {

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


  async fetchCPUCooler() {

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

  async fetchMotherBoard() {
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

  async fetchMemory() {
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

  async fetchStorage() {
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

  async fetchVideocard() {
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

  async fetchCase() {
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

  async fetchPowersupply() {
    const powersupplys = await this.supabaseService.supabase
      .from('power-supply')
      .select(this.joinQuery)
      .returns<Powersupply[]>()
    let lstpowersupplys = powersupplys.data;
    this.powersupplyService.setPowersupplys(lstpowersupplys);
    return lstpowersupplys
  }

  savePCParts() {
    const pcParts = this.pcPartsService.getBuild();
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!this.pcPartsService.currentBuildHeadID) {
      this.insertheadrecord().then(data => {
        this.pcPartsService.currentBuildHeadID = data[0]?.build_headid;
        this.insertDetail();
      })
    }
    else {
      this.insertDetail();
    }


    // console.log('pcParts',pcParts)

    // this.http
    //   .put(
    //     'https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/pcBuild/'+userData.id+'/pcParts.json',
    //     pcParts
    //   )
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }

  fetchPCParts() {

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      //this.getBuild(userData.id)

      return this.http
        .get<PCParts>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/pcBuild/' + userData.id + '/pcParts.json')
        // .subscribe(data => this.pcPartsService.storeAllPCparts(data))
        .pipe(map((pcparts) => {
          return pcparts
        }), tap((pcparts) => {
          this.pcPartsService.storeAllPCparts(pcparts);
        })
        );


    }
  }

  async getBuild() {

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    this.getAllComponentTypes()

    if (userData) {
      let query = `build_headid, build_details (*, ComponentHead(*, ComponentType(*)))`

      const { data, error } = await this.supabaseService.supabase
        .from('build_head')
        .select(query)
        .eq('userid', userData.id)
        .returns<BuildHead[]>()
      console.log('data', data)
      this.pcPartsService.build = data[0]?.build_details;
      this.pcPartsService.buildChanged.next(data[0]?.build_details);
      this.pcPartsService.currentBuildHeadID = data[0]?.build_headid;
      
      return data[0]?.build_details
    }
  }

  setPCPart(objSearchResult: ComponentHead) {
    const actionFor = objSearchResult.ComponentTypeCode

    switch (actionFor) {

      case products.PCPART_CPU:
        const cpus = this.cpuService.getCpus()
        if (cpus.length === 0) {
          this.fetchCPU()
          this.cpuService.cpusChanged.pipe(first())
            .subscribe(data => {

              console.log('data')
              const cpu = data.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
              const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, cpu, this.pcPartsService.currentBuildHeadID)
              objBuildDetails.ComponentHead = cpu.ComponentHead;
              this.pcPartsService.storeBuild(objBuildDetails);
            });
        }
        else {

          console.log('cpus')
          const cpu = cpus.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
          const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, cpu, this.pcPartsService.currentBuildHeadID)
          objBuildDetails.ComponentHead = cpu.ComponentHead;
          this.pcPartsService.storeBuild(objBuildDetails);
        }

        break;

      case products.PCPART_CPUCOOLER:
        var objPcParts = new PCParts();
        const cpucoolers = this.cpuCoolerService.getCPUCoolers()
        if (cpucoolers.length === 0) {
          this.fetchCPUCooler()
          this.cpuCoolerService.CPUCoolersChanged.pipe(first())
            .subscribe(data => {

              console.log('data')
              const cpucooler = data.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
              const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, cpucooler, this.pcPartsService.currentBuildHeadID)
              objBuildDetails.ComponentHead = cpucooler.ComponentHead;
              this.pcPartsService.storeBuild(objBuildDetails);
            });
        }
        else {

          console.log('cpucooler')
          const cpucooler = cpucoolers.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
          const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, cpucooler, this.pcPartsService.currentBuildHeadID)
          objBuildDetails.ComponentHead = cpucooler.ComponentHead;
          this.pcPartsService.storeBuild(objBuildDetails);
        }

        break;

      case products.PCPART_MOTHERBOARD:
        var objPcParts = new PCParts();
        const motherboards = this.motherBoardService.getMotherBoards()
        if (motherboards.length === 0) {
          this.fetchMotherBoard()
          this.motherBoardService.MotherBoardsChanged.pipe(first())
            .subscribe(data => {

              console.log('data')
              const motherboard = data.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
              const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, motherboard, this.pcPartsService.currentBuildHeadID)
              objBuildDetails.ComponentHead = motherboard.ComponentHead;
              this.pcPartsService.storeBuild(objBuildDetails);
            });
        }
        else {

          console.log('motherboard')
          const motherboard = motherboards.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
          const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, motherboard, this.pcPartsService.currentBuildHeadID)
          objBuildDetails.ComponentHead = motherboard.ComponentHead;
          this.pcPartsService.storeBuild(objBuildDetails);
        }

        break;


      case products.PCPART_MEMORY:
        var objPcParts = new PCParts();
        const memorys = this.memoryService.getMemorys()
        if (memorys.length === 0) {
          this.fetchMemory()
          this.memoryService.MemorysChanged.pipe(first())
            .subscribe(data => {

              console.log('data')
              const memory = data.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
              const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, memory, this.pcPartsService.currentBuildHeadID)
              objBuildDetails.ComponentHead = memory.ComponentHead;
              this.pcPartsService.storeBuild(objBuildDetails);
            });
        }
        else {

          console.log('memory')
          const memory = memorys.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
          const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, memory, this.pcPartsService.currentBuildHeadID)
          objBuildDetails.ComponentHead = memory.ComponentHead;
          this.pcPartsService.storeBuild(objBuildDetails);
        }

        break;

      case products.PCPART_STORAGE:
        var objPcParts = new PCParts();
        const storages = this.storageService.getStorages()
        if (storages.length === 0) {
          this.fetchStorage()
          this.storageService.StoragesChanged.pipe(first())
            .subscribe(data => {

              console.log('data')
              const storage = data.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
              const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, storage, this.pcPartsService.currentBuildHeadID)
              objBuildDetails.ComponentHead = storage.ComponentHead;
              this.pcPartsService.storeBuild(objBuildDetails);
            });
        }
        else {

          console.log('storage')
          const storage = storages.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
          const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, storage, this.pcPartsService.currentBuildHeadID)
          objBuildDetails.ComponentHead = storage.ComponentHead;
          this.pcPartsService.storeBuild(objBuildDetails);
        }

        break;

      case products.PCPART_VIDEOCARD:
        var objPcParts = new PCParts();
        const videocards = this.videocardService.getVideocards()
        if (videocards.length === 0) {
          this.fetchVideocard()
          this.videocardService.VideocardsChanged.pipe(first())
            .subscribe(data => {

              console.log('data')
              const videocard = data.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
              const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, videocard, this.pcPartsService.currentBuildHeadID)
              objBuildDetails.ComponentHead = videocard.ComponentHead;
              this.pcPartsService.storeBuild(objBuildDetails);
            });
        }
        else {

          console.log('videocard')
          const videocard = videocards.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
          const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, videocard, this.pcPartsService.currentBuildHeadID)
          objBuildDetails.ComponentHead = videocard.ComponentHead;
          this.pcPartsService.storeBuild(objBuildDetails);
        }

        break;

      case products.PCPART_CASE:
        var objPcParts = new PCParts();
        const cases = this.caseService.getCases()
        if (cases.length === 0) {
          this.fetchCase()
          this.caseService.CasesChanged.pipe(first())
            .subscribe(data => {

              console.log('data')
              const Case = data.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
              const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, Case, this.pcPartsService.currentBuildHeadID)
              objBuildDetails.ComponentHead = Case.ComponentHead;
              this.pcPartsService.storeBuild(objBuildDetails);
            });
        }
        else {

          console.log('case')
          const Case = cases.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
          const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, Case, this.pcPartsService.currentBuildHeadID)
          objBuildDetails.ComponentHead = Case.ComponentHead;
          this.pcPartsService.storeBuild(objBuildDetails);
        }

        break;

      case products.PCPART_POWERSUPPLY:
        var objPcParts = new PCParts();
        const powerSupplies = this.powersupplyService.getPowersupplys()
        if (powerSupplies.length === 0) {
          this.fetchPowersupply()
          this.powersupplyService.PowersupplysChanged.pipe(first())
            .subscribe(data => {

              console.log('data')
              const powersupply = data.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
              const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, powersupply, this.pcPartsService.currentBuildHeadID)
              objBuildDetails.ComponentHead = powersupply.ComponentHead;
              this.pcPartsService.storeBuild(objBuildDetails);
            });
        }
        else {

          console.log('powersupply')
          const powersupply = powerSupplies.find(obj => obj.ComponentHead.ComponentHeadID == objSearchResult.ComponentHeadID)
          const objBuildDetails: BuildDetails = new BuildDetails(objSearchResult.ComponentHeadID, 1, powersupply, this.pcPartsService.currentBuildHeadID)
          objBuildDetails.ComponentHead = powersupply.ComponentHead;
          this.pcPartsService.storeBuild(objBuildDetails);
        }

        break;

    }
  }

  // async fetchBuild(){

  //   const build = await this.supabaseService.supabase
  //   .from('build')
  //   .select('*')
  //   .returns<BuildDetails>()
  //   let lstCases = build.data;
  //   console.log('build ', lstCases)
  // }


  async insertheadrecord() {

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    const { data, error } = await this.supabaseService.supabase
      .from('build_head')
      .insert({ userid: userData.id })
      .select()
      .returns<BuildHead[]>()

    // const { data, error } = await this.supabaseService.supabase
    // .from('build_head')
    // .insert({ build_headid: 0, userid: userData.id })
    // .select()
    // .returns<BuildHead>()

    return data

  }

  async insertDetail() {


    const build = this.pcPartsService.getBuild();
    let build_details: BuildDetails[] = []
    const buildHeadID = this.pcPartsService.currentBuildHeadID;

    const { data, error } = await this.supabaseService.supabase
      .from('build_details')
      .delete()
      .eq('build_headid', buildHeadID)


    build.forEach(a => {

      const objBuildDetails = new BuildDetails(a.ComponentHeadID, a.quantity, a.details, a.build_headid)
      build_details.push(objBuildDetails)
    })

    await this.supabaseService.supabase
      .from('build_details')
      .insert(build_details)

    // for (const property in pcParts) {
    //   console.log(`${property}: ${pcParts[property]}`);
    //   let objbuild_details: BuildDetails = new BuildDetails(pcParts[property].ComponentHeadID,1,pcParts[property],_buildHeadID)
    //   build_details.push(objbuild_details)
    // }
    // console.log('build_details', build_details)


    console.log('build', build)
  }

  async deleteBuildDetail() {

    const buildHeadID = this.pcPartsService.currentBuildHeadID;

    const { data, error } = await this.supabaseService.supabase
      .from('build_details')
      .delete()
      .eq('build_headid', buildHeadID)

  }

  async getAllComponentTypes() {

    let { data, error } = await this.supabaseService.supabase
      .from('ComponentType')
      .select('*')
      .returns<ComponentType[]>();
    this.pcPartsService.lstComponentType = data;
    this.pcPartsService.ObslstComponentType.next(data)
  }

}
