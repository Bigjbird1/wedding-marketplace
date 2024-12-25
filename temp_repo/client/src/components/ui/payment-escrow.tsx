import React, { useState } from 'react';
import { 
  DollarSign, 
  Shield, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  FileText,
  LockKeyhole,
  Building2
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PaymentEscrow = () => {
  const [step, setStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Mock transaction data
  const transaction = {
    id: 'TRX-12345',
    amount: 15000,
    originalAmount: 22000,
    escrowFee: 150,
    platformFee: 450,
    serviceFee: 100,
    totalAmount: 15700,
    seller: 'Sarah M.',
    buyer: 'Emma D.',
    venue: 'The Grand Estate',
    date: '2024-09-24',
    status: 'in_escrow'
  };

  const renderEscrowTimeline = () => (
    <div className="space-y-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-medium">Payment Received</p>
          <p className="text-sm text-gray-600">Buyer's payment secured in escrow</p>
        </div>
      </div>
      <div className="w-px h-8 bg-gray-200 ml-4" />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-medium">Venue Verification</p>
          <p className="text-sm text-gray-600">Awaiting venue approval of transfer</p>
        </div>
      </div>
      <div className="w-px h-8 bg-gray-200 ml-4" />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
          <Building2 className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <p className="font-medium text-gray-400">Transfer Completion</p>
          <p className="text-sm text-gray-600">Funds released to seller</p>
        </div>
      </div>
    </div>
  );

  const renderPaymentDetails = () => (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600">Transfer Amount</span>
        <span className="font-medium">${transaction.amount.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Escrow Fee</span>
        <span className="font-medium">${transaction.escrowFee}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Platform Fee</span>
        <span className="font-medium">${transaction.platformFee}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Service Fee</span>
        <span className="font-medium">${transaction.serviceFee}</span>
      </div>
      <div className="pt-2 border-t flex justify-between font-medium">
        <span>Total Amount</span>
        <span>${transaction.totalAmount.toLocaleString()}</span>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (step === 1) {
      return (
        <div className="space-y-6">
          <Alert>
            <Shield className="w-4 h-4" />
            <AlertDescription>
              Your payment is protected by our secure escrow service. Funds will only be released after successful transfer verification.
            </AlertDescription>
          </Alert>

          {renderPaymentDetails()}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <LockKeyhole className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Secure Payment Processing</h3>
                <p className="text-sm text-gray-600">Your payment details are encrypted and secure</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Escrow Protection</h3>
                <p className="text-sm text-gray-600">Funds held securely until transfer is complete</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Verified Documentation</h3>
                <p className="text-sm text-gray-600">All transfers legally documented and verified</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            Continue to Payment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-6">
          {renderEscrowTimeline()}

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-medium">Payment Secured in Escrow</span>
            </div>
            <p className="text-sm text-gray-600">
              Your payment is now securely held in escrow. The venue will be notified to begin the transfer process.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-4">Next Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <span>The venue will verify the transfer request</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <span>New contract documents will be prepared</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <span>Once approved, funds will be released to the seller</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setShowRefundModal(true)}
              className="flex-1 border py-2 rounded-lg hover:bg-gray-50"
            >
              Request Refund
            </button>
            <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
              View Transfer Status
            </button>
          </div>
        </div>
      );
    }
  };

  const renderRefundModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Request Refund</h3>
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Refunds are subject to our cancellation policy. Processing may take 5-7 business days.
            </AlertDescription>
          </Alert>

          <div>
            <label className="block text-sm font-medium mb-1.5">Reason for Refund</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>Select a reason</option>
              <option>Venue rejected transfer</option>
              <option>Found another date</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Additional Details</label>
            <textarea 
              rows={4}
              className="w-full px-3 py-2 border rounded-lg resize-none"
              placeholder="Please provide more information..."
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setShowRefundModal(false)}
              className="flex-1 border py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-1">Secure Payment & Escrow</h2>
          <p className="text-gray-600">Transaction ID: {transaction.id}</p>
        </div>

        <div className="p-6">
          {renderCurrentStep()}
        </div>
      </div>

      {showRefundModal && renderRefundModal()}
    </div>
  );
};

export default PaymentEscrow;
