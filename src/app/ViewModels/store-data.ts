export class StoreData {
    // name:string;
    constructor(public name:string
              , public imgURL:string
              , public branches: string[])
    {
        this.name = name;
        this.branches = branches;
        this.imgURL = imgURL;
    }
  }