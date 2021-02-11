import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KpiYearlyModel, DeptNameYearlyModel, DeptNameModel} from './YearlyKPI.model';
import { YearlyKPIService } from './YearlyKPI.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Employee } from '../Login/Login.model';

@Component({
  selector: 'app-YearlyKPI',
  templateUrl: './YearlyKPI.component.html',
  styleUrls: ['./YearlyKPI.component.css']
})
export class YearlyKPIComponent implements OnInit {
  public valuedate: Date;
  year=new Date().getFullYear();
  min = new Date(2020, 0, 1)
  max = new Date(2050, 11, 31)

  data: KpiYearlyModel[];
  dataList: KpiYearlyModel[];
  value: boolean;
  //deptname: DeptNameModel[];
  deptname: DeptNameYearlyModel[];
  deptlist:DeptNameModel[]=[];
  selectedCity: any;
  selectedYear:any;
  selectedDept:any;
  selectedDeptName:any;
  showSelectedTitle = false;
  AllItems =[];
  employee=new Employee();
  mon = [];
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
  roleid:number;

  constructor(
    private yearlyKPIService: YearlyKPIService, private formBuilder: FormBuilder, private router: Router,chartModule: ChartModule,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {

   
  }

  ngOnInit() {
    if (localStorage.getItem("Employee"))
    this.employee = JSON.parse(localStorage.getItem("Employee"));
    
  else
    this.router.navigateByUrl("Login");
    console.log(this.employee.OrgDepartmentId);
    this.loadKpiYearlyReport();
    if(this.employee.RoleId == 5 )
    {
      this.roleid=this.employee.RoleId;
      this.loadAllDeptName();
    }
    else{
      this.roleid=this.employee.RoleId;
      var objdata=new DeptNameModel();
objdata.DeptId=this.employee.OrgDepartmentId;
objdata.DepName=this.employee.OrgDepartmentName;
this.deptlist[0] = objdata; 
    }


    this.loadKpiYearlyReport();
  }

  loadKpiYearlyReport() {
    this.yearlyKPIService.getAllKpi().subscribe(x => {
      this.data = x;
      this.dataList=x;
      this.dataList=this.dataList.sort(x=>x.DeptName);
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
      this.data.forEach(x => {

       
      })
      var lookup = {};
      var items = this.data
     

      // for (var item, i = 0; item = items[i++];) {
      //   var name = item.DeptName;
      //   //var name = item.CWQPNo;

      //   if (!(name in lookup)) {
      //     lookup[name] = 1;
      //     this.deptlist.push(name);
      //   }
      // }
     
      console.log(this.data);
      //console.log(this.deptlist);
    });
  }

  loadAllDeptName(){
    this.yearlyKPIService.getDeptName().subscribe(data => {
      this.deptlist = data; 
    })
  }

  getPivotData(pivotData:KpiYearlyModel[]){
  
    const results = []; var checks = [];
    for (var l = 0; l < pivotData.length; l++) {
        if (!checks[pivotData[l].QualityIndices]) {
            results.push(pivotData[l]);
        }
        checks[pivotData[l].QualityIndices] = true;
    }
 console.log(results)
    // const result = [];
    // const map = new Map();
    // for (const item of pivotData) {
    //   if (!map.has(item.QualityIndices)) {
    //     map.set(item.QualityIndices, true);    // set any value to Map
    //     result.push({
    //       kpi: item.KpiName,
    //       dept: item.DeptName
    //     });
    //   }
    // }
    
    const month = Array.from(new Set(pivotData.map(obj=>obj.Month)))
    .map(m=>{
      return{
        Month:pivotData.find(v=>v.Month===m).Month
      };
    });
    const kpi = Array.from(new Set(pivotData.map(obj=>obj.KpiName)))
    .map(m=>{
      return{
        KpiName:pivotData.find(v=>v.KpiName===m).KpiName
      };
    });
    for(let i=0; i<results.length;i++){
      const mem ={};
      const DeptName = results[i].DeptName;
      const CWQPNo = results[i].CWQPNo;
      const QualityIndices = results[i].QualityIndices;
      const Criteria = results[i].Criteria;
      const Measurment = results[i].Measurment;
      const Target = results[i].Target;
      const Year = results[i].Year;
      const DeptId = results[i].DeptId;
      const kpiId = results[i].KpiId;
      const PivotDataList = results[i];
      const  aprilTarget=results[i].aprilTarget;
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
const Purpose=results[i].Purpose;
const Unitofmeasurement=results[i].Unitofmeasurement;
const marachachieved=results[i].marachachieved;
const aprilachieved=results[i].aprilachieved;
const mayachieved=results[i].mayachieved;
const juneachieved=results[i].juneachieved;
const augustachieved=results[i].augustachieved;
const sepachieved=results[i].sepachieved;
const octachieved=results[i].octachieved;
const novachieved=results[i].novachieved;
const decachieved=results[i].decachieved;
const janachieved=results[i].janachieved;
const febachieved=results[i].febachieved;
const julyachieved=results[i].julyachieved;
      mem['marachachieved']=marachachieved;
      mem['aprilachieved']=aprilachieved;
      mem['mayachieved']=mayachieved;
      mem['juneachieved']=juneachieved;
      mem['julyachieved']=julyachieved;
      mem['augustachieved']=augustachieved;
      mem['sepachieved']=sepachieved;
      mem['octachieved']=octachieved;
      mem['novachieved']=novachieved;
      mem['decachieved']=decachieved;
      mem['janachieved']=janachieved;
      mem['febachieved']=febachieved;
      mem['DeptName'] = DeptName;
      mem['CWQPNo'] = CWQPNo;
      mem['QualityIndices'] = QualityIndices;
      mem['Criteria'] = Criteria;
      mem['Measurment'] = Measurment;
      mem['Target'] = Target;
      mem['Year'] = Year;
      mem['DeptId'] = DeptId;
      mem['kpiId'] = kpiId;
      mem['aprilTarget'] = aprilTarget;
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
      mem['Purpose']=Purpose;
      mem['Unitofmeasurement']=Unitofmeasurement;
    //for(let p=0;p<pivotData.length;p++){
      
    
    //  if( pivotData[p].DeptName== results[i].DeptName &&  pivotData[p].KpiName == results[i].KpiName){
      
      //for(let j = 0; j<month.length; j++){
      
      for(let p=0;p<pivotData.length;p++){
       const currentpivot = pivotData[p];
       if(currentpivot.DeptId== PivotDataList.DeptId &&  currentpivot.KpiName == PivotDataList.KpiName){
        for(let j = 0; j<month.length; j++){
            
          if(currentpivot.Month == month[j].Month){
           
           mem[month[j].Month] = currentpivot.Actual
          console.log(mem[month[j].Month]);
          }
        //      else{
        //  mem[month[j].Month]= '';
        // }
           }
       }
        //if( pivotData[p].KpiName== results[i].KpiName){
         // const pivot = pivotData.filter(p=>p.DeptName== results[i].DeptName && p.KpiName==results[i].KpiName)
        
          
        }
       
      //}
      
   // }
   
    
       // }
    
    
 // }
  this.AllItems.push(mem);
  this.dataList=this.AllItems.sort(x=>x.DeptName);
}
    
  }

  // filterUnsuccessKPI(){
  //   this.dataList = [];
  //   this.dataList= this.dataListForFilter.filter(x=>(x.Target)-(+x.Actual)>0)
  // }

  
  onSelectDpt(event){
    this.selectedDept = event.target.value;
    const deptName = this.deptlist.filter(x=>x.DeptId == +(this.selectedDept));
    this.selectedDeptName = Object.assign({}, ...deptName);
    const deptdata = this.data.filter(x=>x.MT_QK_KPI.DeptId == this.selectedDept)
   
    
     }

     onSelectYear(event){
      this.selectedYear = '';
      this.selectedYear = event.target.value;
    }

    filterKPI(){
     debugger;
      this.dataList = [];
      const selecteddept = this.selectedDept;
      this.selectedYear=this.valuedate.getFullYear();
      console.log(this.AllItems);
      console.log(this.data);
      this.data.forEach(x => {

         if(x.DeptId == selecteddept && x.Year == this.selectedYear ){
          this.dataList.push(x);
          //console.log(this.dataList);
          //this.actual.push(x.Actual)
         }
      });




        // this.AllItems.forEach(x => {
        //    if(x.DeptId == selecteddept && x.Year == this.selectedYear  ){            
        //     this.dataList.push(x);
        //   }
        
         
        //  else if(this.selectedDept == "All Department"  && x.Year == this.selectedYear ){            
        //     this.dataList.push(x);
        //   }
        // });
        console.log(this.dataList);
      this.showSelectedTitle = true;
      
      
    }

    exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getdata());
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "KPI_yearlyReport");
      });
  }
  
  getdata() {
    let report = [];
    for(let car of this.dataList) {
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


