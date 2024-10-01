import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {

  queryValue = output<string>();
  private formBuilder: FormBuilder = inject(FormBuilder);
  protected searchForm = this.formBuilder.group({
    query: new FormControl(''),
  });

  onSubmit() {
    this.queryValue.emit(this.searchForm.getRawValue().query);
    this.searchForm.reset({ query: ''});
  }


}