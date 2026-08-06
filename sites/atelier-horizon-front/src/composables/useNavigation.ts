export const useNavigation = () => {
  const menuItems = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Offres', href: '/offers' },
    { name: 'Méthodologie', href: '/methodology' },
    { name: 'Contact', href: '/contact' },
  ];

  return {
    menuItems,
  };
};
