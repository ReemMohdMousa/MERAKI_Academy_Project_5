import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter
      bgColor="white"
      className="text-center text-lg-left"
      style={{ borderTop: "2px black solid" }}
    >
      <section className="">
        <MDBContainer className="text-center text-lg-center">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-1">
              <h6 className="text-uppercase fw-bold mb-4">Brand</h6>
            </MDBCol>

            <MDBCol md="3" lg="3" xl="3" className="mx-auto mb-3">
              <span>
                <a href="#!" className="text-reset">
                  About &nbsp;  &nbsp; 
                </a>
              </span>

              <span>
                <a href="#!" className="text-reset">
                  Privacy Policy &nbsp; &nbsp; 
                </a>
              </span>
              <span>
                <a href="#!" className="text-reset">
                  Terms &nbsp;
                </a>
              </span>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Copyright &copy; {new Date().getFullYear()}{" "}
        <span style={{ fontFamily: "Niconne", fontWeight: "50" }}>
          brand.
        </span>
      </div>
    </MDBFooter>
  );
};
export default Footer;
