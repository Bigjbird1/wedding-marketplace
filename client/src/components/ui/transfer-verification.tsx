import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ClipboardCheck, 
  Building2, 
  Calendar,
  Users,
  FileText,
  ArrowRight,
  Shield,
  Mail
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TransferVerification = () => {
  const [step, setStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  
  // Mock transfer data
  const transfer = {
    originalBooking: {
      venue: "The Grand Estate",
      date: "2024-09-24",
      time: "4:00 PM - 10:00 PM",
      package: "Premium Wedding Package",
      originalCouple: "Sarah & Michael",
      newCouple: "Emma & David",
      transferAmount: 15000,
      originalAmount: 22000
    },
    documents: [
      { type: "Contract", status: "verified" },
      { type: "Venue Policy", status: "verified" },
      { type: "Transfer Agreement", status: "pending" }
    ]
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[
        { num: 1, label: "Document Review" },
        { num: 2, label: "Venue Verification" },
        { num: 3, label: "Final Approval" }
      ].map((s, index) => (
        <div key={s.num} className="flex items-center">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
              ${step === s.num 
                ? 'bg-gray-900 text-white' 
                : step > s.num
                  ? 'bg-green-500 text-white'
                  : 'border-2 border-gray-300 text-gray-400'
              }`}
            >
              {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
            </div>
            <span className={step === s.num ? 'font-medium' : 'text-gray-500'}>
              {s.label}
            </span>
          </div>
          {index < 2 && (
            <div className="w-24 h-px bg-gray-200 mx-4" />
          )}
        </div>
      ))}
    </div>
  );

  const renderTransferDetails = () => (
    <div className="bg-white rounded-xl border p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">{transfer.originalBooking.venue}</h2>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{transfer.originalBooking.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{transfer.originalBooking.originalCouple} → {transfer.originalBooking.newCouple}</span>
            </div>
          </div>
        </div>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
          Pending Verification
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-3">Original Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Package</span>
              <span className="font-medium">{transfer.originalBooking.package}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Original Amount</span>
              <span className="font-medium">${transfer.originalBooking.originalAmount}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Transfer Amount</span>
              <span className="font-medium">${transfer.originalBooking.transferAmount}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Time Slot</span>
              <span className="font-medium">{transfer.originalBooking.time}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Document Status</h3>
          <div className="space-y-3">
            {transfer.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>{doc.type}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  doc.status === 'verified' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (step === 1) {
      return (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-6">Document Review</h2>
          
          <Alert className="mb-6">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Ensure all required documents are present and properly signed by all parties.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Original Contract Verification</h3>
                <p className="text-sm text-gray-600">Contract details match the transfer request</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                View Contract
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Venue Transfer Policy</h3>
                <p className="text-sm text-gray-600">Venue allows date transfers with proper documentation</p>
              </div>
              <button className="ml-auto px-4 py-2 border rounded-lg hover:bg-gray-50">
                View Policy
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Transfer Agreement</h3>
                <p className="text-sm text-gray-600">Signed by both original and new couples</p>
              </div>
              <button className="ml-auto px-4 py-2 border rounded-lg hover:bg-gray-50">
                View Agreement
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t flex justify-between">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Save for Later
            </button>
            <button 
              onClick={() => setStep(2)}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
            >
              Continue to Venue Verification
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-6">Venue Verification</h2>
          
          <div className="mb-6">
            <Alert>
              <Mail className="w-4 h-4" />
              <AlertDescription>
                A verification request has been sent to the venue. They will review and confirm the transfer.
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{transfer.originalBooking.venue}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                The venue will verify:
              </p>
              <ul className="space-y-2">
                {[
                  "Date availability and transferability",
                  "Original booking details",
                  "New couple's eligibility",
                  "Transfer fee requirements"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t flex justify-between">
            <button 
              onClick={() => setStep(1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
            >
              Continue to Final Approval
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-6">Final Approval</h2>

          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-medium">All documents verified</span>
              </div>
              <p className="text-sm text-gray-600">
                All required documents have been reviewed and verified.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Venue approval received</span>
              </div>
              <p className="text-sm text-gray-600">
                The venue has confirmed the transfer request.
              </p>
            </div>

            <button 
              onClick={() => setVerificationStatus('approved')}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              Approve Transfer
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t">
            <button 
              onClick={() => setStep(2)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {renderStepIndicator()}
        {renderTransferDetails()}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default TransferVerification;
