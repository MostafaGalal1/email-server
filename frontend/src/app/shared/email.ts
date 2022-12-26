export interface Email {
    id : string;
    sender : string;
    recievers : string[];
    date : Date;
    subject : string;
    body : string;
}
