import { ReactNode } from 'react';

export type GridItemProps = {
  title: string;
  children: ReactNode;
};

export type Tooltips = {
  active: any;
  payload: any;
  label: any;
};
