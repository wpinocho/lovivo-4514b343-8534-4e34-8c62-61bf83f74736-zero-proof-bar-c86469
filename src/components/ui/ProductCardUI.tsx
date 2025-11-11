import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"
import { Sparkles } from "lucide-react"

/**
 * Y2K PRODUCT CARD UI
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-white/95 backdrop-blur border-2 border-[#46D6D9]/20 hover:border-[#46D6D9] transition-all hover:scale-105 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-gradient-to-br from-[#B3EDEE]/10 to-[#46D6D9]/5 relative overflow-hidden">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover p-8"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#46D6D9]/40">
                    No image
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-gradient-to-r from-[#46D6D9] to-[#B3EDEE] text-[#121212] text-xs px-3 py-1 rounded-full font-bold">
                      -{logic.discountPercentage}% OFF
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-[#121212] text-[#46D6D9] text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      FEATURED
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                      OUT OF STOCK
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <div className="p-5">
              <Link to={`/products/${logic.product.slug}`}>
                <h3 className="text-[#121212] font-bold text-lg mb-2 line-clamp-2 hover:text-[#46D6D9] transition-colors">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-[#121212]/60 text-sm mb-4 line-clamp-2">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </Link>

              {logic.hasVariants && logic.options && (
                <div className="mb-4 space-y-3">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-bold text-[#121212] mb-2 uppercase tracking-wide">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-8 w-8 rounded-full border-2 transition-all ${
                                  isSelected ? 'border-[#46D6D9] scale-110' : 'border-gray-300'
                                } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                                style={{ backgroundColor: swatch }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                                isSelected 
                                  ? 'border-[#46D6D9] bg-[#46D6D9]/10 text-[#121212]' 
                                  : logic.selected[opt.name] && !isSelected
                                    ? 'border-gray-300 bg-white text-gray-400 opacity-40'
                                    : 'border-gray-300 bg-white text-[#121212] hover:border-[#46D6D9]/50'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                              title={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[#121212] font-black text-xl">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-gray-400 text-sm line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className="y2k-gradient y2k-shine text-[#121212] font-bold rounded-full px-6 disabled:opacity-50"
                >
                  {logic.inStock ? 'Add' : 'Out'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}
