import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ConstatService {
    public url = '/postes/constat';
    constructor(private httpClient: HttpClient) { }
    
    /**
     * getProjets
     */
    public getConstats(query: any) {
        return this.httpClient.get(this.url, query);
    }

    /**
     * getProjets
     */
    public getConstat(id: string) {
        return this.httpClient.get(`${this.url}/${id}`);
    }

    /**
     * getProjets
     */
    public createConstat(poste: any) {
        return this.httpClient.post(`${this.url}`, poste);
    }

}