import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../categories/shared/category.service';
import { EntryService } from '../../entries/shared/entry.service';

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
}
