import React from 'react';
import { Card } from './Card';

interface Props {
  items: { name: string; url: string }[];
}

export class CardList extends React.Component<Props> {
  render() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {this.props.items.map((item) => (
          <Card key={item.name} name={item.name} url={item.url} />
        ))}
      </div>
    );
  }
}
