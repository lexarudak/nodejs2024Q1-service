import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export const artistDB = new Map<string, Artist>();
export const albumDB = new Map<string, Album>();
export const trackDB = new Map<string, Track>();

export const favArtistDB = new Map<string, Artist>();
export const favAlbumDB = new Map<string, Album>();
export const favTrackDB = new Map<string, Track>();
