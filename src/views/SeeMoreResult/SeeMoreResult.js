import React, { useState,useEffect } from "react";
import "./SeeMoreStudent.scss";
import InputLabel from '@material-ui/core/InputLabel';
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
import Input from "@material-ui/core/Input";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import ResultService from "../../config/API/Result/ResultService";
const useStyles = makeStyles(styles);

const SeeMore = () => {
  const classes = useStyles();
  const [result, setResult] = useState();
  const [dataInput,setDataInput]= useState();
  useEffect(() => {
    ResultService.getResult().then((res) => {
      if(dataInput){
        setResult((res.data).filter((val)=>{
          console.log(val.id);
          return val.id == dataInput;
        }))
      }else{
        console.log(res.data);
        setResult(res.data);
      }

    });

  }, [dataInput]);
  return (
    <div>
        <GridItem xs={12} sm={12} md={4}>
        <Card>

            <CardBody>
           <InputLabel style={{color: "green"}} id="demo-simple-select-label">Search</InputLabel>
              <Input
                    style={{width: "100%"}}
                    type="number" 
                    placeholder="Enter student ID"
                    onChange={(event) => {setDataInput(event.target.value);}}
                  />
                
           </CardBody>
        </Card>
  
        </GridItem>
      <GridItem xs={12} sm={12} md={19}>
 
        <Card>
          <CardHeader color="warning" style={{ marginBottom: -30 }}>
            <h4 className={classes.cardTitleWhite}>Result</h4>
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
              tableData={result?result:[[]]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </div>
  );
};

export default SeeMore;
