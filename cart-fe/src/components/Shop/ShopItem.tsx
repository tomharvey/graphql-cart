
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

export default ShopItem