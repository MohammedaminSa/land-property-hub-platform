import { Home, CheckCircle, Clock, Eye, MessageSquare } from 'lucide-react';

const PropertyStats = ({ stats }) => {
  const statCards = [
    {
      icon: Home,
      label: 'Total Properties',
      value: stats.total || 0,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: CheckCircle,
      label: 'Approved',
      value: stats.approved || 0,
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: stats.pending || 0,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: stats.totalViews || 0,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: MessageSquare,
      label: 'Total Inquiries',
      value: stats.totalInquiries || 0,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="font-display text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <p className="font-body text-sm text-gray-600">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyStats;
