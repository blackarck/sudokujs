import React from 'react'
import './modal.css';

/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

const ModalWind = ({ handleClose,handleOkbtn, show,windtype,children}) => {

    var modalclass="modal-main";
    var showokbtn=false;
    //console.log("windtype is "+windtype );
    if(windtype==="difficulty"){
      modalclass=modalclass+ " displayback";
      showokbtn=true;
    }
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName} onClick={handleClose}>
        <section className= {modalclass}>
           {children}
           <button type="button" show={showokbtn} onClick={handleOkbtn}>
            Ok
          </button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    )
}

export default ModalWind
