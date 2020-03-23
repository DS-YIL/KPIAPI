import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KpiYearlyModel, DeptNameYearlyModel, DeptNameModel} from './YearlyKPI.model';
import { YearlyKPIService } from './YearlyKPI.service';

@Component({
  selector: 'app-YearlyKPI',
  templateUrl: './YearlyKPI.component.html',
  styleUrls: ['./YearlyKPI.component.css']
})
export class YearlyKPIComponent implements OnInit {

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
  mon = [];

  constructor(
    private yearlyKPIService: YearlyKPIService, private formBuilder: FormBuilder, chartModule: ChartModule,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {

   
  }

  ngOnInit() {
    this.loadKpiYearlyReport();
    this.loadAllDeptName();
  }

  loadKpiYearlyReport() {
    this.yearlyKPIService.getAllKpi().subscribe(x => {
      this.data = x;
      
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
        if (!checks[pivotData[l].MT_QK_KPI.QualityIndices]) {
            results.push(pivotData[l]);
        }
        checks[pivotData[l].MT_QK_KPI.QualityIndices] = true;
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
    const kpi = Array.from(new Set(pivotData.map(obj=>obj.MT_QK_KPI.KpiName)))
    .map(m=>{
      return{
        KpiName:pivotData.find(v=>v.MT_QK_KPI.KpiName===m).MT_QK_KPI.KpiName
      };
    });
    for(let i=0; i<results.length;i++){
      const mem ={};
      const Department = results[i].MT_QK_KPI.DeptName;
      const CWQPNo = results[i].MT_QK_KPI.KpiName;
      const QualityIndices = results[i].MT_QK_KPI.QualityIndices;
      const Criteria = results[i].MT_QK_KPI.Criteria;
      const Measurement = results[i].MT_QK_KPI.Measurment;
      const Target = results[i].MT_QK_KPI.Target;
      const Year = results[i].Year;
      const DeptId = results[i].MT_QK_KPI.DeptId;
      const PivotDataList = results[i];
      
      mem['Department'] = Department;
      mem['CWQPNo'] = CWQPNo;
      mem['QualityIndices'] = QualityIndices;
      mem['Criteria'] = Criteria;
      mem['Measurement'] = Measurement;
      mem['Target'] = Target;
      mem['Year'] = Year;
      mem['DeptId'] = DeptId;
    //for(let p=0;p<pivotData.length;p++){
      
    
    //  if( pivotData[p].DeptName== results[i].DeptName &&  pivotData[p].KpiName == results[i].KpiName){
      
      //for(let j = 0; j<month.length; j++){
      
      for(let p=0;p<pivotData.length;p++){
       const currentpivot = pivotData[p];
       if(currentpivot.MT_QK_KPI.DeptId== PivotDataList.MT_QK_KPI.DeptId &&  currentpivot.MT_QK_KPI.KpiName == PivotDataList.MT_QK_KPI.KpiName){
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
  this.dataList=this.AllItems;
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

     }

     onSelectYear(event){
      this.selectedYear = '';
      this.selectedYear = event.target.value;
    }

    filterKPI(){
     
      this.dataList = [];
      const selecteddept = +this.selectedDept
        this.AllItems.forEach(x => {
           if(x.DeptId == selecteddept && x.Year == this.selectedYear  ){            
            this.dataList.push(x);
          }
        
         
         else if(this.selectedDept == "All Department"  && x.Year == this.selectedYear ){            
            this.dataList.push(x);
          }
        });
        console.log(this.dataList);
      this.showSelectedTitle = true;
      
      
    }


   
}


