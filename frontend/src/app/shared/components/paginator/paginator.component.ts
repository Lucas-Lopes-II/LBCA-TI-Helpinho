import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Output() previus = new EventEmitter();
  @Output() next = new EventEmitter();
  @Input() public page: number = 0;
  @Input() public pageSize: number = 0;
  @Input() public totalCount: number = 0;
  public initialCount: number = 0;
  public finalCount: number = 0;

  ngOnChanges(): void {
    this.calculateRange();
  }

  private calculateRange(): void {
    const currentPage = this.page > 0 ? this.page : 1;
    const itemsPerPage = this.pageSize > 0 ? this.pageSize : 1;

    const lowerBound = (currentPage - 1) * itemsPerPage + 1;
    const upperBound = Math.min(currentPage * itemsPerPage, this.totalCount);

    this.initialCount = lowerBound;
    this.finalCount = upperBound;
  }

  public onPrevius(): void {
    this.previus.emit();
  }

  public onNext(): void {
    this.next.emit();
  }
}
