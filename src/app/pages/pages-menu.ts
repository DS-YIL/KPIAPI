import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Admin',
    icon: 'lock-outline',
    link: '/KPI/Dashboard',
    home: true,
  },
  {
   title: 'YearlyReport',
    icon: 'layers-outline',
    expanded: false,
    children: [
      {
        title: 'Tabular',
        link: '/KPI/YearlyKPI',
        icon:'list-outline'
      },
      {
        title: 'Graphical',
        link: '/KPI/GraphicalYearlyKPI',
        icon:'list-outline'
      }
     
      
    ],
    
    
  },
  {
    title: 'MonthlyReport',
    icon: 'layers-outline',
    link: '/KPI/MonthlyReport'
    

  },

  {
    title: 'DepartmentKPI',
    icon: 'layers-outline',
    link: '/KPI/DepartmentKPI'
   

  },

  
];
