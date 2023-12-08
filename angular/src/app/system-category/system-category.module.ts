import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SystemCategoryRoutingModule } from './system-category-routing.module';
import { SystemCategoryComponent } from './system-category.component';


@NgModule({
  declarations: [
    SystemCategoryComponent
  ],
  imports: [
    CommonModule,
    SystemCategoryRoutingModule,
    SharedModule
  ]
})
export class SystemCategoryModule { }
