import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecentlyViewedProvider } from '@/hooks/use-recently-viewed';

// Create a custom render function that includes providers
function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <RecentlyViewedProvider>
          {children}
        </RecentlyViewedProvider>
      </QueryClientProvider>
    ),
    ...options,
  });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
