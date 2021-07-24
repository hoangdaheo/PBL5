//jshint esversion:6
import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Input from "@material-ui/core/Input";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BuildIcon from '@material-ui/icons/Build';
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import InputLabel from '@material-ui/core/InputLabel';
import GridItem from "components/Grid/GridItem.js";
import Select from '@material-ui/core/Select';
import GridContainer from "components/Grid/GridContainer.js";
import MenuItem from '@material-ui/core/MenuItem';
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import { bugs, website, server } from "variables/general.js";
import "./Dashboard.css";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import ResultService from "../../config/API/Result/ResultService";
import { ModuleResolutionKind } from "typescript";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [result, setResult] = useState();
  const [ResultWarning, setResultWarning] = useState();
  const [student, setStudent] = useState();
  const [recentResult, setRecentResult] = useState();
  const [dataGraph, setDataGraph] = useState();
  const [dataInput, setDataInput] = useState(1);
  const [dateTime,setDateTime] = useState();
  const [resultCount, setResultCount] = useState();
  
  function changeDataInput(a) {
    setDataInput(a);
  }
  function changeDateInput(a) {
    setDateTime(a);
  }
  function changeDataGraph(){
    if(!dateTime){
      let date = new Date();
      let today = date.getFullYear()+'-'+('0'+(date.getMonth()+1))+'-'+date.getDate();
      setDateTime(today);
    }
    ResultService.getTempAndTime(dataInput,dateTime).then((res) => {
      let arr = [];
      let arr1 = [];
      let defaultArr = [];
      for (let i = 0; i < res.data.length; i++) {
        arr.push(res.data[i].temperature);
        arr1.push(res.data[i].TIMEONLY);
        defaultArr.push(37);
      }

      setDataGraph({
        data: {
          labels: arr1.map(String),
          series: [arr,defaultArr],
        },
      });
    });
  }


  useEffect(() => {
    changeDataGraph();
    ResultService.getResult().then((res) => {
      setResult(res.data);
    });
    ResultService.getResultWarning().then((res) => {
      //console.log(res.data);
      setResultWarning(res.data);
    });
    ResultService.getStudent().then((res) => {
      //console.log(res.data);
      setStudent(res.data);
    });
    ResultService.getRecentResult().then((res) => {
      // console.log(res.data);
      setRecentResult(res.data);
    });
    ResultService.getResultCountByDay().then((res) => {
      let arr = [];
      let arr1 = [];
      for (let i = 0; i < res.data.length; i++) {
        arr.push(res.data[i].result);
        arr1.push(res.data[i].date);
      }
      setResultCount({
        data: {
          labels: arr1.map(String),
          series: [arr],
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: Math.max(...arr)+5,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        }
      });
    });
  }, []);
  useEffect(()=>{
    changeDataGraph();
  }, [dataInput,dateTime,resultCount]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>dynamic_feed</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Result</p>
              <h3 className={classes.cardTitle}>
                {result ? result.length : null} <small>results</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="/admin/seeMoreResult" className={classes.block} >
                  See more
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>emoji_people</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Student</p>
              <h3 className={classes.cardTitle}>
                {student ? student.length : null} <small>students</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="/admin/seeMoreStudent" className={classes.block}>
                  See more
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>report</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Hyperthemia</p>
              <h3 className={classes.cardTitle}>
                {ResultWarning ? ResultWarning.length : null}{" "}
                <small>results</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="/admin/seeMoreSR" className={classes.block}>
                  See more
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
        <Card>
            <CardBody>

          <InputLabel  style={{color: "green"}} id="demo-simple-select-label">Student</InputLabel>
          <Select
          style={{width: "100%"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(event) =>{changeDataInput(event.target.value);}}
          >
              {student?Object.values(student).map((v,i)=>{
                return <MenuItem value={v.id}>{v.id+" - "+v.NAME}</MenuItem>
              }):<MenuItem value={102180163}>Hoang</MenuItem>}
          </Select>
            </CardBody>
            <CardBody>
           <InputLabel style={{color: "green"}} id="demo-simple-select-label">ID</InputLabel>
              <Input
                    style={{width: "100%"}}
                    type="number" 
                    onChange={(event) => {changeDataInput(event.target.value);}}
                  />
                
           </CardBody>
            <CardBody>
           
           <InputLabel style={{color: "green"}} id="demo-simple-select-label">Date</InputLabel>
           <Input style={{width: "100%"}} type="date" onChange={(event) => {changeDateInput(event.target.value);}}/>
           
           </CardBody>
        </Card>
  
        </GridItem>
        
        <GridItem xs={12} sm={12} md={7}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={resultCount?resultCount.data:[[]]}
                type="Bar"
                options={resultCount?resultCount.options:"null"}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Result</h4>
              
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={11}>
          <Card chart>
            <CardHeader color="success">
            
              <ChartistGraph
                className="ct-chart"
                data={dataGraph ? dataGraph.data : completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
              <div style={{border: '1px solid white' , borderRadius:'15px', width:'21%'}}>
              <p  style={{color: "red",paddingLeft:'10%',paddingTop:'5%'}} >____ 37•C</p>
              <p  style={{color: "white",paddingLeft:'10%'}} >____ User temperature</p>
              </div>

            

            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Temperature in day</h4>
             
              {
                student?
                  Object.values(student).map((v,i)=>{
                    return {key:i,id:v.id, name:v.NAME+" - "+v.address+" - "+v.age};
                  }).map((x)=>{
                    if (x.id == dataInput)
                    return  <p className={classes.cardTitleBlack} key = {x.key}> {x.name}  </p>
                  })
                  :"Unknown"
              }
           
            </CardBody>
            <CardFooter chart>
              <div  style={{color: "red"}} className={classes.stats}>
                <AccessTime style={{color: "green"}} />{dateTime}
              </div>
            </CardFooter>
          </Card>
        </GridItem>




        <GridItem xs={12} sm={12} md={11}>
          <Card>
            <CardHeader color="rose">
              <h4 className={classes.cardTitleWhite}>Latest Result</h4>
              
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={[
                  "ID",
                  "Name",
                  "Address",
                  "Age",
                  "Temperature",
                  "Time",
                ]}
                tableData={
                  recentResult
                    ? recentResult
                    : [
                        ["1", "Mai Thế Viễn", "18TCLC_DT2", "40 °C"],
                        ["2", "Huỳnh Trần 4 Chữ", "18TCLC_DT3", "42 °C"],
                        ["3", "Nguyễn Phước Quốc", "18TCLC_DT22", "43 °C"],
                        ["4", "Nguyễn Nguyên Hoàng", "18TCLC_DT2", "41 °C"],
                      ]
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer></GridContainer>
    </div>
  );
}
