import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
    apiHeader = new HttpHeaders();
    constructor(
        public httpClient: HttpClient
    ) {
        const contentType = this.apiHeader.append('Content-Type', 'text/html');
        contentType.append('Access-Control-Allow-Origin', '*');
    }
    public getList(start, limit) {
        const apiurl = `/api/testdata.php`;
        return this.httpClient.get(apiurl, { params: { start, limit }, headers: this.apiHeader });
    }
}
