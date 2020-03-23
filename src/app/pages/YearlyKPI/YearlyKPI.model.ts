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
    Target:any;
    KpiName:string;
    DeptId:any; 
    EnteredBy:string;
    EnteredOn:any; 
    InUse:any;
    //OrgDepartment:OrgDepartmentModel;    
}

export class KpiYearlyModel {
    KpiId: any;
    KpiName:string;
    QualityIndices: string;
    Criteria: string;
    CWQPNo: string;
    DeptName: string;
    Department:string;
    DocNo: string;
    Measurement:string;
    Measurment: string;
    RevNo: string;
    Purpose: string;
    Target: any;
    April: any;
    May: any;
    July:any;
    August:any;
    Year:number;
    Month:number;
    Actual:any;
    MT_QK_KPI:kpiMaster;
   }

   export class DeptNameModel{
    DeptId:any;
    DepName:any;
}
   
   export class DeptNameYearlyModel{
       //DeptId:any;
       DepName;
   }