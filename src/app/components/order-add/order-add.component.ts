import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../../services/order-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderListItem } from '../../models/order-list-item.model';

@Component({
  selector: 'app-order-add',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss',
})
export class OrderAddComponent {
  private orderService = inject(OrderService);
  private dialogRef = inject(MatDialogRef<OrderAddComponent>);
  private fb = inject(FormBuilder);
  order: FormGroup = this.fb.group({
    name: [null, Validators.required],
    amount: [null, [Validators.required, Validators.min(1)]],
    price: [null, [Validators.required, Validators.min(0)]],
  });

  onSubmit(): void {
    if (this.order.valid) {
      this.orderService.addOrder(this.order.value);

      this.dialogRef.close();
    }
  }
}
