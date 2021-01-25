import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-model') pageModel: string;
  @Input('page-title') pageTitle: string;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltar() {
    return this.router.navigateByUrl('/categories');
  }

}
