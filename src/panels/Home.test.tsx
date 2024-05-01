import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Home } from 'src/panels/Home'
import { setupStore } from 'src/store/store';

const store = setupStore()

test('should render Panel Header', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  )
  expect(screen.getByText(`Hacker News`)).toBeInTheDocument()
})