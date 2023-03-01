import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Videocard } from "src/app/products/videocard/videocard.model";

@Injectable()
export class VideocardService{
    private Videocards: Videocard[] = [];
    VideocardsChanged = new Subject<Videocard[]>();

    getVideocards(){
        return this.Videocards;
    }

    setVideocards(Videocards: Videocard[]){
        this.Videocards = Videocards;
        this.VideocardsChanged.next(this.Videocards.slice());
    }
}