import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Transacoes } from 'src/app/model/transacoes';
import { TransacoesService } from 'src/app/pages/transacoes.service';

@Component({
  selector: 'gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {


displayedColumns: string[] = ['nome', 'valorTransacao',
  'diaTransacao', 'mesTransacao', 'anoTransacao', 'classificacaoTransacao', 'actions'];

transacoes: any = []; 
transacoesFiltrada: Transacoes[];  
single = [];
show = false;

  rangeFormGroup = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required)
  })

  constructor(private transacoesService: TransacoesService) { 
    this.transacoesService.getTransacoesHTTP().
    subscribe((transacoes) => {
      this.transacoes = transacoes;
    });
  }


  ngOnInit(): void {
 
  }

  Remover(transacao: Transacoes) {
    
    this.transacoesFiltrada = this.transacoesFiltrada.filter( item => {
      if (
        (item.nome === transacao.nome) &&  
        (item.anoTransacao === transacao.anoTransacao) &&  
        (item.classificacaoTransacao === transacao.classificacaoTransacao) &&  
        (item.diaTransacao === transacao.diaTransacao) &&  
        (item.mesTransacao === transacao.mesTransacao) &&  
        (item.anoTransacao === transacao.anoTransacao) &&  
        (item.valorTransacao === transacao.valorTransacao)  
      ){
       
     
        this.transacoesService.removeTransacaoHTTP(item.id); 
        this.transacoesService.removeTransacaoHTTP(item.id) 
          .subscribe(transacoes => {
            this.transacoes = transacoes;
         
          });
        return false;
      }
      else 
      {
        return true ;
      }
       
    });

   
  }

  atualizaTabela(){

  
          let dia = this.rangeFormGroup.value.start.getDate();
          let mes = this.rangeFormGroup.value.start.getMonth() + 1;
          let ano = this.rangeFormGroup.value.start.getYear() + 1900;
          var dateFrom = `${dia}/${mes}/${ano}`;
      
          dia = this.rangeFormGroup.value.end.getDate();
          mes = this.rangeFormGroup.value.end.getMonth() + 1;
          ano = this.rangeFormGroup.value.end.getYear() + 1900;
          var dateTo = `${dia}/${mes}/${ano}`;
      
          var d1 = dateFrom.split("/");
          var d2 = dateTo.split("/");
      
          var from = new Date(parseInt(d1[2]), parseInt(d1[1]) - 1, parseInt(d1[0]));  
          var to = new Date(parseInt(d2[2]), parseInt(d2[1]) - 1, parseInt(d2[0]));
      
      
          this.transacoesFiltrada = this.transacoes.filter(item => {
            dia = item.diaTransacao;
            mes = item.mesTransacao;
            ano = item.anoTransacao;
            var dateCheck = `${dia}/${mes}/${ano}`;
            var c = dateCheck.split("/");
            var check = new Date(parseInt(c[2]), parseInt(c[1]) - 1, parseInt(c[0]));
            return (this.dentroDoIntervalo(from, to, check))
          }
          );

  }
  
  atualizaGrafico(){

    let agrupamento =
      this.transacoesFiltrada.map(datum => ({
        name: datum.mesTransacao.toString() + '/' + datum.anoTransacao.toString(),
        value: datum.valorTransacao
      }));

    let objTotalPorData = this.agruparPor(agrupamento, 'name', 'value');
    let vecTotalPorData = [];
    let obj = {};

    for (var mesAno in objTotalPorData) {
      obj = {
        name: mesAno,
        value: objTotalPorData[mesAno],
      }
      vecTotalPorData.push(obj);
    }

    this.single =
      vecTotalPorData.map(datum => ({
        name: datum.name,
        value: datum.value
      }));
  }


  dentroDoIntervalo(from, to, check) {
    return ((check >= from && check <= to))
  }

  agruparPor(objetoArray, prop1, prop2) {
    return objetoArray.reduce(function (acc, obj) {
      let key = obj[prop1]; 
      let value = obj[prop2];
      if (!acc[key]) { 
        acc[key] = []; 
        acc[key] = parseFloat(value);   
      } else
        acc[key] += parseFloat(value);   
      return acc;
    }, {});
  }


  filtrar() {
     this.atualizaTabela();
     this.atualizaGrafico();
  }



}


 
     
     
