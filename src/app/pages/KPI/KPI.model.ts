export class KpiModel {
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

export class DeptNameModel{
    //DeptId:any;
    DepName;
}

export class TopKpiModel {
    ID: any;
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
   Actual:string;
    Year:string;
    Month:string;
    MgtKPICheckedStatus:boolean;
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