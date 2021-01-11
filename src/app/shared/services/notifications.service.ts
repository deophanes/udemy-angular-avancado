import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { success, error, warning, info } from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  title = 'FINAN$YS';

  constructor(
    private toastr: ToastrService
  ) { }

  showMesagem(message, type){
    switch (type){
      case success: {
        this.toastr.success(message, this.title);
        break;
      }
      case error: {
        this.toastr.error(message, this.title);
        break;
      }
      case warning: {
        this.toastr.warning(message, this.title);
        break;
      }
      case info: {
        this.toastr.info(message, this.title);
        break;
      }
    }
  }
}
