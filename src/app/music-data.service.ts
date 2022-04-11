import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

let favouritesList: Array<any> = [];

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }
  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
      { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString: any): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }
  
  addToFavourites(id: string | null): boolean {
    if (id == null || id == 'undifined' || favouritesList.length >= 50) {
      return false;
    } else {
      favouritesList.push(id);
      return true; 
    }
  
  }

  removeFromFavourites(id: String): Observable<any> {
    favouritesList.splice(favouritesList.indexOf(id), 1); 
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      if (favouritesList.length >= 0) {
        return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/tracks?ids=${favouritesList.join()}`, 
        { headers: { "Authorization": `Bearer ${token}` } });
      } else {
        return new Observable(o=>o.next({tracks: []}));
      }
    }));
  }
}