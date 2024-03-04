import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() public onSearch = new EventEmitter<string>();
  @Output() public onClear = new EventEmitter<void>();

  public query = '';

  public handleClear(): void {
    this.query = '';
    this.onClear.emit();
  }

  public handleSubmit(): void {
    const query = this.query.trim();
    if (query) {
      this.onSearch.emit(query);
    } else {
      this.handleClear();
    }
  }
}
