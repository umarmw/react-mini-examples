import React from 'react';
import { render, fireEvent, getByText, queryByText, getByTestId, queryByTestId } from './test-utils'
import App from './App';


// Helper utils
function tableRowsIn(dom) {
  const table = getByTestId(dom.container, 'directory-table');
  return table.querySelectorAll("tr");
}

function setMovieNameIn(dom, value) {
  const input = getByTestId(dom.container, 'name-input');
  fireEvent.change(input, { target: { value } });
}

function setMovieRatingsIn(dom, value) {
  const input = getByTestId(dom.container, 'ratings-input');
  fireEvent.change(input, { target: { value } });
}

function setMovieDurationIn(dom, value) {
  const input = getByTestId(dom.container, 'duration-input');
  fireEvent.change(input, { target: { value } });
}

function submitFormIn(dom) {
  const submitButton = getByTestId(dom.container, 'submit-button');
  fireEvent.click(submitButton);
}

function createTableFromFixtureIn(dom, fixtures) {
  for (let fixture of fixtures) {
    setMovieNameIn(dom, fixture.name)
    setMovieRatingsIn(dom, fixture.ratings);
    setMovieDurationIn(dom, fixture.duration);
    submitFormIn(dom);
  }
}

function setSearchQueryIn(dom, value) {
  const input = getByTestId(dom.container, 'search-input');
  fireEvent.change(input, { target: { value } });
}

function getDataRows(rowsAtEnd, rowsAtStart) {
  const arr = Array.prototype.slice.call(rowsAtEnd);
  return arr.slice(rowsAtStart.length, rowsAtEnd.length)
}


// Test cases start
it('renders without crashing', () => {
  render(<App />);
});


it('should show no results message', () => {
  const dom = render(<App />);
  const noResult = queryByTestId(dom.container, 'no-result');
  if (noResult) {
    // in case the item is found display should be none
    const display = noResult.style.getPropertyValue('display');
    expect(display).toEqual('');
  } else {
    expect(noResult).not.toBe(null);
  }
})


describe('adding a new row', () => {
  it('should add a row with valid data', () => {
    const dom = render(<App />);

    const tableRowsAtStart = tableRowsIn(dom);
    setMovieNameIn(dom, 'Harry Potter')
    setMovieRatingsIn(dom, '5');
    setMovieDurationIn(dom, '3h');
    submitFormIn(dom);
    const tableRowsAtEnd = tableRowsIn(dom);

    expect(tableRowsAtEnd.length).toEqual(tableRowsAtStart.length + 1);
  });


  it('should not add the row if ratings is empty', () => {
    const dom = render(<App />);

    const tableRowsAtStart = tableRowsIn(dom);
    setMovieNameIn(dom, 'The movie')
    setMovieRatingsIn(dom, '');
    setMovieDurationIn(dom, '4h');
    submitFormIn(dom);
    const tableRowsAtEnd = tableRowsIn(dom);

    expect(tableRowsAtEnd.length).toEqual(tableRowsAtStart.length);
  });


  it('should not add the row if name is empty', () => {
    const dom = render(<App />);

    const tableRowsAtStart = tableRowsIn(dom);
    setMovieNameIn(dom, '')
    setMovieRatingsIn(dom, '5');
    setMovieDurationIn(dom, '4h');
    submitFormIn(dom);
    const tableRowsAtEnd = tableRowsIn(dom);

    expect(tableRowsAtEnd.length).toEqual(tableRowsAtStart.length);
  });


  it('should not add the row if duration is empty', () => {
    const dom = render(<App />);

    const tableRowsAtStart = tableRowsIn(dom);
    setMovieNameIn(dom, 'The movie')
    setMovieRatingsIn(dom, '9');
    setMovieDurationIn(dom, '');
    submitFormIn(dom);
    const tableRowsAtEnd = tableRowsIn(dom);

    expect(tableRowsAtEnd.length).toEqual(tableRowsAtStart.length);
  });


  it('should not add the row if data invalid', () => {
    const dom = render(<App />);

    const tableRowsAtStart = tableRowsIn(dom);
    setMovieNameIn(dom, 'Harry Potter')
    setMovieRatingsIn(dom, '5');
    setMovieDurationIn(dom, '3w');
    submitFormIn(dom);
    const tableRowsAtEnd = tableRowsIn(dom);

    expect(tableRowsAtEnd.length).toEqual(tableRowsAtStart.length);
  });
});


describe('adding multiple rows', () => {
  const fixturesValid5Invalid1 = [
    { name: 'Alpha', ratings: '6', duration: '2h' },
    { name: 'Beauty and The Beast', ratings: '7.5', duration: '2.5h' },
    { name: 'The Godfather', ratings: '7.5', duration: '300m' },
    { name: 'The Suits', ratings: '8', duration: '12h' },
    { name: 'Friends', ratings: '9.2', duration: '2000m' },
    { name: 'HIMYM', ratings: '9', duration: '7w' }, // invalid
  ];

  const expectedFixture = [
    { name: 'Friends', ratings: '9.2', duration: '2000m' },
    { name: 'The Suits', ratings: '8', duration: '12h' },
    { name: 'The Godfather', ratings: '7.5', duration: '300m' },
    { name: 'Beauty and The Beast', ratings: '7.5', duration: '2.5h' },
    { name: 'Alpha', ratings: '6', duration: '2h' },
  ];


  it('should have added 5 rows', () => {
    const dom = render(<App />);
    const tableRowsAtStart = tableRowsIn(dom);
    createTableFromFixtureIn(dom, fixturesValid5Invalid1);
    const tableRowsAtEnd = tableRowsIn(dom);

    expect(tableRowsAtEnd.length).toEqual(tableRowsAtStart.length + 5);
  })


  it('should show the table in sorted order', () => {
    const dom = render(<App />);
    const tableRowsAtStart = tableRowsIn(dom);
    createTableFromFixtureIn(dom, fixturesValid5Invalid1);
    const tableRowsAtEnd = tableRowsIn(dom);
    const dataRows = getDataRows(tableRowsAtEnd, tableRowsAtStart);

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      const movieName = expectedFixture[i].name;
      getByText(row, movieName, { exact: false })
    }
  });


  it('should not show the no result message', () => {
    const dom = render(<App />);
    createTableFromFixtureIn(dom, fixturesValid5Invalid1);
    const noResult = queryByTestId(dom.container, 'no-result');
    if (noResult) {
      // in case the item is found display should be none
      const display = noResult.style.getPropertyValue('display');
      expect(display).toEqual('none');
    } else {
      expect(noResult).toBe(null);
    }
  });


  describe('filtering results', () => {
    it('should not filter before 2 keys', () => {
      const dom = render(<App />);
      createTableFromFixtureIn(dom, fixturesValid5Invalid1);
      const tableRowsAtStart = tableRowsIn(dom);
      setSearchQueryIn(dom, 'A');
      const tableRowsAtEnd = tableRowsIn(dom);
      expect(tableRowsAtEnd.length).toEqual(tableRowsAtStart.length);
    });


    it('should filter results', () => {
      const dom = render(<App />);
      const tableRowsAtStart = tableRowsIn(dom);
      createTableFromFixtureIn(dom, fixturesValid5Invalid1);
      setSearchQueryIn(dom, 'Alpha');
      const tableRowsAtEnd = tableRowsIn(dom);
      const dataRows = getDataRows(tableRowsAtEnd, tableRowsAtStart);

      expect(dataRows.length).toEqual(1);
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        const entry = queryByText(row, 'Alpha', { exact: false });
        expect(entry).not.toBe(null);
      }
    });

    it('should show new entries when added which pass the filter', () => {
      const newFixture = { name: 'Alphaman', ratings: '3', duration: '220m' };

      const dom = render(<App />);
      const tableRowsAtStart = tableRowsIn(dom);
      createTableFromFixtureIn(dom, fixturesValid5Invalid1);
      setSearchQueryIn(dom, 'Alpha');
      createTableFromFixtureIn(dom, [newFixture]);

      const tableRowsAtEnd = tableRowsIn(dom);
      const dataRows = getDataRows(tableRowsAtEnd, tableRowsAtStart);

      expect(dataRows.length).toEqual(2);

      const alphaman = queryByText(dataRows[0], 'Alphaman', { exact: false });
      expect(alphaman).not.toBe(null);

      const alpha = queryByText(dataRows[0], 'Alpha', { exact: false });
      expect(alpha).not.toBe(null);
    });

    it('should show no results message when filtered result empty', () => {
      const dom = render(<App />);
      const tableRowsAtStart = tableRowsIn(dom);
      createTableFromFixtureIn(dom, fixturesValid5Invalid1);
      setSearchQueryIn(dom, 'hackerrank');
      const tableRowsAtEnd = tableRowsIn(dom);
      const dataRows = getDataRows(tableRowsAtEnd, tableRowsAtStart);
      expect(dataRows.length).toEqual(0);

      const noResult = getByTestId(dom.container, 'no-result');
      if (noResult) {
        // in case the item is found display should be none
        const display = noResult.style.getPropertyValue('display');
        expect(display).toEqual('');
      } else {
        expect(noResult).not.toBe(null);
      }
    });
  });


  it('should update an existing record based the movie name', () => {
    const dom = render(<App />);
    const tableRowsAtStart = tableRowsIn(dom);
    // create orignal
    createTableFromFixtureIn(dom, fixturesValid5Invalid1);
    createTableFromFixtureIn(dom, [{ name: 'Alpha', ratings: '7', duration: '2.4h' }])
    const tableRowsAtEnd = tableRowsIn(dom);

    expect(tableRowsAtEnd.length).toEqual(tableRowsAtStart.length + 5);

    const dataRows = getDataRows(tableRowsAtEnd, tableRowsAtStart);
    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      const entry = queryByText(row, 'Alpha', { exact: false });
      if (entry) {
        const parent = entry.parentNode;
        getByText(parent, '7', { exact: false });
        getByText(parent, '2.4h', { exact: false });
      }
    }
  });
});