
export class DynamicSearchResult {
    connectionString: string;
    columnNames: string;
    columnValues: string;
    tableName: string;
    updateCondition: string;
    searchCondition: string;
    query: string;
    sortBy: string;
  }
  export class searchParams {
    tableName: string;
    fieldName: string;
    fieldId: string;
    condition: string;
    fieldAliasName: string;
    updateColumns: string;
  }
  export class searchList {
    listName: string;
    code: string;
    name: string;
  }

  export class Employee {
    EmployeeNo: string;
    Name: string;
    OrgDepartmentId: number;
    OrgDepartmentName: string;
    DOL: Date;
    RoleId: number;
  }

  export class KpiEmployee {
        KpiEmpId :number;
         EmpId :number;
         Active:boolean;
         RoleId :number;
         RoleName:string;
        DeptId:number;
  }