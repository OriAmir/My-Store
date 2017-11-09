import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";

const POST_ADDRESS = 'http://localhost:3000/sendmail/send';

@Injectable()
export class MailService {

    constructor(private httpClient: HttpClient) { }


    sendMail(body) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.httpClient.post(POST_ADDRESS, body, {headers: new HttpHeaders().set('Content-Type','application/json')})
        .catch((error: Response) => {
                //this.errorService.handleError(error.json());
                return Observable.throw(error);
            });
    }

    //create a confrimation template mail
    createRegMail(firstName: String, lastName: String,link: String) {
    var mail_content = `

    <h1 style="color: #5e9ca0;">Hi , ` + firstName + ' ' + lastName + ` </h1>
    <p><span style="color: #0000ff;">Please confirm your registration by clicking this <a href=`+ link +`>link</a>.</p><br />

    Thank you,<br/>My store team.
    `;
    return mail_content;
}

}