import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { Participant } from '../model/participant.type';

@Injectable({
  providedIn: 'root'
})
export class ConvertExcelService {

  constructor() { }
  parseParticipantsExcel(file: File): Promise<Participant[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const raw = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
          defval: '',
        });

        

        const participants: Participant[] = raw.map(row => ({
          Vorname: row['Vorname'],
          Nachname: row['Nachname'],
          Verein: row['Verein'],
          Uebung: row['Übung'],
          Geburtsdatum: DateTime.fromObject({year: 1900, month: 1, day: 1}).plus({days: row['Geburtsdatum'] - 2}).toISODate()
        })
      );
        
      } catch (err) {
        console.error(err);
      }
    };

    reader.readAsArrayBuffer(file);
  });
}
  
}



