import { useEffect, useState } from "react";
import { ulid } from "ulidx";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie"
import useWindowFocus from 'use-window-focus';

import { useGetCartQuery, useAddCartEventMutation, CartAction } from "../../graphql";
import Shop from "../Shop";



const cookieName = "cart"
// const id = "1459d7d9-08f0-4b05-9bfe-80e312b5b055"

const CartWrapper = () => {
    const cookies = new Cookies()
    const cartCookie = cookies.get(cookieName)
    const [cookieId, setCookieId] = useState(cartCookie?.id);

    const windowFocused = useWindowFocus();

    console.log({cookieId})
    console.log({windowFocused})

    const resetCookie = () => {
        const id = ulid()
        cookies.set(cookieName, {id}, {path: "/", domain: "example.com"})
        setCookieId(id)
    }

    useEffect(() => {
        if (!cookieId) {
            resetCookie()
        }
    }, [cookieId])

    useEffect(() => {
        const cartCookie = cookies.get(cookieName)
        setCookieId(cartCookie?.id)
    }, [setCookieId, windowFocused])

    if (!cookieId)
        return <p>Setting up cart...</p>
    
    return <Cart cookieId={cookieId} resetCookie={resetCookie} />
}

interface CartProps {
    cookieId: string
    resetCookie: () => void
}

const Cart = ({cookieId, resetCookie}: CartProps) => {
    const queryClient = useQueryClient()

    const variables = {cookieId}
    const getCart = useGetCartQuery(variables)
    const cartEvents = getCart.data?.getCart?.cartEvents || []

    const queryKey = ['getCart', variables]

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

    const clearCart = () => {
        // TODO - update the cart to mark as closed
        resetCookie()
    }

    return <Shop
        cookieId={cookieId}
        cartEventCount={cartEvents.length}
        addToCart={addToCart}
        cartIsLoading={getCart.isLoading}
        cartIsSaving={addEvent.isLoading}
        clearCart={clearCart}
    />
}

export default CartWrapper;