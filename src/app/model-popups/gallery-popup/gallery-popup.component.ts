import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery-popup',
  templateUrl: './gallery-popup.component.html',
  styleUrls: ['./gallery-popup.component.scss']
})
export class GalleryPopupComponent {
  @Input() images: any;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,) {}

    closeModal(msg:any) {
      this.activeModal.dismiss(msg);
    }
}
