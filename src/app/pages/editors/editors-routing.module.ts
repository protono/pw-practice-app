import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorsComponent } from './editors.component';
import { TinyMCEComponent, TinyMCEEditorComponent } from './tinyMCE.component';
import { CKEditorComponent } from './ckeditor.component';

const routes: Routes = [{
  path: '',
  component: EditorsComponent,
  children: [{
    path: 'tinymce',
    component: TinyMCEComponent,
  }, {
    path: 'ckeditor',
    component: CKEditorComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorsRoutingModule { }

export const routedComponents = [
  EditorsComponent,
  TinyMCEComponent,
  TinyMCEEditorComponent,
  CKEditorComponent,
];
