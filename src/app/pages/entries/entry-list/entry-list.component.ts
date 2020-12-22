import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];
  private router: Router;

  constructor(private entryService: EntryService ) { }

  ngOnInit() {
    this.entryService.findAll().subscribe(
      entries => this.entries = entries.sort( (a, b) => b.id - a.id ),
      erro => alert('Erro ao Carregar lsita')
    );
  }

  deleteEntry(entry){
    const mustDelete = confirm('Deseja Excluir o Registro?');

    if (mustDelete){
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== entry),
        () => alert('Erro ao tentar excluir!')
      );
    }
  }

  updateEntry(id: Number){
    console.log('update');
    this.router.navigateByUrl( 'new');
  }
}
