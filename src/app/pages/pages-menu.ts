import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Department QI Form',
    icon: 'bookmark',
    link: '/KPI/DepartmentKPI',
    home: true,
  },
  {
   title: 'Report',
    icon: 'list-outline',
    expanded: false,
    children: [
      {
        title: 'Monthly Report',
        icon: 'layers-outline',
        link: '/KPI/MonthlyReport'
      },
      {
        title: 'Yearly Report',
        icon: 'list-outline',
        expanded: false,
        children: [
          {
            title: 'Tabular',
            link: '/KPI/YearlyKPI',
            icon:'layers-outline'
          },
          {
            title: 'Graphical',
            link: '/KPI/GraphicalYearlyKPI',
            icon:'layers-outline'
          }
         
          
        ]
      },
     
     
    ],
    
    
  },
 {
title:'Add/Delete/Edit QI',
icon: 'list-outline',
    expanded: false,
    children: [
      {
        title: 'Create/Edit QI Request',
        icon: 'layers-outline',
        link: '/KPI/CreateKPIReqForm',
        hidden:editkpirequest()

      },
      {
        title: 'Create/Edit QI Form',
        icon: 'layers-outline',
        link: '/KPI/CreateKPI',
        hidden:editkpi()
      },
    ]
 },
 {
  title:'Status Report',
  icon: 'list-outline',
      expanded: false,
      children: [
        {
          title: 'Department QI Status',
          icon: 'layers-outline',
          link: '/KPI/monthlykpistatus'
  
        },
        {
          title: 'Create/Edit QI Request Status',
          icon: 'layers-outline',
          link: '/KPI/requestedkpistatus'
  
        },
        {
          title: 'Create/Edit QI Status',
          icon: 'layers-outline',
          link: '/KPI/UpdatedQIStatus'
  
        },
        {
          title: 'Department QI Pending Approvals',
          icon: 'layers-outline',
          link: '/KPI/pendingApprovals'
  
        },
        {
          title: 'Department Approved QI',
          icon: 'layers-outline',
          link: '/KPI/approvedKPIs'
  
        },
      ]
   },
   {
    title:'Admin Home',
    icon: 'list-outline',
        expanded: false,
        children: [
          {
            title: 'QI Request Pending Approvals',
            icon: 'layers-outline',
            link: '/KPI/pendingKPIs'
    
          },
          {
            title: 'Create/Edit Form - Approvals',
            icon: 'layers-outline',
            link: '/KPI/UpdatedQIFormStatus'
    
          },
          {
            title:'Management QI',
            icon: 'layers-outline',
            link: '/KPI/Dashboard'
          }
        ]
     },



//   {
//     title: 'Department KPI',
//     icon: 'layers-outline',
//     link: '/KPI/DepartmentKPI'
   

//   },
  
//   {
//     title: 'Create/Edit KPI',
//     icon: 'layers-outline',
//     link: '/KPI/CreateKPI'
   

//   },
//   {
//     title: 'Create/Edit KPI Request',
//     icon: 'layers-outline',
//     link:'/KPI/CreateKPIReqForm'
//   },
//   {title: 'Pending Monthly KPI Approvals',
// icon:'layers-outline',
// link:'/KPI/pendingApprovals'
// },
// {title: 'Approved Monthly KPIs',
// icon:'layers-outline',
// link:'/KPI/approvedKPIs'
// },
// {title: 'Pending KPI Approvals',
// icon:'layers-outline',
// link:'/KPI/pendingKPIs'
// },
// {title: 'Monthly KPI Status',
// icon:'layers-outline',
// link:'/KPI/monthlykpistatus'
// },
// {title: 'Requested KPI Status',
// icon:'layers-outline',
// link:'/KPI/requestedkpistatus'
// }
];

function editkpi(){
  const employees = JSON.parse(localStorage.getItem('EmployeeDetails'));
  if(employees!=null)
  {
 if(employees.iskpiEditReq==true && employees.iskpiEditApproved==true)
  {
    return false;
  }
  else{
    return true;
  }
  
  }
  else
  {
    return false;
  }

}

function editkpirequest(){
  debugger;
  const employees = JSON.parse(localStorage.getItem('EmployeeDetails'));
  if(employees!=null)
  {
 if((employees.iskpiEditReq==true || employees.iskpiEditReq==false) && employees.iskpiEditApproved==false)
  {
    return false;
  }
  else{
    return true;
  }
  
  }
  else
  {
    return false;
  }
}
