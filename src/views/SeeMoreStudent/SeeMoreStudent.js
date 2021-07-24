import React, { useState,useEffect } from "react";
import "./SeeMoreStudent.scss";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table1.js";
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

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import ResultService from "../../config/API/Result/ResultService";
const useStyles = makeStyles(styles);

const SeeMore = () => {
  const classes = useStyles();
  const [student, setStudent] = useState();
  useEffect(() => {
    ResultService.getStudent().then((res) => {
      console.log("Seemore");
      const temp = res.data;
      for (let i = 0; i <temp.length; i++) {
        delete temp[i].image;
      }
      setStudent(temp);
    });

  }, []);
  return (
    <div>
      <GridItem xs={12} sm={12} md={19}>
        <Card>
          <CardHeader color="success" style={{ marginBottom: -30 }}>
            <h4 className={classes.cardTitleWhite}>Student List</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="warning"
              tableHead={[
                "ID",
                "Name",
                "Age",
                "Sex",
                "Address",
                "Faculty"
                
                
              ]}
              tableData={student?student:[[]]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </div>
  );
};

export default SeeMore;