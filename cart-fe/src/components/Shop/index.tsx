import ShopItem from "./ShopItem"

interface ShopProps {
    cookieId: string
    cartEventCount: number
    addToCart: (photoId: string, productId: string) => void
    cartIsLoading: boolean
    cartIsSaving: boolean
    clearCart: () => void
}

const Shop = ({
    cookieId,
    cartEventCount,
    addToCart: addtoCart,
    cartIsLoading,
    cartIsSaving,
    clearCart,
}: ShopProps) => {
    return (
        <> 
            <p>{cookieId}</p>
            <p>Cart Events {cartEventCount}</p>

            <div>
                <ShopItem photoId="1e76dfd9-30c0-4aaa-8421-97fb82b4a2ca" productId="HiRes" addToCart={addtoCart} />
                <ShopItem photoId="20dea8df-9145-46a4-9cc5-6a4d97ef30f2" productId="Facebook" addToCart={addtoCart} />
            </div>
            <button onClick={() => clearCart()}>Clear cart</button>
            {cartIsLoading && <p>Loading ...</p>}
            {cartIsSaving && <p>Saving ...</p>}
        </>
    )
}

export default Shop;
