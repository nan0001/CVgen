import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ListboxModule } from 'primeng/listbox';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    CardModule,
    BreadcrumbModule,
    TableModule,
    TabViewModule,
    AccordionModule,
    AutoCompleteModule,
    DialogModule,
    CalendarModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ListboxModule,
    ChipModule,
    ImageModule,
    MenuModule,
    AvatarModule,
    CarouselModule,
    ToastModule,
  ],
})
export class PrimeDesignModule {}
