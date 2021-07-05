import { Gif } from './../interface/git.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from '../interface/git.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public results: Gif[] = [];

  // WASC001

  private _record: string[] = [];
  private apiKey: string = 'GWj5bg46id8XFhnCyPL4JhN96yQT6EVl';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';


  get record() {
    return [...this._record];
  }

  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('records')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._record.includes(query)) {
      this._record.unshift(query);
      this._record = this._record.splice(0, 10);

      localStorage.setItem('records', JSON.stringify(this._record))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)


    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        console.log(res.data);
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(this.results))
      });
  }

  // WASC001
}
