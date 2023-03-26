import { Album } from "./album";
import { Song } from "./song";

export class Artist {
    constructor(private readonly _id : number, private _name : string, private _songs : Song[], private _albums : Album[]) {}

    public get id() : number {
        return this._id;
    }

    public get name() : string {
        return this._name;
    }

    public get songs() : Song[] {
        return this._songs;
    }

    public get albums() : Album[] {
        return this._albums;
    }
}
