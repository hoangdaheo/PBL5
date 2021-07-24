import React, {useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ResultService from "../../config/API/Result/ResultService";
import avatar from "assets/img/faces/marc.jpg";
import { Input } from "@material-ui/core";
import Swal from "sweetalert2";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [student, setStudent] = useState();
  const id = (window.location.href).split('/')[5];
  const [name, setName] = useState(student?student[0].NAME: "");
  const [address, setAddress] = useState(student?student[0].address:"");
  const [age, setAge] = useState(student?student[0].age:"");
  const [studentID, setStudentID] = useState(student?student[0].studentID:"");
  useEffect(() => {
    ResultService.getStudentById(id?id:102180163).then((res) => {
      const temp = res.data;
      setStudent(temp);
      setName(temp[0].NAME);
      setAddress(temp[0].address);
      setAge(temp[0].age);
      
    });
  }, []);
  function callParams(){
    const params ={
      id: student[0].id ,
      name: name,
      age :age,
      sex : student[0].sex,
      
      idFaculty: student[0].idFaculty,
      address: address
    }
    return params;
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Profile</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Falcuty"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value = {student?student[0].description:""}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    value={name} 
                    onChange={(event) => setName(event.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Address"
                    id="address"
                    value={address} 
                    onChange={(event) => setAddress(event.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>

              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Age"
                    id="age"
                    type = "number"
                    value={age} 
                    onChange={(event) => setAge(event.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="ID"
                    id="student-id"
                    value={id?id:102180163} 
                    onChange={(event) => setStudentID(event.target.value)}
                    inputProps={{
                      disabled: true
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
 
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={()=>{
                ResultService.updateStudent(callParams()).then((res)=>{
                        if (res.dataString === "Success") {
                          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update successful",
            showConfirmButton: false,
            timer: 2500,
          });
                        }else{
                          Swal.fire({
            position: "center",
            icon: "error",
            title: "Update failed",
            showConfirmButton: false,
            timer: 2500,
          });
                        }

                  
                  
                  console.log(res);})
              }}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={18} sm={18} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
              <img src={`data:image/jpeg;base64,${student?student[0].image:""}`} alt="..." style={{height: 275 , width: 275}}/>
                {/* <img src= alt="..." /> */}
              </a>
            </CardAvatar>
            <CardBody profile>
              <h3 className={classes.cardTitle}>{name}</h3>
              <p className={classes.description}>
              
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
