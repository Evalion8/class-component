import React from 'react';

interface CardProps {
  name: string;
  url: string;
}

export const Card: React.FC<CardProps> = ({ name, url }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{url}</p>
    </div>
  );
};
