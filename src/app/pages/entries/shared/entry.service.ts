import { Injectable, Injector } from '@angular/core';

import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.model';
import { flatMap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super('api/entries', injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSendToServer(
    entry: Entry,
    sendFn: any
  ): Observable<Entry> {
    return this.categoryService.findById(entry.categoryId).pipe(
      flatMap((category) => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

  getByFilter(month: number, year: number): Observable<Entry[]> {
    /*this.http.get('api/entries?month=m&yaer=y').subscribe(
      entries
    )*/

    return this.findAll().pipe(
      map((entries) => this.filterMothAndYear(entries, month, year))
    );
  }

  // Foi feito dessa forma pois não temos o backend feito
  private filterMothAndYear(
    entries: Entry[],
    month: number,
    year: number
  ): any {
    return entries.filter((entry) => {
      const entryDate = moment(entry.date, 'dd/mm/yyyy');
      const monthMathes = entryDate.month() + 1 == month;
      const yaerMathes = entryDate.year() == year;

      if (monthMathes && yaerMathes) {
        return entry;
      }
    });
  }
}
