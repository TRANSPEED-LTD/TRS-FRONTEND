import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { BsDownload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { BsFiletypePdf } from "react-icons/bs";
import PropTypes from "prop-types";
import format from 'date-fns/format';
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const options = {
  filename: "advanced-example.pdf",
  method: "save",
  resolution: Resolution.HIGH,
  page: {
    margin: Margin.MEDIUM,
    format: "letter",
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1
  },
  overrides: {
    pdf: {
      compress: true
    },
    canvas: {
      useCORS: true
    }
  }
};

const getTargetElement = () => document.getElementById("container");

const downloadPdf = (event) => {
  event.stopPropagation();
  generatePDF(getTargetElement, options);
};


const Pdf = ({closepdf, setclosepdf, orderData, startAddress, endAddress}) => {
  const [shipperdata, setshipperdata] = useState({})
  const [forwarderdata, setforwarderdata] = useState({})

  const token = Cookies.get('token');
  const { 
    order_id, 
    created_datetime, 
    shipper_company_name, 
    shipper_company_vat,
    price,
    files
  } = orderData || {};
  useEffect(() => {
    axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/companies/get-companies?search_keyword=${shipper_company_name}&company_type=SHIPPER`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => {
      setshipperdata({contact_name:response.data[0].contact_name, contact_email:response.data[0].contact_email, address:response.data[0].address});
    })
    .catch((error) => {
      console.error(`Error fetching data:`, error);
    });


    axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/companies/get-user-company`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => {
      setforwarderdata({name:response.data.name, contact_name:response.data.contact_name, contact_email:response.data.contact_email, address:response.data.address, ibans:response.data.ibans, vat:response.data.vat_number});
    })
    .catch((error) => {
      console.error(`Error fetching data:`, error);
    });
  }, [])
  

  return (
    <>
    <div className={`${closepdf ? "d-flex align-items-center flex-row justify-content-between max-w-525 pdf-border pointer" : "d-none"}`} onClick={() =>setclosepdf(false)}>
    <div className="d-flex flex-row align-items-center">
    <BsFiletypePdf className="icon-40 me-2 darkblue"/>
    <div className="darkblue font-15">TRS-{order_id}</div>
    </div>
    <BsDownload className="icon-size darkblue pointer" onClick={downloadPdf}/>
    </div>
      <div className={`pdf ${closepdf ? "d-none" : ""}`} >
        <div className="pdf-modal">
          <div className="d-flex flex-row justify-content-between"><BsDownload className="icon-size darkblue pointer" onClick={downloadPdf} /><AiOutlineClose className="icon-size darkblue pointer" onClick={()=>setclosepdf(true)}/></div>
          <div id="container" className="darkblue mb-3">
            <div className="mt-4">
              <div className="d-flex flex-row justify-content-around align-items-center">
                <img src={files[files.length -1]} alt="logo your company" className="object-fit-cover h-40 w-255 h-50 me-3" />
                <div className="mt-1 darkblue f-bold mx-2 font-15">Shipping ID: #{order_id}</div>
                <div className="mt-1 darkblue f-bold mx-2 font-15">Issue date: {format(new Date(created_datetime), 'M/d/yy')}</div>
                <div className="mt-1 darkblue f-bold mx-2 font-15">Payment date: {format(new Date(created_datetime), 'M/d/yy')}</div>
              </div>
              <hr className="w-100 m-0 opacity-100 mt-3" style={{ border: "2px rgb(86, 106, 228) solid" }} />
              <div className="mt-3 mb-2 ps-2">Parties:</div>
              <table width="100%">
                <thead className="bg-table">
                  <tr>
                    <th className="f-bold font-15 py-2 ps-2 pe-2">Type</th>
                    <th className="f-bold font-15 py-2 px-2">Company</th>
                    <th className="f-bold font-15 py-2 px-2">Address</th>
                    <th className="f-bold font-15 py-2 px-2">VAT number</th>
                    <th className="f-bold font-15 py-2 px-2">Contact person</th>
                    <th ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="pd-table">
                    <td className="font-15 px-1">Shipper</td>
                    <td className="font-15 px-2">{shipper_company_name}</td>
                    <td className="font-15 px-2">{shipperdata?.address}</td>
                    <td className="font-15 px-2">{shipper_company_vat}</td>
                    <td className="font-15 px-2">{shipperdata?.contact_name}</td>
                    <td className="font-15 px-2">{shipperdata?.contact_email}</td>
                  </tr>
                  <tr className="pd-table">
                    <td className="font-15 px-1">Forwarder</td>
                    <td className="font-15 px-2">{forwarderdata?.name}</td>
                    <td className="font-15 px-2">{forwarderdata?.address}</td>
                    <td className="font-15 px-2">{forwarderdata?.vat}</td>
                    <td className="font-15 px-2">{}</td>
                    <td className="font-15 px-2">{forwarderdata?.contact_email}</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-5 mb-2 ps-2">Route:</div>
              <table width="100%" >
                <thead className="bg-table">
                  <tr>
                    <th className="f-bold font-15 py-2 ps-2 pe-2">Route</th>
                    <th className="f-bold font-15 py-2 px-2">Container number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="pd-table">
                    <td className="font-15 px-1">{startAddress}  {" "} -  {" "} {endAddress}</td>
                    <td className="font-15 px-2">MSMU12457895</td>
                  </tr>
                </tbody>
              </table>


              <div className="mt-5 mb-2 ps-2">Payment information:</div>
              <table width="100%">
                <thead className="bg-table">
                  <tr>
                    <th className="f-bold font-15 py-2 ps-2 pe-2">Type</th>
                    <th className="f-bold font-15 py-2 px-2">Conditions</th>
                    <th className="f-bold font-15 py-2 px-2">Price</th>
                    <th className="f-bold font-15 py-2 px-2">VAT</th>
                    <th className="f-bold font-15 py-2 px-2">Total</th>
                    <th className="f-bold font-15 py-2 px-2">Currency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="pd-table">
                    <td className="font-15 px-1">International transportation</td>
                    <td className="font-15 px-2">30 days after invoice issue date</td>
                    <td className="font-15 px-2">{price}</td>
                    <td className="font-15 px-2">0.00</td>
                    <td className="font-15 px-2">{price}</td>
                    <td className="font-15 px-2">USD</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-5 mb-2 ps-2">IBANs:</div>

              <table width="100%">
                <thead className="bg-table">
                  <tr>
                    <th className="f-bold font-15 py-2 ps-2 pe-2">Currency</th>
                    <th className="f-bold font-15 py-2 px-2">Bank name</th>
                    <th className="f-bold font-15 py-2 px-2">Account number</th>
                    <th className="f-bold font-15 py-2 px-2">Receiver company</th>
                  </tr>
                </thead>
                <tbody>
                {forwarderdata?.ibans?.map((iban, index) => (
                  <tr key={index} className="pd-table">
                    <td className="font-15 px-1">{iban.currency}</td>
                    <td className="font-15 px-2">{iban.bank_name}</td>
                    <td className="font-15 px-2">{iban.account_number}</td>
                    <td className="font-15 px-2">{forwarderdata.name}</td>
                  </tr>
                ))}
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Pdf.propTypes = {
  closepdf: PropTypes.bool,
  setclosepdf: PropTypes.func,
  endAddress: PropTypes.string,
  startAddress: PropTypes.string,
  orderData: PropTypes.object
};

export default Pdf;
