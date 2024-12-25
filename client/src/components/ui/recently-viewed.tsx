import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';

const MotionLink = motion(Link);

export function RecentlyViewed() {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="py-6 border-t"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-primary" />
        <h3 className="font-medium">Recently Viewed</h3>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex gap-4 pb-4"
        >
          {items.map((item, index) => (
            <MotionLink
              key={item.id}
              href={item.path}
              className="inline-block w-[200px] group relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  layoutId={`image-${item.id}`}
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"
                />
              </div>
              <motion.div
                initial={{ y: 5 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-medium truncate group-hover:text-primary transition-colors duration-200">
                  {item.name}
                </h4>
                <p className="text-sm text-muted-foreground">${item.price}</p>
              </motion.div>
            </MotionLink>
          ))}
        </motion.div>
      </ScrollArea>
    </motion.div>
  );
}