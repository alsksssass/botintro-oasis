
export type UserRole = 'admin' | 'regular' | 'visitor';

export interface User {
  id: string;
  discordId: string;
  displayName: string;
  avatar: string;
  role: UserRole;
}

export interface Command {
  id: string;
  name: string;
  description: string;
  usage: string;
  category: string;
  requiredPermissions: string[];
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Theme {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  recommendations: number;
  content: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
