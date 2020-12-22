import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  private router: Router;

  constructor(private categoryService: CategoryService ) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(
      categories => this.categories = categories,
      erro => alert('Erro ao Carregar lsita')
    );
  }

  deleteCategory(category){
    const mustDelete = confirm('Deseja Excluir o Registro?');

    if (mustDelete){
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element !== category),
        () => alert('Erro ao tentar excluir!')
      );
    }
  }

  updateCategory(id: Number){
    console.log('update');
    this.router.navigateByUrl( 'new');
  }
}
