import { OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { NotificationsService } from '../../services/notifications.service';

@Injectable()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  carregando = false;
  resources: T[] = [];
  private router: Router;
  protected notifyService: NotificationsService;

  constructor(private resourceService: BaseResourceService<T> ) { }

  ngOnInit() {
    console.log('passo 2')
    this.carregando = true;
    this.resourceService.findAll().subscribe(
      resources =>
        this.resources = resources.sort( (a, b) => b.id - a.id ),
      erro => alert('Erro ao Carregar lsita')
    );
    console.log('passo 3')
    this.carregando = false;
  }

  deleteResource(resource: T){
    const mustDelete = confirm('Deseja Excluir o Registro?');

    if (mustDelete){
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element !== resource),
        () => alert('Erro ao tentar excluir!')
      );
    }
  }

  updateResource(id: Number){
    console.log('update');
    this.router.navigateByUrl( 'new');
  }
}
