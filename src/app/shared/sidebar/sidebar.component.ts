import { GifsService } from './../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent  {
  
  
  get record(){
    return this.gifsService.record;
  }
  
  constructor(private gifsService: GifsService) { }

  search(concept: string) {
    this.gifsService.searchGifs(concept);
  }



}
