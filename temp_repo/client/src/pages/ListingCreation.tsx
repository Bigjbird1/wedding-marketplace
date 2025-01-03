import React, { useState, useRef, ChangeEvent } from 'react';
import { Calendar, MapPin, DollarSign, ArrowRight, ArrowLeft, AlertCircle, Upload, Users, Clock, X } from 'lucide-react';

interface FormData {
  date: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  venueState: string;
  originalPrice: string;
  askingPrice: string;
  description: string;
  guestCount: string;
  timeOfDay: string;
  includedServices: string[];
  customServices: string[];
  restrictions: string;
  transferPolicy: string;
  photos: File[];
  venueAmenities: string[];
  customAmenities: string[];
  contactPreference: string;
  contactEmail: string;
  contactPhone: string;
}

interface FormErrors {
  date?: string;
  venueName?: string;
  venueCity?: string;
  venueState?: string;
  timeOfDay?: string;
  guestCount?: string;
  originalPrice?: string;
  askingPrice?: string;
  services?: string;
  description?: string;
  photos?: string;
  contactPreference?: string;
  contactEmail?: string;
  contactPhone?: string;
}

const ListingCreation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Pricing guidance calculations
  const calculatePriceGuidance = (originalPrice: string) => {
    if (!originalPrice) return null;
    const price = parseFloat(originalPrice);
    return {
      minimum: Math.round(price * 0.5),  // 50% of original price
      suggested: Math.round(price * 0.7), // 70% of original price
      maximum: Math.round(price * 0.85)   // 85% of original price
    };
  };

  const [formData, setFormData] = useState<FormData>({
    date: '',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueState: '',
    originalPrice: '',
    askingPrice: '',
    description: '',
    guestCount: '',
    timeOfDay: '',
    includedServices: [],
    customServices: [],
    restrictions: '',
    transferPolicy: '',
    photos: [],
    venueAmenities: [],
    customAmenities: [],
    contactPreference: '',
    contactEmail: '',
    contactPhone: ''
  });

  // Form validation state
  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};

    if (stepNumber === 1) {
      if (!formData.date) newErrors.date = 'Wedding date is required';
      if (new Date(formData.date) < new Date()) newErrors.date = 'Date must be in the future';
      if (!formData.venueName) newErrors.venueName = 'Venue name is required';
      if (!formData.venueCity) newErrors.venueCity = 'City is required';
      if (!formData.venueState) newErrors.venueState = 'State is required';
      if (!formData.timeOfDay) newErrors.timeOfDay = 'Time of day is required';
      if (!formData.guestCount) newErrors.guestCount = 'Guest count is required';
    }

    if (stepNumber === 2) {
      if (!formData.originalPrice) newErrors.originalPrice = 'Original price is required';
      if (!formData.askingPrice) newErrors.askingPrice = 'Asking price is required';
      if (parseFloat(formData.askingPrice) > parseFloat(formData.originalPrice)) {
        newErrors.askingPrice = 'Asking price cannot be higher than original price';
      }
      if (formData.includedServices.length === 0 && formData.customServices.length === 0) {
        newErrors.services = 'Please select or add at least one service';
      }
    }

    if (stepNumber === 3) {
      if (!formData.description) newErrors.description = 'Description is required';
      if (formData.photos.length === 0) newErrors.photos = 'At least one photo is required';
      if (!formData.contactPreference) newErrors.contactPreference = 'Contact preference is required';
      if (formData.contactPreference !== 'phone' && !formData.contactEmail) {
        newErrors.contactEmail = 'Email is required';
      }
      if (formData.contactPreference !== 'email' && !formData.contactPhone) {
        newErrors.contactPhone = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const services = [
    'Catering', 'Photography', 'Flowers', 'DJ/Music',
    'Wedding Planner', 'Decor', 'Lighting', 'Bartender'
  ] as const;

  const amenities = [
    'Parking', 'Wheelchair Access', 'Kitchen', 'Outdoor Space',
    'Getting Ready Rooms', 'Sound System', 'Tables/Chairs', 'In-house Catering'
  ] as const;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      includedServices: prev.includedServices.includes(service)
        ? prev.includedServices.filter(s => s !== service)
        : [...prev.includedServices, service]
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      venueAmenities: prev.venueAmenities.includes(amenity)
        ? prev.venueAmenities.filter(a => a !== amenity)
        : [...prev.venueAmenities, amenity]
    }));
  };

  const handleImageUpload = (files: File[]) => {
    const newFiles = files.slice(0, 10); // Limit to 10 files
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newFiles]
    }));
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Before listing, please confirm with your venue that your date/package is transferable.
                  Different venues have different policies regarding transfers.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Wedding Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 border rounded-lg pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time of Day</label>
              <select
                name="timeOfDay"
                value={formData.timeOfDay}
                onChange={handleInputChange}
                className="w-full py-2 px-3 border rounded-lg"
              >
                <option value="">Select time...</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 4PM)</option>
                <option value="evening">Evening (4PM - 8PM)</option>
                <option value="night">Night (8PM - 12AM)</option>
              </select>
              {errors.timeOfDay && <p className="text-red-500 text-sm mt-1">{errors.timeOfDay}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue Name</label>
              <input
                type="text"
                name="venueName"
                value={formData.venueName}
                onChange={handleInputChange}
                placeholder="Enter venue name"
                className={`w-full py-2 px-3 border rounded-lg ${errors.venueName ? 'border-red-500' : ''}`}
              />
              {errors.venueName && <p className="text-red-500 text-sm mt-1">{errors.venueName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue Address</label>
              <input
                type="text"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleInputChange}
                placeholder="Street address"
                className="w-full py-2 px-3 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="venueCity"
                  value={formData.venueCity}
                  onChange={handleInputChange}
                  placeholder="City"
                  className={`w-full py-2 px-3 border rounded-lg ${errors.venueCity ? 'border-red-500' : ''}`}
                />
                {errors.venueCity && <p className="text-red-500 text-sm mt-1">{errors.venueCity}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <select
                  name="venueState"
                  value={formData.venueState}
                  onChange={handleInputChange}
                  className={`w-full py-2 px-3 border rounded-lg ${errors.venueState ? 'border-red-500' : ''}`}
                >
                  <option value="">Select state...</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  {/* Add more states as needed */}
                </select>
                {errors.venueState && <p className="text-red-500 text-sm mt-1">{errors.venueState}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Guest Count</label>
              <div className="relative">
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  placeholder="Maximum number of guests"
                  className="w-full py-2 px-3 border rounded-lg pl-10"
                />
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Original Price</label>
                <div className="relative">
                  <input
                    type="text"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full py-2 px-3 border rounded-lg pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Asking Price</label>
                <div className="relative">
                  <input
                    type="text"
                    name="askingPrice"
                    value={formData.askingPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full py-2 px-3 border rounded-lg pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.askingPrice && <p className="text-red-500 text-sm mt-1">{errors.askingPrice}</p>}
                {formData.originalPrice && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Price Guidance</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Minimum</span>
                        <span className="text-gray-900">${calculatePriceGuidance(formData.originalPrice)?.minimum.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Suggested</span>
                        <span className="text-gray-900">${calculatePriceGuidance(formData.originalPrice)?.suggested.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Maximum</span>
                        <span className="text-gray-900">${calculatePriceGuidance(formData.originalPrice)?.maximum.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Included Services</label>
              {errors.services && <p className="text-red-500 text-sm mb-2">{errors.services}</p>}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {services.map(service => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`p-2 rounded-lg border text-sm text-left ${
                      formData.includedServices.includes(service)
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Additional Services</label>
                <div className="space-y-2">
                  {formData.customServices.map((service, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => {
                          const newServices = [...formData.customServices];
                          newServices[index] = e.target.value;
                          setFormData(prev => ({ ...prev, customServices: newServices }));
                        }}
                        className="flex-1 py-2 px-3 border rounded-lg"
                        placeholder="Enter service name"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newServices = formData.customServices.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, customServices: newServices }));
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      customServices: [...prev.customServices, '']
                    }))}
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    + Add another service
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue Amenities</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {amenities.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`p-2 rounded-lg border text-sm text-left ${
                      formData.venueAmenities.includes(amenity)
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Additional Amenities</label>
                <div className="space-y-2">
                  {formData.customAmenities.map((amenity, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={amenity}
                        onChange={(e) => {
                          const newAmenities = [...formData.customAmenities];
                          newAmenities[index] = e.target.value;
                          setFormData(prev => ({ ...prev, customAmenities: newAmenities }));
                        }}
                        className="flex-1 py-2 px-3 border rounded-lg"
                        placeholder="Enter amenity name"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newAmenities = formData.customAmenities.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, customAmenities: newAmenities }));
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      customAmenities: [...prev.customAmenities, '']
                    }))}
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    + Add another amenity
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Upload Photos</label>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => imageInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  handleImageUpload(files);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  ref={imageInputRef}
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(Array.from(e.target.files || []))}
                />
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Drag and drop your photos here, or click to select files
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum 10 photos, 5MB each
                </p>
              </div>
              {errors.photos && <p className="text-red-500 text-sm mt-2">{errors.photos}</p>}

              {/* Image Preview Grid */}
              {previewImages.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="What's included in your package? Any special features?"
                rows={4}
                className="w-full py-2 px-3 border rounded-lg resize-none"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Transfer Policy & Restrictions</label>
              <textarea
                name="restrictions"
                value={formData.restrictions}
                onChange={handleInputChange}
                placeholder="Any specific requirements or restrictions for the transfer?"
                rows={3}
                className="w-full py-2 px-3 border rounded-lg resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
              <select
                name="contactPreference"
                value={formData.contactPreference}
                onChange={handleInputChange}
                className="w-full py-2 px-3 border rounded-lg"
              >
                <option value="">Select preference...</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="both">Both Email and Phone</option>
              </select>
              {errors.contactPreference && <p className="text-red-500 text-sm mt-1">{errors.contactPreference}</p>}

              {(formData.contactPreference === 'email' || formData.contactPreference === 'both') && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full py-2 px-3 border rounded-lg"
                  />
                  {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                </div>
              )}

              {(formData.contactPreference === 'phone' || formData.contactPreference === 'both') && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full py-2 px-3 border rounded-lg"
                  />
                  {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                    ${step >= stepNumber
                      ? 'bg-gray-900 text-white'
                      : 'border-2 text-gray-400'
                    }`}
                >
                  {stepNumber}
                </div>
                <span className={step >= stepNumber ? 'font-medium' : 'text-gray-400'}>
                  {stepNumber === 1 ? 'Basic Details' :
                    stepNumber === 2 ? 'Package Details' :
                      'Photos & Description'}
                </span>
              </div>
              {stepNumber < 3 && (
                <div className="h-px bg-gray-300 w-12"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h1 className="text-xl font-semibold mb-6">
            {step === 1 ? 'Tell us about your date' :
              step === 2 ? 'Package and pricing details' :
                'Add photos and description'}
          </h1>

          {renderStepContent()}

          {/* Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 ${
                step === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
              >
                Save as draft
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
                >
                  Next step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                >
                  Submit listing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCreation;