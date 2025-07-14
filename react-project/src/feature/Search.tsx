import React from 'react';

interface Props {
  onSearch: (term: string) => void;
  defaultValue: string;
}

interface State {
  inputValue: string;
}

export class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { inputValue: props.defaultValue || '' };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleClick = () => {
    this.props.onSearch(this.state.inputValue.trim());
  };

  render() {
    return (
      <div className="p-4 bg-gray-100 flex gap-2">
        <input
          className="border p-2 flex-grow"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Search Pokemon..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2"
          onClick={this.handleClick}
        >
          Search
        </button>
      </div>
    );
  }
}
