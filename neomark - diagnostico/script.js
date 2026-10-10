// Base de Perguntas e Pesos (4 Pilares da Autoridade Jurídica NeoMark)
const perguntas = [
    // Pilar 1: Presença Digital & Branding (25 pontos)
    {
        pilar: "1. Presença Digital & Branding",
        titulo: "Como é a identidade visual e a presença web do seu escritório?",
        opcoes: [
            { texto: "Não temos site ou a identidade visual é antiga/amadora.", pontos: 0 },
            { texto: "Temos site simples e marca institucional padrão sem grande destaque.", pontos: 6 },
            { texto: "Marca executiva de alto nível e site moderno focado em conversão.", pontos: 12.5 }
        ]
    },
    {
        pilar: "1. Presença Digital & Branding",
        titulo: "Como são estruturados os perfis dos sócios no LinkedIn e Instagram?",
        opcoes: [
            { texto: "Inativos ou usados apenas para publicações pessoais.", pontos: 0 },
            { texto: "Ativos ocasionalmente, mas sem estratégia editorial clara.", pontos: 6 },
            { texto: "Perfis otimizados com autoridade técnica e posicionamento bem definido.", pontos: 12.5 }
        ]
    },
    // Pilar 2: Produção de Conteúdo & Prova Técnica (25 pontos)
    {
        pilar: "2. Produção de Conteúdo & Prova Técnica",
        titulo: "Com que frequência publica análises e artigos jurídicos estratégicos?",
        opcoes: [
            { texto: "Raramente ou nunca publicamos conteúdo.", pontos: 0 },
            { texto: "Apenas esporadicamente quando há alterações legislativas relevantes.", pontos: 6 },
            { texto: "Publicações semanais com foco na resolução de dores do cliente ideal.", pontos: 12.5 }
        ]
    },
    {
        pilar: "2. Produção de Conteúdo & Prova Técnica",
        titulo: "O escritório possui materiais aprofundados (teses, e-books ou pareceres abertos)?",
        opcoes: [
            { texto: "Não produzimos materiais institucionais ou autorais.", pontos: 0 },
            { texto: "Temos apenas apresentações institucionais em PDF.", pontos: 6 },
            { texto: "Criamos conteúdos autorais de alto valor que demonstram domínio técnico.", pontos: 12.5 }
        ]
    },
    // Pilar 3: Reputação & Prova de Mercado (25 pontos)
    {
        pilar: "3. Reputação & Prova de Mercado",
        titulo: "Qual a presença do seu escritório no Google Meu Negócio e imprensa?",
        opcoes: [
            { texto: "Sem perfil no Google Meu Negócio ou sem avaliações.", pontos: 0 },
            { texto: "Perfil ativo com poucas avaliações e sem presença na mídia.", pontos: 6 },
            { texto: "Múltiplas avaliações 5 estrelas e menções/citações na imprensa.", pontos: 12.5 }
        ]
    },
    {
        pilar: "3. Reputação & Prova de Mercado",
        titulo: "Os sócios são procurados como fonte de opinião em eventos e matérias?",
        opcoes: [
            { texto: "Nunca fomos procurados para entrevistas ou palestras.", pontos: 0 },
            { texto: "Ocasionalmente em portais regionais ou locais.", pontos: 6 },
            { texto: "Somos referência e fontes recorrentes no setor de atuação.", pontos: 12.5 }
        ]
    },
    // Pilar 4: Captação de Clientes & Vendas (25 pontos)
    {
        pilar: "4. Captação de Clientes & Vendas",
        titulo: "De onde vêm os novos clientes e casos do escritório?",
        opcoes: [
            { texto: "Dependemos 100% de indicações informais sem previsibilidade.", pontos: 0 },
            { texto: "Mistura de indicações com contatos pontuais das redes.", pontos: 6 },
            { texto: "Canal estruturado de atração que gera reuniões qualificadas todo mês.", pontos: 12.5 }
        ]
    },
    {
        pilar: "4. Captação de Clientes & Vendas",
        titulo: "Qual é a reação dos potenciais clientes frente aos seus honorários?",
        opcoes: [
            { texto: "Muitos acham caro, pedem desconto ou não fecham contrato.", pontos: 0 },
            { texto: "Fecham, mas costumam negociar bastante os valores.", pontos: 6 },
            { texto: "Reconhecem o valor da nossa autoridade e contratam sem leilão de preços.", pontos: 12.5 }
        ]
    }
];

let indiceAtual = 0;
let pontuacoes = [];
let dadosLead = {};

function iniciarDiagnostico() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    carregarPergunta();
}

function carregarPergunta() {
    const q = perguntas[indiceAtual];
    
    document.getElementById('pilar-indicator').innerText = q.pilar;
    document.getElementById('step-counter').innerText = `Questão ${indiceAtual + 1} de ${perguntas.length}`;
    
    const progresso = ((indiceAtual) / perguntas.length) * 100;
    document.getElementById('progress-bar').style.width = `${progresso}%`;

    document.getElementById('question-title').innerText = q.titulo;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.opcoes.forEach((opcao) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-4 sm:p-5 rounded-xl bg-[#121C26] border border-slate-800 hover:border-slate-400 hover:bg-[#1A2634] text-slate-200 transition-all text-sm sm:text-base flex items-center justify-between group shadow-md";
        btn.innerHTML = `
            <span class="pr-3 leading-relaxed">${opcao.texto}</span>
            <span class="w-5 h-5 rounded-full border border-slate-600 flex-shrink-0 group-hover:border-slate-200 transition-colors"></span>
        `;
        btn.onclick = () => selecionarResposta(opcao.pontos);
        container.appendChild(btn);
    });
}

function selecionarResposta(pontos) {
    pontuacoes.push(pontos);
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        carregarPergunta();
    } else {
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('lead-screen').classList.remove('hidden');
    }
}

function gerarRelatorioFinal(event) {
    event.preventDefault();

    dadosLead.nome = document.getElementById('lead-name').value;
    dadosLead.email = document.getElementById('lead-email').value;
    dadosLead.whatsapp = document.getElementById('lead-whatsapp').value;
    dadosLead.area = document.getElementById('lead-area').value;

    const totalPontos = Math.round(pontuacoes.reduce((acc, curr) => acc + curr, 0));

    document.getElementById('lead-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    animarScore(totalPontos);
    configurarResultados(totalPontos);
}

function animarScore(alvo) {
    let atual = 0;
    const elemento = document.getElementById('score-number');
    const timer = setInterval(() => {
        if (atual >= alvo) {
            clearInterval(timer);
            elemento.innerText = alvo;
        } else {
            atual++;
            elemento.innerText = atual;
        }
    }, 18);
}

function configurarResultados(score) {
    const nivelEl = document.getElementById('score-level');
    const descEl = document.getElementById('score-description');
    const recEl = document.getElementById('neomark-rec');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    let nivelTexto = "";
    let descTexto = "";
    let recTexto = "";

    if (score < 45) {
        nivelTexto = "Autoridade em Construção (Nível Inicial)";
        descTexto = "Seu escritório possui capacidade técnica, mas a percepção digital externa é fraca. Isso atrai clientes que negociam honorários excessivamente e comparam seu trabalho com a concorrência genérica.";
        recTexto = "Recomendação NeoMark: Reformulação da identidade visual executiva, criação de um site institucional de alta conversão e otimização da presença dos sócios no LinkedIn/Instagram.";
    } else if (score < 75) {
        nivelTexto = "Média Autoridade (Potencial Não Aproveitado)";
        descTexto = "Você já possui uma base sólida, mas perde negócios de alto ticket por falta de posicionamento contínuo, prova de mercado e estratégia de atração previsível.";
        recTexto = "Recomendação NeoMark: Implementação de linha editorial técnica avançada, fortalecimento da reputação no Google Meu Negócio e presença estratégica na imprensa do seu nicho.";
    } else {
        nivelTexto = "Autoridade de Elite (Posicionamento Forte)";
        descTexto = "Parabéns! O seu escritório transmite excelência e autoridade no mercado. O desafio atual é a escala previsível e a consolidação nacional da marca.";
        recTexto = "Recomendação NeoMark: Escalar a captação através de tráfego qualificado de alta performance direcionado a tomadores de decisão e estratégias de PR (assessoria de imprensa).";
    }

    nivelEl.innerText = nivelTexto;
    descEl.innerText = descTexto;
    recEl.innerText = recTexto;

    // Número de WhatsApp configurado: (74) 98839-9970
    const numeroNeoMark = "5574988399970"; 
    const mensagem = `Olá! Meu nome é ${dadosLead.nome} (${dadosLead.area}). Fiz o Diagnóstico de Autoridade da NeoMark e minha pontuação foi ${score}/100 (${nivelTexto}). Gostaria de agendar uma reunião estratégica.`;
    
    whatsappBtn.href = `https://wa.me/${numeroNeoMark}?text=${encodeURIComponent(mensagem)}`;
}