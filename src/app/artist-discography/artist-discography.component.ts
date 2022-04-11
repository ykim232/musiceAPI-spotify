import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  artist : any;
  albums : any;
  artistSub: any;
  albumSub: any;
  routeSub: any;

  constructor(
    private route: ActivatedRoute, 
    private MusicDataService: MusicDataService)
  { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
        this.artistSub = this.MusicDataService.getArtistById(params['id']).subscribe(data=>{ this.artist = data });
        this.albumSub = this.MusicDataService.getAlbumsByArtistId(params['id']).subscribe(data=>{
          this.albums = data.items.filter((item: { name: any; }, index: any, self: any[])=>(
            index === self.findIndex((i: { name: any; })=>(
              i.name === item.name
            ))
          ));
        });
    });

  }

  ngOnDestroy(): void {
    this.artistSub && this.artistSub.unsubscribe();
    this.routeSub && this.routeSub.unsubscribe();
    this.albumSub && this.albumSub.unsubscribe();
  }
}
