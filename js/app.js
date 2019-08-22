new Vue({
    el: '#app',
    data: {
        
        title: 'Hello World!',
        tela: true,
        diasSemana:  [
                         {
                            index: 0,
                            day:'S',
                            ativo:true
                        },
                         {
                            index: 1,
                            day: 'T',
                             ativo:false
                            },
                         {
                            index: 2,
                            day: 'Q',
                             ativo:false
                            },
                         {
                            index: 3,
                             day:'Q',
                             ativo:false
                            },
                         {
                            index: 4,
                             day:'S',
                             ativo:false
                            },
                         {
                            index: 5,
                             day:'S',
                             ativo:false
                            },
                         {
                            index: 6,
                             day:'D',
                             ativo:false
                            }
                         ],
        pickerSkeleton: null,
        dataAtual:moment().format('LTS'),
        proximaSegunda:moment().isoWeekday(3),
        listaIrmaos:[],
        listaFuncoes:['Indicador','Indicador/Microfone','Microfone','Som','Leitor'],
        inputIrmao:null,
        carregardatePicker:true,
        tabelaFinal:[]
    },
    mounted: function() {
        
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
            this.listaIrmaos.push({
                nome: irmao,
                funcoes:{}
            });
            this.listaFuncoes.forEach(x => {
                this.listaIrmaos[this.listaIrmaos.length-1].funcoes[x]=true;
            });
            this.inputIrmao=null;
        },
        log: function (e) {
            console.log(e);
        },
        trocarStatus: function(nome, index){
            //this.listaIrmaos[index].funcoes[nome] = !this.listaIrmaos[index].funcoes[nome];
            var local = this.listaIrmaos[index];
            local.funcoes[nome] = !local.funcoes[nome];
            this.listaIrmaos.splice(index,1,  local);
            console.log(this.listaIrmaos[index].funcoes[nome] );

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
                //this.log(Object.values(x.funcoes).some(y=>y==true));
                if(!Object.values(x.funcoes).some(y=>y==true))
                {
                    valido = false;
                    messages.push("Há Irmão "+x.nome+" sem função!");
                    this.log("Irmão "+x.nome+" sem função");
                }

            });

            //função sem irmão
            this.listaFuncoes.forEach(x => {
                valido1 = false;
                this.listaIrmaos.forEach(y => {
                    if(y.funcoes[x]) valido1 =true;
                });
                if(!valido1)
                {
                    messages.push("Há Função "+x+" sem irmão!");
                    this.log("Função "+x+" sem irmão");
                }
            });


            return valido;


        }

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
