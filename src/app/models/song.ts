export class Song {
    constructor(private readonly _id : number, private _title : string, private _artist : string, private _length : number, private _youtube : string) {}

    public get id() : number {
        return this._id;
    }

    public get title() : string {
        return this._title;
    }

    public get artist() : string {
        return this._artist;
    }

    public get length() : number {
        return this._length;
    }

    public get youtube() : string {
        return this._youtube;
    }
}
