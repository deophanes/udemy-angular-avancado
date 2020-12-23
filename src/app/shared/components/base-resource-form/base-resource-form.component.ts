import { OnInit, AfterContentChecked, Injector, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import { BaseResourceModel } from "../../models/base-resource.model"
import { BaseResourceService } from "../../services/base-resource.service"

import { switchMap } from 'rxjs/operators';
import { NotificationsService } from '../../../shared/notifications.service';
import { success, error } from 'toastr';

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serveErrorMessages: string[] = null;
  submittingForm = false;
  message: string[] = null;

  protected activeRouter: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  protected notifyService: NotificationsService;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataResourceFn: (jsonData) => T
  ) {
    this.activeRouter = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  setPageTitle() {
    if (this.currentAction == 'new'){
      this.pageTitle = 'Inclusão';
    } else {
      this.pageTitle = 'Alteração';
    }
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new'){
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected setCurrentAction() {
    if (this.activeRouter.snapshot.url[0].path == 'new') {
    this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource() {
    if (this.currentAction == 'edit'){
      this.activeRouter.paramMap.pipe(
        switchMap(params => this.resourceService.findById(+params.get('id')))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
        }
      ),
      (error) => alert('Ocorreu um erro no Servidor. Tente Novamente!');
    }
  }

  protected createResource() {
    const resource: T = this.jsonDataResourceFn(this.resourceForm.value);
    this.resourceService.create(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForErrors(error)

        //next => this.actionsForSuccess(next),
        //next => this.actionsForErrors(next)
      );
  }

  protected updateResource(){
    const resource: T = this.jsonDataResourceFn(this.resourceForm.value);
    this.resourceService.update(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForErrors(error)
      );
  }

  protected actionsForSuccess(resource: T){
    this.notifyService.showMesagem('Solicitação processada com Sucesso!', success);
    this.router.navigateByUrl('categories');
    /*this.router.navigateByUrl('categories', {skipLocationChange:true)
    .then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );*/
  }

  protected actionsForErrors(errors) {
    this.submittingForm = false;
    this.notifyService.showMesagem('Ocorreu um erro ao processar sua Solicitação!', error);
    if (errors.status == 422){
      this.serveErrorMessages = JSON.parse(errors._body).errors;
    } else {
      this.serveErrorMessages = ['Falha na comunicação com o Servidor. Tente mais tarde'];
    }
  }

  protected abstract buildResourceForm(): void;

}
