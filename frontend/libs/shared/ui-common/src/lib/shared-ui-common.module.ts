import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { NgxWigModule } from 'ngx-wig';
import { AddGatheringButtonComponent } from './add-gathering-button/add-gathering-button.component';
import { AddGroupButtonComponent } from './add-group-button/add-group-button.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FooterComponent } from './components/footer/footer.component';
import { GatheringListComponent } from './components/gathering-list/gathering-list.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { MapComponent } from './components/map/map.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PictureCardComponent } from './components/picture-card/picture-card.component';
import { PictureListComponent } from './components/picture-list/picture-list.component';
import { PlacesAutocompleteComponent } from './components/places-autocomplete/places-autocomplete.component';
import { ChooseCameraComponent } from './dialogs/choose-camera/choose-camera.component';
import { IsLoadingDirective } from './directives/loading.directive';
import { AddressPipe } from './pipes/address.pipe';
import { ServerPrefixPipe } from './pipes/server-prefix.pipe';
import { TimeAgoPipe } from './pipes/timeago.pipe';
import { ToLocalTimePipe } from './pipes/toLocalTime.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedUiLayoutModule,
    NgxWigModule,
    TranslocoModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    NotFoundComponent,
    TimeAgoPipe,
    TruncatePipe,
    ToLocalTimePipe,
    PlacesAutocompleteComponent,
    IsLoadingDirective,
    AddressPipe,
    GroupListComponent,
    GatheringListComponent,
    MapComponent,
    ServerPrefixPipe,
    PictureListComponent,
    AddGroupButtonComponent,
    AddGatheringButtonComponent,
    ConfirmComponent,
    PictureCardComponent,
  ],
  declarations: [
    NavigationComponent,
    FooterComponent,
    NotFoundComponent,
    CallbackComponent,
    TimeAgoPipe,
    TruncatePipe,
    ToLocalTimePipe,
    PlacesAutocompleteComponent,
    IsLoadingDirective,
    AddressPipe,
    GroupListComponent,
    GatheringListComponent,
    MapComponent,
    ServerPrefixPipe,
    ChooseCameraComponent,
    PictureListComponent,
    AddGroupButtonComponent,
    AddGatheringButtonComponent,
    ConfirmComponent,
    PictureCardComponent,
  ],
})
export class SharedUiCommonModule {}
