import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs/promises';

const spotdlPath = path.resolve('./.venv/bin/spotdl');

class Spotdl {
    private static runCommand(args: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
            const spotdl = spawn(spotdlPath, args);

            spotdl.stderr.on('data', (data: Buffer) => {
                console.error(`stderr: ${data.toString()}`);
            });

            spotdl.on('close', (code: number | null) => {
                if (code === 0) {
                    console.log('Download completed successfully.');
                    resolve();
                    return;
                }

                const error = new Error(
                    `spotDL exited with error code ${code}`
                );

                console.error(error.message);
                reject(error);
            });

            spotdl.on('error', (error) => {
                reject(error);
            });
        });
    }

    static async metadataList(
        url: string,
        outputPath: string
    ): Promise<void> {
        const saveFilePath = path.join(
            outputPath,
            'metadata.spotdl'
        );

        try {
            await this.runCommand([
                'save',
                url,
                '--save-file',
                saveFilePath,
                '--threads',
                '8',
            ]);
        } catch (error) {
            console.error('Failed to generate metadata:', error);
        }
    }

    static async download(
        url: string,
        outputPath: string
    ): Promise<void> {
        const spotdlFilePath = path.join(
            outputPath,
            'metadata.spotdl'
        );

        const outputAudio = path.join(
            outputPath,
            '{list-name}',
            '{artist}-{title}'
        );

        try {
            await this.runCommand([
                'download',
                url,
                '--save-file',
                spotdlFilePath,
                '--output',
                outputAudio,
                '--threads',
                '8',
            ]);
        } catch (error) {
            console.error('Failed to download music:', error);
        }
    }

    static async downloadSynchronized(
        folderPath: string,
        outputPath: string
    ): Promise<void> {
        const spotdlFilePath = path.join(
            folderPath,
            'metadata.spotdl'
        );

        const outputAudio = path.join(
            outputPath,
            '{list-name}',
            '{artist}-{title}'
        );

        try {
            await this.runCommand([
                'sync',
                spotdlFilePath,
                '--output',
                outputAudio,
                '--threads',
                '8',
            ]);
        } catch (error) {
            console.error('Failed to synchronize music:', error);
        }
    }

    static async downloadLyrics(folderPath: string): Promise<void> {
        const files = await fs.readdir(folderPath);

        const audioExtensions = [
            '.mp3',
            '.flac',
            '.m4a',
            '.wav',
            '.ogg',
        ];

        const hasMusic = files.some((file) =>
            audioExtensions.includes(
                path.extname(file).toLowerCase()
            )
        );

        if (!hasMusic) {
            console.log('No music files were found in the folder.');
            return;
        }

        try {
            await this.runCommand([
                'meta',
                folderPath,
                '--generate-lrc',
                '--lyrics',
                'synced',
                'genius',
            ]);
        } catch (error) {
            console.error('Failed to download lyrics:', error);
        }
    }

    // Future features:
    //
    // static async getAlbumsFromFolder(folderPath: string): Promise<void> {
    //     // Detect albums that have not been downloaded yet.
    // }
    //
    // static async downloadAlbums(albums: string[]): Promise<void> {
    //     // Download the detected albums.
    // }
}

export default Spotdl;