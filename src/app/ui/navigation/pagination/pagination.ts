import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  numberAttribute,
  OnChanges,
  Output,
} from '@angular/core';

export interface PaginationChange {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination implements OnChanges {
  @Input({ transform: numberAttribute }) currentPage = 1;
  @Input({ transform: numberAttribute }) itemsPerPage = 10;
  @Input({ transform: numberAttribute }) totalItems = 0;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  @Output() currentPageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() paginationChange = new EventEmitter<PaginationChange>();

  public pageInputValue = '1';

  public ngOnChanges(): void {
    this.pageInputValue = String(this.normalizedCurrentPage);
  }

  public get totalPages(): number {
    if (this.totalCount <= 0) {
      return 1;
    }

    return Math.max(1, Math.ceil(this.totalCount / this.normalizedItemsPerPage));
  }

  public get normalizedItemsPerPage(): number {
    return this.isValidPageSize(this.itemsPerPage) ? this.itemsPerPage : 10;
  }

  public get normalizedCurrentPage(): number {
    return this.clampPage(this.currentPage);
  }

  public get firstItem(): number {
    if (this.totalCount <= 0) {
      return 0;
    }

    return (this.normalizedCurrentPage - 1) * this.normalizedItemsPerPage + 1;
  }

  public get lastItem(): number {
    return Math.min(this.normalizedCurrentPage * this.normalizedItemsPerPage, this.totalCount);
  }

  public get totalCount(): number {
    return Math.max(this.totalItems, 0);
  }

  public get canGoBack(): boolean {
    return !this.disabled && this.normalizedCurrentPage > 1;
  }

  public get canGoForward(): boolean {
    return !this.disabled && this.normalizedCurrentPage < this.totalPages;
  }

  public onItemsPerPageChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    const nextItemsPerPage = this.isValidPageSize(value) ? value : this.normalizedItemsPerPage;
    const nextPage = 1;

    this.itemsPerPage = nextItemsPerPage;
    this.currentPage = nextPage;
    this.pageInputValue = String(nextPage);

    this.itemsPerPageChange.emit(nextItemsPerPage);
    this.emitPageChange(nextPage);
  }

  public onPageInput(event: Event): void {
    this.pageInputValue = (event.target as HTMLInputElement).value;
  }

  public commitPageInput(): void {
    const typedPage = Number(this.pageInputValue);
    const nextPage = Number.isFinite(typedPage) ? this.clampPage(Math.trunc(typedPage)) : this.normalizedCurrentPage;

    this.changePage(nextPage);
  }

  public goToPreviousPage(): void {
    if (!this.canGoBack) {
      return;
    }

    this.changePage(this.normalizedCurrentPage - 1);
  }

  public goToNextPage(): void {
    if (!this.canGoForward) {
      return;
    }

    this.changePage(this.normalizedCurrentPage + 1);
  }

  private changePage(page: number): void {
    const nextPage = this.clampPage(page);

    this.currentPage = nextPage;
    this.pageInputValue = String(nextPage);
    this.emitPageChange(nextPage);
  }

  private emitPageChange(page: number): void {
    this.currentPageChange.emit(page);
    this.pageChange.emit(page);
    this.paginationChange.emit({
      currentPage: page,
      itemsPerPage: this.normalizedItemsPerPage,
      totalPages: this.totalPages,
    });
  }

  private clampPage(page: number): number {
    return Math.min(Math.max(page || 1, 1), this.totalPages);
  }

  private isValidPageSize(value: number): boolean {
    return Number.isFinite(value) && value > 0;
  }
}
