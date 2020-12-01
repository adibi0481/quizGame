import { NgModule } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

const MAT_MODULES = [  
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatStepperModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule    
]

@NgModule({
    imports: MAT_MODULES,
    exports: MAT_MODULES,
    providers: []    
})

export class MaterialModule { }
