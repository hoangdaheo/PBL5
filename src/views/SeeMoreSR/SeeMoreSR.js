import React, { useState,useEffect } from "react";
import "./SeeMoreStudent.scss";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import Input from "@material-ui/core/Input";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import ResultService from "../../config/API/Result/ResultService";
const useStyles = makeStyles(styles);
const id = 1;
const SeeMore = () => {
  const classes = useStyles();
  const [sr, setSr] = useState();
  const [dataInput,setDataInput]= useState();
  useEffect(() => {
    ResultService.getResultWarning().then((res) => {
      if(dataInput){
        setSr((res.data).filter((val)=>{
          console.log(val.id);
          return val.id == dataInput;
        }))
      }else{
        console.log(res.data);
        setSr(res.data);
      }

    });

  }, [dataInput]);
  return (
    <div>
      <GridItem xs={12} sm={12} md={19}>
      <div>
          <label className={classes.cardTitleBlack}>Student ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <Input
              style={styles.input}
              type="number" 
              onChange={(e) =>{setDataInput(e.target.value)}}
            />
          </div>
        <Card>
          <CardHeader color="danger" style={{ marginBottom: -30 }}>
            <h4 className={classes.cardTitleWhite}>Hyperthemia</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="warning"
              tableHead={[
                "ID",
                "Name",
                "Temperature",
                "Sex",
                "Time",
                
              ]}
              tableData={sr&&(id==1)?sr:[[]]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </div>
  );
};

export default SeeMore;
