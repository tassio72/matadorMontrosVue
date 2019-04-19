new Vue ({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,

        //start game
        running: false,

        //logs
        logs: []

    },
    computed: {
        hasResult() {
            //retorna se alguem zerar a life
            return this.playerLife == 0 || this.monsterLife == 0;
        }

    },
    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
            alert("2319!! TEMOS UM 2319!!");
            
        },
        attack(especialAttack) { //especialAttack recebe true quando acionado por Risada
            //função attack é acionada pelos botões. Ela chama a função hurt para calcular o quanto será descontado da life
            this.hurt('monsterLife',5,10, especialAttack, '2319', 'Monstro', 'player')//'(avatar, minHurt, maxHurt, especialAttack, NomeDeQuemMeferiu, QuemFoiFerido, Classe)';
            this.hurt('playerLife', 7, 12, false, 'Monstro', '2319', 'monster'); //'(avatar, minHurt, maxHurt, especialAttack, NomeDeQuemMeferiu, QuemFoiFerido, Classe)';
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0 //caso seja um Sorriso, o ataque será especial
            // vamos calcular o valor descontado da life
            const hurt = this.getRandom(min + plus, max + plus) //plus terá valor se for especial-attack
            //vamos fazer o calculo para atualizar as lifes na view
            //aqui será necessário usar o calculo de modulo (Math.max) para garantir que o calculo não fique a baixo de 0
            this[prop] = Math.max(this[prop] - hurt, 0)//menor valor posssível = 0
        
            //passando o log
            this.registerLog(`${source} atingiu ${target} com ${hurt} pontos.`, cls)
        },
        healAndHurt() {
            /*Ao clicar em curar, o player tanto ganha quanto perde life.
            Isso é calculado randomicamete */
            if (this.playerLife < 100) { //verificando se a life já tá com 100
                this.heal(10, 15); //calcula o tanto de life add
                this.hurt('playerLife', 7, 12, false, 'Monstro', '2319', 'monster'); //tira da life
                //passamos o false no parametro final para o especialAttack receber false
            }
                    },
        heal(min, max) {
            const heal = this.getRandom(min, max); //chamam getRandom pra gerar um valor
            this.playerLife = Math.min(this.playerLife + heal, 100); //precisamos usar Math.min para garantir que o curar não vair estourar life = 100
            this.registerLog(`2319 ganhou ${heal} biscoitinhos`, 'player')
        },
        getRandom(min, max) {
            /*A função serve para pegar valores aleatórios, que serão usados em attack e especial-attack. 
            Dando uma variadade na perca de life */
            const value = Math.random() * (max-min) + min;
            return Math.round(value);
        },
        registerLog(text, cls) {
            //fazendo log das ações. As informações vem da função hurt()
            this.logs.unshift( {text, cls }); //unshift coloca o elemento no inicio do array, é o contrário de push, 
        }

    },
    watch: {
        hasResult(value) {
           if (value) this.running = false;
        }
    }

})