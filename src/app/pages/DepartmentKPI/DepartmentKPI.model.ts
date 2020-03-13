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
    March:any;
    August:any;
    Year:string;
    Month:string;
    Actual:string;
    DeptId:number;
    MgtKPICheckedStatus:boolean = false;
   }

   export class Deptmodel{
       kpiId :number;
       DepartmentName:string;
       
   }

   

   export class AddMonthlyKpiModel{
       KPIId:any;
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