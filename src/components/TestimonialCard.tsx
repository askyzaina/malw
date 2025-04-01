
import { Star, Quote, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  className?: string;
  style?: React.CSSProperties;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating,
  className,
  style,
}) => {
  return (
    <div 
      className={cn(
        "elegant-card group animate-fade-in-up h-full",
        className
      )}
      style={style}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full transform translate-x-16 -translate-y-16 blur-2xl group-hover:bg-purple-400/20 transition-all duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/10 rounded-full transform -translate-x-12 translate-y-12 blur-xl group-hover:bg-purple-600/20 transition-all duration-700"></div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 h-20 w-1 bg-gradient-to-b from-purple-400/0 via-purple-500/20 to-purple-400/0 rounded-full left-2 top-1/2 transform -translate-y-1/2"></div>
      
      {/* Sparkle decorations */}
      <div className="absolute bottom-4 right-8 text-purple-400/40 transform rotate-12 scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles className="h-4 w-4" />
      </div>
      
      {/* Quote icon */}
      <div className="absolute top-4 right-4 text-purple-500/10 group-hover:text-purple-500/20 transition-all duration-500 transform rotate-180">
        <Quote className="h-12 w-12" />
      </div>
      
      {/* Star rating */}
      <div className="flex items-center mb-4 relative z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-5 w-5 mr-1 transition-all duration-300 hover:scale-110",
              i < rating ? "text-purple-500 fill-purple-500" : "text-gray-300"
            )}
            style={i < rating ? { animation: 'pulse 2s infinite', animationDelay: `${i * 0.2}s` } : {}}
          />
        ))}
      </div>
      
      <p className="mb-6 text-gray-700 relative z-10 group-hover:text-gray-800 transition-colors duration-300 line-clamp-4">{content}</p>
      
      <div className="flex items-center relative z-10 mt-auto">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-700/50 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-md group-hover:shadow-lg group-hover:from-purple-500/40 group-hover:to-purple-700/60 transition-all duration-300">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold group-hover:text-purple-700 transition-colors duration-300">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      
      {/* Shield badge for trust */}
      <div className="absolute bottom-2 right-2 text-purple-400/30 transform scale-75">
        <Shield className="h-4 w-4" />
      </div>
    </div>
  );
};

export default TestimonialCard;
