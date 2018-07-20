import { SteeditorPost } from './../../../core';

export interface Template {
  name: string;
  description: string;
  changeInPost: Partial<SteeditorPost>;
}
