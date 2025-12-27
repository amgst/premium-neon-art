
import React from 'react';

export type PageType = 'home' | 'shop' | 'custom' | 'craft' | 'connect' | 'exhibits' | 'cart' | 'checkout' | 'admin';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface NavLink {
  label: string;
  id: PageType;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface NeonSign {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  tags: string[];
  isHot?: boolean;
  isNew?: boolean;
  description?: string;
}

export interface CartItem extends NeonSign {
  quantity: number;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface SystemConfig {
  storeName: string;
  saleMode: boolean;
  maintenanceMode: boolean;
}
