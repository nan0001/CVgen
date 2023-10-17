import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import { CvInterface } from '../../../core/models/cv.models';

@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplateComponent {
  @Input() cv!: CvInterface | Omit<CvInterface, 'id'>;

  public exportPDF(data: HTMLElement): void {
    const doc = new jsPDF('portrait', 'pt', 'a4');
    const width = doc.internal.pageSize.getWidth();

    doc.html(data, {
      callback(file) {
        // file.save('file.pdf');
        console.log((data.querySelector('.container') as HTMLElement).style);
        window.open(file.output('bloburl'));
      },
      x: 0,
      y: 0,
      autoPaging: 'text',
      html2canvas: {
        scale: width / data.clientWidth,
      },
    });
  }
}
