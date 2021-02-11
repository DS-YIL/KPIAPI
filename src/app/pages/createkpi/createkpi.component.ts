import { Component, OnInit } from '@angular/core';
import { DeptKpiModel, kpiData } from './createkpi.model';
import {CreateKPIService} from './createkpi.service';
import { NbToastrService } from '@nebular/theme';
import { ScrollableView, Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-createkpi',
  templateUrl: './createkpi.component.html',
  styleUrls: ['./createkpi.component.scss']
})
export class CreatekpiComponent implements OnInit {
public newkpidept=new DeptKpiModel();
public kpiDeptList:DeptKpiModel[]=[];
public deptid:any;
public employeeId:any;
public showSubmitkpi:boolean=true;
public kpimodel=new kpiData();
addKPIDialogue:boolean=false;
  constructor(private createKPIService: CreateKPIService,private toasterService: NbToastrService) { }

  ngOnInit() {
    debugger;
    const employeerole = JSON.parse(localStorage.getItem('EmployeeRole'));
    this.deptid=localStorage.getItem('deptId');
    const employee = JSON.parse(localStorage.getItem('Employee'));
   // console.log(employee);
   this.employeeId= employee.EmployeeNo;
    this.getKpilistbydeptid();
  }
// display Add new kpi dialogue
addNewKPI()
{
  debugger;
if(this.kpiDeptList.length==0)
{
  this.newkpidept=new DeptKpiModel();
  this.kpiDeptList.splice(0, 0, this.newkpidept);
  //this.kpiDeptList.push(this.newkpidept);
}
else{
  if(this.kpiDeptList[0].CWQPNo=="" || this.kpiDeptList[0].CWQPNo==null)
  {
    this.showErrormsg("Please enter CWQPNo");
    return;
  }
  if(this.kpiDeptList[0].QualityIndices=="" || this.kpiDeptList[0].QualityIndices==null)
  {
    this.showErrormsg("Please enter Quality Indices");
    return;
  }
  if(this.kpiDeptList[0].Measurment=="" || this.kpiDeptList[0].Measurment==null)
  {
    this.showErrormsg("Please enter Measurement");
    return;
  }
  if(this.kpiDeptList[0].Criteria=="" || this.kpiDeptList[0].Criteria==null)
  {
    this.showErrormsg("Please enter Criteria");
    return;
  }
  if(this.kpiDeptList[0].Purpose=="" || this.kpiDeptList[0].Purpose==null)
  {
    this.showErrormsg("Please enter Purpose");
    return;
  }
  if(this.kpiDeptList[0].Target=="" || this.kpiDeptList[0].Target==null)
  {
    this.showErrormsg("Please enter Target");
    return;
  }
  if(this.kpiDeptList[0].actualTarget<0 || this.kpiDeptList[0].actualTarget==null)
  {
    this.showErrormsg("Please enter Actual Target");
    return;
  }
  this.newkpidept=new DeptKpiModel();
  this.kpiDeptList.splice(0, 0, this.newkpidept);
}

}

SubmitKpi()
{
  // alert(this.kpiDeptList.length);
  if(this.kpiDeptList.length==0)
  {
    this.showErrormsg("Please enter KPI details");
  }
  else{
    if(this.kpiDeptList[0].CWQPNo=="" || this.kpiDeptList[0].CWQPNo==null)
    {
      this.showErrormsg("Please enter CWQPNo");
      return;
    }
    if(this.kpiDeptList[0].QualityIndices=="" || this.kpiDeptList[0].QualityIndices==null)
    {
      this.showErrormsg("Please enter Quality Indices");
      return;
    }
    if(this.kpiDeptList[0].QIShortText=="" || this.kpiDeptList[0].QIShortText==null)
    {
      this.showErrormsg("Please enter QI Short Text");
      return;
    }
    if(this.kpiDeptList[0].Measurment=="" || this.kpiDeptList[0].Measurment==null)
    {
      this.showErrormsg("Please enter Measurement");
      return;
    }
    if(this.kpiDeptList[0].Criteria=="" || this.kpiDeptList[0].Criteria==null)
    {
      this.showErrormsg("Please enter Criteria");
      return;
    }
    if(this.kpiDeptList[0].Purpose=="" || this.kpiDeptList[0].Purpose==null)
    {
      this.showErrormsg("Please enter Purpose");
      return;
    }
    if(this.kpiDeptList[0].Target=="" || this.kpiDeptList[0].Target==null)
    {
      this.showErrormsg("Please enter Target");
      return;
    }
    // if(this.kpiDeptList[0].actualTarget<0 || this.kpiDeptList[0].actualTarget==null)
    // {
    //   this.showErrormsg("Please enter Actual Target");
    //   return;
    // }
    this.kpimodel.deptid=this.deptid;
    this.kpimodel.employeeid=this.employeeId;
    this.kpimodel.deptkpi=this.kpiDeptList;
    debugger;
this.createKPIService.SaveKPIDetails(this.kpimodel).subscribe(x => {
  if(x=="success")
  {
    this.showSubmitkpi=false;
    this.getKpilistbydeptid();
    this.showSuccessMsg("QI Updated Successfully");
    const employees = JSON.parse(localStorage.getItem('EmployeeDetails'));
          employees.iskpiEditReq=false;
          employees.iskpiEditApproved=false;
          localStorage.setItem('EmployeeDetails', JSON.stringify(employees));

  }
else{
  this.showErrormsg("Error occured while Updating QI Details");
}
});

  }
}

//clear data
ClearData1()
{
  this.newkpidept=new DeptKpiModel();
}

//create kpi
CreateKpi()
{
  this.newkpidept.deptId=this.deptid;
  this.createKPIService.createKpi(this.newkpidept).subscribe(x => {
    if(x=="success")
    {
      this.showSuccessMsg("KPI Created Successfully");
      this.getKpilistbydeptid();
      this.addKPIDialogue=false;
    }
  else{
    this.showErrormsg("Error occured while entering kpi details");
  }
  });
}


//deleteKPI
DeleteKpi(rowData:DeptKpiModel,Index:number)
{
  this.kpiDeptList.splice(Index, 1);
  if(rowData.KpiId!=null || rowData.KpiId!="")
  {
    this.createKPIService.deletekpi(rowData.KpiId, this.employeeId).subscribe(x => {
      if(x=="success")
      {
this.showSuccessMsg("KPI Deleted Successfully");
      }
      else{
        this.showErrormsg("Error while deleting KPI");
      }
    });
  }

}
  showErrormsg(msg: string) {
    const status: any = 'danger';
    this.toasterService.show('Error', msg, { preventDuplicates: true, duplicatesBehaviour: 'all', status });
  }
  showWarningmsg(msg: string) {
    const status: any = 'warning';
    this.toasterService.warning(msg, { preventDuplicates: true, duplicatesBehaviour: 'all', status });
  }
  showSuccessMsg(msg: string) {
    const status: any = 'success';
    this.toasterService.show(status, msg, { preventDuplicates: true, duplicatesBehaviour: 'all', status });
  }

  //get kpi list
  getKpilistbydeptid()
  {
    this.createKPIService.getKPIListByDeptId(this.deptid).subscribe(x => {
      this.kpiDeptList = x;
    });
  }
  
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getdata());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "KPI_PendingApprovals");
    });
}

getdata() {
  let report = [];
  for(let car of this.kpiDeptList) {
      //car.year = car.year.toString();
      report.push(car);
  }
  return report;
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}


}
