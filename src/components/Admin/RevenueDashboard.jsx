import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  useGetRevenueForMonthQuery,
  useGetYearlyRevenueQuery,
  useGetDailyRevenueQuery,
} from '../../apis/orderApi';
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
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const RevenueDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('day'); // Mặc định là "Ngày"
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [startDate, setStartDate] = useState(new Date()); // Ngày hiện tại

  const {
    data: dailyData,
    error: dailyError,
    isLoading: dailyLoading,
  } = useGetDailyRevenueQuery(startDate.toISOString(), {
    skip: selectedPeriod !== 'day',
  });

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

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  const data =
    selectedPeriod === 'day'
      ? dailyData
      : selectedPeriod === 'month'
        ? monthlyData
        : yearlyData;

  const isLoading =
    selectedPeriod === 'day'
      ? dailyLoading
      : selectedPeriod === 'month'
        ? monthlyLoading
        : yearlyLoading;

  const error =
    selectedPeriod === 'day'
      ? dailyError
      : selectedPeriod === 'month'
        ? monthlyError
        : yearlyError;

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
                <option value="day">Ngày</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
              </select>
              {selectedPeriod === 'day' && (
                <div>
                  <label className="block text-sm">Ngày:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    minDate={new Date('2022-01-01')}
                  />
                </div>
              )}
              {selectedPeriod === 'month' && (
                <div className="flex space-x-4">
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
                  <div>
                    <label className="block text-sm">Tháng:</label>
                    <select
                      className="px-4 py-2 border border-gray-300 rounded-md"
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
          </div>
        </CardBody>
      </Card>
      <Card className="mb-8">
        <CardHeader className="bg-blue-500 text-white p-4">
          <Typography variant="h5" color="white">
            {selectedPeriod === 'day' ? 'Doanh Thu Ngày' : selectedPeriod === 'month' ? 'Doanh Thu Tháng' : 'Doanh Thu Năm'}
          </Typography>
        </CardHeader>
        <CardBody>
          {selectedPeriod === 'day' ? (
            <div>
              <Typography variant="h6" className='mb-4'>
                Doanh Thu Ngày {startDate.toLocaleDateString()}: {formatAmount(dailyData?.data?.totalRevenue || 0)} VND
              </Typography>

              {dailyData?.data?.data.length > 0 ? (
                <div>
                  <Typography variant="h6">Danh sách món đã bán:</Typography>
                  <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên Món</TableCell>
                      <TableCell align="right">Số Lượng</TableCell>
                      <TableCell align="right">Giá</TableCell>
                      <TableCell align="right">Tổng Tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dailyData.data.data.map((item) => (
                      <TableRow key={item.menuItem._id}>
                        <TableCell>{item.menuItem.name}</TableCell>
                        <TableCell align="right">{item.totalSold}</TableCell>
                        <TableCell align="right">{formatAmount(item.menuItem.price)}</TableCell>
                        <TableCell align="right">{formatAmount(item.menuItem.price * item.totalSold)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              ) : (
                <Typography>Không có món nào được bán trong ngày này.</Typography>
              )}
            </div>
          ) : (

            <>
              <Typography variant="h6">
                Tổng Doanh Thu: {formatAmount(data.reduce((acc, item) => acc + (item.totalRevenue || 0), 0))} VND
              </Typography>
              <div className="mt-4">
                <Line
                  data={{
                    labels: data.map((item) => item._id),
                    datasets: [
                      {
                        label: 'Doanh Thu',
                        data: data.map((item) => item.totalRevenue),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        fill: true,
                      },
                    ],
                  }}
                />
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default RevenueDashboard;
