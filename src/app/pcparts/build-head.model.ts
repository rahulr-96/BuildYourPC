import { BuildDetails } from "./build-details.model";

export class BuildHead{
    build_headid: number;
    userid: number;
    build_details: BuildDetails[];
    created_at: string;
}