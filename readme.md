# 2yksyncronize

A small project created mainly to **practice Node.js processes and external process integration** using TypeScript and `child_process`.

The project provides a simple wrapper around **spotDL**, allowing Node.js to execute spotDL commands programmatically.

---

## Features

* Execute spotDL commands from Node.js
* Generate and save playlist metadata
* Download music
* Synchronize downloaded music
* Generate synchronized `.lrc` lyrics
* Configure output directories
* Execute external processes using `child_process.spawn()`
* Handle process output and exit codes
* Handle process errors

---

## Project Goal

The main goal of this project was **learning and practicing Node.js processes**.

The project was created to better understand how Node.js can interact with external programs and command-line tools.

Some of the concepts explored during development include:

* `child_process`
* `spawn()`
* External process execution
* Command-line arguments
* Process exit codes
* Error handling
* File system operations
* Path manipulation
* Integrating Node.js with external tools

Rather than implementing all the functionality directly in Node.js, the project uses Node.js to **control and communicate with an external process**.

---

## Technologies

* Node.js
* TypeScript
* spotDL
* `child_process`
* `fs/promises`
* `path`

---

## Installation

### Prerequisites

You will need the following installed:

* **Node.js**
* **npm**
* **Python**
* **spotDL**

A recent version of Node.js is recommended.

### Clone the repository

```bash
git clone https://github.com/johnabyner/2yksynchronize
cd 2yksyncronize
```

### Install Node.js dependencies

```bash
npm install
```

### Create a Python virtual environment

```bash
python -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

### Install spotDL

```bash
pip install spotdl
```

---

## Running the Project

With the virtual environment activated:

```bash
npx tsx index.ts
```

Or, if a development script is configured in `package.json`:

```bash
npm run dev
```

---

## Example

The `Spotdl` class provides methods for interacting with **spotDL** programmatically.

### Download metadata

Generate a `metadata.spotdl` file from a Spotify playlist:

```ts
import Spotdl from './Spotdl.js';
import path from 'node:path';

const outputPath = path.resolve('./output');

await Spotdl.metadataList(
    'https://open.spotify.com/playlist/PLAYLIST_ID',
    outputPath
);
```

### Download music

Download an album or playlist using the generated metadata:

```ts
await Spotdl.download(
    'https://open.spotify.com/album/ALBUM_ID',
    outputPath
);
```

### Synchronize music

Use an existing `metadata.spotdl` file to synchronize the download:

```ts
await Spotdl.downloadSynchronized(
    outputPath,
    outputPath
);
```

### Download synchronized lyrics

Generate `.lrc` files with synchronized lyrics for the music in a folder:

```ts
await Spotdl.downloadLyrics(outputPath);
```

---

## Project Structure

```text
2yksyncronize/
├── Spotdl.ts
├── index.ts
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## Note

This is primarily a **learning project** focused on understanding Node.js processes and external command execution.

The goal was not to build a complete music management application, but to gain practical experience with **processes, command-line tools, file system operations, and Node.js automation**.
