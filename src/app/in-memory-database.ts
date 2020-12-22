import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';


export class InMemoryDatabase implements InMemoryDbService {
  // tslint:disable-next-line: typedef
  createDb() {
    const categories: Category[]  =
          [{
              id: 1,
              name: 'Lazer',
              description: 'praia , lojas'
          },
          {
              id: 2,
              name: 'Moradia',
              description: 'aluguel'
          }, {
              id: 3,
              name: 'Salarios',
              description: 'salario'
          }, {
              id: 4,
              name: 'Saude',
              description: 'remedios'
          }];

    const entries: Entry[] =
          [{
            id: 1,
            name: 'Gas',
            paid: true,
            date: '01/01/2019',
            amount: '50,00',
            type: 'expense',
            description: 'Gas de cozinha',
            category: categories[1],
            categoryId: categories[1].id
          } as Entry ,
          {
            id: 2,
            name: 'Salario',
            paid: false,
            date: '01/05/2019',
            amount: '500,00',
            type: 'revenue',
            description: 'Salario mensal',
            category: categories[2],
            categoryId: categories[2].id
          } as Entry  ,
          {
            id: 3,
            name: 'Remedio',
            paid: false,
            date: '01/05/2019',
            amount: '200,00',
            type: 'expense',
            description: 'Remedio mensal',
            category: categories[3],
            categoryId: categories[3].id
          } as Entry]

    return { categories, entries };
  }
}
