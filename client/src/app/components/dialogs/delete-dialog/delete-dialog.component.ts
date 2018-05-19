import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})

export class DeleteDialogComponent {

  @ViewChild(ModalDirective) public deleteDialog: ModalDirective;
  public isModalShown = false;

  public showModal(): void {
      this.deleteDialog.show();
      this.isModalShown = true;
  }

  public hideModal(): void {
      this.deleteDialog.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
  }

}
