import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})

export class DeleteDialogComponent {

  message: string;
  title: string;

  @ViewChild(ModalDirective) public deleteDialog: ModalDirective;
  public isModalShown = false;

  public showModal(title, message): void {
    const me = this;

    me.message = message;
    me.title = title;

    me.deleteDialog.show();
    me.isModalShown = true;
  }

  public hideModal(): void {
      this.deleteDialog.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
  }

}
