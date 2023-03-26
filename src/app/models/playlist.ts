import { Song } from "./song";

export class Playlist {
    constructor(private readonly _id : number, private _name : string, private _songs : Song[]) {}

    public get id() : number {
        return this._id;
    }

    public get name() : string {
        return this._name;
    }

    public get songs() : Song[] {
        return this._songs;
    }
}
