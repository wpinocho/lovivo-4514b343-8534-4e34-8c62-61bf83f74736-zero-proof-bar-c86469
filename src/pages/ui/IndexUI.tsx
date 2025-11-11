import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Y2K ZERO-PROOF BAR - IndexUI
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section - Mocktails */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/src/assets/hero-mocktails.jpg" 
            alt="Zero-proof mocktails"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/90 via-[#121212]/70 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#46D6D9]/20 backdrop-blur-sm border border-[#46D6D9]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#46D6D9]" />
              <span className="text-[#B3EDEE] text-sm font-medium">Zero Alcohol • Full Experience</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="y2k-chrome block">Zero-Proof</span>
              <span className="text-white">Cocktails</span>
            </h1>
            
            <p className="text-xl text-[#B3EDEE] mb-8 leading-relaxed">
              Premium non-alcoholic spirits for sophisticated mocktails. All the vibe, none of the hangover.
            </p>
            
            <Button 
              size="lg" 
              className="y2k-gradient y2k-shine text-[#121212] font-bold text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform"
            >
              Discover Flavors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* NA Spirits Grid */}
      <section className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="y2k-chrome">NA Spirits</span>
            </h2>
            <p className="text-[#B3EDEE] text-lg max-w-2xl mx-auto">
              Craft cocktails without compromise. Our zero-proof spirits deliver authentic taste and complexity.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="y2k-glossy-card rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#B3EDEE]">No products available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-20 y2k-gradient-reverse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#121212] mb-4">
              Featured Recipes
            </h2>
            <p className="text-[#121212]/70 text-lg max-w-2xl mx-auto">
              Mixologist-crafted zero-proof cocktails. Easy to make, impossible to forget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Recipe Card 1 */}
            <div className="bg-white/90 backdrop-blur rounded-2xl overflow-hidden border-2 border-[#46D6D9]/30 hover:border-[#46D6D9] transition-all hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-[#46D6D9]/20 to-[#B3EDEE]/20 flex items-center justify-center">
                <div className="text-6xl">🍹</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#121212] mb-2">Cyber Mojito</h3>
                <p className="text-[#121212]/60 mb-4">Fresh mint, lime, and VIBE Gin. A digital-age classic.</p>
                <Button variant="outline" className="w-full border-[#46D6D9] text-[#121212] hover:bg-[#46D6D9]/10">
                  View Recipe
                </Button>
              </div>
            </div>

            {/* Recipe Card 2 */}
            <div className="bg-white/90 backdrop-blur rounded-2xl overflow-hidden border-2 border-[#46D6D9]/30 hover:border-[#46D6D9] transition-all hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-[#46D6D9]/20 to-[#B3EDEE]/20 flex items-center justify-center">
                <div className="text-6xl">🥃</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#121212] mb-2">Y2K Old Fashioned</h3>
                <p className="text-[#121212]/60 mb-4">PULSE Whiskey with bitters and orange. Timeless remix.</p>
                <Button variant="outline" className="w-full border-[#46D6D9] text-[#121212] hover:bg-[#46D6D9]/10">
                  View Recipe
                </Button>
              </div>
            </div>

            {/* Recipe Card 3 */}
            <div className="bg-white/90 backdrop-blur rounded-2xl overflow-hidden border-2 border-[#46D6D9]/30 hover:border-[#46D6D9] transition-all hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-[#46D6D9]/20 to-[#B3EDEE]/20 flex items-center justify-center">
                <div className="text-6xl">🍸</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#121212] mb-2">Electric Margarita</h3>
                <p className="text-[#121212]/60 mb-4">WAVE Tequila, agave, and citrus. Pure voltage.</p>
                <Button variant="outline" className="w-full border-[#46D6D9] text-[#121212] hover:bg-[#46D6D9]/10">
                  View Recipe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Starter Bundles Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-20 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="y2k-chrome">Starter Bundles</span>
              </h2>
              <p className="text-[#B3EDEE] text-lg max-w-2xl mx-auto">
                Everything you need to start your zero-proof bar. Curated collections for every occasion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-24 y2k-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-[#121212] mb-6">
            Ready to Mix?
          </h2>
          <p className="text-xl text-[#121212]/80 mb-8 max-w-2xl mx-auto">
            Join the zero-proof revolution. Premium spirits, zero regrets.
          </p>
          <Button 
            size="lg" 
            className="bg-[#121212] text-[#B3EDEE] hover:bg-[#121212]/90 y2k-shine font-bold text-lg px-10 py-6 rounded-full"
          >
            Discover Flavors
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};
