import { useState } from "react";
import { useGetCartQuery, useAddCartEventMutation, CartAction } from "../../graphql";
import { useQueryClient } from "@tanstack/react-query";


const CartItems = () => {
    const [cookieId, setCookieId] = useState("1459d7d9-08f0-4b05-9bfe-80e312b5b055")
    const queryClient = useQueryClient()

    const variables = {cookieId}
    const queryKey = ['getCart', variables]
    const getCart = useGetCartQuery(variables)
    const cartActions = getCart.data?.getCart?.cartEvents || []

    const options = {
        // onSuccess: () => {getCart.refetch()}
        onMutate: async (newCartAction: any) => {
            await queryClient.cancelQueries({queryKey})
            const existingCartActions = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old: any) => {
                return {getCart: {cartEvents: [...old.getCart.cartEvents, newCartAction]}}
            })
            return { existingCartActions }
        },
        onError: (err: any, newCartAction: any, context: any) => {
            alert(err)
            queryClient.setQueryData(queryKey, context.previousTodos)
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryKey)
        },
    }
    const addEvent = useAddCartEventMutation(options)

    const addToCart = (photoId: string, productId: string) => {
        const variables = {
            cookieId, photoId, productId,
            quantity: 1,
            createdAt: new Date().getTime().toString(),
            action: CartAction.Add,
        }
        addEvent.mutate(variables)
    }

    return (
        <> 
            <input value={cookieId} onChange={(e) => setCookieId(e.target.value)} />
            <p>Cart Actions {cartActions.length}</p>

            <div>
                <ShopItem photoId="1e76dfd9-30c0-4aaa-8421-97fb82b4a2ca" productId="HiRes" addToCart={addToCart} />
                <ShopItem photoId="20dea8df-9145-46a4-9cc5-6a4d97ef30f2" productId="Facebook" addToCart={addToCart} />
            </div>
            {getCart.isLoading && <p>Loading ...</p>}
            {addEvent.isLoading && <p>Saving ...</p>}
        </>
    )
}

export default CartItems;

interface ShopItemProps {
    photoId: string
    productId: string
    addToCart: (photoId: string, productId: string) => void
}

const ShopItem = ({photoId, productId, addToCart}: ShopItemProps) => {
    return (
        <>
            <p>{photoId} - {productId}</p>
            <button onClick={() => addToCart(photoId, productId)}>Add 1 to cart</button>
        </>
    )
}