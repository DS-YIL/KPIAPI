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

export class KpiGraphicalModel {
    KpiId: any;
    KpiName:string;
    QualityIndices: string;
    Criteria: string;
    CWQPNo: string;
    DeptName: string;
    //Department:string;
    QIShortText:any;
    DocNo: string;
    Measurment: string;
    RevNo: string;
    Purpose: string;
    Target: any;
    April: any;
    May: any;
    July:any;
    August:any;
    Year:number;
    Month:any;
    Actual:number;
    MT_QK_KPI:kpiMaster;
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
    marchachieved:any;
    aprilachieved:any;
    mayachieved:any;
    juneachieved:any;
    julyachieved:any;
    augustachieved:any;
    sepachieved:any;
    octachieved:any;
    novachieved:any;
    decachieved:any;
    janachieved:any;
    febachieved:any;

   }

   export class DeptNameModel{
    DeptId:any;
    DepName:any;
}
   
   export class DeptNameGraphicalModel{
       //DeptId:any;
       DepName;
   }
   export class KPIModel{
    //DeptId:any;
    KPI:string;
}
   export class KeyModel{
    KpiName:string;
    //QualityIndices:string;
    QIShortText:string;
    KpiList:KpiGraphicalModel[];
   
}

