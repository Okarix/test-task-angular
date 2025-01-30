import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { OrderListItem } from '../../models/order-list-item.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-detail',
  imports: [MatDialogActions, MatDialogContent, MatButtonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderListItem
  ) {}

  close(): void {
    console.log(this.data);
    this.dialogRef.close();
  }
}
