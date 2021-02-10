import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generateReports() {
    alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios')
  }
}
