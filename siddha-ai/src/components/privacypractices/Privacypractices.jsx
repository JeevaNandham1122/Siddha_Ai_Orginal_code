import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox,  } from "@mui/material";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import { Contextdata } from "../../context/Context";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";

export default function Privacypractices() {
  const { privacychecked, setconsentChecked } = Contextdata();
  useEffect(() => {
    scrollUp();
  }, []);

  const textstyleterms = {
    color: "rgba(4,136,185,1)",
    wordWrap: "break-word",
    cursor: "pointer",
    textDecoration: "underline",
  };

  const [checked, setChecked] = useState(false);

  if (!privacychecked) {
    window.location.href = "/";
  }
  const handleChecked = (e) => {
    setChecked(e.target.checked);
    setconsentChecked(e.target.checked);
  };

  return (
    <>
      <div className="privacy-container" style={{ margin: "3.3rem 8%" }}>
        <div className="">
          <center>
            <h1>NOTICE OF PRIVACY PRACTICES</h1>
          </center>
          <br />
          <p>
            Orthopaedic Spine Institute SC and VM Spine Institute SC are
            required by law to maintain the privacy of protected health
            information (PHI). PHI is information about you that may identify
            you and relates to your past, present, or future mental or physical
            health or condition and related services. We are also required to
            provide individuals with notice of our legal duties and the privacy
            practices used in our offices with respect to PHI. This notice
            describes how we may use or disclose your PHI for various purposes
            within our medical and dental clinics as well as our pharmacy. It
            also describes your rights to access and control your PHI. Please
            review it carefully. This notice applies to all of the following
            Orthopaedic Spine Institute and VM Spine Institute clinics [1585 N
            Barrington Rd DOB 2, Suite 506. Hoffman Estates, IL 60169] are
            required by federal and state law to abide by the terms of the
            Notice of Privacy Practices currently in effect. We reserve the
            right to change the terms of this Notice and to make the provisions
            of a revised Notice effective for all PHI that we maintain. Upon
            your request, we will provide you with any revisions to the Notice
            of Privacy Practices. Send a written request to the attention of
            Privacy Officer, 1585 N Barrington Rd DOB 2, Suite 506. Hoffman
            Estates, IL; and a copy of the revised Notice will be mailed to you
            within thirty (30) days.
          </p>
          <br />
          <u>
            <b>
              Use and Disclosure of PHI for Treatment, Payment, and Operations
            </b>
          </u>

          <p>
            Your PHI may be used and disclosed by your health care provider, our
            office staff, and others outside our offices that are involved in
            your care and treatment for the purposes of providing health care
            services to you. Your PHI may also be used and disclosed to pay your
            health care bills and to support the operation of this practice.
            Following are examples of the types of uses and disclosures of your
            PHI that the practice is permitted to make. This list is not
            exhaustive, it is only meant to describe and provide examples of the
            way we may use and disclose your PHI.
          </p>
          <br />

          <b>1. Treatment</b>
          <p>
            Our practice may use your PHI when treating you. This includes
            provision of services by our providers and also the coordination and
            management of your care with other doctors, dentists, pharmacists,
            insurance companies, home health agencies, and others. For example,
            we may share your information with your Primary Care Physician or
            another specialist to whom you have been referred; or, we may
            provide the pharmacy with information needed to fill a prescription
            for you. Many of the people who work for our practice – doctors,
            nurses, office staff, etc. – may use or disclose your PHI in order
            to treat you or assist others in treating you. Additionally, we may
            disclose your PHI to your spouse, children, parents, or other family
            members and caregivers.
          </p>
          <br />
          <b>2. Payment</b>
          <p>
            Orthopaedic Spine Institute may use or disclose your PHI in order to
            bill and collect payment for the services and items you may receive
            from us. For example, we may contact your health insurance company
            (Medicare, Blue Cross, etc.) to certify that you are eligible for
            benefits. We may also provide your insurer with details regarding
            your treatment to determine if your insurer will pay for your
            treatment. We also may use and disclose your PHI to obtain payments
            from third parties that may be responsible for such costs, such as
            family members or those with power of attorney over your affairs. We
            may also use your PHI to bill you directly.
          </p>
          <br />
          <b>3. Health Care Operations</b>
          <p>
            Our practice may use and disclose your PHI to operate our business
            and to evaluate the quality of care you receive from us. These
            activities may include, but are not limited to, business planning,
            cost-management, or training activities. For example, we may use a
            sign-in sheet at check-in, call your name in our waiting room when
            we’re ready to see you or when your prescription is ready, or send
            you postcards to remind you of your appointment. We may share your
            PHI with Business Associates that perform various activities, like
            billing or transcription, for the practice. Whenever Orthopaedic
            Spine Institute SC or VM Spine Institute SC make an arrangement with
            a Business Associate that involves possible use or disclosure of
            PHI; we will have a written contract that contains terms that will
            protect the privacy of your PHI. We may use your PHI to provide you
            with information about your health condition or to provide you with
            information about treatment alternatives and or other health-related
            benefits and services that may be of interest to you.
          </p>

          <br />

          <u>
            <b>Uses and Disclosures Made Unless You Object </b>{" "}
          </u>
          <p>
            In some circumstances, you have the opportunity to agree or object
            to the use or disclosure of all or part of your PHI. The following
            examples are instances in which, unless you object, your PHI may be
            used or disclosed. To object to the following uses of your PHI,
            notify this organization’s Privacy Officer in writing at the address
            given in the third paragraph of this Notice.
          </p>
          <br />

          <b>1. Disaster Relief</b>
          <p>
            We may use or disclose your PHI to an authorized public or private
            entity to assist in disaster relief efforts and to coordinate uses
            and/or disclosures to family and other individuals involved in your
            health care.
          </p>

          <br />

          <b>2. Others Involved in Your Health Care</b>
          <p>
            We may disclose to a member of your family, a relative, a close
            friend, or any other person that you identify, your PHI based on our
            professional judgment of that person’s involvement in your health
            care. If you are unable to agree or object to such a disclosure, we
            may disclose as much information as necessary if we determine that
            it is in your best interest.
          </p>

          <br />

          <b>3. Registries</b>
          <p>
            Orthopaedic Spine Institute SC and VM Spine Institute SC may
            disclose protected health information to registries in the future:
            for purposes of coordination and management of care with other
            covered entities.{" "}
          </p>
          <br />
          <u>
            <b>Uses and Disclosures Made with Your Written Authorization</b>
          </u>
          <p>
            Other uses and disclosures of your protected health information as
            outlined below will be made only with your written authorization,
            unless otherwise permitted or required by law. You may cancel or
            change your authorization at any time to prevent future use of the
            authorization by notifying the clinic in writing. This will prevent
            any future action based on the authorization, but it does not affect
            any action already taken based on the authorization.
          </p>

          <br />

          <b>1. Marketing Purposes</b>
          <p>
            Covered entities must obtain authorization to use PHI to make any
            treatment and health care operations communications if they receive
            financial remuneration for making the communication from a third
            party whose product or service is being promoted.{" "}
          </p>

          <br />

          <b>2. Sale of PHI</b>
          <p>
            This type of disclosure must be authorized if it will result in
            remuneration to the covered entity. We currently do not sell PHI.
          </p>

          <br />

          <b>3. Fundraising Communications</b>
          <p>
            We may contact you regarding raising funds for our organization and
            you have the right to opt out of receiving such communications.
          </p>

          <br />

          <u>
            <b>
              Disclosures Made Without Your Authorization or Opportunity to
              Object
            </b>
          </u>
          <p>
            We may use or disclose your PHI in the following situations without
            your authorization. These situations include:
          </p>

          <br />

          <b>1. Situations Required by Law</b>
          <p>
            We may use or disclose your PHI as required by law. The use or
            disclosure will be made in compliance with the law and will be
            limited to the relevant requirements of the law.{" "}
          </p>

          <br />

          <b>2. Public Health Risks</b>
          <p>
            Our practice may use or disclose your PHI to public health
            authorities that are authorized by law to collect or receive the
            data. This disclosure will be made for the purpose of controlling
            disease, injury, or disability.{" "}
          </p>

          <br />

          <b>3. Communicable Diseases</b>
          <p>
            We may disclose your PHI, as authorized by law, to a person who may
            have been exposed to a communicable disease or may otherwise be at
            risk of contracting or spreading the disease or condition.{" "}
          </p>

          <br />

          <b>4. Health Oversight</b>
          <p>
            Our practice may disclose your PHI to a health oversight agency for
            activities authorized by law. Examples include: audits, inspections,
            investigations, surveys, licensure, disciplinary actions, and other
            activities necessary for the government to monitor government
            programs, compliance, and the health care system in general.
          </p>
          <br />

          <b>5. Legal Proceedings</b>
          <p>
            We may use and disclose your PHI in response to a court or
            administrative order, discovery request, subpoena, or other lawful
            process if you are involved in a lawsuit or similar proceeding or in
            other conditions when such use and disclosure are expressly
            authorized.{" "}
          </p>
          <br />

          <b>6. Law Enforcement </b>
          <p>
            We may disclose PHI for law enforcement purposes. These purposes
            include: legal processes and otherwise required by law, requests for
            limited information for identification and location purposes,
            requests pertaining to the victims of a crime; and alerting law
            enforcement officials of suspicion of criminal conduct as a cause of
            death, in the event that the crime occurs on the clinic’s premises,
            or that a medical emergency exists and it is likely that a crime
            occurred.{" "}
          </p>
          <br />

          <b>7. Abuse or Neglect</b>
          <p>
            We may disclose your PHI to public officials who are authorized by
            law to receive reports of abuse, neglect, or domestic violence.{" "}
          </p>
          <br />

          <b>8. Food and Drug Administration (FDA)</b>
          <p>
            We may disclose your PHI to a person or company required by the FDA
            to report adverse events, product defects or problems, biological
            product deviations; track products; to enable product recalls; to
            make repairs or replacements; or to conduct post marketing
            surveillance as required.{" "}
          </p>
          <br />

          <b>9. Coroners, Funeral Directors, and Organ Donation</b>
          <p>
            Our practice may disclose PHI to a medical examiner or coroner to
            identify a deceased individual or identify the cause of death. We
            may also release information to a funeral director in order for them
            to perform their jobs. We may also disclose PHI in reasonable
            anticipation of death for the purpose of facilitating organ
            donation.{" "}
          </p>
          <br />

          <b>10. Research</b>
          <p>
            We may disclose PHI to researchers when an Institutional Review
            Board (IRB) that has reviewed the research proposal and established
            protocols to ensure the privacy of your PHI has reviewed their
            research.
          </p>
          <br />

          <b>11. Serious Threats to Health or Safety</b>
          <p>
            Our practice may use or disclose your PHI when necessary to reduce
            or prevent a serious threat to your health and safety or the health
            and safety of others. Under these circumstances, we will only make
            disclosures to a person or organization able to help prevent the
            threat.
          </p>
          <br />

          <b>12. Military Activity and National Security</b>
          <p>
            We may disclose your PHI if you are a member of U.S. or foreign
            armed forces (including veterans) and if required by the appropriate
            authorities. We may also disclose your PHI to authorized federal
            officials for conducting national security and intelligence
            activities, including the provision of protective services to the
            President and or others legally authorized.{" "}
          </p>
          <br />

          <b>13. Inmates</b>
          <p>
            We may use or disclose your PHI if you are an inmate of a
            correctional facility and your physician created or received your
            PHI in the process of providing care for you.{" "}
          </p>
          <br />

          <b>14. Worker’s Compensation</b>
          <p>
            We may disclose PHI to comply with workers’ compensation and other
            similar legally established programs.
          </p>
          <br />

          <b>15. Fundraising Purposes</b>
          <p>
            We may disclose your dates of treatment and demographic information
            for fundraising purposes, including to business associates or to a
            related foundation, unless prohibited by law.{" "}
          </p>

          <br />

          <b>16. Other Required Uses or Disclosures</b>
          <p>
            Under the law, we must make disclosures to you, and when required,
            to the Secretary of the Department of Health and Human Services to
            investigate or determine our compliance with the privacy standards
            applicable to your PHI.
          </p>
          <br />

          <u>
            <b>Your Rights Regarding Your PHI </b>
          </u>
          <br />

          <b>1. Confidential Communications</b>
          <p>
            You have the right to request that our practice communicate with you
            about your health and related issues in a particular manner or at a
            certain location. For instance, you may request that we only contact
            you at an alternate number other than your home number. In order to
            request a type of confidential communication, you must make a
            written request by completing the Request for Confidential
            Communications Form available at the Front Desk. Our practice will
            accommodate all reasonable requests. You do not have to give a
            reason for your request.{" "}
          </p>
          <br />

          <b>2. Requesting Restrictions</b>
          <p>
            You have the right to request a restriction in our use or disclosure
            of your PHI for treatment, payment, or health care operations. You
            may also request that we not disclose any part of your PHI to family
            members or friends who may be involved in your care or for
            notification purposes as described previously in this Notice. We are
            not required to agree to your request; however, if we do agree, we
            will follow the agreement except when otherwise required by law, in
            emergencies, or when the information is necessary to treat you. With
            this in mind, please discuss any restriction with your health care
            provider. In order to request a restriction in our use or disclosure
            of your PHI, you must complete the Request for Restrictions on Uses
            & Disclosures Form available at the Front Desk and submit it to the
            Privacy Officer.
          </p>
          <br />

          <b>3. Inspection and Copies</b>
          <p>
            You have the right to inspect and obtain a copy of the PHI that may
            be used to make decisions about you, including patient medical
            records and billing records. Under federal law, however, you may not
            inspect psychotherapy notes (separate authorization must be
            obtained); information compiled in anticipation of court
            proceedings; or PHI subject to law that prohibits access. You may
            submit your request by completing the Request for Authorization to
            Release PHI Form available at the Front Desk. We will provide a
            one-time only free copy of your medical records (electronic or
            paper). Beyond this free copy, our practice may charge a fee for the
            costs of copying, mailing, and labor associated with your request.
            Our practice may deny your right to inspect and/or copy in certain
            limited circumstances; however, you may request a review of the
            denial by contacting our Privacy Officer.{" "}
          </p>
          <br />

          <b>4. Amendment</b>
          <p>
            You have the right to request that we amend your health information
            if you believe it is incorrect or incomplete, and you may request an
            amendment for as long as the information is kept HIPAA 001-01 Notice
            of Privacy Practices Revised 11/17 by or for our practice. To
            request an amendment, you must complete the Request for Correction
            or Amendment of PHI Form available at the Front Desk and submit it
            to the Privacy Officer. Our practice may deny your request if, in
            our opinion, the request is not accurate or complete; not part of
            the PHI kept by our practice; not part of the record you would be
            permitted to inspect and copy; or not created by our practice unless
            the individual or entity that created the information is not
            available to amend the information.{" "}
          </p>
          <br />

          <b>5. Accounting of Disclosures</b>
          <p>
            All of our patients have the right to request an “accounting of
            disclosures.” An “accounting of disclosures” is a list of
            disclosures our practice has made of your PHI. An accounting of all
            disclosures is available to all patients. Our office will provide
            one free copy per 12 months, upon request; however, our practice may
            charge for additional copies received within the 12 months. To
            request an “accounting of disclosures” complete the Request for
            Accounting of Disclosures Form available at the Front Desk and
            submit it to the Privacy Officer.
          </p>
          <br />

          <b>6. Right to Receive a Paper Copy of This Notice</b>
          <p>
            You have the right to receive a paper copy of this notice at any
            time by requesting one from any Health Help, Inc. employee.
          </p>
          <br />

          <b>7. Right to File a Complaint</b>
          <p>
            If you believe your privacy rights have been violated, you may file
            a complaint with our practice or with the Secretary of the
            Department of Health and Human Services. To file a complaint with
            our practice, contact our Privacy Officer, in writing at 1585 N
            Barrington Rd, DOB 2, Ste 506, Hoffman Estates, IL 60169.
          </p>
          <br />

          <b>
            8. Right to Provide an Authorization for Other Uses and Disclosures
          </b>
          <p>
            Our practice will obtain your written authorization for other uses
            and disclosures that are not identified by this notice or permitted
            by applicable law. Any authorization you provide to us regarding the
            use and disclosure of your PHI may be revoked at any time in
            writing.{" "}
          </p>
          <br />

          <b>9. Restriction Request</b>
          <p>
            Upon Full Payment Our practice is required to agree to a requested
            restriction on a disclosure of PHI about the individual to a health
            plan if the disclosure is for the purpose of carrying out payment or
            health care operations and is not otherwise required by law, and the
            PHI pertains solely to a health care item or service for which the
            individual, or person other than the health plan on behalf of the
            individual, has paid the covered entity (fully out-of-pocket).{" "}
          </p>
          <br />

          <b>10. Breach Notification</b>
          <p>
            Our practice is required by law to notify all affected individuals
            following a breach of unsecured PHI. This notification will be made
            through first class mail.
          </p>
        </div>
      </div>

      {/* <Box sx={{textAlign: 'center'}} >
          <ColorButton2 onClick={handlesignaturedialogOpen}  >Signature</ColorButton2>
            
          </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "3rem",
          marginLeft: { xs: "12px" },
          userSelect: "none",
        }}
      >
        <FormGroup sx={{ textAlign: "left" }}>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onClick={(e) => handleChecked(e)} />
            }
            label="I agree to the Terms and Conditions"
          />
        </FormGroup>
      </Stack>
      </Box>

      <Box sx={{ margin: "0 8%" }}>
        <Custombtn
          linkbck="/referral"
          linknxt="/eula"
          checked={checked}
        />
      </Box>
    </>
  );
}
