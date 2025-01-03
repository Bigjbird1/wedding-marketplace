import React, { useState } from 'react';
import { 
  CheckCircle2, AlertCircle, Clock, Shield, Upload, FileText,
  Building2, Calendar, DollarSign, Users, X
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EnhancedTransferVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState({
    sellerIdentity: 'pending',
    buyerIdentity: 'pending',
    venueContract: 'pending',
    transferAgreement: 'pending',
    paymentVerification: 'pending'
  });

  // Mock transfer data
  const transfer = {
    venue: "The Grand Estate",
    date: "2024-09-24",
    originalPrice: 22000,
    transferPrice: 15000,
    seller: "Sarah & Michael",
    buyer: "Emma & David"
  };

  const renderVerificationStep = (title: string, description: string, status: string, icon: React.ReactNode, uploadAction: () => void) => (
    <div className="p-6 bg-white rounded-xl border mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center
            ${status === 'verified' ? 'bg-green-100' : 
              status === 'rejected' ? 'bg-red-100' : 'bg-gray-100'}`}>
            {status === 'verified' ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : status === 'rejected' ? (
              <X className="w-6 h-6 text-red-600" />
            ) : (
              icon
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm
          ${status === 'verified' ? 'bg-green-100 text-green-800' :
            status === 'rejected' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {status !== 'verified' && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={uploadAction}
            className="flex-1 px-4 py-3 border-2 border-dashed rounded-lg hover:border-gray-400 flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
          <button className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Verify Now
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Transfer Summary */}
      <div className="bg-white rounded-xl border p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{transfer.venue}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{transfer.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{transfer.seller} → {transfer.buyer}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 line-through">
              ${transfer.originalPrice.toLocaleString()}
            </div>
            <div className="text-xl font-semibold">
              ${transfer.transferPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Document Collection" },
            { num: 2, label: "Venue Verification" },
            { num: 3, label: "Payment Escrow" }
          ].map((step, index) => (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${currentStep === step.num ? 'bg-gray-900 text-white' : 
                    currentStep > step.num ? 'bg-green-500 text-white' : 
                    'border-2 text-gray-400'}`}>
                  {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                </div>
                <span className={`text-sm whitespace-nowrap ${
                  currentStep === step.num ? 'font-medium' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < 2 && (
                <div className="w-24 h-1 bg-gray-200 mx-6">
                  <div className={`h-full transition-all ${
                    currentStep > step.num ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <Alert className="mb-6">
        <Shield className="w-4 h-4" />
        <AlertDescription>
          Your documents are encrypted and securely stored. Information is only shared with verified parties.
        </AlertDescription>
      </Alert>

      {/* Verification Steps */}
      {renderVerificationStep(
        "Seller Identity Verification",
        "Government-issued ID and proof of venue contract ownership",
        verificationStatus.sellerIdentity,
        <FileText className="w-6 h-6 text-gray-400" />,
        () => console.log('Upload seller ID')
      )}

      {renderVerificationStep(
        "Buyer Identity Verification",
        "Government-issued ID and contact information",
        verificationStatus.buyerIdentity,
        <FileText className="w-6 h-6 text-gray-400" />,
        () => console.log('Upload buyer ID')
      )}

      {renderVerificationStep(
        "Venue Contract Verification",
        "Original venue contract showing transfer policy",
        verificationStatus.venueContract,
        <Building2 className="w-6 h-6 text-gray-400" />,
        () => console.log('Upload venue contract')
      )}

      {renderVerificationStep(
        "Transfer Agreement",
        "Signed agreement between all parties",
        verificationStatus.transferAgreement,
        <FileText className="w-6 h-6 text-gray-400" />,
        () => console.log('Upload transfer agreement')
      )}

      {renderVerificationStep(
        "Payment Verification",
        "Secure payment transfer to escrow",
        verificationStatus.paymentVerification,
        <DollarSign className="w-6 h-6 text-gray-400" />,
        () => console.log('Process payment')
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <button className="px-6 py-2 text-gray-600 hover:text-gray-900">
          Save Progress
        </button>
        <button 
          onClick={() => setCurrentStep(prev => Math.min(prev + 1, 3))}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Continue to Next Step
        </button>
      </div>
    </div>
  );
};

export default EnhancedTransferVerification;
