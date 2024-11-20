import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetRevenueForWeekQuery, useGetRevenueForMonthQuery, useGetYearlyRevenueQuery, useGetDailyRevenueQuery } from '../../apis/orderApi';
import { startOfWeek, endOfWeek } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week'); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); 
  const [startDate, setStartDate] = useState(new Date()); 
  const daysOfWeekMapper = {
    1: 'T2',
    2: 'T3',
    3: 'T4',
    4: 'T5',
    5: 'T6',
    6: 'T7',
    7: 'CN', 
  };

  const chartData = (data) => {
    let labels;

    if (selectedPeriod === 'week') {
      labels = data.map(item => daysOfWeekMapper[item._id] || '');
    } else {
      labels = data.map(item => item._id);
    }

    return {
      labels: labels, 
      datasets: [
        {
          label: 'Doanh Thu',
          data: data.map((item) => item.totalRevenue), 
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    };
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value); 
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value); 
  };

  const handleDateChange = (date) => {
    setStartDate(date); 
  };

  const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 1 }); 
  const endOfWeekDate = endOfWeek(startDate, { weekStartsOn: 1 }); 

  const {
    data: weeklyData = [],
    error: weeklyError,
    isLoading: weeklyLoading,
  } = useGetRevenueForWeekQuery({ startDate: startOfWeekDate.toISOString(), endDate: endOfWeekDate.toISOString() }, { skip: selectedPeriod !== 'week' });

  const {
    data: monthlyData = [],
    error: monthlyError,
    isLoading: monthlyLoading,
  } = useGetRevenueForMonthQuery(
    { month: Number(selectedMonth) + 1, year: selectedYear },  
    { skip: selectedPeriod !== 'month' }
  );

  const {
    data: yearlyData = [],
    error: yearlyError,
    isLoading: yearlyLoading,
  } = useGetYearlyRevenueQuery(selectedYear, { skip: selectedPeriod !== 'year' });

  const {
    data: dailyData = [],
    error: dailyError,
    isLoading: dailyLoading,
  } = useGetDailyRevenueQuery(startDate.toISOString(), { skip: selectedPeriod !== 'week' });
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };
  
  const data = selectedPeriod === 'week' ? weeklyData : selectedPeriod === 'month' ? monthlyData : yearlyData;
  const isLoading = selectedPeriod === 'week' ? weeklyLoading : selectedPeriod === 'month' ? monthlyLoading : yearlyLoading;
  const error = selectedPeriod === 'week' ? weeklyError : selectedPeriod === 'month' ? monthlyError : yearlyError;

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;

  return (
    <div className="p-8">
      <Card className="mb-8">
        <CardHeader className="bg-blue-500 text-white p-4">
          <Typography variant="h5" color="white">
            Chọn Khoảng Thời Gian
          </Typography>
        </CardHeader>
        <CardBody>
          <div>
            <div className="flex space-x-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md"
                value={selectedPeriod}
                onChange={handlePeriodChange}
              >
                <option value="week">Tuần</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
              </select>
              {selectedPeriod === 'week' && (
                <div>
                  <label className="block text-sm">Ngày:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    minDate={new Date('2022-01-01')} 
                    showWeekNumbers
                  />
                </div>
              )}
              {selectedPeriod === 'month' && (
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex flex-col items-start">
                    <label className="block text-sm font-medium mb-2">Năm:</label>
                    <select
                      className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      value={selectedYear}
                      onChange={handleYearChange}
                    >
                      {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col items-start">
                    <label className="block text-sm font-medium mb-2">Tháng:</label>
                    <select
                      className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    >
                      {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                        <option key={month} value={month}>
                          {new Date(0, month).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {selectedPeriod === 'year' && (
                <div>
                  <label className="block text-sm">Năm:</label>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={selectedYear}
                    onChange={handleYearChange}
                  >
                    {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className='pt-5'>
              {selectedPeriod === 'week' && (
                <Typography variant="h6" color="blue">
                  Doanh Thu Ngày {startDate.toLocaleDateString()}: {formatAmount(dailyData[0]?.totalRevenue ?? '0')} VND
                </Typography>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="mb-8">
        <CardHeader className="bg-blue-500 text-white p-4">
          <Typography variant="h5" color="white">
            Doanh Thu {selectedPeriod === 'week' ? 'Tuần Này' : selectedPeriod === 'month' ? 'Tháng Này' : 'Năm Này'}
          </Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="h6">
            Tổng Doanh Thu: {formatAmount(data.reduce((acc, item) => acc + (item.totalRevenue ? Number(item.totalRevenue) : 0), 0))} VND
          </Typography>
          <Typography color="gray">
            {selectedPeriod === 'week' && (
              `(Từ ngày ${startOfWeekDate.toLocaleDateString()} đến ${endOfWeekDate.toLocaleDateString()})`
            )}
          </Typography>
          <div className="mt-4">
            <Line data={chartData(data)} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RevenueDashboard;
