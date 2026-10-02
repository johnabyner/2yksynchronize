//source ./.venv/bin/activate
//npx tsx index.ts

//usar 8 threads

import Spotdl from "./Spotdl.js";

// Spotdl.metadataList("https://open.spotify.com/playlist/0FsTed41sEGTclCaKbMMqI?si=392baae0657946c0", "./output")

Spotdl.download("https://open.spotify.com/album/58NXIEYqmq5dQHg9nV9duM?si=da56f1e35a204023", "./musics");

// Spotdl.downloadSyncronized("", "")