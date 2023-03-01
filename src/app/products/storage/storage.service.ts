import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Storage } from "src/app/products/storage/storage.model";

@Injectable()
export class StorageService{
    private Storages: Storage[] = [];
    StoragesChanged = new Subject<Storage[]>();

    getStorages(){
        return this.Storages;
    }

    setStorages(Storages: Storage[]){
        this.Storages = Storages;
        this.StoragesChanged.next(this.Storages.slice());
    }
}