import React from 'react';


function Mony() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100 mony">
        <div className="col-xs-12 col-md-4">
          <div className="panel panel-default">
            <div className="panel-heading text-center">
              <h3>Payment Details</h3>
              <img
                className="img-responsive cc-img"
                src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png"
                alt="Credit Card Icons"
              />
            </div>
            <div className="panel-body">
              <form role="form">
                <div className="form-group">
                  <label>CARD NUMBER</label>
                  <div className="input-group">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Valid Card Number"
                    />
                    <span className="input-group-addon">
                      <span className="fa fa-credit-card"></span>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <div className="form-group">
                      <label>
                        <span className="hidden-xs">EXPIRATION</span>
                        <span className="visible-xs-inline">EXP</span> DATE
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="MM / YY"
                      />
                    </div>
                  </div>
                  <div className="col-xs-5">
                    <div className="form-group">
                      <label>CV CODE</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>CARD OWNER</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Card Owner Names"
                  />
                </div>
              </form>
            </div>
            <div className="panel-footer">
              <button className="btn btn-warning btn-lg btn-block">
                Process payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mony;
