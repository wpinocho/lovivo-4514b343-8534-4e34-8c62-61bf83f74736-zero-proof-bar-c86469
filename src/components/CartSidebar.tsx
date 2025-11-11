import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import { useCheckout } from "@/hooks/useCheckout"
import { useSettings } from "@/contexts/SettingsContext"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const navigate = useNavigate()
  const { checkout, isLoading: isCreatingOrder } = useCheckout()
  const { currencyCode } = useSettings()

  const handleCreateCheckout = async () => {
    try {
      try {
        sessionStorage.setItem('checkout_cart', JSON.stringify({ items: state.items, total: state.total }))
      } catch {}

      const order = await checkout({
        currencyCode: currencyCode
      })
      
      try {
        sessionStorage.setItem('checkout_order', JSON.stringify(order))
        sessionStorage.setItem('checkout_order_id', String(order.order_id))
      } catch (e) {
        console.error('Error saving to sessionStorage:', e)
      }

      onClose()
      navigate('/checkout')
    } catch (error) {
      console.error('Error in handleCreateCheckout:', error)
    }
  }

  const finalTotal = state.total

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-96 p-0 bg-[#121212] border-l border-[#46D6D9]/20" aria-describedby="cart-description">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-[#46D6D9]/20">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-black">
                <span className="y2k-chrome">Your Cart</span>
              </SheetTitle>
            </div>
            <div id="cart-description" className="sr-only">
              Review and modify the products in your shopping cart
            </div>
          </SheetHeader>

          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-24 w-24 rounded-full y2k-gradient flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-[#121212]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#B3EDEE] mb-2">
                  Your cart is empty
                </h3>
                <p className="text-[#B3EDEE]/60 mb-6">
                  Add some zero-proof spirits to start mixing
                </p>
                <Button 
                  onClick={onClose} 
                  className="y2k-gradient y2k-shine text-[#121212] font-bold rounded-full"
                >
                  Start Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {state.items.map((item) => (
                  <Card key={item.key} className="bg-white/5 backdrop-blur border border-[#46D6D9]/20">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-20 h-20 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.images && item.product.images.length > 0 || item.variant?.image ? (
                            <img
                              src={item.variant?.image || item.product.images![0]}
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#46D6D9]/40 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-[#B3EDEE] line-clamp-2 mb-1">
                            {item.product.title}{item.variant?.title ? ` - ${item.variant.title}` : ''}
                          </h4>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-1 bg-white/5 rounded-full p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                className="h-7 w-7 rounded-full hover:bg-[#46D6D9]/20 text-[#46D6D9]"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-bold px-3 text-sm text-[#B3EDEE]">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                className="h-7 w-7 rounded-full hover:bg-[#46D6D9]/20 text-[#46D6D9]"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-black text-sm text-[#46D6D9]">
                                ${(((item.variant?.price ?? item.product.price) || 0) * item.quantity).toFixed(2)}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.key)}
                                className="text-red-400 hover:text-red-300 p-0 h-auto mt-1 hover:bg-transparent"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-[#46D6D9]/20 p-6 bg-[#121212]">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#B3EDEE] font-medium">Total</span>
                    <span className="text-[#46D6D9] font-black text-2xl">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 y2k-gradient y2k-shine text-[#121212] font-black text-lg py-6 rounded-full" 
                  size="lg" 
                  onClick={handleCreateCheckout} 
                  disabled={isCreatingOrder}
                >
                  {isCreatingOrder ? 'Processing...' : 'Checkout'}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
