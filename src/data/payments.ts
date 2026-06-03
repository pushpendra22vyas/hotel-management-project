import { Payment } from '@/types';

export const payments: Payment[] = [
  {
    id: 'PAY001',
    bookingId: 'B001',
    amount: 10000,
    paymentDate: '2026-05-20',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN123456789'
  },
  {
    id: 'PAY002',
    bookingId: 'B002',
    amount: 35000,
    paymentDate: '2026-05-22',
    paymentMethod: 'Debit Card',
    transactionId: 'TXN123456790'
  },
  {
    id: 'PAY003',
    bookingId: 'B003',
    amount: 21000,
    paymentDate: '2026-05-25',
    paymentMethod: 'UPI',
    transactionId: 'TXN123456791'
  },
  {
    id: 'PAY004',
    bookingId: 'B004',
    amount: 72000,
    paymentDate: '2026-05-18',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN123456792'
  },
  {
    id: 'PAY005',
    bookingId: 'B005',
    amount: 51000,
    paymentDate: '2026-05-20',
    paymentMethod: 'Net Banking',
    transactionId: 'TXN123456793'
  }
];
