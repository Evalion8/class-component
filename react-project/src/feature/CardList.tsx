import React from 'react';
import { Card } from './Card';

export const CardList = ({ items = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <Card key={item.name} name={item.name} url={item.url} />
      ))}
    </div>
  );
};
