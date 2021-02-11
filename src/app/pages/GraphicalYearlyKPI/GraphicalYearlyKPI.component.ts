import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KpiGraphicalModel, DeptNameGraphicalModel,KeyModel, DeptNameModel } from './GraphicalYearlyKPI.model';
import { GraphicalKPIService } from './GraphicalYearlyKPI.service';
import { KpiModel } from '../KPI/KPI.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import plugin from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Employee } from '../Login/Login.model';

@Component({
  selector: 'app-GraphicalYearlyKPI',
  templateUrl: './GraphicalYearlyKPI.component.html',
  styleUrls: ['./GraphicalYearlyKPI.component.css']
})
export class GraphicalKPIComponent implements OnInit {
  public valuedate: Date;
  year=new Date().getFullYear();
  min = new Date(2020, 0, 1)
  max = new Date(2050, 11, 31)
  selectedDeptName:any;
  datagraph:any;
  data: KpiGraphicalModel[];
  dataList: KpiGraphicalModel[];
  value: boolean;
  deptname: DeptNameGraphicalModel[];
  barChart: any;
  lineChart: any;
  lineChartDeptWise: any;
  label: any[] = [];
  target: any[] = [];
  actual: any[] = [];
  deptDropDownList:any[]=[];
  deptlist:any[]=[];
  selectedCity: any;
  barchartList:any[]=[];
  employee=new Employee();
  selectedYear:any;
  selectedDept:any;
  allKPIWiseList:any[]=[];
  keyModel:KeyModel[]=[];
  roleid:number;
  keyModelNew:KeyModel[]=[];
  lineChartList:any[]=[];
  showalldeptwise=false;
  AllItems =[];
  monthList =[];
  qc=[];
  kpiList =[];
  isShowMessage = false;
  options:any;
  public chartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{
      offset: true,
      ticks:{
       
      }
    }], 
    yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]},
    plugins: {
     datalabels: {
        anchor: 'center',
        align: 'center',
        display: true,
        font: {
          size: 10,
        }

     }
    },
    legend:{
      position:'top'
    }
  };
    public barChartPlugins = [ChartDataLabels];

  constructor(
    private graphicalKPIService: GraphicalKPIService, private formBuilder: FormBuilder,private router: Router, chartModule: ChartModule,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {


  }

  ngOnInit() {
    if (localStorage.getItem("Employee"))
    this.employee = JSON.parse(localStorage.getItem("Employee"));
    
  else
    this.router.navigateByUrl("Login");
    alert("Entered");
    console.log(this.employee.OrgDepartmentId);
    this.loadGraphicalKpiReport();
    if(this.employee.RoleId == 5 )
    {
      this.roleid=this.employee.RoleId;
      this.loadDepName();
    }
    else{
      this.roleid=this.employee.RoleId;
      var objdata=new DeptNameModel();
objdata.DeptId=this.employee.OrgDepartmentId;
objdata.DepName=this.employee.OrgDepartmentName;
this.deptlist[0] = objdata; 
    }
    //this.loadDepName();

    this.datagraph = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Auguest','September','October','November','December'],
      datasets: [
          {
            type:'line',
              label: 'Target',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          },
          {
            type:'bar',
              label: 'Achieved',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              backgroundColor: '#9CCC65',
        borderColor: '#7CB342',
          }
      ]
  }

  }

  loadGraphicalKpiReport() {
    debugger;
    this.graphicalKPIService.getKpi().subscribe(x => {
      this.data = x;
      this.dataList=x;
      console.log(this.data);
      this.getPivotData(x);
      this.data.forEach(x => {
        this.target.push(x.MT_QK_KPI.mayTarget);
        this.actual.push(x.MT_QK_KPI.Actual);
        //this.actual.push(x.Actual);
        this.label.push(x.MT_QK_KPI.CWQPNo);
        //this.label.push(x.KpiName);
      })
      var lookup = {};
      var items = this.data


      // for (var item, i = 0; item = items[i++];) {
      //   var name = item.DeptName;
      //   //var name = item.CWQPNo;

      //   if (!(name in lookup)) {
      //     lookup[name] = 1;
      //     this.deptDropDownList.push(name);
      //   }
      // }

      this.loadBarChart(this.target, this.actual, this.label);
      //this.loadLineChart(this.target, this.actual, this.label);
     // console.log(this.data);

      //console.log(this.deptlist);
    });
  }

  loadDepName(){
    this.graphicalKPIService.getDeptName().subscribe(data => {
      this.deptDropDownList = data;
    })
  }
  getPivotData(pivotData:KpiGraphicalModel[]){

    const results = []; var checks = [];
    for (var l = 0; l < pivotData.length; l++) {
        if (!checks[pivotData[l].MT_QK_KPI.QualityIndices]) {
            results.push(pivotData[l]);
        }
        checks[pivotData[l].MT_QK_KPI.QualityIndices] = true;
    }
    const month = Array.from(new Set(pivotData.map(obj=>obj.Month)))
    .map(m=>{
      return{
        Month:pivotData.find(v=>v.Month===m).Month
      };
    });

    this.monthList = month;
    console.log(this.monthList);
    const qc = Array.from(new Set(pivotData.map(obj=>obj.MT_QK_KPI.QualityIndices)))
    .map(m=>{
      return{
        QualityIndices:pivotData.find(v=>v.MT_QK_KPI.QualityIndices===m).MT_QK_KPI.QualityIndices
      };
    });

    this.qc = qc;
    console.log(this.qc);
    const kpi = Array.from(new Set(pivotData.map(obj=>obj.MT_QK_KPI.KpiName)))
    .map(m=>{
      return{
        KpiName:pivotData.find(v=>v.MT_QK_KPI.KpiName===m).MT_QK_KPI.KpiName
      };
    });
    this.kpiList = kpi;
    console.log(this.kpiList);
    for(let i=0; i<results.length;i++){
      const mem ={};
      const Department = results[i].MT_QK_KPI.DeptName;
      const CWQPNo = results[i].MT_QK_KPI.CWQPNo;
      const QualityIndices = results[i].MT_QK_KPI.QualityIndices;
      const Criteria = results[i].MT_QK_KPI.Criteria;
      const Measurement = results[i].MT_QK_KPI.Measurment;
      const Target = results[i].MT_QK_KPI.mayTarget;
      const Year = results[i].Year;
      const kpiId = results[i].MT_QK_KPI.KpiId;
      const DeptId = results[i].MT_QK_KPI.DeptId;
      const PivotDataList = results[i];
      const  aprTarget=results[i].MT_QK_KPI.aprilTarget;
      const mayTarget=results[i].MT_QK_KPI.mayTarget;
      const junTarget=results[i].MT_QK_KPI.juneTarget;
      const julyTarget=results[i].MT_QK_KPI.julyTarget;
      const augTarget=results[i].MT_QK_KPI.augTarget;
      const sepTarget=results[i].MT_QK_KPI.sepTarget;
      const octTarget=results[i].MT_QK_KPI.octTarget;
      const  novTarget=results[i].MT_QK_KPI.novTarget;
      const  decTarget=results[i].MT_QK_KPI.decTarget;
      const  janTarget=results[i].MT_QK_KPI.janTarget;
      const  febTarget=results[i].MT_QK_KPI.febTarget;
      const  marTarget=results[i].MT_QK_KPI.marTarget;

      mem['Department'] = Department;
      mem['CWQPNo'] = CWQPNo;
      mem['QualityIndices'] = QualityIndices;
      mem['Criteria'] = Criteria;
      mem['Measurement'] = Measurement;
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
      for(let p=0;p<pivotData.length;p++){
       const currentpivot = pivotData[p];
       if(currentpivot.MT_QK_KPI.DeptId== PivotDataList.MT_QK_KPI.DeptId &&  currentpivot.MT_QK_KPI.KpiName == PivotDataList.MT_QK_KPI.KpiName){
        for(let j = 0; j<month.length; j++){

          if(currentpivot.Month == month[j].Month){

           mem[month[j].Month] = currentpivot.Actual
          console.log(mem[month[j].Month]);
          }
           }
       }

        }
  this.AllItems.push(mem);
  this.dataList=this.AllItems;
  //console.log(this.dataList);
}
  }

//   getPivotData(pivotData:KpiGraphicalModel[]){

//     const results = []; var checks = [];
//     for (var l = 0; l < pivotData.length; l++) {
//         if (!checks[pivotData[l].QualityIndices]) {
//             results.push(pivotData[l]);
//         }
//         checks[pivotData[l].QualityIndices] = true;
//     }

//     const month = Array.from(new Set(pivotData.map(obj=>obj.Month)))
//     .map(m=>{
//       return{
//         Month:pivotData.find(v=>v.Month===m).Month
//       };
//     });

//     this.monthList = month;
//     console.log(this.monthList);
//     const qc = Array.from(new Set(pivotData.map(obj=>obj.QualityIndices)))
//     .map(m=>{
//       return{
//         QualityIndices:pivotData.find(v=>v.QualityIndices===m).QualityIndices
//       };
//     });

//     this.qc = qc;
//     console.log(this.qc);
//     const kpi = Array.from(new Set(pivotData.map(obj=>obj.KpiName)))
//     .map(m=>{
//       return{
//         KpiName:pivotData.find(v=>v.KpiName===m).KpiName
//       };
//     });
//     this.kpiList = kpi;
//     for(let i=0; i<results.length;i++){
//       const mem ={};
//       const Department = results[i].DeptName;
//       const CWQPNo = results[i].KpiName;
//       const QualityIndices = results[i].QualityIndices;
//       const Criteria = results[i].Criteria;
//       const Measurement = results[i].Measurment;
//       const Target = results[i].Target;
//       const Year = results[i].Year;
//       const PivotDataList = results[i];

//       mem['Department'] = Department;
//       mem['CWQPNo'] = CWQPNo;
//       mem['QualityIndices'] = QualityIndices;
//       mem['Criteria'] = Criteria;
//       mem['Measurement'] = Measurement;
//       mem['Target'] = Target;
//       mem['Year'] = Year;

//       for(let p=0;p<pivotData.length;p++){
//        const currentpivot = pivotData[p];
//       // if(currentpivot.DeptName== PivotDataList.DeptName &&  currentpivot.KpiName == PivotDataList.KpiName){
//         if(currentpivot.DeptName== PivotDataList.DeptName &&  currentpivot.KpiName == PivotDataList.KpiName
//            && currentpivot.QualityIndices == PivotDataList.QualityIndices){
//         for(let j = 0; j<month.length; j++){

//           if(currentpivot.Month == month[j].Month){

//            mem[month[j].Month] = currentpivot.Actual

//           }
//         //      else{
//         //  mem[month[j].Month]= '';
//         // }
//            }
//        }

//         }
//   this.AllItems.push(mem);
//   this.dataList=this.AllItems;
// }
//    console.log(this.AllItems);
//   }

  onSelectDpt(event){
    debugger;
    this.selectedDept = event.target.value;
    const deptName = this.deptDropDownList.filter(x=>x.DeptId == +(this.selectedDept));
    this.selectedDeptName = Object.assign({}, ...deptName);
    const selecteddept = +this.selectedDept
    const dept = {};
  const deptdata = this.data.filter(x=>x.MT_QK_KPI.DeptId == selecteddept)
  deptdata.forEach(d=>{
    dept['Department'] =d.MT_QK_KPI.DeptName;
    dept['KpiName']= d.MT_QK_KPI.KpiName;
    dept['QualityIndices'] = d.MT_QK_KPI.QualityIndices;

  })
  this.deptlist.push(dept);
   console.log(this.deptlist);
     }

     onSelectYear(event){
        this.selectedYear = [];
        this.selectedYear = +event.target.value;
      }


       groupBy(data, keys) {

        if (keys.length == 0) return data;

        // The current key to perform the grouping on:
        var key = keys[0];

        // Loop through the data and construct buckets for
        // all of the unique keys:
        var groups = {};
        for (var i = 0; i < data.length; i++)
        {
          if(key=="KpiName"){
            var row = data[i];
          }
          else{
            var row = data[i].MT_QK_KPI;
          }

            var groupValue = row[key];
            //groups[groupValue] = groupValue

            if (groups[groupValue] == undefined)
            {
              groups[groupValue] = new Array();
            }

            groups[groupValue].push(row);
        }

        // Remove the first element from the groups array:
        keys.reverse();
        keys.pop()
        keys.reverse();

        // If there are no more keys left, we're done:
        if (keys.length == 0) return groups;

        // Otherwise, handle further groupings:
        for (var group in groups)
        {
            groups[group] = this.groupBy(groups[group], keys.slice());
        }

        return groups;
    }
    showAllKpiDeptWise(){
      debugger;
      this.selectedYear=this.valuedate.getFullYear();
      this.data.forEach(x => {
        const selecteddept = +this.selectedDept
         if(x.MT_QK_KPI.DeptId == selecteddept && x.Year == this.selectedYear ){
          this.dataList.push(x);
          //console.log(this.dataList);
          //this.actual.push(x.Actual)
          this.actual.push(x.July);
          this.label.push(x.Month);
          this.target.push(x.MT_QK_KPI.Target)
        }


      });


      this.dataList.forEach(x => {
        const selectedDeptId= +this.selectedDept
         if(x.MT_QK_KPI.DeptId == selectedDeptId && x.Year == this.selectedYear ){
          this.actual.push(x.Actual);
          if(x.MT_QK_KPI.aprilTarget!=null)
          {
            this.target.push(x.MT_QK_KPI.aprilTarget)
          }
          this.label.push(x.Month);

         }
        });









      this.lineChartList=[];
      this.keyModel = [];
        this.label = [];
        this.actual = [];
        this.dataList = [];
        this.target = [];
        var groupedData = this.groupBy(this.data, ["DeptName","KpiName"]);
        //var groupedData = this.groupBy(this.data, ["DeptName","KpiName"]);
        const keys = Object.keys(groupedData)
       // const values = Object.values(groupedData)
        console.log(groupedData);
        Object.keys(groupedData).forEach(key => {
        if(this.selectedDept == key) {
          var kpi = groupedData[key]
          Object.keys(kpi).forEach(key1=>{
           const kpirec = kpi[key1];
           //console.log(kpirec);

           for(let i = 0; i<kpirec.length; i++ ){
             debugger;
             this.keyModel.push({
              KpiName:key1,
              KpiList:kpirec,
              QIShortText:kpirec[i].QIShortText
             })
           }

          })
        }

        });
    //console.log(this.keyModel);
    let check = 0;
    this.selectedYear=this.valuedate.getFullYear();
    this.keyModel.forEach(ch=>{
      this.kpiList.forEach(kp=>{
      const kpiname = kp.KpiName;
      const QualityIndices = ch.QIShortText;
      if(ch.KpiName == kpiname){
        if(check == 0 ){
                ch.KpiList.forEach(a=>{
              //const kpidetaildata = this.data.filter(x=>x.MT_QK_KPI.KpiName)
              //const result = Object.assign({}, ...kpidetaildata);
              //alert(this.selectedYear);
                 if(a.Year == this.selectedYear){
                  this.actual.push(a.Actual);
                  this.label.push(a.Month);
                  this.target.push(a.aprilTarget)
                   check = check+1;
                 }

                })

                this.loadAllKpiDeptWise(this.target, this.actual, this.label,kpiname,QualityIndices);
               // this.loadLineChart(this.target, this.actual, this.label);
                this.loadBarChart(this.target, this.actual, this.label);
               }

               check--;
      }
      })
    })
    this.showalldeptwise = true;
    }
    Submit(){
      this.showAllKpiDeptWise();
    }
      filterKPI(){
        this.showalldeptwise = true;
        this.selectedYear=this.valuedate.getFullYear();
        this.label = [];
        this.actual = [];
        this.dataList = [];
        this.target = [];
          debugger;
          const selecteddept = this.selectedDept;
          this.data.forEach(x => {

             if(x.DeptName == selecteddept && x.Year == this.selectedYear ){
              this.dataList.push(x);
              //console.log(this.dataList);
              //this.actual.push(x.Actual)
             }
          });
          this.loadLineChart(this.dataList);

      }

      loadBarChart(target: any[], actual: any[], label: any[]) {

        this.barChart = {
          labels: label,
          datasets: [
            {
              label: 'Target',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: target
            },
            {
              label: 'Actual',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: actual
            }
          ]
        }
      }


    loadLineChart(datalist:any){
      debugger;
      this.lineChartList=[];
      this.dataList.forEach(x=>
        {
          var year= this.selectedYear.toString().substring(0,2);
          this.target=[];
          this.label=[];
          this.actual=[];
          debugger;
          this.label.push("Apr'"+year);
          this.label.push("May'"+year);
          this.label.push("Jun'"+year);
          this.label.push("Jul'"+year);
          this.label.push("Aug'"+year);
          this.label.push("Sep'"+year);
          this.label.push("Oct'"+year);
          this.label.push("Nov'"+year);
          this.label.push("Dec'"+year);
          this.label.push("Jan'"+year);
          this.label.push("Feb'"+year);
          this.label.push("Mar'"+year);

          this.target.push(x.aprilTarget);
          if(x.mayTarget==null)
          {
            this.target.push(x.aprilTarget);
          }
          else{
            this.target.push(x.mayTarget);
          }
          if(x.juneTarget==null)
          {
            if(x.mayTarget==null)
            {
              this.target.push(x.aprilTarget);
            }
            else{
              this.target.push(x.mayTarget);
            }
          }
          else{
            this.target.push(x.juneTarget);
          }
          if(x.julyTarget==null)
          {
            if(x.juneTarget==null)
            {
              if(x.mayTarget==null)
              {
                this.target.push(x.aprilTarget);
              }
              else{
                this.target.push(x.mayTarget);
              }
            }
            else{
              this.target.push(x.juneTarget);
            }
          }
          else{
            this.target.push(x.julyTarget);
          }
if(x.augTarget==null)
{
  if(x.julyTarget==null)
  {
    if(x.juneTarget==null)
    {
      if(x.mayTarget==null)
      {
        this.target.push(x.aprilTarget);
      }
      else{
        this.target.push(x.mayTarget);
      }
    }
    else{
      this.target.push(x.juneTarget);
    }
  }
  else{
    this.target.push(x.julyTarget);
  }
}
else{
  this.target.push(x.augTarget);
}

    if(x.sepTarget==null)
    {
      if(x.augTarget==null)
      {
        if(x.julyTarget==null)
        {
          if(x.juneTarget==null)
          {
            if(x.mayTarget==null)
            {
              this.target.push(x.aprilTarget);
            }
            else{
              this.target.push(x.mayTarget);
            }
          }
          else{
            this.target.push(x.juneTarget);
          }
        }
        else{
          this.target.push(x.julyTarget);
        }
      }
      else{
        this.target.push(x.augTarget);
      }
    }
    else{
      this.target.push(x.sepTarget);
    }
    if(x.octTarget==null)
    {
      if(x.sepTarget==null)
      {
        if(x.augTarget==null)
        {
          if(x.julyTarget==null)
          {
            if(x.juneTarget==null)
            {
              if(x.mayTarget==null)
              {
                this.target.push(x.aprilTarget);
              }
              else{
                this.target.push(x.mayTarget);
              }
            }
            else{
              this.target.push(x.juneTarget);
            }
          }
          else{
            this.target.push(x.julyTarget);
          }
        }
        else{
          this.target.push(x.augTarget);
        }
      }
      else{
        this.target.push(x.sepTarget);
      }
    }
    else{
      this.target.push(x.octTarget);
    }

if(x.novTarget==null)
{

  if(x.octTarget==null)
  {
    if(x.sepTarget==null)
    {
      if(x.augTarget==null)
      {
        if(x.julyTarget==null)
        {
          if(x.juneTarget==null)
          {
            if(x.mayTarget==null)
            {
              this.target.push(x.aprilTarget);
            }
            else{
              this.target.push(x.mayTarget);
            }
          }
          else{
            this.target.push(x.juneTarget);
          }
        }
        else{
          this.target.push(x.julyTarget);
        }
      }
      else{
        this.target.push(x.augTarget);
      }
    }
    else{
      this.target.push(x.sepTarget);
    }
  }
  else{
    this.target.push(x.octTarget);
  }
}
else{
  this.target.push(x.novTarget);
}

if(x.decTarget==null)
{
  if(x.novTarget==null)
  {

    if(x.octTarget==null)
    {
      if(x.sepTarget==null)
      {
        if(x.augTarget==null)
        {
          if(x.julyTarget==null)
          {
            if(x.juneTarget==null)
            {
              if(x.mayTarget==null)
              {
                this.target.push(x.aprilTarget);
              }
              else{
                this.target.push(x.mayTarget);
              }
            }
            else{
              this.target.push(x.juneTarget);
            }
          }
          else{
            this.target.push(x.julyTarget);
          }
        }
        else{
          this.target.push(x.augTarget);
        }
      }
      else{
        this.target.push(x.sepTarget);
      }
    }
    else{
      this.target.push(x.octTarget);
    }
  }
  else{
    this.target.push(x.novTarget);
  }
}
else{
  this.target.push(x.decTarget);
}

if(x.janTarget==null)
{
  if(x.decTarget==null)
  {
    if(x.novTarget==null)
    {

      if(x.octTarget==null)
      {
        if(x.sepTarget==null)
        {
          if(x.augTarget==null)
          {
            if(x.julyTarget==null)
            {
              if(x.juneTarget==null)
              {
                if(x.mayTarget==null)
                {
                  this.target.push(x.aprilTarget);
                }
                else{
                  this.target.push(x.mayTarget);
                }
              }
              else{
                this.target.push(x.juneTarget);
              }
            }
            else{
              this.target.push(x.julyTarget);
            }
          }
          else{
            this.target.push(x.augTarget);
          }
        }
        else{
          this.target.push(x.sepTarget);
        }
      }
      else{
        this.target.push(x.octTarget);
      }
    }
    else{
      this.target.push(x.novTarget);
    }
  }
  else{
    this.target.push(x.decTarget);
  }
}else{
  this.target.push(x.janTarget);
}

if(x.febTarget==null)
{
  if(x.janTarget==null)
  {
    if(x.decTarget==null)
    {
      if(x.novTarget==null)
      {

        if(x.octTarget==null)
        {
          if(x.sepTarget==null)
          {
            if(x.augTarget==null)
            {
              if(x.julyTarget==null)
              {
                if(x.juneTarget==null)
                {
                  if(x.mayTarget==null)
                  {
                    this.target.push(x.aprilTarget);
                  }
                  else{
                    this.target.push(x.mayTarget);
                  }
                }
                else{
                  this.target.push(x.juneTarget);
                }
              }
              else{
                this.target.push(x.julyTarget);
              }
            }
            else{
              this.target.push(x.augTarget);
            }
          }
          else{
            this.target.push(x.sepTarget);
          }
        }
        else{
          this.target.push(x.octTarget);
        }
      }
      else{
        this.target.push(x.novTarget);
      }
    }
    else{
      this.target.push(x.decTarget);
    }
  }else{
    this.target.push(x.janTarget);
  }

}
else{
  this.target.push(x.febTarget);
}

        if(x.marTarget==null)
        {
          if(x.febTarget==null)
          {
            if(x.janTarget==null)
            {
              if(x.decTarget==null)
              {
                if(x.novTarget==null)
                {

                  if(x.octTarget==null)
                  {
                    if(x.sepTarget==null)
                    {
                      if(x.augTarget==null)
                      {
                        if(x.julyTarget==null)
                        {
                          if(x.juneTarget==null)
                          {
                            if(x.mayTarget==null)
                            {
                              this.target.push(x.aprilTarget);
                            }
                            else{
                              this.target.push(x.mayTarget);
                            }
                          }
                          else{
                            this.target.push(x.juneTarget);
                          }
                        }
                        else{
                          this.target.push(x.julyTarget);
                        }
                      }
                      else{
                        this.target.push(x.augTarget);
                      }
                    }
                    else{
                      this.target.push(x.sepTarget);
                    }
                  }
                  else{
                    this.target.push(x.octTarget);
                  }
                }
                else{
                  this.target.push(x.novTarget);
                }
              }
              else{
                this.target.push(x.decTarget);
              }
            }else{
              this.target.push(x.janTarget);
            }

          }
          else{
            this.target.push(x.febTarget);
          }
        }
        else{
          this.target.push(x.marTarget);
        }



          this.actual.push(x.aprilachieved);
          this.actual.push(x.mayachieved);
          this.actual.push(x.juneachieved);
          this.actual.push(x.julyachieved);
          this.actual.push(x.augustachieved);
          this.actual.push(x.sepachieved);
          this.actual.push(x.octachieved);
          this.actual.push(x.novachieved);
          this.actual.push(x.decachieved);
          this.actual.push(x.janachieved);
          this.actual.push(x.febachieved);
          this.actual.push(x.marchachieved);

          this.lineChart = {
            // type: 'bar',
            // data: {
            //   labels: ['Online', 'Offline'],
            //   datasets: [{
            //     label: "# of servers",
            //     data: [1, 7],
                 
            //     backgroundColor: [
            //       '#009245',
            //       '#c02a31'
            //     ]
            //   },
            //   {
            //     label: "# of servers",
            //     data: [2, 6],
            //     fill:false,
            //      type: 'line',
            //     backgroundColor: [
            //       '#009245',
            //       '#c02a31'
            //     ]
            //   }]
            // },
            // options: {
            //   title: {
            //     display: true
            //   },
            //   scales: {
            //     yAxes: [{
            //       ticks: {
            //         beginAtZero: true
            //       }
            //     }]
            //   }
            // }

            labels: this.label,
            datasets: [
              {
                type:'line',
                label: 'Target',
                data: this.target,
                fill: false,
                backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
              },
              {
                type:'bar',
                label: 'Actual',
                data: this.actual,
                fill: false,
                backgroundColor: '#9CCC65',
                borderColor: '#7CB342',
              }
            ]
          }
          this.lineChartList.push({

            ['DataList']:this.lineChart,
            // ['KPIName']:x.QualityIndices,
            ['QIShortText']:x.QIShortText
          });
        })



    }




    loadAllKpiDeptWise(target: any[], actual: any[], label: any[],kpi:string,QIShortText:string){
      debugger;

      var target1 = target.map(v => parseInt(v, 10));
      var actual1 = actual.map(v => parseInt(v, 10));
      // alert(target1);
      // alert(actual1);
      this.lineChartDeptWise = {
        labels: label,
        datasets: [
          {
            label: 'Target',

            data: target1,
            fill: false,
            borderColor: '#1E88E5',
         
          },

          {
            label: 'Actual',
            data: actual1,
            fill: false,
            borderColor: '#7CB342',
            
          }
        ]
      }
    //   this.lineChartDeptWise = {
    //     legend: {
    //         position: 'right'
    //     }
    // };
    //alert(this.lineChartDeptWise);
      this.lineChartList.push({
        ['DataList']:this.lineChartDeptWise,
        ['KPIName']:kpi,
        ['QIShortText']:QIShortText
      });
      //alert(this.loadLineChart.length);
    //  if(this.label.length==0){
    //       this.isShowMessage=true;
    //       this.lineChartList =[];
    //       alert("Data is not available");
    //  }
     console.log(this.lineChartList);
      this.actual = [];
      //this.dataList = [];
      this.target = [];
      this.label =[];

    }
    loadAllKpiDeptWiseNew(target: any[], actual: any[], label: any[],kpi:string){
      this.lineChartDeptWise = {
        labels: label,
        datasets: [
          {
            label: 'Target',
            data: target,
            fill: false,
            borderColor: '#1E88E5'
          },
          {
            label: 'Actual',
            data: actual,
            fill: false,
            borderColor: '#7CB342'
          }
        ]
      }
      this.lineChartList.push({
        ['DataList']:this.lineChartDeptWise,
        ['KPIName']:kpi
       // ['QualityIndices']:kpi
      });
     if(this.label.length==0){
          this.isShowMessage=true;
          this.lineChartList =[];
          alert("Data is not available");
     }
     this.options = {

      plugins: {
        datalabels: {
        align: 'end',
        anchor: 'end',
        borderRadius: 4,
        backgroundColor:"teal",
        color: 'white',
        font: {
        weight: 'bold'
        }
        }
        },
        title: {
          display: true,
          text: 'My Title',
          fontSize: 16
      },
      legend: {
          position: 'top'
      }
  };
     console.log(this.lineChartList);
      this.actual = [];
      //this.dataList = [];
      this.target = [];


    }
    filterKPINew(){
      this.showalldeptwise = false;
      this.label = [];
      this.actual = [];
      //this.dataList = [];
      this.target = [];

    // this.monthList.forEach(m=>{
    //   this.label.push(m.Month);
    // })
        this.dataList.forEach(x => {
          const selectedDeptId= +this.selectedDept
           if(x.MT_QK_KPI.DeptId == selectedDeptId && x.Year == this.selectedYear ){
           //if(x.)
            this.actual.push(x.July);
            this.label.push(x.Month);
            this.target.push(x.Target)
           // this.loadAllKpiDeptWise(this.target, this.actual, this.label,x.KpiName);
          }


        });


    }

}


