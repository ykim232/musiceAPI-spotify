import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: any;
  resultsSub: any;
  paramsSub: any;

  constructor( private route: ActivatedRoute, private musicDataService: MusicDataService ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.queryParams.subscribe(params=>{
      this.resultsSub = this.musicDataService.searchArtists(params['q']).subscribe(data=>{
        this.results = data.artists.items.filter(result=> result.images.length > 0);
      });

      this.searchQuery = params['q'];
    });
  }

  ngOnDestroy(): void{
    this.paramsSub && this.paramsSub.unsubscribe();
    this.resultsSub && this.resultsSub.unsubscribe();
  }

}
