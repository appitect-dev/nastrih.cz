"use client";

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data - replace with real data from your API
const revenueData = [
  { name: 'Po', revenue: 4000 },
  { name: 'Út', revenue: 3000 },
  { name: 'St', revenue: 2000 },
  { name: 'Čt', revenue: 2780 },
  { name: 'Pá', revenue: 1890 },
  { name: 'So', revenue: 2390 },
  { name: 'Ne', revenue: 3490 },
];

const bookingsData = [
  { name: 'Po', bookings: 24 },
  { name: 'Út', bookings: 13 },
  { name: 'St', bookings: 18 },
  { name: 'Čt', bookings: 29 },
  { name: 'Pá', bookings: 34 },
  { name: 'So', bookings: 40 },
  { name: 'Ne', bookings: 27 },
];

const serviceDistribution = [
  { name: 'Střih', value: 400 },
  { name: 'Holení', value: 300 },
  { name: 'Styling', value: 200 },
  { name: 'Barvení', value: 100 },
];

const COLORS = ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('week');

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = bookingsData.reduce((sum, item) => sum + item.bookings, 0);
  const averageBookingsPerDay = Math.round(totalBookings / bookingsData.length);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm font-medium">Celkové tržby</h3>
          <p className="text-3xl font-bold text-gray-900">{totalRevenue.toLocaleString()} Kč</p>
          <p className="text-green-600 text-sm mt-2">+12% oproti minulému týdnu</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm font-medium">Celkem rezervací</h3>
          <p className="text-3xl font-bold text-gray-900">{totalBookings}</p>
          <p className="text-green-600 text-sm mt-2">+5% oproti minulému týdnu</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm font-medium">Průměr rezervací/den</h3>
          <p className="text-3xl font-bold text-gray-900">{averageBookingsPerDay}</p>
          <p className="text-amber-600 text-sm mt-2">-2% oproti minulému týdnu</p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-4">
        <button
          onClick={() => setTimeRange('week')}
          className={`px-4 py-2 rounded-lg ${
            timeRange === 'week'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Týden
        </button>
        <button
          onClick={() => setTimeRange('month')}
          className={`px-4 py-2 rounded-lg ${
            timeRange === 'month'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Měsíc
        </button>
        <button
          onClick={() => setTimeRange('year')}
          className={`px-4 py-2 rounded-lg ${
            timeRange === 'year'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Rok
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-700 font-semibold mb-4">Tržby</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-700 font-semibold mb-4">Rezervace</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-700 font-semibold mb-4">Rozdělení služeb</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Time Slots */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-700 font-semibold mb-4">Oblíbené časy</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">9:00 - 11:00</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-gray-600">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">14:00 - 16:00</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-gray-600">75%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">16:00 - 18:00</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-gray-600">65%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 