import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OMDbObject, OMDbResponse } from "../../types";

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) {}

  get(title: string) {
    const url = `http://www.omdbapi.com/?s=${title}&apikey=d9ca6866`;
    return this.http.get<OMDbResponse>(url);
  }

  getFullInformation(id: string) {
    const url = `http://www.omdbapi.com/?i=${id}&apikey=d9ca6866&plot=full`;
    return this.http.get<OMDbObject>(url);
  }
}
