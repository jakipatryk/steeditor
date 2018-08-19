import { SteemPost } from '../../../core';

export interface Post {
  id: number;
  entry: Partial<SteemPost>;
}
