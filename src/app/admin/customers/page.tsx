"use client";

import { useState } from 'react';
import CustomerList from '@/components/admin/CustomerList';
import CustomerForm from '@/components/admin/CustomerForm';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  lastVisit?: Date;
  totalVisits: number;
  createdAt: Date;
};

export default function CustomersPage() {
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'totalVisits'>) => {
    // TODO: Implement API call to add customer
    console.log('Adding customer:', customerData);
    setIsAddingCustomer(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    // TODO: Implement API call to edit customer
    console.log('Editing customer:', customer);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (customerId: string) => {
    // TODO: Implement API call to delete customer
    console.log('Deleting customer:', customerId);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Zákazníci</h1>
        <button
          onClick={() => setIsAddingCustomer(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
        >
          Přidat zákazníka
        </button>
      </div>

      <CustomerList
        onEdit={setEditingCustomer}
        onDelete={handleDeleteCustomer}
      />

      <Transition show={isAddingCustomer} as={Fragment}>
        <Dialog onClose={() => setIsAddingCustomer(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Přidat zákazníka
              </Dialog.Title>
              <CustomerForm
                onSubmit={handleAddCustomer}
                onCancel={() => setIsAddingCustomer(false)}
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      <Transition show={!!editingCustomer} as={Fragment}>
        <Dialog onClose={() => setEditingCustomer(null)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Upravit zákazníka
              </Dialog.Title>
              {editingCustomer && (
                <CustomerForm
                  initialData={editingCustomer}
                  onSubmit={handleEditCustomer}
                  onCancel={() => setEditingCustomer(null)}
                />
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
} 