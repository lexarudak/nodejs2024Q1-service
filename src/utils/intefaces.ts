export type Artist = {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
};

export type Track = {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
};

export type Album = {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
};

export type Favorites = {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
};
