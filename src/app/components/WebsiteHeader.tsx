import React from 'react';
import { UniversalHeader } from './UniversalHeader';

export interface WebsiteHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onOpenSearch: () => void;
  onOpenOrder?: (productName?: string) => void;
  onSelectNav: (item: string) => void;
  onSelectCategory?: (category: string) => void;
  onBackToIntro?: () => void;
}

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenLogin,
  onOpenSearch,
  onSelectNav,
  onBackToIntro,
}) => {
  return (
    <UniversalHeader
      cartCount={cartCount}
      onOpenCart={onOpenCart}
      onOpenLogin={onOpenLogin}
      onOpenSearch={onOpenSearch}
      onBackToIntro={onBackToIntro}
      onSelectNav={onSelectNav}
      isSticky={true}
    />
  );
};
