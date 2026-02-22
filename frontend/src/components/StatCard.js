const StatCard = ({ icon: Icon, label, value, color, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="font-display text-3xl font-bold text-gray-900 mb-1">
        {value}
      </p>
      <p className="font-body text-sm text-gray-600">{label}</p>
    </div>
  );
};

export default StatCard;
