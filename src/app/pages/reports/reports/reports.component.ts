import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../categories/shared/category.service';
import { EntryService } from '../../entries/shared/entry.service';
import { Entry } from '../../entries/shared/entry.model';
import { Category } from '../../categories/shared/category.model';

//import currencyFormatter from 'currencyFormatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  @ViewChild('month' , { static : false}) month: ElementRef = null;
  @ViewChild('year', { static : false}) year: ElementRef = null;

  categories: Category[] = []
  entries: Entry[] = []

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  generateReports() {

    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!month || !year)
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios')
    else
      this.entryService.getByFilter(month, year).subscribe(this.setValues.bind(this))
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    //this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type == 'revenue')
        revenueTotal += parseFloat( entry.amount )
      else
        expenseTotal += parseFloat( entry.amount );
    })

    this.expenseTotal = new Intl.NumberFormat('BRL', { style: 'currency', currency: 'BRL' }).format(expenseTotal);
    this.revenueTotal = new Intl.NumberFormat('BRL', { style: 'currency', currency: 'BRL' }).format(revenueTotal);
    this.balance = new Intl.NumberFormat('BRL', { style: 'currency', currency: 'BRL' }).format(revenueTotal - expenseTotal);
    console.log('push')

    /*this.entries.forEach(entry => {
      if (entry.type == 'revenue')
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'} )
      else
        expenseTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'} )
    })

    this.expenseTotal = currencyFormatter.format(expenseTotal, { code : 'BRL'} )
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code : 'BRL'} )
    this.balance = currencyFormatter.format(expenseTotal - revenueTotal, { code : 'BRL'} )
    */
  }
}
