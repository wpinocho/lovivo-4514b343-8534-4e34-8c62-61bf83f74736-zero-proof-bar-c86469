import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

/**
 * Y2K ECOMMERCE TEMPLATE
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-[#121212] border-b border-[#46D6D9]/20 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black">
              <span className="y2k-chrome">ZERO</span>
              <span className="text-[#46D6D9]">PROOF</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-[#B3EDEE] hover:text-[#46D6D9] transition-colors font-medium"
              >
                Spirits
              </Link>
              <Link 
                to="/blog" 
                className="text-[#B3EDEE] hover:text-[#46D6D9] transition-colors font-medium"
              >
                Recipes
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative text-[#46D6D9] hover:text-[#B3EDEE] hover:bg-[#46D6D9]/10"
                aria-label="View cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#46D6D9] to-[#B3EDEE] text-[#121212] text-xs font-black rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-black">
              <span className="y2k-chrome">{pageTitle}</span>
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-[#121212] text-[#B3EDEE] py-12 border-t border-[#46D6D9]/20 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black mb-4">
              <span className="y2k-chrome">ZERO</span>
              <span className="text-[#46D6D9]">PROOF</span>
            </div>
            <p className="text-[#B3EDEE]/70">
              Premium non-alcoholic spirits for the modern mixologist
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4 text-[#46D6D9]">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-[#B3EDEE]/70 hover:text-[#46D6D9] transition-colors"
              >
                Shop Spirits
              </Link>
              <Link 
                to="/blog" 
                className="block text-[#B3EDEE]/70 hover:text-[#46D6D9] transition-colors"
              >
                Recipes
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-4 text-[#46D6D9]">Connect</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#46D6D9]/20 text-center text-[#B3EDEE]/50">
          <p>&copy; 2024 ZeroProof. All vibes reserved.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}
