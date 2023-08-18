import { useEffect } from "react";
import { ulid } from "ulidx";
import { useGetCartQuery, useAddCartEventMutation, CartAction } from "../../graphql";
import { useQueryClient } from "@tanstack/react-query";
import Shop from "../Shop";
import { useCookies } from "react-cookie";


const cookieName = "cart"

const CartWrapper = () => {
    const [cookies, setCookie] = useCookies([cookieName]);

    const cartCookie = cookies[cookieName] || {}
    const cookieId = cartCookie.id

    useEffect(() => {
        if (!cookieId) {
            // const id = "1459d7d9-08f0-4b05-9bfe-80e312b5b055"
            const id = ulid()
            setCookie(cookieName, {id}, {path: "/", domain: "example.com"})
        }
    }, [cookieId, setCookie])

    if (!cookieId)
        return <p>Setting up cart...</p>
    
    return <Cart cookieId={cookieId} />
}

interface CartProps {
    cookieId: string
}

const Cart = ({cookieId}: CartProps) => {
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

    return <Shop
        cookieId={cookieId}
        cartEventCount={cartEvents.length}
        addToCart={addToCart}
        cartIsLoading={getCart.isLoading}
        cartIsSaving={addEvent.isLoading}
    />
}

export default CartWrapper;