import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { HeaderComponent } from './header/header.component';
import { LocalGatheringListComponent } from './local-gathering-list/local-gathering-list.component';
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
    LocalGatheringListComponent,
  ],
  exports: [HeaderComponent, TypeWriterComponent, LocalGatheringListComponent],
})
export class HomeUiModule {}
