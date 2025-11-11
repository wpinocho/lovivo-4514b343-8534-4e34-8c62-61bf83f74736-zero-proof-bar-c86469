import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useCartUI } from "@/components/CartProvider"

export const FloatingCart = () => {
  const { getTotalItems } = useCart()
  const { openCart } = useCartUI()
  const totalItems = getTotalItems()

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openCart}
        className="h-16 w-16 rounded-full y2k-gradient y2k-shine shadow-lg shadow-[#46D6D9]/50 hover:scale-110 transition-transform"
        size="icon"
      >
        <div className="relative">
          <ShoppingCart className="h-7 w-7 text-[#121212]" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#121212] text-[#46D6D9] text-xs font-black rounded-full h-6 w-6 flex items-center justify-center border-2 border-[#46D6D9]">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </div>
      </Button>
    </div>
  )
}
