import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
  album : any;
  albumSub: any;
  routeSub: any;
  addFavSub: any;
  
  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private mService: MusicDataService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      this.albumSub = this.mService.getAlbumById(params['id']).subscribe(data => this.album = data)
    });
  }

// Instead of checking the return value of the existing .addToFavourites(id) method from our MusicDataService,
// subscribe to it in order to see if it was successful.
  addToFavourites(id): void {
    this.addFavSub = this.mService.addToFavourites(id).subscribe(
      success => { 
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 })
      }, err => {
        this.snackBar.open("Unable to add song to Favourites", "Error", { duration: 1500 });
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.albumSub && this.albumSub.unsubscribe();
    this.routeSub && this.routeSub.unsubscribe();
    this.addFavSub && this.addFavSub.unsubscribe();
  }
}
