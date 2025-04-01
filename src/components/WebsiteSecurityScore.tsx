
import { cn } from '@/lib/utils';

interface WebsiteSecurityScoreProps {
  score: number;
  className?: string;
}

const WebsiteSecurityScore: React.FC<WebsiteSecurityScoreProps> = ({ score, className }) => {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-lime-600';
    if (score >= 50) return 'text-amber-600';
    if (score >= 30) return 'text-orange-600';
    return 'text-red-600';
  };
  
  // Calculate the circumference
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative w-44 h-44 my-2">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 150 150">
          <circle
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="75"
            cy="75"
          />
          {/* Progress arc */}
          <circle
            className={getScoreColor()}
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="75"
            cy="75"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 75 75)"
          />
          
          {/* Add a gradient overlay */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.7)" />
              <stop offset="100%" stopColor="rgba(124, 58, 237, 1)" />
            </linearGradient>
          </defs>
          
          {/* Decorative small circles */}
          <circle cx="75" cy="15" r="4" className="text-purple-200" fill="currentColor" />
          <circle cx="135" cy="75" r="3" className="text-purple-300" fill="currentColor" />
          <circle cx="75" cy="135" r="5" className="text-purple-400" fill="currentColor" />
          <circle cx="15" cy="75" r="3" className="text-purple-300" fill="currentColor" />
        </svg>
        
        {/* Score value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
          <span className="text-sm text-muted-foreground">out of 100</span>
        </div>
      </div>
      
      {/* Score rating text */}
      <div className="text-center mt-4">
        <h4 className={`text-lg font-semibold ${getScoreColor()}`}>
          {score >= 90 ? 'Excellent' : 
            score >= 70 ? 'Good' : 
            score >= 50 ? 'Average' : 
            score >= 30 ? 'Poor' : 'Critical'}
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          {score >= 70 
            ? 'Your website security is well maintained' 
            : 'Your website needs security improvements'}
        </p>
      </div>
    </div>
  );
};

export default WebsiteSecurityScore;
