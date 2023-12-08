import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { SystemCategoryService } from './../proxy/suppliers/system-category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryType, CreateUpdateCategoryDTO } from '@proxy/category';

@Component({
  selector: 'app-system-category',
  templateUrl: './system-category.component.html',
  styleUrls: ['./system-category.component.scss']
})
export class SystemCategoryComponent implements OnInit {

  incon_search = false;
  isModalOpen = false;
  isEditOpen = false;
  currentID: number;
  form: FormGroup;
  search_table: string;
  get_SystemCategorys_null = {} as CreateUpdateCategoryDTO;
  interface_SystemCategorys: CreateUpdateCategoryDTO[];

  constructor(
    private fb: FormBuilder,
    private System_Category_Service: SystemCategoryService,
    private confirmation: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.System_Category_Service.getList(CategoryType.ExpenseCode).subscribe((result) => {
      this.interface_SystemCategorys = result;
    });
  }


  // Start create System Categorys
  buildForm() {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      description: ['', Validators.required],
      importBy: ['', [Validators.required, Validators.email]],
    });
  }

  createSystemCategorys() {
    this.isModalOpen = true;
    this.buildForm();
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    else {
      this.System_Category_Service.createList(this.form.value, CategoryType.ExpenseCode).subscribe(() => {
        this.isModalOpen = false;
        this.ngOnInit();
      })
    }
  }
  // End create System Categorys



  // Start Search Table System Categorys
  show_search() {
    this.incon_search = !this.incon_search;
  }

  search() {
    if (this.search_table === '') {
      this.ngOnInit();
    }
    else {
      this.System_Category_Service.getListWhere(CategoryType.ExpenseCode, this.search_table).subscribe((result) => {
        this.interface_SystemCategorys = result;
      })
    }
  }
  // End Search Table System Categorys



  // Start Delete Table System Categorys
  delete(id: number) {
    this.confirmation.warn('::Are You Sure To Delete', '::AreYouSure').subscribe((message) => {
      if (message === Confirmation.Status.confirm) {
        this.System_Category_Service.deleteList(id, CategoryType.ExpenseCode).subscribe(() => {
          this.ngOnInit();
        })
      }
    });
  }
  // End Delete Table System Categorys



  // Start Edit Table System Categorys
  editSystemCategorys(id: number) {
    this.System_Category_Service.getListId(id, CategoryType.ExpenseCode).subscribe((response: CreateUpdateCategoryDTO[]) => {
      if (response.length > 0) {
        this.buildForm();
        this.isEditOpen = true;
        this.currentID = id;
        this.get_SystemCategorys_null = response[0];
      }
    })
  }

  SaveEdit() {
    if (this.form.invalid) {
      return;
    }

    this.System_Category_Service.updateList(this.currentID, this.form.value, CategoryType.ExpenseCode).subscribe(() => {
      this.isEditOpen = false;
      this.ngOnInit();
    })
  }
  // End Edit Table System Categorys

}
