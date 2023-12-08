import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemCategoryComponent } from './system-category.component';

const routes: Routes = [{ path: '', component: SystemCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemCategoryRoutingModule { }
