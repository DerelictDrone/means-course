import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NodeServer, NodePort, reqprotocol } from 'connection_config'
import { AuthData } from './auth-data-model'

@Injectable({providedIn: "root"})
export class AuthService {
  private token: string | any;

  getToken(){
    return this.token;
  }

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password}
    this.http.post(reqprotocol + "://" + NodeServer + ":" + NodePort + "/api/user/signup", authData)
    .subscribe (response => {
      console.log(response)
    })
  }

  login(email: string, password: string){
    const authData: AuthData = {email: email, password: password}
    this.http.post<{token: string}>(reqprotocol + "://" + NodeServer + ":" + NodePort + "/api/user/login", authData)
    .subscribe(response =>{
      const token = response.token
      this.token = token
    })
  }
}
