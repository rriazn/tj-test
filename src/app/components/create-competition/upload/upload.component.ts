import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { ConvertExcelService } from '../../../services/convert-excel.service';
import { Participant } from '../../../model/participant.type';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  convertService = inject(ConvertExcelService);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() participantsOutput = new EventEmitter<Participant[]>();

  participants: Participant[] = [];
  files: File[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.add('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('dragover');

    if (event.dataTransfer?.files?.length) {
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    }
  }

  onFilesSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.handleFiles(files);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFiles(files: FileList) {
    const newFiles = Array.from(files);
    const existingFileNames = new Set(this.files.map(f => f.name));

    this.files.push(
      ...newFiles.filter(file => !existingFileNames.has(file.name))
    );
  }



  async uploadExcel() {
    const parsePromises = [];
  
    for (const file of this.files) {
      const promise = this.convertService.parseParticipantsExcel(file);
      parsePromises.push(promise);
    }

  
    const allParts = await Promise.all(parsePromises);
    
    
    this.participants = allParts.flat();

  
    this.participantsOutput.emit(this.participants);
  }
}
