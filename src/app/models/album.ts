import { AlbumType } from "./albumtype";
import { Song } from "./song";

export class Album {
    constructor(private readonly id : number, private title : string, private songs : Song[], private albumType : AlbumType, private artist : Artist, private image : string) {}
}
