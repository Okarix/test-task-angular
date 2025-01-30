import { Injectable } from '@angular/core';
import { OrderListItem } from '../models/order-list-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersData: OrderListItem[] = [];
  private ordersSubject = new BehaviorSubject<OrderListItem[]>([]);
  private lastId = 0;

  constructor() {
    this.loadOrders();
    this.updateLastId();
  }

  private loadOrders(): void {
    const orders: OrderListItem[] = JSON.parse(
      localStorage.getItem('orders') || '[]'
    );
    this.ordersData = orders;
    this.ordersSubject.next(this.ordersData);
    this.updateLastId();
  }

  private updateLastId(): void {
    // Находим максимальный ID среди существующих заказов
    this.lastId = this.ordersData.reduce(
      (maxId, order) => Math.max(maxId, order.id),
      0
    );
  }

  private getNextId(): number {
    return ++this.lastId;
  }

  getOrders() {
    return this.ordersSubject.asObservable();
  }

  saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.ordersData));
    this.ordersSubject.next(this.ordersData);
  }

  addOrder(orderData: Omit<OrderListItem, 'id'>): void {
    const newOrder = {
      id: this.getNextId(), // Используем следующий последовательный ID
      ...orderData,
    };
    this.ordersData.push(newOrder);
    this.saveOrders();
  }

  deleteOrder(id: number) {
    this.ordersData = this.ordersData.filter((order) => order.id !== id);
    this.saveOrders();
  }
}
