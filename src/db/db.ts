import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export const artistDB = new Map<string, Artist>();
export const albumDB = new Map<string, Album>();
export const trackDB = new Map<string, Track>();
export const usersDB = new Map<string, User>();
