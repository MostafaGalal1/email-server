export interface Email {
    id : number;
    sender : string;
    receivers : string[];
    date : Date;
    subject : string;
    body : string;
    priority : number;
}

export interface Attachment {
    link : string,
    name : string,
    type : string
}


