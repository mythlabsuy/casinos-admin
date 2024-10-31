// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

// However, these types are generated automatically if you're using an ORM such as Prisma.
declare module 'next-auth' {
  interface Session {
    accessToken?: any;
    refreshToken?: any;
    user_data?: SystemUser;
  }

  interface User {
    tokens?: {
      access_token: string;
      refresh_token: string;
      token_type: string;
    };
    user_data?: SystemUser;
  }
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  premises: Premise[];
  tokens: any; //TODO armar tipo de datos para el retorno de los tokens
  user_data?: SystemUser;
};

export type Premise = {
  id: number;
  name: string;
  logo: string;
  privacy_policy: MediaFile;
  disabled: boolean;
}

export type Participant = {
  id?: number;
  full_name: string;
  email: string;
  document_number?: string;
  phone_number: string;
  accepts_terms_of_service: boolean;
  accepts_privacy_policy: boolean;
  over_18: boolean;
}

export type Welcome = {
  document_number?: string;
}

export type Role = {
  id: 1;
  name: string;
  perms: number[];
  disabled: boolean;
}

export type ApiResponse = {
  status: number;
  data: any; 
}

export type Promotion = {
  id: number;
  premise_id: number;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  description: string;
  participation_instructions: string;
  ticket_extra_data: string;
  
  start_date: Date;
  end_date: Date;
  just_once: boolean;
  
  frequency: number;
  maximum_participations: number;

  terms_and_conditions: MediaFile;
  welcome_background: MediaFile;
  background: MediaFile;
}

export type MediaFile = {
  id?: number;
  name?: string;
  path: string;
  mime_type: string;
  disabled?: boolean;
}

export type SystemUser = {
  id: number;
  username: string;
  email: string;
  role: Role;
  premises: Premise[];
  disabled: boolean;
}