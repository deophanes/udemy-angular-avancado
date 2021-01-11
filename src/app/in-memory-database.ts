import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';


export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[]  =
      [
        // Receitas
        {id : 1, description: 'SALARIO', name: 'RECEITA'},
        {id : 2, description: 'RESTITUICAO IR', name: 'RECEITA'},
        {id : 3, description: 'TRANSFERENCIAS', name: 'RECEITA'},

        // Despesas
        {id : 4, description: 'PRESTACAO APTO', name: 'DESPESA'},
        {id : 5, description: 'CELPE', name: 'DESPESA'},
        {id : 6, description: 'ALIMENTACAO', name: 'DESPESA'},
        {id : 7, description: 'RECARGA PRE PAGO', name: 'DESPESA'},
        {id : 8, description: 'TRANSPORTES/DIVERSOS', name: 'DESPESA'},
        {id : 9, description: 'JUROS CHEQUE ESPECIAL', name: 'DESPESA'},
        {id : 10, description: 'SEGURO AUTO', name: 'DESPESA'},
        {id : 11, description: 'NET HDTV', name: 'DESPESA'},
        {id : 12, description: 'RIACHUELO', name: 'DESPESA'},
        {id : 13, description: 'COLEGIO EDUC', name: 'DESPESA'},
        {id : 14, description: 'HIPERCARD', name: 'DESPESA'},
        {id : 15, description: 'MASTERCARD', name: 'DESPESA'},
        {id : 16, description: 'PLANO DE SAUDE', name: 'DESPESA'},
        {id : 17, description: 'CONDOMINIO', name: 'DESPESA'},
        {id : 18, description: 'PRO LABORE', name: 'DESPESA'},
      ];

    const entries: Entry[] =
      [
        {
          id: 1,
          name: 'PRO LABORE',
          paid: false,
          date: '01/01/2021',
          amount: '200,00',
          type: 'revenue',
          description: 'PRO LABORE',
          category: categories[17],
          categoryId: categories[17].id
        } as Entry,
        {
          id: 2,
          name: 'CELPE',
          paid: false,
          date: '01/01/2021',
          amount: '405,53',
          type: 'expense',
          description: 'CELPE',
          category: categories[4],
          categoryId: categories[4].id
        } as Entry,
        {
          id: 3,
          name: 'NET HDTV',
          paid: false,
          date: '05/01/2021',
          amount: '164,11',
          type: 'expense',
          description: 'NET HDTV',
          category: categories[10],
          categoryId: categories[10].id
        } as Entry,
        {
          id: 4,
          name: 'PLANO SAUDE',
          paid: false,
          date: '10/01/2021',
          amount: '170,00',
          type: 'expense',
          description: 'PLANO SAUDE',
          category: categories[15],
          categoryId: categories[15].id
        } as Entry


      ]

    return { categories, entries };
  }
}
