import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { HeaderComponent } from './header/header.component';
import { LocalMeetupListComponent } from './local-meetup-list/local-meetup-list.component';
import { TypeWriterComponent } from './type-writer/type-writer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiLayoutModule,
    SharedUiCommonModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  declarations: [
    HeaderComponent,
    TypeWriterComponent,
    LocalMeetupListComponent,
  ],
  exports: [HeaderComponent, TypeWriterComponent, LocalMeetupListComponent],
})
export class HomeUiModule {}
