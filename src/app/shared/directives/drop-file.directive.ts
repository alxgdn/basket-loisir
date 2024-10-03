import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dropFile]',
  standalone: true,
})
export class DropFileDirective {

  @Output()
  fileDropped: EventEmitter<File> = new EventEmitter<File>();

  @HostBinding('class.fileover') fileOver: boolean;

  @HostListener('dragover', ['$event']) onDragOver($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) onDrop($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.fileOver = false;
    const files = $event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files[0]);
    }
  }
}
