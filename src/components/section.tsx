'use client';

import { useRef, useEffect, useState, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  animation?: 'fade-in' | 'slide-up';
  delay?: number;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, animation = 'slide-up', delay = 0, ...props }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = ref || internalRef;

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -100px 0px' }
      );

      const currentRef = (targetRef as React.RefObject<HTMLElement>).current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [targetRef]);

    const animationClasses = {
      'fade-in': 'animate-in fade-in',
      'slide-up': 'animate-in fade-in slide-in-from-bottom-10',
    };

    return (
      <section
        ref={targetRef}
        className={cn(
          'container mx-auto py-16 md:py-24',
          isVisible ? animationClasses[animation] : 'opacity-0',
          className
        )}
        style={{ animationDuration: '700ms', animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = 'Section';


export const SectionTitle = ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
        className={cn('font-headline text-3xl font-bold text-center md:text-5xl text-glow', className)}
        {...props}
    >
        {children}
    </h2>
);

export const SectionSubtitle = ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
        className={cn('mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto', className)}
        {...props}
    >
        {children}
    </p>
);
