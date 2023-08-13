import { useGetCartQuery } from "../../graphql";


const CartItems = () => {
    const cookieId = "foo"

    const variables = {cookieId}
    const { data, isLoading } = useGetCartQuery(variables)
    const cartEvents = data?.getCart?.cartEvents || []

    console.log({data})
    return (
        <> 
            <p>Cart items {cartEvents.length}</p>
            {isLoading && <p>Loading ...</p>}
        </>
    )
}

export default CartItems;
