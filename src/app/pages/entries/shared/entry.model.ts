import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Category } from '../../categories/shared/category.model';

export class Entry extends BaseResourceModel {
  constructor(

    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category

    /*public id?: number,
    public mes?: string,
    public ano?: string,
    public dataVencimento?: string,
    public valor?: string,
    public situacao?: boolean,
    public dataPagamento?: string,
    public valorPago?: string,
    public codBarras?: string,
    public categoryId?: number,
    public category?: Category
    */
  ){ super(); }

  static types = {
    revenue: 'RECEITA',
    expense: 'DESPESA'
  };

  static fromJson(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  get paidText(): string {
    return this.paid ? 'PAGO' : 'PENDENTE';
  }

}
