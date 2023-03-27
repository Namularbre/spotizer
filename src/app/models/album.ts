import { AlbumType } from "./albumtype";
import { Artist } from "./artist";
import { Song } from "./song";

export class Album {
    constructor(private readonly _id : number, private _title : string, private _songs : Song[], private _albumType : AlbumType, private _artist : Artist, private _image : string) {}

    public get id() : number {
        return this._id;
    }

    public get title() : string {
        return this._title;
    }

    public get songs() : Song[] {
        return this._songs;
    }

    public get albumType() : AlbumType {
        return this._albumType;
    }

    public get artist() : Artist {
        return this._artist;
    }

    public get image() : string {
        return this._image;
    }
}
