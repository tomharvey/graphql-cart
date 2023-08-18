import { useState } from "react";
import { useGetCartQuery, useAddCartEventMutation, CartAction } from "../../graphql";
import { useQueryClient } from "@tanstack/react-query";
import Shop from "../Shop";


const Cart = () => {
    const [cookieId, setCookieId] = useState("1459d7d9-08f0-4b05-9bfe-80e312b5b055")
    const queryClient = useQueryClient()

    const variables = {cookieId}
    const queryKey = ['getCart', variables]
    const getCart = useGetCartQuery(variables)
    const cartEvents = getCart.data?.getCart?.cartEvents || []

    const options = {
        // onSuccess: () => {getCart.refetch()}
        onMutate: async (newCartEvent: any) => {
            await queryClient.cancelQueries({queryKey})
            const existingCartEvents = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old: any) => {
                return {getCart: {cartEvents: [...old.getCart.cartEvents, newCartEvent]}}
            })
            return { existingCartEvents }
        },
        onError: (err: any, newCartEvent: any, context: any) => {
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

    return <Shop
        cookieId={cookieId}
        setCookieId={setCookieId}
        cartEventCount={cartEvents.length}
        addToCart={addToCart}
        cartIsLoading={getCart.isLoading}
        cartIsSaving={addEvent.isLoading}
    />
}

export default Cart;