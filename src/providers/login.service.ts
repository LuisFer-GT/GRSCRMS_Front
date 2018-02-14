import { Injectable } from '@angular/core';
import { Http,Headers,Response} from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs";
import  "rxjs/add/operator/toPromise";

@Injectable()
export class LoginService {
  URL_API_USUARIO:string='https://'+window.localStorage.getItem('server')+'/api/v1/usuario';

  isLogged:boolean=false;
  constructor(private _http:Http,private toastCtrl: ToastController) { }
   public login(username:string,password:string){
     let headers = new Headers();
     let creds = `grant_type=password&username=${username}&password=${password}&scope=read`;
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     headers.append('charset','utf-8');
     headers.append('Authorization','Basic Y3JtOmdycy5lbGVjdHJvbmljcw==');

     return new Promise((resolve) => {
          this._http.post('https://'+window.localStorage.getItem('server')+'/oauth/token', creds, {headers:
          headers}).subscribe((data) => {
              if(data) {
                  window.sessionStorage.setItem('access_token',
                    data.json().access_token);
                  window.sessionStorage.setItem('expires_in',
                    data.json().expires_in);
                  window.sessionStorage.setItem('refresh_token',
                    data.json().refresh_token);
                  window.sessionStorage.setItem('token_type',
                    data.json().token_type);
                    window.sessionStorage.setItem('scope',
                      data.json().scope);

                }
                  resolve(this.isAuthenticated);
              },
              (err)=>{
                this.toastCtrl.create({
                  message: this.extractData(err).error_description,
                  duration: 3000,
                  position: 'bottom'
                }).present();
              }
          );
      });
   }

   isAuthenticated(){
     if(window.sessionStorage.getItem('access_token')===null){
        return false;
     }else{
       return true;
     }
   }

   logout(){
     window.sessionStorage.removeItem('access_token');
     window.sessionStorage.removeItem('expires_in');
     window.sessionStorage.removeItem('refresh_token');
     window.sessionStorage.removeItem('token_type');
     window.sessionStorage.removeItem('usuario');
     window.sessionStorage.removeItem('scope');
   }

   userInfo(){
     return this._http.get('https://'+window.localStorage.getItem('server')+'/api/v1/usuario/username',{
       headers: this.bearerAccess()
     }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
   }

   userLogged(){
     let usuario=window.sessionStorage.getItem('usuario');
     return JSON.parse(usuario);
   }

  validUser(username:string){
    return this._http.get('https://'+window.localStorage.getItem('server')+'/api/v1/validUser?username='+username,{
      headers: this.bearerAccess()
    }).toPromise();
  }



  bearerAccess():Headers{
     let headers = new Headers();
     headers.append('Authorization','Bearer '+window.sessionStorage.getItem('access_token'));
     return headers;
   }

  private extractData(res: Response) {
    let body = res.json();
    return body|| {};
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error);
    return Observable.throw(error);
  }
}
