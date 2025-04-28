document.addEventListener("DOMContentLoaded", () => {
    // ======================
    // Configurações Iniciais
    // ======================
    const letras = document.querySelectorAll(".letra"); // Todas as letras
    const botao = document.getElementById("surpresa"); // Botão de início
    const musica = document.getElementById("musica"); // Elemento de áudio
    let animacaoAtiva = false; // Controle de estado
    // ======================
    // Função: Criar Fogos
    // ======================
    const criarFogos = () => {
        letras.forEach((letra) => {
            // Configurações únicas para cada fogo
            const destino = letra.getBoundingClientRect(); // Posição da letra
            const delayInicial = Math.random() * 1000; // Aleatório até 1s
            const duracaoMovimento = 800 + Math.random() * 800; // Entre 0.8s e 1.6s
            // Cria elemento fogo
            const fogo = document.createElement("div");
            fogo.className = "fogo";
            // Posição inicial aleatória (dentro da área visível)
            Object.assign(fogo.style, {
                left: `${Math.random() * (window.innerWidth - 100) + 50}px`,
                top: `${Math.random() * (window.innerHeight - 100) + 50}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Cor aleatória
                transition: `all ${duracaoMovimento}ms cubic-bezier(0.25, 0.1, 0.25, 1)` // Movimento único
            });
            document.body.appendChild(fogo);
            // Inicia animação após delay
            setTimeout(() => {
                // Move para a posição da letra
                fogo.style.left = `${destino.left + destino.width/2}px`;
                fogo.style.top = `${destino.top + destino.height/2}px`;
                // Quando terminar o movimento
                fogo.ontransitionend = () => {
                    // Ativa explosão
                    fogo.classList.add('explodindo');
                    // Revela a letra com efeito
                    letra.style.opacity = "1";
                    letra.style.transform = "translateY(0) scale(1.2)"; // Efeito "pop"
                    letra.style.color = fogo.style.backgroundColor; // Herda a cor do fogo
                    // Remove o fogo após explosão
                    fogo.addEventListener('animationend', () => {
                        fogo.remove();
                        letra.style.transform = "translateY(0) scale(1)"; // Reset
                    });
                };
            }, delayInicial);
        });
    };
    // ======================
    // Função: Criar Balões
    // ======================
    const criarBalao = () => {
        const balao = document.createElement("div");
        balao.className = "balao";
        // Configurações aleatórias
        Object.assign(balao.style, {
            left: `${Math.random() * window.innerWidth}px`, // Posição horizontal
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`, // Cor pastel
            animationDuration: `${4 + Math.random() * 4}s` // Velocidade única
        });
        document.body.appendChild(balao);
        // Auto-remoção após 20 segundos
        setTimeout(() => balao.remove(), 195000);
    };
    // ======================
    // Evento: Clique no Botão
    // ======================
    botao.addEventListener("click", () => {
        if(animacaoAtiva) return; // Evita múltiplos cliques
        animacaoAtiva = true;
        // Esconde botão e inicia música
        botao.style.display = "none";
        musica.play().catch(() => console.log("Permita o áudio para melhor experiência"));
        // Inicia efeitos
        criarFogos();
        // Cria balões por 15 segundos
        const intervaloBaloes = setInterval(criarBalao, 250);
        setTimeout(() => clearInterval(intervaloBaloes), 15000);
    });
});