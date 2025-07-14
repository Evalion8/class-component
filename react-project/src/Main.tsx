import React from 'react';
import { CardList } from './feature/CardList';
import { Spinner } from './feature/Spinner';
import { Search } from './feature/Search';

interface State {
  data: { name: string; url: string }[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  page: number;
}

export class Main extends React.Component<object, State> {
  limit = 10;

  constructor(props: object) {
    super(props);
    const saved = localStorage.getItem('searchTerm') || '';
    this.state = {
      data: [],
      loading: false,
      error: null,
      searchTerm: saved,
      page: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_: object, prevState: State) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.page !== this.state.page
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { searchTerm, page } = this.state;
    const offset = page * this.limit;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${offset}`;

    if (searchTerm) {
      url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
    }

    this.setState({ loading: true, error: null });

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (searchTerm) {
          this.setState({
            data: [{ name: data.name, url: data.url }],
            loading: false,
          });
        } else {
          this.setState({ data: data.results, loading: false });
        }
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false, data: [] });
      });
  };

  handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.setState({ searchTerm: term, page: 0 });
  };

  render() {
    const { data, loading, error, searchTerm } = this.state;

    return (
      <main>
        <Search defaultValue={searchTerm} onSearch={this.handleSearch} />
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-600 text-center mt-4">{error}</p>
        ) : (
          <CardList items={data} />
        )}
        {!searchTerm && (
          <div className="p-4 flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white"
              onClick={() => this.setState((s) => ({ page: s.page - 1 }))}
              disabled={this.state.page === 0}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white"
              onClick={() => this.setState((s) => ({ page: s.page + 1 }))}
            >
              Next
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4"
              onClick={() => {
                throw new Error('Test error from button');
              }}
            >
              Throw Error
            </button>
          </div>
        )}
      </main>
    );
  }
}
