import { MatInputModule } from "@angular/material/input";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

@Component({
  selector: "app-search-bar",
  imports: [ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  standalone: true,
  templateUrl: "./search-bar.component.html",
  styleUrl: "./search-bar.component.scss",
})
export class SearchBarComponent {
  term: string = "";
  @Output() searchTerm = new EventEmitter<string>();

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe((term) => {
      this.searchTerm.emit(term);
    });
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  clearSearch() {
    this.term = "";
    this.searchSubject.next("");
  }
}
