new Vue({
    el: '#app',
    data: {
        
        title: 'Hello World!',
        tela: true,
        diasSemana:  [
                         {
                            index: 0,
                            day:'Seg',
                            ativo:true
                        },
                         {
                            index: 1,
                            day: 'Ter',
                             ativo:false
                            },
                         {
                            index: 2,
                            day: 'Qua',
                             ativo:false
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
                             ativo:false
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
                    maxDate     : new Date(2020, 12, 31),
                    yearRange   : [2010, 2020],
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
            /*
            this.tela=!this.tela;
            if(!this.tela)
            {
                this.gerarTabelaFinal();
            }
            */
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
            console.log("gerar tabela final");
            //Dia Padrão
            var defaultDay= {
                Dia:moment(this.dataAtual, 'DD/MM/YYYY'),
                DiaM:null,
                DiaS:null,
                funcoes:{}
            }
            this.listaFuncoes.forEach(x => {
                defaultDay.funcoes[x]="null";
            });

           console.log(defaultDay);
            
            //Lista de Irmaos padrao
            var defaultListaIrmao = this.listaIrmaos;

            var thisDay = defaultDay;
            var thisIrmaos = defaultListaIrmao;
            var dia1 = moment(this.dataAtual, 'DD/MM/YYYY');
            console.log(dia1);
            //dia1.add(1,'d');
            console.log(dia1);
            //fazer sorteio 20 vezes
            for (i=0;i<20;i++)
            {
                console.log("---------------------------");
                console.log("Loop sorteio i-"+i);
                
                //usados nessa reuniao
                
                thisDay = Object.create( defaultDay );
                thisDay.funcoes = {};
                this.listaFuncoes.forEach(x => {
                    thisDay.funcoes[x]="null";
                });

                thisIrmaos = this.listaIrmaos.slice();
                
                debugger;
                //thisDay.DiaM = (i==0) ? moment(this.getDiaDaSemana(moment(dia1)), 'DD/MM/YYYY') : moment(this.getDiaDaSemana(moment(this.tabelaFinal[i-1].DiaM)), 'DD/MM/YYYY');
                if (i==0)
                {
                    thisDay.Dia = moment(this.getDiaDaSemana(moment(dia1,'DD/MM/YYYY')), 'DD/MM/YYYY');
                }
                else
                {
                    thisDay.Dia = moment(this.getDiaDaSemana(moment(this.tabelaFinal[i-1].Dia,'DD/MM/YYYY')), 'DD/MM/YYYY');
                }
                console.log(thisDay.Dia);
                thisDay.DiaM = moment(thisDay.Dia).format('DD/MMM');
                thisDay.DiaS = moment(thisDay.Dia).format('ddd');
                
                //debugger;
                for(var abc in thisDay.funcoes)
                {
                    //console.log("--------");

                    do{
                        var d=Math.floor(Math.random() *  thisIrmaos.length);
                    }while (!thisIrmaos[d].funcoes[abc] || ((i>0) && (this.tabelaFinal[i-1].funcoes[abc].nome == thisIrmaos[d].nome)));

                    //console.log(!thisIrmaos[d].funcoes[abc] || ((i>0) && (this.tabelaFinal[i-1].funcoes[abc].nome == thisIrmaos[d].nome)));
                    //console.log((i>0) && (this.tabelaFinal[i-1].funcoes[abc].nome == thisIrmaos[d].nome));
                    
                    //console.log(thisIrmaos[d].funcoes[abc]);
                    thisDay.funcoes[abc] = thisIrmaos.splice(d,1)[0];
                    //console.log(abc);
                    //console.log(thisDay.funcoes[abc].nome);
                    
                    
                    //console.log(thisDay.funcoes[abc]);
                    

                }
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
            }

            
        },
        getDiaDaSemana: function (diaAtual)
        {
            debugger;
            do{
                diaAtual.add(1,'d');
            }while(!this.diasSemana.filter(x => x.ativo)
                                  .map(x => x.index)
                                  .includes(diaAtual.day())
            );

            diaAtual.add(1,'d');

            var lista = this.diasSemana.filter(x => x.ativo)
                                  .map(x => x.index);
                                  //.includes(diaAtual.day());
            
            var diada = diaAtual.day();

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
                this.log(Object.values(x.funcoes).some(y=>y==true));
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
