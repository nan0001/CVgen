import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import { CvInterface } from '../../../core/models/cv.models';
import { font as openSansRegular } from '../../../../../assets/fonts/OpenSans-Regular-normal';
import { font as openSansSemibold } from '../../../../../assets/fonts/OpenSans-SemiBold-normal';
import { font as openSansBold } from '../../../../../assets/fonts/OpenSans-Bold-normal';

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
    const height = doc.internal.pageSize.getHeight();
    const backgroundColor = window.getComputedStyle(
      document.querySelector('.export') as Element
    ).backgroundColor;
    const pxToPtRatio = 1.332;
    const pagesNum = Math.ceil(
      (data.clientHeight * (1 / pxToPtRatio)) / height
    );
    const documentHeightInPx = pagesNum * height * pxToPtRatio;
    const documentWidthInPx = width * pxToPtRatio;

    doc.addFileToVFS('OpenSans-Regular-normal.ttf', openSansRegular);
    doc.addFileToVFS('OpenSans-SemiBold-normal.ttf', openSansSemibold);
    doc.addFileToVFS('OpenSans-Bold-normal.ttf', openSansBold);
    doc.addFont('OpenSans-Bold-normal.ttf', 'OpenSans-Bold', 'normal');
    doc.addFont('OpenSans-Regular-normal.ttf', 'OpenSans-Regular', 'normal');
    doc.addFont('OpenSans-SemiBold-normal.ttf', 'OpenSans-SemiBold', 'normal');

    doc.html(data, {
      callback(file) {
        // file.save('file.pdf');
        window.open(file.output('bloburl'));
      },
      x: 0,
      y: 0,
      autoPaging: 'text',
      html2canvas: {
        scale: width / data.clientWidth,
        letterRendering: true,
        backgroundColor,
        width: documentWidthInPx,
        height: documentHeightInPx,
      },
    });
  }
}
