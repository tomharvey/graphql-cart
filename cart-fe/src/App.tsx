import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Cart from './components/Cart'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Cart />
        </QueryClientProvider>
    )
}

export default App