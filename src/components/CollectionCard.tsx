import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'
import { ArrowRight, Package } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-white/95 backdrop-blur border-2 border-[#46D6D9]/20 hover:border-[#46D6D9] transition-all hover:scale-105 rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square bg-gradient-to-br from-[#B3EDEE]/20 to-[#46D6D9]/10 overflow-hidden relative">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-24 w-24 text-[#46D6D9]/30" />
            </div>
          )}
          
          {collection.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-[#121212] text-[#46D6D9] text-xs px-3 py-1 rounded-full font-bold">
                FEATURED
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-[#121212] font-black text-2xl mb-3">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-[#121212]/60 text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full y2k-gradient y2k-shine text-[#121212] font-bold rounded-full"
            onClick={() => onViewProducts(collection.id)}
          >
            View Bundle
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
