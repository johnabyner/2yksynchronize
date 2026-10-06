import Spotdl from './Spotdl.js';
import path from 'node:path';

const outputPath = path.resolve('./output');

// Example:
// Spotdl.metadataList(
//     'https://open.spotify.com/playlist/PLAYLIST_ID',
//     outputPath
// );

// Example:
// Spotdl.download(
//     'https://open.spotify.com/album/ALBUM_ID',
//     outputPath
// );

// Example:
// Spotdl.downloadSynchronized(
//     outputPath,
//     outputPath
// );

// Example:
// Spotdl.downloadLyrics(outputPath);