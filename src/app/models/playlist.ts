import { Song } from "./song";

export class Playlist {
    constructor(private readonly id : number, private name : string, private songs : Song[]) {}
}
