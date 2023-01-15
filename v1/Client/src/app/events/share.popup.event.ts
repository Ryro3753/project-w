export class SharePopupEvent{
    constructor(public from: string){
    }
}

export class SharePopupUsernameEvent{
    constructor(public to: string,public username: string){
    }
}

export class SharePopupCloseEvent{
}