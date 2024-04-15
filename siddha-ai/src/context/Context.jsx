import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { lightGreen, purple } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import samplePdf from "../assets/sample.pdf";
import samplePdf2 from "../assets/sample2.pdf";
import { PDFDocument, rgb } from "pdf-lib";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { NA } from "../components/not-authorised/NA";
import { Alert } from "@mui/material";

const contextdata = createContext(null);

export const ContextProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const [datastate, setDataState] = useState(false);

  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "rgba(4,136,185,1)",
    borderRadius: "7px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "rgba(47,169,174,1)",
    },

    "&:disabled": {
      backgroundColor: "rgba(47,169,174,1)",
      color: "#fff",
    },
  }));

  const state = [
    {
      value: "",
      label: "",
    },
    {
      value: "AL",
      label: "AL",
    },
    {
      value: "AK",
      label: "AK",
    },
    {
      value: "AZ",
      label: "AZ",
    },

    {
      value: "AR",
      label: "AR",
    },

    {
      value: "CA",
      label: "CA",
    },

    {
      value: "CO",
      label: "CO",
    },

    {
      value: "CT",
      label: "CT",
    },

    {
      value: "DE",
      label: "DE",
    },

    {
      value: "FL",
      label: "FL",
    },

    {
      value: "GA",
      label: "GA",
    },

    {
      value: "HI",
      label: "HI",
    },

    {
      value: "ID",
      label: "ID",
    },

    {
      value: "IL",
      label: "IL",
    },

    {
      value: "IN",
      label: "IN",
    },

    {
      value: "IA",
      label: "IA",
    },

    {
      value: "KS",
      label: "KS",
    },

    {
      value: "KY",
      label: "KY",
    },

    {
      value: "LA",
      label: "LA",
    },

    {
      value: "ME",
      label: "ME",
    },

    {
      value: "MD",
      label: "MD",
    },

    {
      value: "MA",
      label: "MA",
    },

    {
      value: "MI",
      label: "MI",
    },

    {
      value: "MN",
      label: "MN",
    },

    {
      value: "MS",
      label: "MS",
    },

    {
      value: "MO",
      label: "MO",
    },

    {
      value: "MT",
      label: "MT",
    },

    {
      value: "NE",
      label: "NE",
    },

    {
      value: "NV",
      label: "NV",
    },

    {
      value: "NH",
      label: "NH",
    },

    {
      value: "NJ",
      label: "NJ",
    },

    {
      value: "NM",
      label: "NM",
    },

    {
      value: "NY",
      label: "NY",
    },

    {
      value: "NC",
      label: "NC",
    },

    {
      value: "ND",
      label: "ND",
    },

    {
      value: "OH",
      label: "OH",
    },

    {
      value: "OK",
      label: "OK",
    },

    {
      value: "OR",
      label: "OR",
    },

    {
      value: "PA",
      label: "PA",
    },

    {
      value: "RI",
      label: "RI",
    },

    {
      value: "SC",
      label: "SC",
    },

    {
      value: "SD",
      label: "SD",
    },

    {
      value: "TN",
      label: "TN",
    },

    {
      value: "TX",
      label: "TX",
    },

    {
      value: "UT",
      label: "UT",
    },

    {
      value: "VT",
      label: "VT",
    },

    {
      value: "VA",
      label: "VA",
    },

    {
      value: "WA",
      label: "WA",
    },

    {
      value: "WV",
      label: "WV",
    },

    {
      value: "WI",
      label: "WI",
    },

    {
      value: "WY",
      label: "WY",
    },
  ];

  // index (page 1) section starts
  const [ageChecked, setAgeChecked] = useState(false);
  const [imageralert, setImageAlert] = useState(false);
  // upload picture state
  const [capture, setCapture] = useState(null);
  //  take photo state
  const [capturedImage, setCapturedImage] = useState(null);
  // console.log("index captured image", capturedImage );
  const [cameradialog, setCameraDialog] = useState(false);

  const IndexImageValidation = () => {
    if (ageChecked) {
      // console.log(ageChecked, "this is true");
      return true;
    }
    if (capture || capturedImage) {
      return true;
    }
    setImageAlert(true);
    return false;
  };

  // console.log("capd", capturedImage);

  const [licenseBlob, setLicenseBlob] = useState(null);
  const [licenseBackblob, setlicenseBackblob] = useState(null);

  async function createFile() {
    if (capturedImage) {
      let response = await fetch(capturedImage);
      let data = await response.blob();

      setLicenseBlob(data);
      console.log(data, "blob daa");
    } else if (capture) {
      let response = await fetch(capture);
      let data = await response.blob();

      setLicenseBlob(data);
      console.log(data, "blob daa");
    } else {
      console.log("Img not loaded.");
    }
    return null;
  }

  // alert(capturedImage ? "capturedImage: " + capturedImage : null);

  const [pdchecked, setpdChecked] = useState(false);
  const [adChecked, setadChecked] = useState(false);
  const [inChecked, setinChecked] = useState(false);
  const [verifyChecked, setverifyChecked] = useState(false);
  const [contactchecked, setcontactchecked] = useState(false);
  const [referralchecked, setreferralchecked] = useState(false);
  const [privacychecked, setprivacychecked] = useState(false);
  const [consentChecked, setconsentChecked] = useState(false);
  const [confirmChecked, setconfirmChecked] = useState(false);

  // console.log("pd:", pdchecked, "ad:", adChecked, "in: ", inChecked);
  // personal details (page2) section starts //
  const [personaldetailsvalues, setPersonalDetailsValues] = useState({
    lastname: "",
    middlename: "",
    firstname: "",
    dob: null,
    gender: "",
    preferredlanguage: "",
  });

  const [personaldetailserrorfield, setPersonalDetailsErrorField] =
    useState("");
  const [personaldetailserrorfielddate, setPersonalDetailsErrorFielddate] =
    useState("");

  const personaldetailsvalidation = () => {
    if (
      personaldetailsvalues.lastname.length < 3 ||
      personaldetailsvalues.firstname.length < 3
    ) {
      return false;
    }
    if (personaldetailserrorfielddate) {
      console.log("err in contxt", personaldetailserrorfielddate);
      return false;
    }
    if (
      personaldetailsvalues.firstname &&
      personaldetailsvalues.lastname &&
      personaldetailsvalues.dob &&
      personaldetailsvalues.gender &&
      personaldetailsvalues.preferredlanguage
    ) {
      return true;
    }

    return false;
  };

  // address details (page3) section starts //
  const [addressinputvalues, setAddressInputvalues] = useState({
    streetname: "",
    city: "",
    state: "",
    zipcode: "",
    email: "",
    phone: "",
  });

  const [addressemailerror, setAddressError] = useState(false);
  const [addresscontactnumberlengtherror, setAddressContactNumberLengthError] =
    useState(false);
  const [pincodelengtherror, setPincodeLengthError] = useState(false);

  const addressvalidation = () => {
    if (addressemailerror) {
      setClicked(false);
      return false;
    }
    if (addressinputvalues.phone.length < 10) {
      setAddressContactNumberLengthError(true);
      return false;
    }
    if (addressinputvalues.zipcode.length < 5) {
      setPincodeLengthError(true);
      return false;
    }
    if (
      addressinputvalues.streetname &&
      addressinputvalues.city &&
      addressinputvalues.state &&
      addressinputvalues.zipcode &&
      addressinputvalues.email &&
      addressinputvalues.phone
    ) {
      return true;
    }
    return false;
  };

  // insurance details (page 4) section starts //

  const [insurancefrontdialog, setinsuranceFrontDialog] = useState(false);
  const [licenseBackDialog, setLicenseBackDialog] = useState(false);
  const [insurancebackdialog, setinsuranceBackDialog] = useState(false);

  const [insurancefrontcapturedimage, setInsuranceFrontCapturedImage] =
    useState("");
  const [insurancebackcapturedimage, setInsuranceBackCapturedImage] =
    useState("");
  const [licensebackcapturedimage, setLicenseBackCapturedImage] =
    useState(null);
  const [licensebackbinarydata, setlicensebackbinarydata] = useState("");
  const [insurancefrontbinarydata, setInsuranceFrontBinaryData] = useState("");

  const [insurancefrontupload, setInsuranceFrontUpload] = useState("");
  const [insurancebackupload, setInsuranceBackUpload] = useState("");
  const [insurancebackbinarydata, setInsuranceBackBinaryData] = useState("");

  const [insuranceimagealert, setInsuranceImageAlert] = useState(false);

  const insuranceimagevalidation = () => {
    if (
      (insurancefrontcapturedimage || insurancefrontupload) &&
      (insurancebackcapturedimage || insurancebackupload) &&
      licensebackcapturedimage
    ) {
      if (
        insurancefrontcapturedimage ||
        insurancebackcapturedimage ||
        licensebackcapturedimage
      ) {
        setImage();
      }
      return true;
    }
    setInsuranceImageAlert(true);
    return false;
  };

  function setImage() {
    if (
      insurancefrontcapturedimage ||
      insurancebackcapturedimage ||
      licensebackcapturedimage
    ) {
      if (insurancefrontcapturedimage) {
        const front = insurancefrontcapturedimage.split(",");
        setInsuranceFrontBinaryData(front[1]);
      }
      if (insurancebackcapturedimage) {
        const back = insurancebackcapturedimage.split(",");
        setInsuranceBackBinaryData(back[1]);
      }
      if (licensebackcapturedimage) {
        const licenseback = licensebackcapturedimage.split(",");
        setlicensebackbinarydata(licenseback[1]);
      }
    }
  }

  // insurance details (page 5) section starts //

  const [insurancechecked, setInsuranceChecked] = useState(false);

  const [insuranceDetails, setInsuranceDetails] = useState({
    groupnumber: "",
    memberid: "",
    subscriberfirstname: "",
    subscriberlastname: "",
    subscriberdob: null,
    SubscriberRelationshiptoPatient: "",
  });
  const [insuranceDateErr, setinsuranceDateErr] = useState(null);

  const insurancevalidation = () => {
    if (!insurancechecked) {
      if (insuranceDateErr) {
        console.log(dayjs(insuranceDetails.subscriberdob));
        return false;
      }
      if (
        insuranceDetails.groupnumber &&
        insuranceDetails.memberid &&
        insuranceDetails.subscriberfirstname &&
        insuranceDetails.subscriberlastname &&
        insuranceDetails.subscriberdob &&
        insuranceDetails.SubscriberRelationshiptoPatient
      ) {
        setImage();
        if (
          insuranceDetails.subscriberlastname.length < 3 ||
          insuranceDetails.subscriberfirstname.length < 3
        ) {
          return false;
        }
        return true;
      }
    } else {
      if (insuranceDetails.groupnumber && insuranceDetails.memberid) {
        setImage();
        return true;
      }
    }
    return false;
  };

  // emergency details (page6) section starts //

  const [contactValues, setContactValues] = useState({
    firstname: "",
    lastname: "",
    contactnumber: "",
    relationship: "",
  });

  const [contactnumbererror, setContactNumberError] = useState(false);
  const [contactlengtherror, setContactNumberLengthError] = useState(false);
  const [contacterrorfield, setContactErrorField] = useState("");
  const emergencyvalidation = () => {
    if (contactValues.contactnumber === "911") {
      setContactNumberError(true);
      return false;
    }
    if (contacterrorfield === "Name Error") {
      console.log("Error field: ", contacterrorfield);
      return false;
    }
    if (contactValues.contactnumber.length < 10) {
      setContactNumberLengthError(true);
      setContactNumberError(false);
      return false;
    }
    if (
      contactValues.firstname &&
      contactValues.lastname &&
      contactValues.contactnumber &&
      contactValues.relationship
    ) {
      return true;
    }
    return false;
  };

  // referral details (page7) section starts //

  const [refferalchecked, setRefferalChecked] = useState(false);
  const [referalContactLengthError, setReferralContactLenghtError] =
    useState(false);
  const [referalFaxNumberLengthError, setReferralFaxNumberLenghtError] =
    useState(false);
  const [referralerrorfield, setReferralErrorField] = useState(null);

  const refferalCheckedHandler = (e) => {
    setRefferalChecked(e.target.checked);
  };

  const [referralValues, setRefferalValue] = useState({
    PrimaryCareDoctorFirstName: "",
    PrimaryCareDoctorLastName: "",
    PrimaryCarePhoneNumber: "",
    PrimaryCareFaxNumber: "",
    ReferralName: "",
  });

  const refferalvalidation = () => {
    if (!refferalchecked) {
      if (referralValues.PrimaryCarePhoneNumber.length < 10) {
        setReferralContactLenghtError(true);
        return false;
      }
      if (referralValues.PrimaryCareFaxNumber.length < 10) {
        setReferralFaxNumberLenghtError(true);
        return false;
      }
      if (referralerrorfield) {
        console.log(referralerrorfield, "referralerrorfield from contextdata");
        return false;
      }
      if (
        referralValues.PrimaryCareDoctorFirstName.length &&
        referralValues.PrimaryCareDoctorLastName.length &&
        referralValues.PrimaryCarePhoneNumber &&
        referralValues.PrimaryCareFaxNumber
      ) {
        return true;
      }
      console.log("whta the fuck");
    } else {
      if (referralValues.ReferralName.length > 2) {
        return true;
      }
    }
    return false;
  };

  // console.log("date from input:", !personaldetailsvalues.dob ? "" : personaldetailsvalues.dob.format());
  const [licenseimagebinarydata, setLicenseImageBinaryData] = useState("");

  const insuranceImgDataValidation = () => {
    // return true
  };

  // api call section started
  const [loading, setLoading] = useState(false);

  const apiURL = "https://siddha-pi-001-api.azurewebsites.net";

  const navigate = useNavigate();
  const [file, setFile] = useState("");
  // console.log("thefile", file);
  // const selectedImage = file;
  //   if (selectedImage instanceof File) {
  //     // The object is of type File
  //     console.log('Selected image is a File:', selectedImage);

  //     // Access and alert various metadata properties
  //     alert('File name: ' + selectedImage.name);
  //     alert('File type: ' + selectedImage.type);
  //     alert('File size: ' + selectedImage.size + ' bytes');
  //     alert('Last modified: ' + selectedImage.lastModifiedDate);
  //   }

  const urlparams = new URL(document.location).searchParams;
  const urlp = document.location.search;
  console.log(urlp);
  let short_token;
  let access_token;
  const [sessionToken, setSessionToken] = useState("");

  //nk and jeeva and mohan
  async function auth() {
    // console.log("from the function auth.");
    if (urlparams) {
      short_token = urlparams.get("token");
      console.log(short_token, "null");
      if (short_token === null) {
        if (window.location.pathname === "/") {
          window.location.href = "/NA"; // Redirect to /NA if short_token is null and location is "/"
          return null;
        }
      }
    }
    axios
      .get(`${apiURL}/auth/token/access?short_token=${short_token}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        const true_response = JSON.parse(
          JSON.stringify(response.data.access_token),
        );
        console.log(true_response);
        access_token = true_response;
        setLoading(false);
        // call the session_token function with access_token
        session_token(access_token);
      })
      .catch(function (error) {
        if (short_token === null) {
          return;
        }
        // alert("Link Expired.");

        <Alert severity="error">Your Session Expired.</Alert>;
        console.log(error);
        window.location.href = "/NA";
      });
  }
  useEffect(() => {
    auth();
  }, []);
  //nk and jeeva and mohan
  async function session_token(access_token) {
    axios
      .get(`${apiURL}/auth/token/session?token=${access_token}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        const true_response = JSON.parse(
          JSON.stringify(response.data.session_token),
        );
        setSessionToken(
          JSON.parse(JSON.stringify(response.data.session_token)),
        );
        console.log(true_response, "response.");
        // access_token = true_response;
        console.log(JSON.stringify(sessionToken), "session_token");
        console.log(response);

        return getHealthCare(true_response);
      })
      .catch(function (error) {
        // alert("Your Session Expired");
        <Alert severity="error">Your Session Expired.</Alert>;
        window.location.href = "/NA";
      });
  }

  const [healthcare, sethealthcare] = useState({});

  async function getHealthCare(sessionToken) {
    console.log("from get health care.");
    try {
      axios
        .get(`${apiURL}/healthcare/`, {
          headers: {
            Accept: "application/json",
            token: `${sessionToken}`,
          },
        })
        .then(function (response) {
          const data = JSON.parse(JSON.stringify(response.data.data));
          sethealthcare(data);
          console.log(data);
        });
    } catch (err) {
      console.error("err in getting healthcare", err);
    }
  }

  // useEffect(() => {
  //   console.log(licenseBackblob, "back blob is here");
  // }, [licenseBackblob]);

  async function createFileforBlob() {
    if (licensebackcapturedimage) {
      let response = await fetch(licensebackcapturedimage);
      let data = await response.blob();

      setlicenseBackblob(data);
      console.log(data, "blob daa");
      return null;
    }
  }

  useEffect(() => {
    createFile();
    createFileforBlob();
  }, [capture, capturedImage, licensebackcapturedimage, licensebackbinarydata]);

  const fetchdata = async (linknxt, sessionToken) => {
    console.log(sessionToken);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    await axios
      .post(`${apiURL}/ai/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: sessionToken,
        },
      })
      .then((response) => {
        // Handle the response after the file is successfully uploaded
        console.log("response data: ", response);
        const data = JSON.parse(response.data[0]);
        console.log(data);
        // const data1 = JSON.stringify(JSON.parse(response.data));
        // console.log(data1);
        console.log("dob from ai:", data.date_of_birth);
        setPersonalDetailsValues((prevData) => ({
          ...prevData,
          firstname: data.first_name,
          middlename: data.middle_name,
          lastname: data.last_name,
          dob:
            data.date_of_birth === "" || undefined
              ? null
              : dayjs(data.date_of_birth),
        }));
        setAddressInputvalues((prevData) => ({
          ...prevData,
          streetname: data.street1,
          city: data.city,
          state: data.state,
          zipcode: data.pincode,
        }));

        if (response.data.status) {
          setLoading(false);
          if (window.confirm("Do you want to retry?")) {
            navigate("/");
            return setLoading(false);
          }
          console.error("Not working.");
        }

        // Application Logic
        setLoading(false);
        navigate(linknxt);
      })
      .catch((error) => {
        // Handle errors
        if (error.response.status !== 200 && error.response.status >= 400) {
          // navigate("/NA");
          console.error("error occured:", error.response.status);
          return setLoading(false);
        }
        setLoading(false);
        navigate(linknxt);
        console.error("Error uploading file:", error);
      });
  };

  const DOB = new Date(personaldetailsvalues.dob);

  const year = DOB.getFullYear();
  const month = String(DOB.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with '0' if needed
  const day = String(DOB.getDate()).padStart(2, "0"); // Pad with '0' if needed

  const formattedDate = `${year}-${month}-${day}`;

  const subscriberdob = new Date(insuranceDetails.subscriberdob);

  const subscriberdobyear = subscriberdob.getFullYear();
  const subscriberdobmonth = String(subscriberdob.getMonth() + 1).padStart(
    2,
    "0",
  ); // Month is zero-based, so add 1 and pad with '0' if needed
  const subscriberdobday = String(subscriberdob.getDate()).padStart(2, "0"); // Pad with '0' if needed

  const subscriberdob_formattedDate = `${subscriberdobyear}-${subscriberdobmonth}-${subscriberdobday}`;

  const body = {
    first_name: personaldetailsvalues.firstname,
    middle_name: personaldetailsvalues.middlename,
    last_name: personaldetailsvalues.lastname,
    preferred_language: personaldetailsvalues.preferredlanguage,
    gender: personaldetailsvalues.gender,
    doctor: 0,
    dob: formattedDate,
    cell_phone: addressinputvalues.phone.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "+1 ($1) $2-$3",
    ),
    address: addressinputvalues.streetname,
    city: addressinputvalues.city,
    state: addressinputvalues.state,
    zip_code: addressinputvalues.zipcode,
    email: addressinputvalues.email,
    emergency_contact_name: `${contactValues.firstname} ${contactValues.lastname}`,
    emergency_contact_phone: contactValues.contactnumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "+1 ($1) $2-$3",
    ),
    emergency_contact_relation: contactValues.relationship,
    primary_insurance: {
      insurance_group_number: insuranceDetails.groupnumber,
      insurance_id_number: insuranceDetails.memberid,
      is_subscriber_the_patient: insurancechecked,

      subscriber_first_name: insurancechecked
        ? null
        : insuranceDetails.subscriberfirstname,
      subscriber_last_name: insurancechecked
        ? null
        : insuranceDetails.subscriberlastname,
      subscriber_dob: insurancechecked ? null : subscriberdob_formattedDate,
      subscriber_relationship: insurancechecked
        ? null
        : insuranceDetails.SubscriberRelationshiptoPatient,

      photo_front: insurancefrontbinarydata,
      photo_back: insurancebackbinarydata,
    },
    referrel_source: refferalchecked ? referralValues.ReferralName : null,
    referrel_doctor: refferalchecked
      ? null
      : {
          first_name: referralValues.PrimaryCareDoctorFirstName,
          last_name: referralValues.PrimaryCareDoctorLastName,
          fax: referralValues.PrimaryCareFaxNumber.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "+1 ($1) $2-$3",
          ),
          phone: referralValues.PrimaryCarePhoneNumber.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "+1 ($1) $2-$3",
          ),
        },
  };
  // console.log("body dataa", body);
  const [apidata, setData] = useState("");

  const [errordialogopen, setErrorDialog] = useState(false);
  const [apierror, setapiError] = useState("");
  // console.log(insurancebackbinarydata);
  const senddata = async () => {
    setLoading(true);
    setData(body);

    console.log("body dataa", body);

    try {
      const res = await axios({
        method: "post",
        url: `${apiURL}/patient/`,
        data: body,
        headers: {
          "Content-Type": "application/json",
          token: sessionToken,
        },
      });

      // setResponse(res)
      console.log("response", res.data.data.toString());
      const patient_id = res.data.data.toString();

      console.log("response__raw", res);
      if (res.data.status !== 200) {
        throw res.data.data;
      }
      // setLoading(false);
      handleSendPdf(pdfdataKumar, pdfdataKumar2, patient_id, licenseBackblob);

      // navigate("/success");
    } catch (err) {
      console.error("error in creating patient", err);
      setLoading(false);
      alert(err);
      // console.log("error", err.response.data.detail);
    }
  };

  // console.log("insurance back capotured image",insurancebackcapturedimage);
  // console.log("license", licenseimagebinarydata);

  // signature pad states

  const [hasSigned, setHasSigned] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log(url);
  }, [url]);

  const [pdfDataUri, setPdfDataUri] = useState(null);
  const [pdfDataUri2, setPdfDataUri2] = useState(null);
  const [pdfdataKumar, setpdfdataKumar] = useState(null);
  const [pdfdataKumar2, setpdfdataKumar2] = useState(null);

  // CONSENT TO TREATMENT pdf generate
  const handleInsertImage2 = async () => {
    // console.log("CONSENT TO TREATMENT handleInsertImage2  called");
    console.log("iomage", url);
    setLoading(true);
    try {
      const pdfData = new Uint8Array(
        await fetch(samplePdf2).then((response) => response.arrayBuffer()),
      );
      const imageBlob = await fetch(url).then((response) =>
        response.arrayBuffer(),
      );

      const pdfDoc = await PDFDocument.load(pdfData);
      const page = pdfDoc.getPages();

      const image = await pdfDoc.embedPng(imageBlob);
      const { width, height } = image.scale(0.2);
      const pagetwo = page[1];

      //signature
      pagetwo.drawImage(image, {
        x: 110,
        y: 510,
        width,
        height,
        opacity: 1,
      });

      const name =
        personaldetailsvalues.firstname.toString() +
        "  " +
        personaldetailsvalues.lastname.toString();
      // console.log("name", name);
      //print name
      pagetwo.drawText(name, {
        x: 400,
        y: 510,
        size: 15,
        color: rgb(0, 0.53, 0.71),
      });

      //subscriber relation
      const SubscriberRelationshiptoPatient =
        insuranceDetails.SubscriberRelationshiptoPatient.toString();
      pagetwo.drawText(SubscriberRelationshiptoPatient, {
        x: 100,
        y: 475,
        size: 15,
        color: rgb(0, 0.53, 0.71),
      });

      //signature date
      const currentdate = new dayjs();
      pagetwo.drawText(currentdate.format("MM/DD/YYYY"), {
        x: 430,
        y: 475,
        size: 15,
        color: rgb(0, 0.53, 0.71),
      });

      const pages = page[0];
      const fontSize = 15;
      pages.drawText(name, {
        x: 150,
        y: 670,
        size: fontSize,
        color: rgb(0, 0.53, 0.71),
      });

      const fetchdate = new Date(personaldetailsvalues.dob);
      const jsmonth = dayjs(personaldetailsvalues.dob).format("MM");
      const formattedDate = new dayjs(personaldetailsvalues.dob).format("DD");

      const date = `${jsmonth.toString()}   ${formattedDate}   ${fetchdate
        .getFullYear()
        .toString()}`;
      pages.drawText(date, {
        x: 437,
        y: 670,
        size: fontSize - 4,
        color: rgb(0, 0.53, 0.71),
      });

      const modifiedPdfBytes = await pdfDoc.save();

      // Convert modified PDF to Blob
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
        type: "application/pdf",
      });

      setpdfdataKumar2(modifiedPdfBlob);
      console.log(modifiedPdfBytes, "modifiedPdfBytes");

      // Convert modified PDF to a data URI to display it in a React component
      const modifiedPdfDataUri = `data:application/pdf;base64,${btoa(
        String.fromCharCode(...modifiedPdfBytes),
      )}`;

      console.log(modifiedPdfDataUri, "modUri.");
      // setPdfDataUri2(modifiedPdfDataUri);
      setPdfDataUri2(modifiedPdfDataUri);

      // return modifiedPdfDataUri
    } catch (error) {
      console.error("Error loading or manipulating the PDF:", error);
    }
  };

  // NOTICE OF PRIVACY PRACTICES pdf generate
  const [pdferror, setPdfError] = useState("");

  let pdfdata;

  // console.log(licenseimagebinarydata, "license");
  const handleInsertImage1 = async () => {
    // console.log("NOTICE OF PRIVACY PRACTICES handleInsertImage1  called");
    setLoading(true);
    try {
      // Load the existing PDF data
      const pdfData = new Uint8Array(
        await fetch(samplePdf).then((response) => response.arrayBuffer()),
      );

      // Load the image data from the provided URL
      const imageBlob = await fetch(url).then((response) =>
        response.arrayBuffer(),
      );

      // Load the PDF document
      const pdfDoc = await PDFDocument.load(pdfData);

      // Get the fifth page of the PDF
      const pages = pdfDoc.getPages();
      const fifthpage = pages[5];

      // Embed the image into the PDF
      const image = await pdfDoc.embedPng(imageBlob);
      const { width, height } = image.scale(0.5); // Adjust the scale as needed

      // Draw the image on the page
      fifthpage.drawImage(image, {
        x: 500, // Adjust the X and Y coordinates as needed
        y: 180,
        width,
        height,
        opacity: 1,
      });

      fifthpage.drawText("Patient Signature", {
        x: 480,
        y: 165,
        size: 15,
        color: rgb(0, 0.53, 0.71),
      });

      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();

      // Convert modified PDF to Blob
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
        type: "application/pdf",
      });

      setpdfdataKumar(modifiedPdfBlob);

      console.log(modifiedPdfBlob);

      // // Create FormData object and append the modified PDF file
      // const formData = new FormData();
      // formData.append("file", modifiedPdfBlob, "modified.pdf");

      // Convert modified PDF to a data URI to display it in a React component
      const modifiedPdfDataUri = `data:application/pdf;base64,${btoa(
        String.fromCharCode(...modifiedPdfBytes),
      )}`;

      // Return the modified PDF data URI
      setPdfDataUri(modifiedPdfDataUri);

      // return modifiedPdfDataUri;
    } catch (error) {
      console.error("Error loading or manipulating the PDF:", error);
      setPdfError(error);
      // throw error;
    }
  };

  const handleInsertImage = (signurl) => {
    setLoading(true);
    handleInsertImage2(signurl);
    handleInsertImage1(signurl);
    setLoading(false);
  };

  const handleSendPdf = async (data, data2, patient_id, licenseBackblob) => {
    if (data && licenseBackblob) {
      // Call the function to send the data to the API
      await createDocApi(data, data2, patient_id, licenseBackblob);
    } else {
      console.error("No modified PDF data available");
    }
  };

  const createDocApi = async (data, data2, patient_id, licenseBackblob) => {
    console.log(data, "dataOfPdf");
    try {
      // console.log(licenseimagebinarydata);
      // // Convert modified PDF to Blob
      // const licenseBlobKumar = new Blob([licenseimagebinarydata], {
      //   type: "license.jpg",
      // });
      // Create FormData object and append the modified PDF file

      console.log("pdf1 uploading");
      const formData1 = new FormData();
      formData1.append("file", data, "file1.pdf");

      const res1 = await axios({
        method: "post",
        url: `${apiURL}/documents/create?patient_id=${patient_id}&description=PDF1`,
        data: formData1,
        headers: {
          "Content-Type": "multipart/form-data",
          token: sessionToken,
        },
      });

      console.log("pdf2 uploading");
      const formData2 = new FormData();
      formData2.append("file", data2, "file2.pdf");

      const res2 = await axios({
        method: "post",
        url: `${apiURL}/documents/create?patient_id=${patient_id}&description=PDF2`,
        data: formData2,
        headers: {
          "Content-Type": "multipart/form-data",
          token: sessionToken,
        },
      });

      console.log("lic back blob: ", licenseBackblob);
      if (licenseBackblob) {
        console.log("backblob uploading");
        const formData4 = new FormData();
        formData4.append("file", licenseBackblob, "licenseBack.jpg");

        const res3 = await axios({
          method: "post",
          url: `${apiURL}/documents/create?patient_id=${patient_id}&description=LicenseBack`,
          data: formData4,
          headers: {
            "Content-Type": "multipart/form-data",
            token: sessionToken,
          },
        });
        console.log("licenseback img__res__", res3, "\n");
      }

      if (licenseBlob) {
        console.log("license uploading");
        const formData = new FormData();
        formData.append("file", licenseBlob, "license.jpg");

        const res = await axios({
          method: "post",
          url: `${apiURL}/documents/create?patient_id=${patient_id}&description=License`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            token: sessionToken,
          },
        });
        console.log("license img__res__", res, "\n");
      }
      // setResponse(res)
      console.log("response__createDoc", "\n", res1, "\n", res2);
      setLoading(false);
      navigate("/success");
    } catch (err) {
      alert("error:" + err);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <contextdata.Provider
      value={{
        setreferralchecked,
        setpdChecked,
        setadChecked,
        setinChecked,
        setverifyChecked,
        setcontactchecked,
        setprivacychecked,
        setconsentChecked,
        setconfirmChecked,

        sessionToken,
        pdchecked,
        adChecked,
        inChecked,
        verifyChecked,
        contactchecked,
        referralchecked,
        privacychecked,
        consentChecked,
        confirmChecked,

        ColorButton2,
        state,
        clicked,
        setClicked,
        imageralert,
        setImageAlert,
        IndexImageValidation,
        licenseimagebinarydata,
        setLicenseImageBinaryData,
        setFile,
        fetchdata,
        healthcare,
        personaldetailsvalues,
        setPersonalDetailsValues,
        personaldetailserrorfield,
        personaldetailserrorfielddate,
        setPersonalDetailsErrorFielddate,
        setPersonalDetailsErrorField,
        datastate,
        setDataState,
        addressinputvalues,
        setAddressInputvalues,
        personaldetailsvalidation,

        addressvalidation,
        addressemailerror,
        setAddressError,
        setAddressContactNumberLengthError,
        addresscontactnumberlengtherror,
        pincodelengtherror,
        setPincodeLengthError,

        insuranceDateErr,
        setinsuranceDateErr,
        insurancevalidation,
        insuranceDetails,
        setInsuranceDetails,
        insurancechecked,
        setInsuranceChecked,
        insurancefrontdialog,
        setinsuranceFrontDialog,
        licenseBackDialog,
        setLicenseBackDialog,
        licensebackbinarydata,
        setlicensebackbinarydata,
        insurancebackdialog,
        setinsuranceBackDialog,
        insurancefrontcapturedimage,
        setInsuranceFrontCapturedImage,
        insurancefrontupload,
        setInsuranceFrontUpload,
        insurancebackupload,
        setInsuranceBackUpload,
        insurancebackcapturedimage,
        licensebackcapturedimage,
        setLicenseBackCapturedImage,
        setInsuranceBackCapturedImage,
        insurancefrontbinarydata,
        setInsuranceFrontBinaryData,
        insurancebackbinarydata,
        setInsuranceBackBinaryData,
        insuranceimagealert,
        setInsuranceImageAlert,
        insuranceimagevalidation,

        emergencyvalidation,
        setContactNumberLengthError,
        contactValues,
        setContactValues,
        setContactNumberLengthError,
        setContactNumberError,
        contactnumbererror,
        contactlengtherror,
        contacterrorfield,
        setContactErrorField,
        referralValues,
        setRefferalValue,
        refferalvalidation,
        refferalCheckedHandler,
        referalContactLengthError,
        setReferralContactLenghtError,
        referalFaxNumberLengthError,
        setReferralFaxNumberLenghtError,
        referralerrorfield,
        setReferralErrorField,
        ageChecked,
        setAgeChecked,
        setRefferalChecked,
        refferalchecked,
        insuranceImgDataValidation,
        capturedImage,
        setCapturedImage,
        cameradialog,
        setCameraDialog,
        capture,
        setCapture,

        pdfDataUri,
        setPdfDataUri,

        handleInsertImage,
        pdfDataUri2,
        setPdfDataUri2,
        url,
        setUrl,
        hasSigned,
        setHasSigned,

        senddata,
        loading,
        setLoading,

        open,
        setOpen,
        errordialogopen,
        setErrorDialog,
        pdferror,
        apierror,
        apidata,
      }}
    >
      {children}
    </contextdata.Provider>
  );
};

export const Contextdata = () => {
  const {
    sessionToken,
    setreferralchecked,
    pdchecked,
    setpdChecked,
    adChecked,
    setadChecked,
    inChecked,
    setinChecked,
    verifyChecked,
    setverifyChecked,
    contactchecked,
    setcontactchecked,
    referralchecked,
    setprivacychecked,
    privacychecked,
    setconsentChecked,
    consentChecked,
    setconfirmChecked,
    confirmChecked,

    ColorButton2,
    state,
    clicked,
    setClicked,
    imageralert,
    setImageAlert,
    IndexImageValidation,
    licenseimagebinarydata,
    setLicenseImageBinaryData,
    setFile,
    fetchdata,
    healthcare,
    personaldetailsvalues,
    setPersonalDetailsValues,
    personaldetailserrorfielddate,
    setPersonalDetailsErrorFielddate,
    personaldetailserrorfield,
    setPersonalDetailsErrorField,
    datastate,
    setDataState,
    status,
    addressinputvalues,
    setAddressInputvalues,
    personaldetailsvalidation,
    pincodelengtherror,
    setPincodeLengthError,
    addressvalidation,
    addressemailerror,
    setAddressError,
    setAddressContactNumberLengthError,
    addresscontactnumberlengtherror,
    insuranceDateErr,
    setinsuranceDateErr,
    insurancevalidation,
    insuranceDetails,
    insurancechecked,
    setInsuranceChecked,
    insurancefrontdialog,
    setinsuranceFrontDialog,
    licenseBackDialog,
    setLicenseBackDialog,
    licensebackbinarydata,
    setlicensebackbinarydata,
    insurancebackdialog,
    setinsuranceBackDialog,
    setInsuranceDetails,
    insurancefrontcapturedimage,
    setInsuranceFrontCapturedImage,
    insurancefrontupload,
    setInsuranceFrontUpload,
    insurancebackupload,
    setInsuranceBackUpload,
    insurancebackcapturedimage,
    licensebackcapturedimage,
    setLicenseBackCapturedImage,
    setInsuranceBackCapturedImage,
    insurancefrontbinarydata,
    setInsuranceFrontBinaryData,
    insurancebackbinarydata,
    setInsuranceBackBinaryData,
    insuranceimagealert,
    setInsuranceImageAlert,
    insuranceimagevalidation,

    emergencyvalidation,
    contactValues,
    setContactValues,
    setContactNumberLengthError,
    setContactNumberError,
    contactnumbererror,
    contactlengtherror,
    contacterrorfield,
    setContactErrorField,
    referralValues,
    setRefferalValue,
    refferalvalidation,
    refferalCheckedHandler,
    referalContactLengthError,
    setReferralContactLenghtError,
    referalFaxNumberLengthError,
    setReferralFaxNumberLenghtError,
    referralerrorfield,
    setReferralErrorField,
    ageChecked,
    setAgeChecked,
    setRefferalChecked,
    refferalchecked,
    insuranceImgDataValidation,
    capturedImage,
    setCapturedImage,
    cameradialog,
    setCameraDialog,
    capture,
    setCapture,

    handleInsertImage,
    pdfDataUri,
    setPdfDataUri,
    pdfDataUri2,
    setPdfDataUri2,
    url,
    setUrl,
    hasSigned,
    setHasSigned,

    senddata,
    loading,
    setLoading,

    open,
    setOpen,
    errordialogopen,
    setErrorDialog,
    pdferror,
    apierror,
    apidata,
  } = useContext(contextdata);

  return {
    sessionToken,
    setreferralchecked,
    pdchecked,
    setpdChecked,
    adChecked,
    setadChecked,
    inChecked,
    setinChecked,
    verifyChecked,
    setverifyChecked,
    contactchecked,
    setcontactchecked,
    referralchecked,
    setprivacychecked,
    privacychecked,
    setconsentChecked,
    consentChecked,
    setconfirmChecked,
    confirmChecked,

    ColorButton2,
    state,
    clicked,
    setClicked,
    imageralert,
    setImageAlert,
    IndexImageValidation,
    licenseimagebinarydata,
    setLicenseImageBinaryData,
    setFile,
    fetchdata,
    healthcare,
    personaldetailsvalues,
    setPersonalDetailsValues,
    personaldetailserrorfield,
    personaldetailserrorfielddate,
    setPersonalDetailsErrorField,
    setPersonalDetailsErrorFielddate,
    datastate,
    setDataState,
    status,
    addressinputvalues,
    setAddressInputvalues,
    personaldetailsvalidation,
    pincodelengtherror,
    setPincodeLengthError,
    addressvalidation,
    addressemailerror,
    setAddressError,
    setAddressContactNumberLengthError,
    addresscontactnumberlengtherror,
    insuranceDateErr,
    setinsuranceDateErr,
    insurancevalidation,
    insuranceDetails,
    setInsuranceDetails,
    insurancechecked,
    setInsuranceChecked,
    insurancefrontdialog,
    setinsuranceFrontDialog,
    licenseBackDialog,
    setLicenseBackDialog,
    licensebackbinarydata,
    setlicensebackbinarydata,
    insurancebackdialog,
    setinsuranceBackDialog,
    insurancefrontcapturedimage,
    setInsuranceFrontCapturedImage,
    insurancefrontupload,
    setInsuranceFrontUpload,
    insurancebackupload,
    setInsuranceBackUpload,
    insurancebackcapturedimage,
    licensebackcapturedimage,
    setLicenseBackCapturedImage,
    setInsuranceBackCapturedImage,
    insurancefrontbinarydata,
    setInsuranceFrontBinaryData,
    insurancebackbinarydata,
    setInsuranceBackBinaryData,
    insuranceimagealert,
    setInsuranceImageAlert,
    insuranceimagevalidation,

    emergencyvalidation,
    setContactNumberLengthError,
    contactValues,
    setContactValues,
    setContactNumberLengthError,
    setContactNumberError,
    contactnumbererror,
    contactlengtherror,
    contacterrorfield,
    setContactErrorField,
    referralValues,
    setRefferalValue,
    refferalvalidation,
    refferalCheckedHandler,
    referalContactLengthError,
    setReferralContactLenghtError,
    referalFaxNumberLengthError,
    setReferralFaxNumberLenghtError,
    referralerrorfield,
    setReferralErrorField,
    ageChecked,
    setAgeChecked,
    setRefferalChecked,
    refferalchecked,
    insuranceImgDataValidation,
    capturedImage,
    setCapturedImage,
    cameradialog,
    setCameraDialog,
    capture,
    setCapture,

    handleInsertImage,
    pdfDataUri,
    setPdfDataUri,
    pdfDataUri2,
    setPdfDataUri2,
    url,
    setUrl,
    hasSigned,
    setHasSigned,

    senddata,
    loading,
    setLoading,

    open,
    setOpen,
    errordialogopen,
    setErrorDialog,
    pdferror,
    apierror,
    apidata,
  };
};
