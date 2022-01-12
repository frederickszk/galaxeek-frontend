export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type CardListItemDataType = {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
};

export type Device = {
  id: number;
  user_id: number;
  device_id_iot: string;
  name: string;
  type: string;
};

declare module 'express';
