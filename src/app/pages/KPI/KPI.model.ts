export class kpiMaster{
    user:any;
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
    DeptId:any; 
    EnteredBy:string;
    EnteredOn:any; 
    InUse:any;
 //OrgDepartment:OrgDepartmentModel;    
}

export class KpiModel {
    ID:any; 
    Department:string;
    DocumentNo:string;  
    Date:any; 
    Measurement:string;
    ActualTarget:string;
    EnteredBy:string;
    EnteredOn:any; 
    InUse:any;
user:any;
 KpiId: any;
 KpiName:string;
 QualityIndices: string;
 Criteria: string;
 CWQPNo: string;
 DeptName: string;
 //Department:string;
 Unitofmeasurement:any;
 DeptId:any;
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
 Year:string;
 Month:string;
 Actual:string;
 MgtKPICheckedStatus:boolean = false;
 MT_QK_KPI:kpiMaster;
 marchachieved:any;
 UpdatedBy:any;
    aprilachieved:any;
    mayachieved:any;
    juneachieved:any;
    julyachieved:any;
    sepachieved:any;
    augustachieved:any;
    octachieved:any;
    novachieved:any;
    decachieved:any;
    janachieved:any;
    febachieved:any;
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
}

export class DeptNameModel{
    DeptId:any;
    DepName:any;
}

export class TopKpiModel {
    ID: any;
    KpiName:string;
    QualityIndices: string;
    Criteria: string;
    CWQPNo: string;
    DeptName: string;
    display:boolean;
    //Department:string;
    DocNo: string;
    Measurment: string;
    RevNo: string;
    Purpose: string;
    Target: any;
   Actual:string;
    Year:string;
    Month:string;
    MgtKPICheckedStatus:boolean;
    janTarget:any;
febTarget:any;
marTarget:any;
aprTarget:any;
mayTarget:any;
junTarget:any;
julTarget:any;
augTarget:any;
sepTarget:any;
octTarget:any;
novTarget:any;
decTarget:any;

   }

   export class InsertTopKpiModel {
    TOPKPIId: any;
    Department:string;
    QualityIndices: string;
    Criteria: string;
    CWQPNo: string;
    CheckedDate:any; 
    Measurment: string;
    CheckedValue: any;
    Purpose: string;
    Target: any;
   }


   