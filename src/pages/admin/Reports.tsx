import { FileText, Download, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { rooms } from '@/data/rooms';
import { bookings } from '@/data/bookings';
import { revenueData } from '@/data/revenue';

export function Reports() {
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  const avgMonthlyRevenue = totalRevenue / revenueData.length;
  const totalBookings = bookings.length;
  const avgOccupancy = (rooms.filter(r => r.status === 'occupied').length / rooms.length) * 100;

  const reports = [
    {
      title: 'Revenue Report',
      description: 'Comprehensive revenue analysis for the last 12 months',
      icon: DollarSign,
      stats: `₹${(totalRevenue / 1000).toFixed(0)}K Total Revenue`
    },
    {
      title: 'Occupancy Report',
      description: 'Room occupancy rates and trends',
      icon: TrendingUp,
      stats: `${avgOccupancy.toFixed(1)}% Average Occupancy`
    },
    {
      title: 'Booking Report',
      description: 'Detailed booking statistics and patterns',
      icon: FileText,
      stats: `${totalBookings} Total Bookings`
    },
    {
      title: 'Guest Report',
      description: 'Guest demographics and satisfaction metrics',
      icon: FileText,
      stats: 'Detailed Analytics'
    }
  ];

  const handleDownload = (reportTitle: string) => {
    alert(`Downloading ${reportTitle}...`);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Revenue (12 Months)</div>
            <div className="text-3xl font-bold text-green-600">₹{(totalRevenue / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-500 mt-2">Avg: ₹{(avgMonthlyRevenue / 1000).toFixed(0)}K/month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Bookings</div>
            <div className="text-3xl font-bold text-blue-600">{totalBookings}</div>
            <div className="text-sm text-gray-500 mt-2">Across all time periods</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>{report.title}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold">{report.stats}</div>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(report.title)}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
