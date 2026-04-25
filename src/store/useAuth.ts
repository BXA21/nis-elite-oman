import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // stored for demo purposes (in real app, hashed)
  role: UserRole;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  shippingAddress: string;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  orders: Order[];
  
  // Auth actions
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  
  // Order actions
  placeOrder: (items: OrderItem[], subtotal: number, tax: number, total: number, address: string) => Order;
  getMyOrders: () => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Admin product actions (mutate the store-level override list)
  getAllUsers: () => User[];
}

// Default seed data - admin + sample customer
const DEFAULT_USERS: User[] = [
  {
    id: 'admin-001',
    name: 'Admin',
    email: 'admin@niselite.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'customer-001',
    name: 'Ahmed Al-Balushi',
    email: 'ahmed@example.com',
    password: 'password123',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
];

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORDER-DEMO-001',
    userId: 'customer-001',
    items: [
      { id: 'part-7', name: 'Ceramic Front & Rear Brake Pad Kit', price: 34.60, quantity: 2, image: '/images/parts/brake_rotors.png', category: 'Brakes' },
      { id: 'part-27', name: 'Activated Carbon Cabin Air Filter', price: 7.60, quantity: 1, image: '/images/parts/air_intake.png', category: 'Interior' },
    ],
    subtotal: 76.80,
    tax: 6.14,
    total: 82.94,
    status: 'Delivered',
    createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    shippingAddress: 'Al Khuwair, Muscat, Oman',
  },
];

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      users: DEFAULT_USERS,
      currentUser: null,
      orders: SAMPLE_ORDERS,

      register: (name, email, password) => {
        const { users } = get();
        if (!name.trim() || !email.trim() || !password.trim()) {
          return { success: false, error: 'All fields are required.' };
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          return { success: false, error: 'Please enter a valid email address.' };
        }
        if (password.length < 6) {
          return { success: false, error: 'Password must be at least 6 characters.' };
        }
        if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
          return { success: false, error: 'An account with this email already exists.' };
        }
        const newUser: User = {
          id: `customer-${Date.now()}`,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role: 'customer',
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
        }));
        return { success: true };
      },

      login: (email, password) => {
        if (!email.trim() || !password.trim()) {
          return { success: false, error: 'Email and password are required.' };
        }
        const { users } = get();
        const user = users.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        );
        if (!user) {
          return { success: false, error: 'Invalid email or password. Please try again.' };
        }
        set({ currentUser: user });
        return { success: true };
      },

      logout: () => {
        set({ currentUser: null });
      },

      placeOrder: (items, subtotal, tax, total, address) => {
        const { currentUser } = get();
        const newOrder: Order = {
          id: `ORDER-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.floor(1000000 + Math.random() * 9000000)}`,
          userId: currentUser?.id || 'guest',
          items,
          subtotal,
          tax,
          total,
          status: 'Pending',
          createdAt: new Date().toISOString(),
          shippingAddress: address || 'Muscat, Oman',
        };
        set((state) => ({ orders: [...state.orders, newOrder] }));
        return newOrder;
      },

      getMyOrders: () => {
        const { orders, currentUser } = get();
        if (!currentUser) return [];
        return orders.filter((o) => o.userId === currentUser.id).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },

      getAllOrders: () => {
        return get().orders.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
      },

      getAllUsers: () => get().users,
    }),
    {
      name: 'niselite-auth',
    }
  )
);
