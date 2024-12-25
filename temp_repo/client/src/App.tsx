import { Switch, Route } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import Homepage from "./pages/Homepage";
import SearchResults from "./pages/SearchResults";
import ListingCreation from "./pages/ListingCreation";
import ListingDetail from "./pages/ListingDetail";
import MarketplaceBrowse from "./pages/MarketplaceBrowse";
import MarketplaceListingDetail from "./components/ui/marketplace-listing-detail";
import MarketplaceCart from "./components/ui/marketplace-cart";
import CommunicationSystem from "./pages/CommunicationSystem";
import ProfileSetup from "./pages/ProfileSetup";
import ReviewsSystem from "./components/ui/reviews-system";
import PaymentEscrow from "./components/ui/payment-escrow";
import VenueAnalytics from "./components/ui/venue-analytics";
import TransferVerification from "./components/ui/transfer-verification";
import EnhancedTransferVerification from "./components/ui/enhanced-transfer-verification";
import DocumentStorage from "./components/ui/document-storage";
import PasswordRecovery from "./components/ui/password-recovery";
import AdminVerification from "./components/ui/admin-verification";
import AccountManagement from "./components/ui/account-management";
import { useUser } from "./hooks/use-user";
import { RecentlyViewedProvider } from '@/hooks/use-recently-viewed';
import type { RouteComponentProps } from "wouter";

type RouteComponent = React.ComponentType<RouteComponentProps>;

function App() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <RecentlyViewedProvider>
      <Switch>
        <Route path="/" component={Homepage as RouteComponent} />
        <Route path="/search" component={SearchResults as RouteComponent} />
        <Route path="/list" component={ListingCreation as RouteComponent} />
        <Route path="/listing/:id" component={ListingDetail as RouteComponent} />
        <Route path="/marketplace" component={MarketplaceBrowse as RouteComponent} />
        <Route path="/marketplace/cart" component={MarketplaceCart as RouteComponent} /> 
        <Route path="/marketplace/:id" component={MarketplaceListingDetail as RouteComponent} />
        <Route path="/profile-setup" component={ProfileSetup as RouteComponent} />
        <Route path="/reviews" component={ReviewsSystem as RouteComponent} />
        <Route path="/payment" component={PaymentEscrow as RouteComponent} />
        <Route path="/analytics" component={VenueAnalytics as RouteComponent} />
        <Route path="/transfer-verification" component={TransferVerification as RouteComponent} />
        <Route path="/enhanced-transfer" component={EnhancedTransferVerification as RouteComponent} />
        <Route path="/documents" component={DocumentStorage as RouteComponent} />
        <Route path="/password-recovery" component={PasswordRecovery as RouteComponent} />
        <Route path="/admin-verification" component={AdminVerification as RouteComponent} />
        <Route path="/account" component={AccountManagement as RouteComponent} />
        {user && <Route path="/messages" component={CommunicationSystem as RouteComponent} />}
        <Route component={NotFound as RouteComponent} />
      </Switch>
    </RecentlyViewedProvider>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;