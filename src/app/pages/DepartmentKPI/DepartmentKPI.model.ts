export class UnsuccesKpiModel {
    KpiId: any;
    KpiName:string;
    QualityIndices: string;
    Criteria: string;
    CWQPNo: string;
    DeptName: string;
    //Department:string;
    DocNo: string;
    Measurment: string;
    RevNo: string;
    Purpose: string;
    Target: any;
    April: any;
    May: any;
    July:any;
    August:any;
    Year:string;
    Month:string;
    Actual:string;
    MgtKPICheckedStatus:boolean = false;
   }

   export class AllKpiModel {
    kpiId: any;
    KpiName:string;
    QualityIndices: string;
    Criteria: string;
    CWQPNo: string;
    DeptName: string;
    //Department:string;
    DocNo: string;
    Measurment: string;
    RevNo: string;
    Purpose: string;
    Target: any;
    aprilTarget:any;
    mayTarget:any;
    juneTarget:any;
    julyTarget:any;
    augTarget:any;
    sepTarget:any;
    octTarget:any;
    novTarget:any;
    decTarget:any;
    janTarget:any;
    febTarget:any;
    marTarget:any;
    April: any;
    May: any;
    June:any;
    July:any;
    August:any;
    September:any;
    october:any;
    November:any;
    December:any;
    March:any;
    julyachieved:any;
    augustachieved:any;
    septemberachieved:any;
    octoberachieved:any;
    novemberachieved:any;
    decemberachieved:any;
    januaryachieved:any;
    februaryachieved:any;
    Year:string;
    Month:string;
    Actual:string;
    DeptId:number;
    MgtKPICheckedStatus:boolean = false;
    UpdatedBy:any;
    MT_QK_KPI:kpiMaster
   }

   export class Deptmodel{
       kpiId :number;
       DepartmentName:string;
       
   }

   

   export class AddMonthlyKpiModel{
       kpiId:any;
       Department:string;
       CWQPNo:string;
       QualityIndices:string;
       Measurement:string;
       Criteria:string;
       Purpose:string;
       ActualTarget:string;
       Target:string;
       KpiName:string;
       Actual:string;
       KpiEntryDate:any; 
       
}
export class OrgDepartmentModel{
    OrgDepartmentId:number;
    OrgDepartmentName:string;
}
export class QKUserModel{
     KpiEmpId:number;
     EmpId:any;
     Active:boolean;
    RoleId:number;
    RoleName:string;
    DeptId:number;
    OrgDepartment:OrgDepartmentModel;
}
export class kpiMaster{
    ID:any; 
    KpiId:any;
    Department:string;
    DeptName:string;
    DocumentNo:string   
    DocNo:string;
    Measurment:string;
    RevNo:string    
    Date:any; 
    CWQPNo:string; 
    Year:string; 
    Actual:string;
    MgtKPICheckedStatus:any;
    Month:any;   
    QualityIndices:string;
    Measurement:string;
    Criteria:string;
    Purpose:string;
    ActualTarget:string;
    Unitofmeasurement:string;
    UpdatedBy:any;
    aprilTarget:any;
    mayTarget:any;
    juneTarget:any;
    julyTarget:any;
    augTarget:any;
    sepTarget:any;
    octTarget:any;
    novTarget:any;
    decTarget:any;
    janTarget:any;
    febTarget:any;
    marTarget:any;
    Target:string;
    KpiName:string;
    marchachieved:any;
    aprilachieved:any;
    mayachieved:any;
    juneachieved:any;
    julyachieved:any;
    augustachieved:any;
    septemberachieved:any;
    octoberachieved:any;
    novemberachieved:any;
    decemberachieved:any;
    januaryachieved:any;
    februaryachieved:any;
   
    DeptId:any; 
    EnteredBy:string;
    EnteredOn:any; 
    InUse:any;
    user:any;
    //OrgDepartment:OrgDepartmentModel;    
}