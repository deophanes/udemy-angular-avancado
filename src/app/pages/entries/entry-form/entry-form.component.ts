import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { switchMap } from 'rxjs/operators';
import { NotificationsService } from '../../../shared/notifications.service';
import { success, error } from 'toastr';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked{

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serveErrorMessages: string[] = null;
  submittingForm = false;
  entry: Entry = new Entry();
  categories: Array<Category>;
  message: string[] = null;

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
    private entryService: EntryService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifyService: NotificationsService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategories();
  }

  setCurrentAction() {
    if (this.activeRouter.snapshot.url[0].path == 'new') {
    this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  buildEntryForm() {
    this.entryForm = this.formBuilder.group({
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

  loadEntry() {
    if (this.currentAction == 'edit'){
      this.activeRouter.paramMap.pipe(
        switchMap(params => this.entryService.findById(+params.get('id')))
      ).subscribe(
        (entry) => {
          entry = entry;
          this.entryForm.patchValue(entry);
        }
      ),
      (error) => alert('Ocorreu um erro no Servidor. Tente Novamente!');
    }
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  setPageTitle() {
    if (this.currentAction == 'new'){
      this.pageTitle = 'Inclusão';
    } else {
      this.pageTitle = 'Alteração';
    }
  }

  submitForm(){
    this.submittingForm = true;
    if (this.currentAction == 'new'){
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  private createEntry() {
    const entry: Entry =  Entry.fromJson(this.entryForm.value);
    this.entryService.create(entry)
      .subscribe(
        next => this.actionsForSuccess(next),
        next => this.actionsForErrors(next)
      );
  }

  private actionsForErrors(errors) {
    this.submittingForm = false;
    this.notifyService.showMesagem('Ocorreu um erro ao processar sua Solicitação!', error);

    if (errors.status == 422){
      this.serveErrorMessages = JSON.parse(errors._body).errors;
    } else {
      this.serveErrorMessages = ['Falha na comunicação com o Servidor. Tente mais tarde'];
    }
  }

  private actionsForSuccess(entry: Entry){
    this.notifyService.showMesagem('Solicitação processada com Sucesso!', success);
    this.router.navigateByUrl('entries');

    /*this.router.navigateByUrl('entries', {skipLocationChange:true)
    .then(
      () => this.router.navigate(['entries', entry.id, 'edit'])
    );*/
  }

  private updateEntry(){
    const entry: Entry = Entry.fromJson(this.entryForm.value);
    this.entryService.update(entry)
      .subscribe(
        next => this.actionsForSuccess(next),
        next => this.actionsForErrors(next)
      );
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
