export interface Email {
    id : number;
    sender : string;
    receivers : string[];
    date : Date;
    subject : string;
    body : string;
    file : File[];
    priority : number,
}
export interface emailToSend {
    sender : string;
    receivers : string[];
    subject : string;
    body : string;
    priority : number,
}