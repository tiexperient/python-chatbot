const { exec } = require('child_process');

async function obterRespostaDaGemini(pergunta) {
    return new Promise((resolve, reject) => {
        exec(`python gemini_fofoca.py "${pergunta}"`, { encoding: 'utf8' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar Python: ${error.message}`);
                return reject("Erro ao consultar a IA.");
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
            }
            resolve(stdout.trim()); // Já está em UTF-8
        });
    });
}

module.exports = { obterRespostaDaGemini };
