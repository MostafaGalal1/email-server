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
    link : number[],
    name : string,
    type : string
}

export interface newAttachment {
    link : string,
    name : string,
}


