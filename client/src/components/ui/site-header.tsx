import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { MessageCircle, ChevronDown, ShoppingBag } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import LoginModal from '@/components/ui/login-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Separate tools into public and authenticated sections
const publicTools = [
  { name: 'Reviews', path: '/reviews' },
];

const authenticatedTools = [
  { name: 'Payment Escrow', path: '/payment', group: 'Transactions' },
  { name: 'Venue Analytics', path: '/analytics', group: 'Analytics' },
  { name: 'Transfer Verification', path: '/transfer-verification', group: 'Transactions' },
  { name: 'Enhanced Transfer', path: '/enhanced-transfer', group: 'Transactions' },
  { name: 'Document Storage', path: '/documents', group: 'Management' },
  { name: 'Admin Verification', path: '/admin-verification', group: 'Management' },
];

export function SiteHeader() {
  const [, setLocation] = useLocation();
  const { user, logout } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setLocation('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigateToMarketplace = () => {
    setLocation('/marketplace');
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex flex-1 items-center">
          <div 
            onClick={() => setLocation('/')}
            className="mr-6 flex items-center space-x-2 cursor-pointer"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              WeddingTransfer
            </span>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <button 
              onClick={() => setLocation('/list')}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              List your date
            </button>
            {user && (
              <button 
                onClick={() => setLocation('/messages')}
                className="text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Messages
              </button>
            )}
            <button 
              onClick={navigateToMarketplace}
              className="text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Marketplace
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
                Tools <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                {/* Public tools */}
                <DropdownMenuLabel>General</DropdownMenuLabel>
                {publicTools.map((tool) => (
                  <DropdownMenuItem
                    key={tool.path}
                    onClick={() => setLocation(tool.path)}
                  >
                    {tool.name}
                  </DropdownMenuItem>
                ))}

                {/* Authenticated tools */}
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Transactions</DropdownMenuLabel>
                    {authenticatedTools
                      .filter(tool => tool.group === 'Transactions')
                      .map((tool) => (
                        <DropdownMenuItem
                          key={tool.path}
                          onClick={() => setLocation(tool.path)}
                        >
                          {tool.name}
                        </DropdownMenuItem>
                      ))}

                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Management</DropdownMenuLabel>
                    {authenticatedTools
                      .filter(tool => tool.group === 'Management')
                      .map((tool) => (
                        <DropdownMenuItem
                          key={tool.path}
                          onClick={() => setLocation(tool.path)}
                        >
                          {tool.name}
                        </DropdownMenuItem>
                      ))}

                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Analytics</DropdownMenuLabel>
                    {authenticatedTools
                      .filter(tool => tool.group === 'Analytics')
                      .map((tool) => (
                        <DropdownMenuItem
                          key={tool.path}
                          onClick={() => setLocation(tool.path)}
                        >
                          {tool.name}
                        </DropdownMenuItem>
                      ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <button 
              onClick={handleLogout}
              className="text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Log out
            </button>
          ) : (
            <>
              <button 
                onClick={openLoginModal}
                className="text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={() => setLocation('/profile-setup')}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal onClose={closeLoginModal} />
      )}
    </nav>
  );
}