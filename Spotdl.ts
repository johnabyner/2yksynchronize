import { spawn } from 'node:child_process';
import path from 'node:path';

const spotdlPath = path.resolve("./.venv/bin/spotdl");
class Spotdl{
    static async metadataList(url:string, outputPath:string): Promise<void>{
        return new Promise((resolve, reject) => {
            const saveFilePath = path.join(outputPath, `{list-name}.spotdl`)
            // Argumentos separados corretamente no Array
            const args = ['save', url, '--save-file',saveFilePath];

            const spotdl = spawn(spotdlPath, args);

            //in case of error
            spotdl.stderr.on('data', (data:any) =>{
                console.error(`stderr: ${data}`);
            })

            //in the end
            spotdl.on('close', (code:number | null) => {
                if(code === 0){
                    console.log('metadata gerada com sucesso');
                    resolve();
                }else{
                    const err = new Error(`spotDL finalizou com código de erro ${code}`);
                    console.error(err.message);
                    reject(err);
                }
            }) 
        })
    }

    static async download(url: string, outputPath:string): Promise<void>{
        //track
        //playlist
        //album
        //artist
        return new Promise((resolve, reject) => {
            const spotdlFilePath = path.join(outputPath, 'metadata.spotdl');
            const outputAudio = path.join(outputPath, '{list-name}', '{artist}-{title}.{ext}');
            const args = ['download',url,'--save-file', spotdlFilePath,'--output',outputAudio];
            
            const spotdl = spawn(spotdlPath, args);

            spotdl.stderr.on('data', (data:any) =>{
                console.error(`stderr: ${data}`);
            })

            spotdl.on('close', (code:number | null) =>{
                if(code===0){
                    console.log(`download gerado com sucesso`);
                    resolve();
                }else{
                    const err = new Error(`spotdl finalizou com com codigo de erro ${code}`);
                    console.error(err.message);
                    reject(err);
                }
            })
        })
    }

    static async downloadSyncronized(folderPath: string, outputPath:string): Promise<void>{
        return new Promise((resolve, reject)=>{
            const spotdlFilePath = path.join(folderPath, 'metadata.spotdl');
            const outputAudio = path.join(outputPath, '{list-name}', '{artist}-{title}.{ext}');
        
            const args = ['sync', spotdlFilePath, '--save-file', spotdlFilePath, '--output', outputAudio];
            const spotdl = spawn(spotdlPath, args);

            spotdl.stderr.on('data', (data:any) => {
                console.error(`stderr: ${data}`);
            })

            spotdl.on('close', (code:number | null) =>{
                if(code===0){
                    console.log(`Download gerado com sucesso`);
                    resolve();
                }else{
                    const err = new Error(`spotdl finalizou com codigo de erro ${code}`);
                    console.error(err.message);
                    reject(err);
                }
            })
        })
    } 


    //colocar threads acima
    static async getAlbumsFromFolder(folderPath:string): Promise<void>{
        // não baixar o mesmo álbum duas vezes, e outra para verificar se o álbum já existe
    }

    static async downloadAlbuns(albums:any){
        //vai pegar o file e ler com stream
    } 
}

export default Spotdl