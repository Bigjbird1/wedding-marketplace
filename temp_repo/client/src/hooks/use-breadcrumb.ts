import { useLocation } from 'wouter';

export type Breadcrumb = {
  label: string;
  path: string;
};

export function useBreadcrumbs(): Breadcrumb[] {
  const [location] = useLocation();
  
  // Create breadcrumbs based on current path
  const paths = location.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [];
  
  // Always add home
  breadcrumbs.push({ label: 'Home', path: '/' });
  
  // Build up the paths
  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    
    // Format the label - capitalize and replace hyphens
    const label = path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      label,
      path: currentPath,
    });
  });
  
  return breadcrumbs;
}
