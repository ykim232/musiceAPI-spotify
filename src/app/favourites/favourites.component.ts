import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];
  favouritesSub: any;
  removeFavSub: any;

  constructor( private musicDataService: MusicDataService ){ }

  ngOnInit(): void {
    this.favouritesSub = this.musicDataService.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    })
  }

  removeFromFavourites(id: any): void {
    this.removeFavSub = this.musicDataService.removeFromFavourites(id).subscribe(data=>{
      this.favourites = data.tracks;
    })
  }

  ngOnDestroy(): void {
    this.favouritesSub && this.favouritesSub.unsubscribe();
    this.removeFavSub && this.removeFavSub.unsubscribe();
  }

}
