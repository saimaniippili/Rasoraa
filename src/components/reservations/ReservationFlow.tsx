import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { ReservationState } from '../../types';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { Step1Branch } from './Step1Branch';
import { Step2Date } from './Step2Date';
import { Step3SessionTime } from './Step3SessionTime';
import { Step4CustomerInfo, CustomerInfoFormData } from './Step4CustomerInfo';
import { Step5Confirmation } from './Step5Confirmation';
import { Button } from '../common/Button';

export const ReservationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [reservation, setReservation] = useState<ReservationState>({
    branchId: RESTAURANT_CONFIG.branches[0].id,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    session: 'dinner',
    guests: 2,
    timeSlot: '7:30 PM',
    customer: {
      title: 'Mr',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      seatingPreference: 'Darbar Main Salon',
      occasion: 'Family Celebration',
      specialRequests: '',
      rememberDetails: true,
      receiveUpdates: true,
    },
  });

  const steps = [
    { number: 1, label: 'I', title: 'Location' },
    { number: 2, label: 'II', title: 'Date' },
    { number: 3, label: 'III', title: 'Time & Guests' },
    { number: 4, label: 'IV', title: 'Patron Details' },
    { number: 5, label: 'V', title: 'Confirmation' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  const handleCustomerSubmit = (data: CustomerInfoFormData) => {
    setReservation((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        ...data,
      },
    }));
    handleNext();
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Minimalist Architectural Stepper Bar */}
      <div className="bg-white p-4 sm:p-5 border border-parchment-border shadow-subtle">
        <div className="flex items-center justify-between relative">
          {/* Subtle Hairline Connector */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-px bg-parchment-border -z-0 hidden sm:block" />

          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => {
                  if (step.number < currentStep) {
                    setCurrentStep(step.number);
                  }
                }}
                className={`relative z-10 flex flex-col items-center flex-1 focus:outline-none transition-colors ${
                  step.number <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-palace-900 text-gold'
                      : isCurrent
                        ? 'bg-gold text-palace-950 ring-4 ring-gold/20 font-bold'
                        : 'bg-parchment text-ink-muted border border-parchment-border'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.label}
                </div>

                <span
                  className={`mt-2 text-[10px] sm:text-[11px] font-sans uppercase tracking-luxury font-medium transition-colors ${
                    isCurrent
                      ? 'text-palace-900 font-bold'
                      : isCompleted
                        ? 'text-palace-700'
                        : 'text-ink-muted'
                  }`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Components Flow */}
      <div className="min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-8">
                <Step1Branch
                  selectedBranchId={reservation.branchId}
                  onSelectBranch={(branchId) => {
                    setReservation((prev) => ({ ...prev, branchId }));
                  }}
                />
                <div className="flex justify-end pt-4">
                  <Button
                    variant="gold"
                    size="md"
                    onClick={handleNext}
                    icon={ChevronRight}
                  >
                    Proceed to Date Selection
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <Step2Date
                  selectedDate={reservation.date}
                  onSelectDate={(date) => {
                    setReservation((prev) => ({ ...prev, date }));
                  }}
                />
                <div className="flex items-center justify-between max-w-xl mx-auto pt-4">
                  <Button variant="outline" size="md" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="gold"
                    size="md"
                    onClick={handleNext}
                    disabled={!reservation.date}
                    icon={ChevronRight}
                  >
                    Proceed to Service & Time
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <Step3SessionTime
                  session={reservation.session}
                  guests={reservation.guests}
                  timeSlot={reservation.timeSlot}
                  onSelectSession={(session) => {
                    const newSlot = session === 'lunch' ? '12:30 PM' : '7:30 PM';
                    setReservation((prev) => ({ ...prev, session, timeSlot: newSlot }));
                  }}
                  onSelectGuests={(guests) => {
                    setReservation((prev) => ({ ...prev, guests }));
                  }}
                  onSelectTimeSlot={(timeSlot) => {
                    setReservation((prev) => ({ ...prev, timeSlot }));
                  }}
                />
                <div className="flex items-center justify-between max-w-2xl mx-auto pt-4">
                  <Button variant="outline" size="md" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="gold"
                    size="md"
                    onClick={handleNext}
                    icon={ChevronRight}
                  >
                    Proceed to Patron Details
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <Step4CustomerInfo
                initialData={reservation.customer}
                onSubmitInfo={handleCustomerSubmit}
                onBack={handleBack}
              />
            )}

            {currentStep === 5 && (
              <Step5Confirmation
                reservation={reservation}
                onBack={handleBack}
                onReset={handleReset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
