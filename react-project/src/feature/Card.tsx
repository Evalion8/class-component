import React from 'react';

interface Props {
  name: string;
  url: string;
}

export class Card extends React.Component<Props> {
  render() {
    return (
      <div className="border p-4 rounded shadow">
        <h3 className="text-lg font-semibold">{this.props.name}</h3>
        <p className="text-sm text-gray-500">{this.props.url}</p>
      </div>
    );
  }
}
