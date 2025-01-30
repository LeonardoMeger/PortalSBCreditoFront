import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    constructor(private http:HttpClient) {}

    get Data(){
        return this.http.get('http://localhost:5000/api/Titulo')
    }
}