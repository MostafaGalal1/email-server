export interface Email {
    id : number;
    sender : string;
    receivers : string[];
    date : Date;
    subject : string;
    body : string;
    attachments : Attachment[]

}


export interface emailToSend {
    sender : string;
    receivers : string[];
    subject : string;
    body : string;
    priority : number,
    id : number,
    attachments: FormData
}

export interface Attachment {
    link : string,
    name : string,
    type : string
}


