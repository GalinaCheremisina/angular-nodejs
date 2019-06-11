import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDialogModule
} from '@angular/material';

import { ErrorComponent } from './components/error/error.component';

@NgModule({
    declarations: [
        ErrorComponent,
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        ErrorComponent,
    ],
    entryComponents: [ErrorComponent]
})
export class SharedModule {}
