// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { OrderStatus } from "./enums/order-status";

// However, these types are generated automatically if you're using an ORM such as Prisma.
declare module 'next-auth' {
  interface Session {
    accessToken?: any;
    refreshToken?: any;
    user_data?: any;
  }

  interface User {
    tokens?: {
      access_token: string;
      refresh_token: string;
      token_type: string;
    };
    user_data?: HermesUser;
  }
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  tokens: any; //TODO armar tipo de datos para el retorno de los tokens
  user_data?: HermesUser;
};

export type Premise = {
  id: number;
  name: string;
  logo: string;
  privacy_policy: string;
  disabled: boolean;
}


//HERMES
export type Article = {
  id: number;
  name: string;
  description: string;
  size_weight: any[];
  price: number;
  currency: string;
  current_stock: number;
  reserved_stock: number;
  internal_code: string;
  barcode_value: string;
  category: Category;
  store_id: number
  store: Premise;
  media_files: MediaFiles[];
  featured: boolean
  disabled: boolean
}

export type Category = {
  id: number;
  name: string;
  image: string;
  image_bucket_key: string;
  mime_type: string;
  featured_order: number;
  disabled: boolean;
}



export type Role = {
  id: 1;
  name: string;
  perms: number[];
  disabled: boolean;
}

export type Tenant = {
  id: number;
  name: string;
  disabled: boolean;
  stores: Premise[];
}

export type MediaFiles = {
  id: number;
  name: string;
  path: string;
  mime_type: string;
  article_id: number;
  disabled: boolean;
}

export type Client = {
  id: number;
  full_name: string;
  email: string;
  document_number?: string;
  document_type?: string;
  tenant_id: number;
  disabled: boolean;
  store_id: 1;
}

export type HermesUser = {
  id: number;
  username: string;
  tenant: Tenant;
  store: Premise;
  role: Role;
  client: Client;
  disabled: boolean;
}

export type Order = {
  id: number;
  order_number: string;
  delivery_address: string;
  billing_address: string;
  status: OrderStatus;
  is_store_pickup: boolean;
  phone_number: string;
  time_created: Date;
  client_id: number;
}

export type OrdersListItemModel = {
    order_id: number,
    order_number: string,
    date: Date,
    price: number,
    quantity: number,
    currency: string,
    status: OrderStatus,
    client_name: string,
    client_email: string,
    client_phone: string,
    media_file_path?: string,
}

export type ListOrdersModel = {
    orders: [OrdersListItemModel]
}