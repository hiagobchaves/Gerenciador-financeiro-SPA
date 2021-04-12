import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { alunos } from '../models/alunos';
import { professores } from '../models/professores';

@Component({
  selector: 'spa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  valor!: number;
  quantidade!: number;
  exibeTabelaAlunos:  boolean = false;
  exibeTabelaProfessores: boolean = false;

  listaProfessores: professores[] = [
    { nome: 'Alex', especialidade: 'Inglês', email: 'alex@gmail.com', horario: 'manhã' },
    { nome: 'Teste', especialidade: 'Português', email: 'Teste@gmail.com', horario: 'tarde' },
    { nome: 'Teste 2', especialidade: 'Matemática', email: 'Teste2@gmail.com', horario: 'manhã' },
    { nome: 'Teste 3', especialidade: 'Geografia', email: 'Teste3@gmail.com', horario: 'noturno' }
  ];

  listaAlunos: alunos[] = [
    { nome: 'Camila', idade: 27, email: 'camila.taruma@gmail.com', curso: 'Ciencia da Computacao' },
    { nome: 'Teste', idade: 25, email: 'Teste@gmail.com', curso: 'Analise e desenvolvimento de sistemas' },
    { nome: 'Teste 2', idade: 31, email: 'Teste2@gmail.com', curso: 'Engenharia da computacao' },
    { nome: 'Teste 3', idade: 45, email: 'Teste3@gmail.com', curso: 'Sistemas da informacao' }
  ];

  displayedColumnAlunos: string[] = ['Nome', 'Idade', 'E-mail', 'Curso'];

  displayedColumnProfessores: string[] = ['Nome', 'Especialidade', 'E-mail', 'Horário'];

  ngOnInit(): void {
    this.valor = 5;
    this.quantidade = 10;
  }

  openModal() {
        // document
            // .querySelector('.modal-overlay')
            // .classList
            // .toggle('active')
  }

  aumentarValorAlunos() {
    this.valor++;
  }

  diminuirValorAlunos() {
    this.valor--;
  }

  reiniciarValorAlunos() {
    this.valor = 0;
  }

  exibirTabelaAlunos(){
    this.exibeTabelaAlunos = true;
  }

  aumentarQuantidadeProfessores() {
    this.quantidade++;
  }

  diminuirQuantidadeProfessores() {
    this.quantidade--;
  }

  reiniciarQuantidadeProfessores() {
    this.quantidade = 0;
  }

  exibirTabelaProfessores(){
    this.exibeTabelaProfessores = true;
  }
}
