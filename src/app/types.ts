export interface OMDbResponse {
  Search: Film[];
  totalResults: number;
  Response: boolean;
}

export interface Film {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

export interface OMDbObject {
  Plot: string;
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
}
