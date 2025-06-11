import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: any;
  format?: string;
  formatField?: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  template?: (item: any) => string;
  isHtml?: boolean;
}

export interface TableAction {
  icon: string;
  tooltip: string;
  action: (row: any) => void;
  color?: string;
  disabled?: (row: any) => boolean;
}

@Component({
  selector: 'svi-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    TooltipModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    ImageModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() showPaginator: boolean = true;
  @Input() rowsPerPage: number = 10;
  @Input() totalRecords: number = 0;
  @Input() loading: boolean = false;
  @Input() responsive: boolean = true;
  @Input() selectionMode: 'single' | 'multiple' | null = null;
  @Input() selectedItems: any[] = [];
  @Input() globalFilter: boolean = false;
  @Input() emptyMessage: string = 'No se encontraron registros';

  first: number = 0;
  rows: number = 10;
  globalFilterValue: string = '';
  globalFilterFields: string[] = [];
  isMobileView: boolean = false;

  ngOnInit() {
    this.rows = this.rowsPerPage;
    this.globalFilterFields = this.columns.map(col => col.field);
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 768;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isMobile(): boolean {
    return this.isMobileView;
  }

  getColumnClass(column: TableColumn): string {
    return `column-${column.field} ${column.align || 'left'}-align`;
  }

  formatValue(value: any, column: TableColumn): string {
    if (value === null || value === undefined) return '';

    switch (column.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'number':
        return value.toLocaleString();
      case 'boolean':
        return value ? 'Sí' : 'No';
      default:
        return value.toString();
    }
  }

  isActionDisabled(action: TableAction, row: any): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  isImageField(value: any, col?: TableColumn, row?: any): boolean {
    if (col?.type === 'image') {
      if (row && col.formatField && row[col.field] && row[col.formatField]) {
        return true;
      }
      if (row && col.format && row[col.field]) {
        return true;
      }
    }
    if (!value) return false;
    if (typeof value === 'object' && value.base64 && value.format) {
      return true;
    }
    if (typeof value === 'string' && value.startsWith('data:image')) {
      return true;
    }
    return false;
  }

  getImageSource(value: any, col?: TableColumn, row?: any): string {
    if (col?.type === 'image') {
      if (row && col.formatField && row[col.field] && row[col.formatField]) {
        return `data:image/${row[col.formatField]};base64,${row[col.field]}`;
      }
      if (row && col.format && row[col.field]) {
        return `data:image/${col.format};base64,${row[col.field]}`;
      }
    }
    if (!value) return '';
    if (typeof value === 'object' && value.base64 && value.format) {
      return `data:image/${value.format};base64,${value.base64}`;
    }
    if (typeof value === 'string' && value.startsWith('data:image')) {
      return value;
    }
    return '';
  }
}
