import { Album } from "./album";
import { Song } from "./song";

export class Artist {
    constructor(private readonly id : number, private name : string, private songs : Song[], private albums : Album[]) {}
}
