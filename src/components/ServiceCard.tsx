
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ServiceFeature {
  text: string;
  included: boolean;
}

interface ServiceCardProps {
  id: string;
  title: string;
  price: string;
  description: string;
  features: ServiceFeature[];
  popular?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelect: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  price,
  description,
  features,
  popular = false,
  className,
  style,
  onSelect
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "relative rounded-xl overflow-hidden border transition-all",
        popular ? "border-primary shadow-lg" : "border-border shadow",
        className
      )}
      style={style}
    >
      {popular && (
        <div className="absolute top-0 inset-x-0 bg-primary text-white text-center py-1 text-xs font-medium">
          PALING POPULER
        </div>
      )}
      
      <div className={cn("p-6", popular && "pt-8")}>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-2 mb-3">
          <span className="text-2xl font-bold">{price}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-6">{description}</p>
        
        <Button 
          className="w-full mb-6" 
          variant={popular ? "default" : "outline"}
          onClick={() => onSelect && onSelect(id)}
        >
          Pilih Paket
        </Button>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className={cn(
                "h-5 w-5 rounded-full flex items-center justify-center mr-3 mt-0.5",
                feature.included ? "bg-primary/10" : "bg-gray-100"
              )}>
                {feature.included ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <X className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <span className={cn(
                "text-sm",
                feature.included ? "text-foreground" : "text-muted-foreground line-through"
              )}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
