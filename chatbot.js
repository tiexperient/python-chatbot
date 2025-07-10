// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const { obterRespostaDaGemini } = require('./gemini');

// Caminho do Chromium (ajuste se necessário)
const client = new Client({
    puppeteer: {
        executablePath: 'C:\\chromium-browser\\chrome-win\\chrome.exe'
    }
});

// Mostra QR Code no terminal
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Conectado com sucesso
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

// Função delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// 🧠 Map para controlar usuários aguardando resposta
const aguardandoResposta = new Map();

// Escuta mensagens
client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|oie|oiee|oieee|e aê|qual a boa)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;

        await client.sendMessage(msg.from, 'Olá! ' + name.split(" ")[0] + '\n\nMeu nome é Uralinda Medeiros — um chat em Inteligência Artificial, linda por dentro e por fora 💾✨\n\nFui criada com muito amor e café pela minha Dev Mãe, *Célia Medeiros* ❤️.\nTô afiada hoje, então diz aí: em que posso te surpreender? ☕\n\nPor favor, digite uma das opções abaixo:\n\n1 - Me conte uma fofoca de robô 🤖 \n2 - Preciso de motivação 🌈 \n3 - Entrega da Shopee 🛍️ \n4 - Mandar um Pix lindo de presente! 🎁  \n5 - Tô sem assunto... será que vai chover em Brasília hoje? 🌩️ \n6 - Sem rodeios, robô! 😤');
    }

    // Opção 1 – Fofoca de robô
    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();

        try {

            let resposta = await obterRespostaDaGemini("Me conte uma fofoca de robô");
            resposta = resposta.normalize("NFC"); // 🔧 normaliza acentos
            await delay(3000);
            await client.sendMessage(msg.from, resposta);
        } catch (error) {
            await client.sendMessage(msg.from, "Ops! Não consegui trazer a fofoca agora, mas segura aí que logo eu solto uma bomba! 🤐💣");
        }
    }

    // Opção 2 – Motivação
    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();

        try {
            let resposta = await obterRespostaDaGemini("Me diga algo motivacional");
            resposta = resposta.normalize("NFC"); // 🔧 normaliza acentos
            await delay(3000);
            await client.sendMessage(msg.from, resposta);
        } catch (error) {
            await client.sendMessage(msg.from, "Ops! Não consegui trazer sua motivação agora. Mas não desiste, viu? 🌟");
        }
    }

    // Opção 3 – Entregador da Shopee
    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        // Cancela timeout anterior, se existir
        if (aguardandoResposta.has(msg.from)) {
            clearTimeout(aguardandoResposta.get(msg.from));
            aguardandoResposta.delete(msg.from);
        }

        await delay(1000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Shopee, minha terapia barata! 💸🧡\n\nBateu e ninguém escutou porque a casa é grande, tá preso no banheiro ou foi na padaria comprar um pão? 👂🛁🥖🚽\n\nRelaxa, minha estrela! 🌟\n\nTem uma galera top por aí que pode receber pra mim — tá tudo explicadinho no pacote! 📦🧾\n\nMas ó... se não rolar, faz o seguinte:\nTira uma fotinha bem tumblr do pacotinho 📸\nJoga com carinho na garagem (sem fazer igual entregador ninja, tá? 🥷)\nQuando eu chegar, pego com o maior amor do mundo! 🏠\n\nValeuuu, lindeza! 🤖\n\n');
    }

    // Opção 4 – Pix
    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Ohhh glória!!! 🙌\n\nDeixa Deus te usar, enquanto eu gero a chave 🎉🥳...');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'ebd7fb1c-0646-49c5-8cd7-07dca0066248');
    }

    // Opção 5 – Perguntas abertas
    /*if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Pode soltar o verbo! Manda sua pergunta aí — pode ser dúvida, curiosidade, ou até receita de pudim! 🍮\nPrometo que vou ler com carinho e entregar sua mensagem 🎤 ...');
    }*/

    // Opção 5 – Previsão do tempo no DF
    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();

        try {
            let resposta = await obterRespostaDaGemini("Em português dê a previsão do tempo para hoje e amanhã em Brasília, capital do Brasil, Distrito Federal, América do Sul. Fique a vontade para animar com emogis");
            resposta = resposta.normalize("NFC"); // 🔧 normaliza acentos
            await delay(3000);
            await client.sendMessage(msg.from, resposta);
        } catch (error) {
            await client.sendMessage(msg.from, "Tentei puxar a previsão do tempo em Brasília, mas acho que as nuvens encobriram até meus dados! ☁️📡\nTenta de novo mais tarde, tá? Prometo que da próxima vez até o sol vai querer aparecer! ☀️😉");
        }
    }


    // Opção 6 – Sem rodeios
    if (msg.body === '6' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        // Cancela timeout anterior, se existir
        if (aguardandoResposta.has(msg.from)) {
            clearTimeout(aguardandoResposta.get(msg.from));
            aguardandoResposta.delete(msg.from);
        }

        await delay(1000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Sem rodeios, tá bom! 🤖\n\nPeraí que a Dev Mãe tá processando a resposta na base do café ☕\n\nJá já ela te responde! 🦸‍♀️');

        // Inicia o timeout de 10 segundos para resposta automática
        const timeout = setTimeout(async () => {
            await client.sendMessage(msg.from, 'Opa! Minha musa não te respondeu ainda? \n\nTalvez ela tenha dado uma pausa pra fazer uma tapioca ou um café. Deixe aí a sua mensagem, receba a unção da paciência e fica na graça pra não perder a benção. Certeza que logo que possível ela vai te retornar! 💌💬⚡');
            aguardandoResposta.delete(msg.from);
        }, 30000); // ⏱️ 10 segundos

        // Salva o timeout no Map
        aguardandoResposta.set(msg.from, timeout);
    }
});