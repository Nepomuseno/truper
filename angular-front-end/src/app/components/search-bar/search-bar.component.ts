import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-search-bar",
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: "./search-bar.component.html",
  styleUrl: "./search-bar.component.scss",
})
export class SearchBarComponent {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  @Output() searchTerm = new EventEmitter<string>();

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      search: ["", Validators.required],
    });
  }

  getData() {
    if (this.form.valid) {
      this.searchTerm.emit(this.form.value.search as string);
    }
  }
}
