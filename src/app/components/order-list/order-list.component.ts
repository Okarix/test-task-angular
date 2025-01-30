import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OrderAddComponent } from '../order-add/order-add.component';
import { OrderListItem } from '../../models/order-list-item.model';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderService } from '../../services/order-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class OrderListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'amount', 'price', 'actions'];
  dataSource = new MatTableDataSource<OrderListItem>([]);
  dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe((orders) => {
        this.dataSource.data = orders;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openAddOrderDialog(): void {
    this.dialog.open(OrderAddComponent, {
      width: '400px',
    });
  }

  openDetailDialog(order: OrderListItem): void {
    this.dialog.open(OrderDetailComponent, {
      width: '400px',
      data: order,
    });
  }

  deleteOrder(order: OrderListItem) {
    this.orderService.deleteOrder(order.id);
  }
}
