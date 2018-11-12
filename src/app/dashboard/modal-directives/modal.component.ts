import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'jw-modal',
    template:
        `<div class="modal fade" id="image-pop" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade in" style="display:none;"></div>
        `
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'jw-modal') {
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {

        this.element.style.display = 'block';
        this.element.querySelector("#image-pop").classList.add("in");
        this.element.querySelector("#image-pop").style.display = 'block';
        this.element.querySelector(".modal-backdrop").style.display = 'block';

        document.body.classList.add('jw-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        this.element.querySelector("#image-pop").classList.remove("in");
        this.element.querySelector("#image-pop").style.display = 'none';
        this.element.querySelector(".modal-backdrop").style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}
