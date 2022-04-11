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
  
  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private mService: MusicDataService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      this.albumSub = this.mService.getAlbumById(params['id']).subscribe(data => this.album = data)
    });
  }

  addToFavourites(trackID: string | null): void {
    if (this.mService.addToFavourites(trackID)) {
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    } else {
      this.snackBar.open("Unable to add song to Favourites", "Error", { duration: 1500 });
    }
  }

  ngOnDestroy(): void {
    this.albumSub && this.albumSub.unsubscribe();
    this.routeSub && this.routeSub.unsubscribe();
  }
}

