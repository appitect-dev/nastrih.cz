"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ScissorsIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Přehled',
    href: '/admin',
    icon: ChartBarIcon,
  },
  {
    name: 'Rezervace',
    href: '/admin/bookings',
    icon: CalendarIcon,
  },
  {
    name: 'Otevírací doba',
    href: '/admin/opening-hours',
    icon: ClockIcon,
  },
  {
    name: 'Služby',
    href: '/admin/services',
    icon: ScissorsIcon,
  },
  {
    name: 'Zákazníci',
    href: '/admin/customers',
    icon: UserGroupIcon,
  },
  {
    name: 'Nastavení',
    href: '/admin/settings',
    icon: Cog6ToothIcon,
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            nastrih.cz
          </Link>
        </div>
        <div className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-lg
                  ${isActive
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive
                      ? 'text-amber-600'
                      : 'text-gray-400 group-hover:text-gray-500'
                    }
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 