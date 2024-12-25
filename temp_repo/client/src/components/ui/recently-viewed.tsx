import React from 'react';
import { Link } from 'wouter';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';

export function RecentlyViewed() {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <div className="py-6 border-t">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-gray-500" />
        <h3 className="font-medium">Recently Viewed</h3>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {items.map((item) => (
            <Link 
              key={item.id} 
              href={item.path}
              className="inline-block w-[200px] group"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-2">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-medium truncate group-hover:text-gray-600">
                {item.name}
              </h4>
              <p className="text-sm text-gray-600">${item.price}</p>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
