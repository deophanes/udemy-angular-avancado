import { Component, OnInit, Injector, Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})

@Injectable()
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandSeparetor: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector,
    protected notifyService: NotificationsService
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadCategories();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2) ]],
      description: [null, [Validators.required ]],
      type: [null, [Validators.required ]],
      amount: [null, [Validators.required ]],
      date: [null, [Validators.required ]],
      paid: [false, [Validators.required ]],
      categoryId: [null, [Validators.required ]]
    });
  }

  private loadCategories(){
    this.categoryService.findAll().subscribe(
      categories => this.categories = categories
    );
  }

  get typeOption(): Array<any>{
  return Object.entries(Entry.types).map(
    ([value, text]) => {
      return {
        text: text,
        value: value
      };
    });
  }
}
