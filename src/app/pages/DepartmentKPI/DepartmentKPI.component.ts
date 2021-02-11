import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AllKpiModel, UnsuccesKpiModel, Deptmodel, AddMonthlyKpiModel, QKUserModel, kpiMaster } from './DepartmentKPI.model';
import { DepartmentKPIService } from './DepartmentKPI.service';
import * as CryptoJS from 'crypto-js';
import { NbToastrService } from '@nebular/theme';
import { MENU_ITEMS } from '../pages-menu';
import * as $ from "jquery";


@Component({
  selector: 'app-DepartmentKPI',
  templateUrl: './DepartmentKPI.component.html',
  //styleUrls: ['./KPI.component.css']
})
export class DepartmentKPIComponent implements OnInit {
  frozenCols: any[];
  scrollableCols: any[];
  allDeptData: kpiMaster[];
  dataList: AllKpiModel[];
  allDataList: kpiMaster[];
  QKUserList: QKUserModel[];
  cols: any[];
  hideapril:boolean=true;
  hidemay:boolean=true;
  hidejune:boolean=true;
  actualCols: any[];
  displayDialog: boolean;
  deptId: any;
  returnValue: boolean;
  showDepartmentDropDown = false;
  selectedDept: any;
  showSubmitButton = true;
  AllItems = [];
  mon = [];
  aprillabel:boolean=false;
  maylabel:boolean=false;
  junelabel:boolean=false;
  showAllKpi = true;
  showEditableKPI = false;
  employeeId:any;
  hidetxtbox:boolean=false;
  docno:any;
  deptname:any;
  aprTarget:any;
  mayTarget:any;
  junTarget:any;
  julyTarget:any;
  augTarget:any;
  sepTarget:any;
  octTarget:any;
  novTarget:any;
  decTarget:any;
  janTarget:any;
  febTarget:any;
  marTarget:any;
  public currentMonth:any;

  constructor(
    private formBuilder: FormBuilder, chartModule: ChartModule, private departmentKPIService: DepartmentKPIService,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private toasterService: NbToastrService) {

      this.frozenCols = [
        { field: 'DeptName', header: 'Department' },
        // { field: 'slno', header: 'Sl No.' },
        { field: 'CWQPNo', header: 'CWQP No.' },
        { field: 'QualityIndices', header: 'Quality Indices' },
        { field: 'Criteria', header: 'Criteria' },
        { field: 'Measurement', header: 'Measurement' },
        { field: 'Purpose', header: 'Purpose' },
        { field: 'aprTarget', header: 'Target' },
        { field: 'Unitofmeasurement', header: 'Unit of Measurement' },
      ];

      this.scrollableCols = [
        
        { field: 'aprTarget', header: 'April' },
        { field: 'aprTarget', header: 'New Target' },
        { field: 'aprTarget', header: 'May' },
        { field: 'aprTarget', header: 'New Target' },
        { field: 'Unitofmeasurement', header: 'June' },
        { field: 'aprTarget', header: 'New Target' },
        { field: 'aprTarget', header: 'July' },
        { field: 'Unitofmeasurement', header: 'New Target' },
        { field: 'aprTarget', header: 'Auguest' },
        { field: 'aprTarget', header: 'New Target' },
        { field: 'Unitofmeasurement', header: 'September' },
        { field: 'aprTarget', header: 'New Target' },
        { field: 'aprTarget', header: 'October' },
        { field: 'Unitofmeasurement', header: 'New Target' },
        { field: 'aprTarget', header: 'November' },
        { field: 'aprTarget', header: 'New Target' },
        { field: 'Unitofmeasurement', header: 'December' },
        { field: 'aprTarget', header: 'New Target' },
        { field: 'aprTarget', header: 'January' },
        { field: 'Unitofmeasurement', header: 'New Target' },
        { field: 'aprTarget', header: 'Feb' },
        { field: 'aprTarget', header: 'New Target' },
        { field: 'Unitofmeasurement', header: 'March' }
      ];

    this.cols = [
      { field: 'DeptName', header: 'Department' },
      { field: 'CWQPNo', header: 'CWQP No.' },
      { field: 'QualityIndices', header: 'Quality Indices' },
      { field: 'Criteria', header: 'Criteria' },
      { field: 'Measurement', header: 'Measurement' },
      { field: 'Target', header: 'Target' },
      { field: "April", header: "April", editable: false },
      { field: "May", header: "May", editable: false },
      { field: 'June', header: "June", editable: true },
      { field: 'July', header: "July", editable: false },
      { field: 'August', header: "August", editable: false },
      { field: 'September', header: "September", editable: false },
      { field: 'October', header: "October", editable: false },
      { field: 'November', header: "November", editable: false },
      { field: 'December', header: "December", editable: false },
      { field: 'January', header: "January", editable: false },
      { field: 'February', header: "February", editable: false },
      { field: 'March', header: "March", editable: false },

    ];


    
    this.actualCols = [
      { field: 'DeptName', header: 'Department' },
      { field: 'CWQPNo', header: 'CWQP No' },
      { field: 'QualityIndices', header: 'Quality Indices' },
      { field: 'Criteria', header: 'Criteria' },
      { field: 'Measurement', header: 'Measurement' },
      { field: 'Target', header: 'Target' },
      { field: 'March', header: "Actual" , editable: true},
      // { field: "April", header: "April", editable: false },
      // { field: "May", header: "May", editable: false },
      // { field: 'June', header: "June", editable: false },
      // { field: 'July', header: "July", editable: false },
      // { field: 'August', header: "August", editable: false },
      // { field: 'September', header: "September", editable: false },
      // { field: 'October', header: "October", editable: false },
      // { field: 'November', header: "November", editable: false },
      // { field: 'December', header: "December", editable: false },
      // { field: 'January', header: "January", editable: false },
      // { field: 'February', header: "February", editable: false }

    ];
  }

  ngOnInit() {
    debugger;
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();
if(d.getMonth()==0)
{
  this.currentMonth=monthNames[11];
}
else
{
  this.currentMonth=monthNames[d.getMonth()-1];
}

    //const employeerole = JSON.parse(localStorage.getItem('EmployeeRole'));
    const employee = JSON.parse(localStorage.getItem('Employee'));
    this.route.queryParams
      .subscribe(params => {
        this.deptId = employee.OrgDepartmentId;
       // console.log(this.deptId); // popular
      });
   
   // console.log(employee);
   this.employeeId= employee.EmployeeNo;
debugger;
   //Get kpi data for each department
    this.loadDepartKpi(this.deptId);
    //get list of departments for this employee
    this.loadQKUserByEmpId(this.employeeId)
    //side menu display
    ////this.hideMenu(employeerole);
    //get all kpi data
    this.loadKpiYearlyReport(this.employeeId);
    
   
  }

  makeRowsSameHeight() {
    setTimeout(() => {
      if ($('.ui-table-scrollable-wrapper').length) {
        let wrapper = $('.ui-table-scrollable-wrapper');
        wrapper.each(function () {
          let w = $(this);
          let frozen_rows: any = w.find('.ui-table-frozen-view tr');
          let unfrozen_rows = w.find('.ui-table-unfrozen-view tr');
          for (let i = 0; i < frozen_rows.length; i++) {
            
            if (frozen_rows.eq(i).height() > unfrozen_rows.eq(i).height()) {
            
              unfrozen_rows.eq(i).height(frozen_rows.eq(i).height());
            } else if (frozen_rows.eq(i).height() < unfrozen_rows.eq(i).height()) {
              frozen_rows.eq(i).height(unfrozen_rows.eq(i).height());
            }
          }
        });
      }
    });
  }

  enableMonthColumn() {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var d = new Date();
    var n = month[d.getMonth()];

    return n;
  }

  loadKpiYearlyReport(empid: any) {
    debugger;
    this.allDeptData=null;
    this.departmentKPIService.getAllkpiByEmployeeId(empid).subscribe(x => {
      this.allDeptData = x;
      //this.allDataList=x;

      console.log(this.allDeptData);
this.aprTarget=x[0].aprilTarget;
this.mayTarget=x[0].mayTarget;
this.junTarget=x[0].juneTarget;
this.julyTarget=x[0].julyTarget;
this.augTarget=x[0].augTarget;
this.sepTarget=x[0].sepTarget;
this.octTarget=x[0].octTarget;
this.novTarget=x[0].novTarget;
this.decTarget=x[0].decTarget;
this.janTarget=x[0].janTarget;
this.febTarget=x[0].febTarget;
this.marTarget=x[0].marTarget;
      this.getPivotData(x);
      this.showAllKpi = true;
    });
    
  }
  loadDepartKpi(deptId: number) {
    this.departmentKPIService.getKpiByDeptId(deptId).subscribe(x => {
      const kpiDetailList = JSON.parse(localStorage.getItem('datalist'));
      debugger;
   
      if (kpiDetailList == null) {
        this.dataList = x;
        debugger;
this.docno=this.dataList[0].DocNo;
this.deptname=this.dataList[0].DeptName;
      }
      else {
        this.dataList = kpiDetailList;
        //alert(this.dataList[0].DocNo);
        this.docno=this.dataList[0].DocNo;
        this.deptname=this.dataList[0].DeptName;
        alert(this.docno);
      }
     // console.log(this.dataList);
      //this.getPivotData( this.dataList);
    });
  }

  hideMenu(employeerole: any) {
    if (employeerole != null) {

      if (employeerole.RoleId == 1) {
        MENU_ITEMS[0].hidden = false;
        MENU_ITEMS[1].hidden = false;
        MENU_ITEMS[2].hidden = false;
        MENU_ITEMS[3].hidden = true;
        MENU_ITEMS[4].hidden = true;
      }
      else if (employeerole.RoleId == 2) {
        MENU_ITEMS[0].hidden = true;
        MENU_ITEMS[1].hidden = true;
        MENU_ITEMS[2].hidden = true;
        MENU_ITEMS[3].hidden = false;
        MENU_ITEMS[4].hidden = false;
      }
    }
  }
  loadQKUserByEmpId(empNo: any) {
    this.departmentKPIService.getQKUserByEmpId(empNo).subscribe(x => {
      this.QKUserList = x;
      if (this.QKUserList.length > 1) {
        this.showDepartmentDropDown = true;
      }
      else{
        //this.showEditableKPI = true;
      }
      console.log(this.QKUserList);
    });
  }
  onSelectDpt(event) {
    this.selectedDept = event.target.value;
    const month = this.enableMonthColumn();
    const deptid = +this.selectedDept
   // console.log(deptid);
    const validateKpiData= this.allDeptData.filter(x=>x.DeptId == deptid && x.Month==month);
    //console.log(validateKpiData);
    if(validateKpiData.length==0){
      this.dataList = [];
      this.showAllKpi = false;
      this.showEditableKPI = true;
      this.loadDepartKpi(this.selectedDept);  
    }
    else{
      const message = 'KPI is submitted for '+month;
      this.showWarningmsg(message);
      this.loadQKUserByEmpId(this.employeeId);
    }
    
  }

  editKPI() {
    this.showSubmitButton = true;
    const month = this.enableMonthColumn();
    
    this.actualCols.forEach(x => {
       if (x.header == "Actual") {
        x.editable = true;
      }
    });
  }
  showDialogToAdd() {
    this.displayDialog = true;
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
  validgriddata(data: AllKpiModel[]) {
    data.forEach(x => {
      if (x.March == undefined || !x.March.trim() || x.March.length === 0) {
        this.showErrormsg('Value is required');
        return false;
      }
      else {
        return true;
      }
    })
  }

  getPivotData(pivotData: AllKpiModel[]) {
    this.allDataList=[];
    this.AllItems=[];
    const results = []; var checks = [];
    debugger;
    for (var l = 0; l < pivotData.length; l++) {
      results.push(pivotData[l]);
      // if (!checks[pivotData[l].MT_QK_KPI.QualityIndices]) {
      //   results.push(pivotData[l]);
      // }
      // checks[pivotData[l].MT_QK_KPI.QualityIndices] = true;
    }
    const month = Array.from(new Set(pivotData.map(obj => obj.Month)))
      .map(m => {
        return {
          Month: pivotData.find(v => v.Month === m).Month
        };
      });
    const kpi = Array.from(new Set(pivotData.map(obj => obj.KpiName)))
      .map(m => {
        return {
          KpiName: pivotData.find(v => v.KpiName === m).KpiName
        };
      });
    for (let i = 0; i < results.length; i++) {
      debugger;
      const mem = {};
      const Department = results[i].DeptName;
      const CWQPNo = results[i].KpiName;
      const QualityIndices = results[i].QualityIndices;
      const Criteria = results[i].Criteria;
      const Measurement = results[i].Measurment;
      const Unitofmeasurement=results[i].Unitofmeasurement;
      const Purpose = results[i].Purpose;
      const Target = results[i].Target;
      const Year = results[i].Year;
      const DeptId = results[i].DeptId;
      const kpiId = results[i].KpiId;
      const PivotDataList = results[i];
      const  aprTarget=results[i].aprilTarget;
      const mayTarget=results[i].mayTarget;
      const junTarget=results[i].juneTarget;
      const julyTarget=results[i].julyTarget;
      const augTarget=results[i].augTarget;
      const sepTarget=results[i].sepTarget;
      const octTarget=results[i].octTarget;
      const  novTarget=results[i].novTarget;
      const  decTarget=results[i].decTarget;
      const  janTarget=results[i].janTarget;
      const  febTarget=results[i].febTarget;
      const  marTarget=results[i].marTarget;
      const marchachieved=results[i].marchachieved;
      const aprilachieved=results[i].aprilachieved;
      const mayachieved=results[i].mayachieved;
      const juneachieved=results[i].juneachieved;
      const julyachieved=results[i].julyachieved;
      const augustachieved=results[i].augustachieved;
      const septemberachieved=results[i].septemberachieved;
      const octoberachieved=results[i].octoberachieved;
      const novemberachieved=results[i].novemberachieved;
      const decemberachieved=results[i].decemberachieved;
      const januaryachieved=results[i].januaryachieved;
      const februaryachieved=results[i].februaryachieved;
      mem['Department'] = Department;
      mem['CWQPNo'] = CWQPNo;
      mem['QualityIndices'] = QualityIndices;
      mem['Criteria'] = Criteria;
      mem['Measurement'] = Measurement;
      mem['Purpose'] = Purpose;
      mem['Target'] = Target;
      mem['Year'] = Year;
      mem['DeptId'] = DeptId;
      mem['kpiId'] = kpiId;
      mem['aprTarget'] = aprTarget;
      mem['mayTarget'] = mayTarget;
      mem['junTarget'] = junTarget;
      mem['julyTarget'] = julyTarget;
      mem['augTarget'] = augTarget;
      mem['sepTarget'] = sepTarget;
      mem['octTarget'] = octTarget;
      mem['novTarget'] = novTarget;
      mem['decTarget'] = decTarget;
      mem['janTarget'] = janTarget;
      mem['febTarget'] = febTarget;
      mem['marTarget'] = marTarget;
      mem['marchachieved'] = marchachieved;
      mem['aprilachieved'] = aprilachieved;
      mem['mayachieved'] = mayachieved;
      mem['juneachieved'] = juneachieved;
      mem['julyachieved'] = julyachieved;
      mem['augustachieved'] = augustachieved;
      mem['septemberachieved'] = septemberachieved;
      mem['octoberachieved'] = octoberachieved;
      mem['novemberachieved'] = novemberachieved;
      mem['decemberachieved'] = decemberachieved;
      mem['januaryachieved'] = januaryachieved;
      mem['februaryachieved'] = februaryachieved;
      mem['Unitofmeasurement']=Unitofmeasurement;
      for (let p = 0; p < pivotData.length; p++) {
        const currentpivot = pivotData[p];
        if (currentpivot.DeptId == PivotDataList.DeptId && currentpivot.KpiName == PivotDataList.KpiName) {
          for (let j = 0; j < month.length; j++) {

            if (currentpivot.Month == month[j].Month) {

              mem[month[j].Month] = currentpivot.Actual
             // console.log(mem[month[j].Month]);
            }

          }
        }
      }
      this.AllItems.push(mem);
      //console.log(this.AllItems);
      this.allDataList = this.AllItems;
      
    }
    this.makeRowsSameHeight();
  }
  // decryptData(dataList) {
  //   this.deptId="123456$#@$^@1ERF";
  //   try {
  //     const bytes = CryptoJS.AES.decrypt(dataList, this.deptId);
  //     if (bytes.toString()) {
  //       return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //     }
  //     return dataList;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  onSubmit() {
    const employeerole = JSON.parse(localStorage.getItem('EmployeeRole'));
    this.allDataList.forEach(x => {
      x.UpdatedBy = this.employeeId;
      x.user="User";
    })

    const value = this.allDataList;
    console.log(this.allDataList);
    debugger;
    this.returnValue = true;
    //alert(value);
    // value.forEach(x => {
    //   if (x.June == undefined || x.June.length === 0) {
    //     this.showErrormsg('Value is required for the June month');
    //     return false;
    //   }
    //   else {
    //     this.returnValue = true;
    //   }
    // });
    if (this.returnValue == true) {
      // localStorage.setItem('datalist', JSON.stringify(this.dataList));
      debugger;
      this.departmentKPIService.createMontlyKpi(this.allDataList).subscribe(data => {
        this.showSuccessMsg(data);
        const month = this.enableMonthColumn();
        this.cols.forEach(x => {
          if (x.header == month) {
            x.editable = false;
          }
        });
        this.showSubmitButton = false;
        this.hidetxtbox=true;
        this.loadKpiYearlyReport(this.employeeId);
      },
        err => {
          this.showErrormsg(err.error.ExceptionMessage);
          this.showSubmitButton = false;
          //alert(this.employeeId);
          const employee = JSON.parse(localStorage.getItem('Employee'));
          // console.log(employee);
          this.employeeId= employee.EmployeeNo;
          //alert(this.employeeId);
          this.loadKpiYearlyReport(this.employeeId);
        });
    }
    this.showAllKpi=false;
  }
  onCancel() {
    const month = this.enableMonthColumn();
    this.cols.forEach(x => {
      if (x.header == month) {
        x.editable = true;
      }
    });
  }




}












