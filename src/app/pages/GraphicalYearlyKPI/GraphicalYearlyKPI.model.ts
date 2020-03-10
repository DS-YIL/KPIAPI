export class KpiGraphicalModel {
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
    Year:number;
    Month:any;
    Actual:number;
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
    QualityIndices:string;
    KpiList:KpiGraphicalModel[];

}

