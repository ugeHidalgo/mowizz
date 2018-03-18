import {ToastOptions} from 'ng2-toastr';

export class ToastrCustomOptions extends ToastOptions {
  toastLife = 2000;
  positionClass = 'toast-top-center';
  animate = 'flyLeft';
  newestOnTop = false;
  showCloseButton = true;
  titleClass = 'toastrCustomOptions.scss';
}

