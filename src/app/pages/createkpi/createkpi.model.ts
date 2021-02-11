export class DeptKpiModel
{
     KpiId:any;
      KpiName :string;
      Month :any;
      Year :any;
      QualityIndices :any;
      Measurment :any;
      Purpose :any;
      Criteria :any;
      CWQPNo :any;
      Target :any;
      Date:Date;
      unitOfMeasurement:string;
     actualTarget :any;
     deptId:any;
     QIShortText:string;
}

export class kpiData
{
     deptid:any;
     employeeid:any;
     deptkpi:Array<DeptKpiModel>=[];
}