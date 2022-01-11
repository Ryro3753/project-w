export class Alert {

    constructor(
        public alertInfo:AlertInfo
    ) { }
  
  }
  

  export interface AlertInfo{
    id?: number,
    message: string,
    timeout?: number,
    type: 'success' | 'danger' | 'warning' | 'info' | 'dark'
  }