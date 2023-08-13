import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartItems from './components/CartItems'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CartItems />
        </QueryClientProvider>
    )
}

export default App