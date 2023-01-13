import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { expect } from '@jest/globals';
import { useHouses } from '../index';

// Currently does not work due to a jsdom config issue

const queryClient = new QueryClient();

type WrapperProps = {
  children: JSX.Element
}

test('should use custom step when incrementing', () => {
  expect(true).toBe(true);
  const wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  const { result } = renderHook(() => useHouses({gameId: 'WXYZ'}), { wrapper })

  expect(result.current.data?.houses.Gryffindor.users[0]).toBe(null)
})