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
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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
  function changeDataInput(a) {
    setDataInput(a);
    console.log(dataInput);
  }
  function changeGraphResult() {
    ResultService.getTempAndTime(dataInput).then((res) => {
      let arr = [];
      let arr1 = [];
      console.log(dataInput);
      for (let i = 0; i < res.data.length; i++) {
        arr.push(res.data[i].temperature);
        arr1.push(res.data[i].TIMEONLY);
      }

      setDataGraph({
        data: {
          labels: arr1,
          series: [arr],
        },
      });
    });
  }
  useEffect(() => {
    ResultService.getTempAndTime(dataInput).then((res) => {
      let arr = [];
      let arr1 = [];
      for (let i = 0; i < res.data.length; i++) {
        arr.push(res.data[i].temperature);
        arr1.push(res.data[i].TIMEONLY);
      }

      setDataGraph({
        data: {
          labels: arr1.map(String),
          series: [arr],
        },
      });
    });
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
    // ResultService.getRecentResult().then((res) => {
    //   console.log(res.data);
    //   // console.log("??????");
    //   setRecentResult(res.data);
    // });
  }, []);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Result</p>
              <h3 className={classes.cardTitle}>
                {result ? result.length : null} <small>results</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
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
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Student</p>
              <h3 className={classes.cardTitle}>
                {student ? student.length : null} <small>students</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
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
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Special results</p>
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
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  See more
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={19} sm={19} md={9}>
          <div>
            <Input
              type="text"
              onChange={(event) => changeDataInput(event.target.value)}
            />
            <Button
              onClick={changeGraphResult}
              color="black"
              aria-label="edit"
              justIcon
            >
              <Search />
            </Button>
          </div>
        </GridItem>

        <GridItem xs={19} sm={19} md={9}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={dataGraph ? dataGraph.data : completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Temperature in day</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={9}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Infomation</h4>
              <p className={classes.cardCategoryWhite}>Recent Result</p>
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
