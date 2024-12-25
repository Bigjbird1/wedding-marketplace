import React from 'react';
import { Link, useLocation } from 'wouter';
import { Calendar, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const tools = [
  { name: 'Reviews', path: '/reviews' },
  { name: 'Payment Escrow', path: '/payment' },
  { name: 'Venue Analytics', path: '/analytics' },
  { name: 'Transfer Verification', path: '/transfer-verification' },
  { name: 'Enhanced Transfer', path: '/enhanced-transfer' },
  { name: 'Document Storage', path: '/documents' },
  { name: 'Admin Verification', path: '/admin-verification' },
];

export function Navbar() {
  const [location] = useLocation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              WeddingTransfer
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              {currentDate}
            </div>
            <Link href="/marketplace" className="transition-colors hover:text-foreground/80 text-foreground">
              Marketplace
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {tools.map((tool) => (
                        <li key={tool.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={tool.path}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{tool.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
