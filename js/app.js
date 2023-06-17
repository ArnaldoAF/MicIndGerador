new Vue({
    el: '#app',
    data: {
        
        title: 'Hello World!',
        tela: true,
        diasSemana:  [
                         {
                            index: 0,
                            day:'Seg',
                            ativo:false
                        },
                         {
                            index: 1,
                            day: 'Ter',
                             ativo:false
                            },
                         {
                            index: 2,
                            day: 'Qua',
                             ativo:true
                            },
                         {
                            index: 3,
                             day:'Qui',
                             ativo:false
                            },
                         {
                            index: 4,
                             day:'Sex',
                             ativo:false
                            },
                         {
                            index: 5,
                             day:'Sab',
                             ativo:true
                            },
                         {
                            index: 6,
                             day:'Dom',
                             ativo:false
                            }
                         ],
        mesesLista: [
            {
                id: 1,
                month: 'Janeiro'
            },
            {
                id: 2,
                month: 'Fevereiro'
            },
            {
                id: 3,
                month: 'Março'
            },
            {
                id: 4,
                month: 'Abril'
            },
            {
                id: 5,
                month: 'Maio'
            },
            {
                id: 6,
                month: 'Junho'
            },
            {
                id: 7,
                month: 'Julho'
            },
            {
                id: 8,
                month: 'Agosto'
            },
            {
                id: 9,
                month: 'Setembro'
            },
            {
                id: 10,
                month: 'Outubro'
            },
            {
                id: 11,
                month: 'Novembro'
            },
            {
                id: 12,
                month: 'Dezembro'
            }

        ],
        anosLista: [],
        selectedAno: null,
        selectedMes: null,
        pickerSkeleton: null,
        dataAtual:moment().format('LTS'),
        proximaSegunda:moment().isoWeekday(3),
        listaIrmaos:[],
        listaFuncoes:[
            {
                name:'Indicador',
                qtd: 1,
                irmaos: []
            },
            {
                name:'Indicador/Microfone',
                qtd: 1,
                irmaos: []
            },
            {
                name:'Microfone',
                qtd: 1,
                irmaos: []
            },
            {
                name:'Som',
                qtd: 1,
                irmaos: []
            },
            {
                name:'Leitor',
                qtd: 1,
                irmaos: []
            }
        ],
        listaFuncoesTabelaFinal: [],
        inputIrmao:null,
        inputPrivilegio: null,
        carregardatePicker:true,
        tabelaFinal:[]
    },
    mounted: function() {
        const year = moment().year();
        const month = moment().month() + 1;
        console.log(month)

        this.anosLista=[year, year+1];
        this.selectedAno = year;
        this.selectedMes = month;
        
        this.addIrmao("Arnaldo");
        this.addIrmao("Silvio");
        this.addIrmao("Luca");
        this.addIrmao("Silvano");
        this.addIrmao("Aladir");
        this.addIrmao("Reginaldo");
    },
    updated() {

        //this.pickerSkeleton.setDate(this.dataAtual);

    },
    methods: {
        
        addIrmao: function(irmao) {
            const localIrmao = irmao.charAt(0).toUpperCase() + irmao.slice(1).toLowerCase();
            this.listaIrmaos.push({
                nome: localIrmao,
                funcoes:{}
            });
            this.listaFuncoes.forEach(x => {
                this.listaIrmaos[this.listaIrmaos.length-1].funcoes[x.name]=true;
            });
            this.inputIrmao=null;
        },
        addPrivilegio: function(privilegio) {
            const localPrivilegio = privilegio.charAt(0).toUpperCase() + privilegio.slice(1).toLowerCase();
            const obj = {
            name:localPrivilegio,
            qtd: 1,
            irmaos: []
        }
            this.listaFuncoes.push(obj);
            this.inputPrivilegio=null;
        },
        log: function (e) {
            console.log(e);
        },
        trocarStatus: function(funcaoIndex, irmaoIndex){
            console.log(funcaoIndex)
            console.log(irmaoIndex)
            let listaFucaoIrmaos = this.listaFuncoes[funcaoIndex].irmaos;

            if(!listaFucaoIrmaos.includes(irmaoIndex)) {
                listaFucaoIrmaos.push(irmaoIndex);
            }
            else {
                listaFucaoIrmaos = listaFucaoIrmaos.filter(x => x!=irmaoIndex)
            }

            this.listaFuncoes[funcaoIndex].irmaos = listaFucaoIrmaos;
            console.log(this.listaFuncoes[funcaoIndex])
            //this.listaIrmaos[irmaoIndex].funcoes[funcaoIndex] = !this.listaIrmaos[irmaoIndex].funcoes[funcaoIndex];
            // var local = this.listaIrmaos[irmaoIndex];
            // local.funcoes[funcaoIndex] = !local.funcoes[funcaoIndex];
            // this.listaIrmaos.splice(irmaoIndex,1,  local);
            // console.log(this.listaIrmaos[irmaoIndex].funcoes[funcaoIndex] );

        },
        newPikaday: function(){
            this.pickerSkeleton = new Pikaday({
                    format      : 'D/MMM/YYYY',
                    field       : document.getElementById('datepicker-skeleton'),
                    firstDay    : 1,
                    minDate     : new Date(2010, 0, 1),
                    maxDate     : new Date(2028, 12, 31),
                    yearRange   : [2010, 2028],
                    theme       : 'skeleton-theme',
                    firstDay    : 0,

                    i18n        : {
                        previousMonth : 'Mês Anterior',
                        nextMonth     : 'Próximo Mês',
                        months        : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                        weekdays      : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
                        weekdaysShort : ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
                    }
                });
        },
        ativarDatePicker: function()
        {
            
            if(this.carregardatePicker){ 
                this.newPikaday(); 
                console.log("novo datepicker");

                
            }
            this.carregardatePicker=false;
            
            

        },
        buttonGerar: function() 
        {
            this.validarGerar();
            
            this.tela=!this.tela;
            if(!this.tela)
            {
                this.gerarTabelaFinal();
            }
            
        },
        deleteIrmao: function(index) {
            console.log("deleteIrmao");
            const nome = this.listaIrmaos[index].nome;
            console.log("nome -> ", nome)
            this.listaIrmaos.splice(index,1);
            this.listaFuncoes = this.listaFuncoes.map(funcao => {
                funcao.irmaos = funcao.irmaos.filter(x => x!=nome)
                return funcao;
            })
            console.log("this.listaFuncoes");
            console.log(this.listaFuncoes);
        },
        gerarTabelaFinal: function()
        {
            this.tabelaFinal = [];
            console.warn("gerar tabela final");
            const tempDateString = `1/${this.selectedMes}/${this.selectedAno}`;
            //Dia Padrão
            var defaultDay= {
                Dia:moment(tempDateString, 'DD/MM/YYYY'),
                DiaM:null,
                DiaS:null,
                funcoes:[]
            }
            // this.listaFuncoes.forEach(x => {
            //     defaultDay.funcoes[x]="null";
            // });
            this.listaFuncoesTabelaFinal = [];
            this.listaFuncoes.forEach(funcao => {
                console.log(JSON.stringify(funcao));
                for (let i=0; i<funcao.qtd;i++) {
                    let tempFuncao = JSON.parse(JSON.stringify(funcao));
                    if(funcao.qtd > 1) 
                        tempFuncao.name = tempFuncao.name + " " + (i + 1);

                    this.listaFuncoesTabelaFinal.push(tempFuncao);
                }
            });

            console.log(this.listaFuncoesTabelaFinal);

            
            //Lista de Irmaos padrao
            var defaultListaIrmao = this.listaIrmaos;

            var thisDay = defaultDay;
            var thisIrmaos = defaultListaIrmao;
            var dia1 = moment(tempDateString, 'DD/MM/YYYY');
            //fazer sorteio 20 vezes
            let index = 0;
            while (thisDay.Dia.month() + 1 == this.selectedMes)
            {
                console.log("---------------------------");
                console.log("Loop sorteio i-"+index);
                
                //usados nessa reuniao
                
                thisDay = Object.create( defaultDay );
                // thisDayFuncoes = this.listaFuncoes.map(a => {return {...a}});
                thisDayFuncoes = JSON.parse(JSON.stringify(this.listaFuncoesTabelaFinal));
                thisDay.funcoes = [];
                // this.listaFuncoes.forEach(x => {
                //     thisDay.funcoes[x]="null";
                // });

                thisIrmaos = this.listaIrmaos.slice();
                
                // debugger;
                //thisDay.DiaM = (i==0) ? moment(this.getDiaDaSemana(moment(dia1)), 'DD/MM/YYYY') : moment(this.getDiaDaSemana(moment(this.tabelaFinal[i-1].DiaM)), 'DD/MM/YYYY');
                const tempDay1 = index==0 ? moment(dia1,'DD/MM/YYYY') : moment(this.tabelaFinal[index-1].Dia,'DD/MM/YYYY');
                const tempDay2 = this.getDiaDaSemana(tempDay1);
                thisDay.Dia = moment(tempDay2, 'DD/MM/YYYY');
                
                
                thisDay.DiaM = moment(thisDay.Dia).format('DD/MMM');
                thisDay.DiaS = moment(thisDay.Dia).format('ddd');
                console.log(thisDay.DiaM);
                console.log(thisDay.Dia.month());
                
                //debugger;
                console.log("FUNCAO");
                console.log(thisDayFuncoes);
                console.log(this.listaFuncoes);
                
                thisDayFuncoes.forEach(funcao => {
                    console.warn("-----------Random Generator------------");
                    console.log(funcao.name);
                    let validRandomNumber = true;
                    let i = 0
                    let randomIrmao = "";

                    do {
                        
                        validRandomNumber = true;
                        let randonNumber = Math.floor(Math.random() *  funcao.irmaos.length);
                        randomIrmao = funcao.irmaos[randonNumber];
                        console.log(randomIrmao);
                        console.log(thisDay.funcoes);
                        console.log(thisDay.funcoes.includes(randomIrmao));
                        console.log(validRandomNumber);
                        if (thisDay.funcoes.includes(randomIrmao)) {
                            validRandomNumber = false;
                            funcao.irmaos.splice(randonNumber, 1);
                        }
                        if (funcao.irmaos.length == 0) {
                            validRandomNumber = true;
                            randomIrmao = "ERRO";
                            console.log("ERRO")
                        }
                        i++;
                        debugger;

                    } while(validRandomNumber == false);
                    thisDay.funcoes.push(randomIrmao);

                })
                    
                
                // {
                //     //console.log("--------");

                //     do{
                //         var d=Math.floor(Math.random() *  thisIrmaos.length);
                //     }while (!thisIrmaos[d].funcoes[abc] || ((i>0) && (this.tabelaFinal[i-1].funcoes[abc].nome == thisIrmaos[d].nome)));

                //     //console.log(!thisIrmaos[d].funcoes[abc] || ((i>0) && (this.tabelaFinal[i-1].funcoes[abc].nome == thisIrmaos[d].nome)));
                //     //console.log((i>0) && (this.tabelaFinal[i-1].funcoes[abc].nome == thisIrmaos[d].nome));
                    
                //     //console.log(thisIrmaos[d].funcoes[abc]);
                //     thisDay.funcoes[abc] = thisIrmaos.splice(d,1)[0];
                //     //console.log(abc);
                //     //console.log(thisDay.funcoes[abc].nome);
                    
                    
                //     //console.log(thisDay.funcoes[abc]);
                    

                // }
                //debugger;
                /*

                //atribuindo as funções
                for(var x in thisDay.funcoes)
                {
                    var d=0;
                    console.log(x);
                    if (!thisIrmaos.some(y => y.funcoes[x])){
                        thisDay.funcoes[x] = "";
                        return;
                    }
                        


                    do{
                        d = Math.floor(Math.random() * thisDay.funcoes.length);
                    }while(!thisIrmaos[d].funcoes[x])

                    thisDay.funcoes[x] = thisIrmaos[d].nome;
                    
                } 
                */

                this.tabelaFinal.push(thisDay);
                debugger;
                index++;
                
            }
            console.log(this.tabelaFinal);
            
        },
        getDiaDaSemana: function (diaAtual)
        {
            // debugger;
            const diasDaSemanaAtivos = this.diasSemana.filter(x => x.ativo);
            const diasDaSemanaIndex = diasDaSemanaAtivos.map(x => x.index);

            do{
                diaAtual.add(1,'d');
            }while(!diasDaSemanaIndex.includes(diaAtual.day()));

            diaAtual.add(1,'d');

            

            console.log(diaAtual);
            return diaAtual;
        },
        mudarData: function()
        {
            //debugger
            var datalocal = this.pickerSkeleton.toString('DD/MM/YYYY');
            this.dataAtual=moment(datalocal, 'DD/MM/YYYY');

            //this.dataAtual.add(1,'d');
            
        },
        mudarDiaSemana: function(index) {
            //Função ñ deixa colocar mais de 2 dias da semana
            if(!this.diasSemana[index].ativo && (this.diasSemana.filter(x => x.ativo).length == 2)){
                this.diasSemana[index].ativo = this.diasSemana[index].ativo;
            }
            else{
                this.diasSemana[index].ativo = !this.diasSemana[index].ativo;
            } 
        },
        validarGerar: function()
        {
            valido = true;
            messages = [];
            //Irmão sem função
            this.listaIrmaos.forEach(x => {
                console.log(Object.values(x.funcoes).some(y=>y==true));
                if(!Object.values(x.funcoes).some(y=>y==true))
                {
                    valido = false;
                    messages.push("Há Irmão sem função!");
                }

            });


        },
        privilegioQtdPlus: function(index) {
            this.listaFuncoes[index].qtd++
        },
        privilegioQtdMinus: function(index) {
            if (this.listaFuncoes[index].qtd > 1) this.listaFuncoes[index].qtd--;
        },


    },
    watch: {
        listaIrmaos: function (x){
            console.log(this.listaIrmaos);
        },
        tela: function(x){
            console.log(x);
            if (x)
            {
                //this.ativarDatePicker();
                //this.newPikaday();
                console.log("--"+x);
                
            }
            this.carregardatePicker=x;
        }
    }
});
