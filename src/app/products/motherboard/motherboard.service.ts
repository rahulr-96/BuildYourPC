import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MotherBoard } from "src/app/products/motherboard/motherboard.model";

@Injectable()
export class MotherBoardService{
    private MotherBoards: MotherBoard[] = [];
    MotherBoardsChanged = new Subject<MotherBoard[]>();

    getMotherBoards(){
        return this.MotherBoards;
    }

    setMotherBoards(MotherBoards: MotherBoard[]){
        this.MotherBoards = MotherBoards;
        this.MotherBoardsChanged.next(this.MotherBoards.slice());
    }
}