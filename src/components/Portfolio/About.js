import React, { Component } from 'react';
import { MdFlashOn, MdBugReport, MdScreenRotation, MdLock
} from 'react-icons/lib/md'


class About extends Component {
    render() {
        return (
            <div className='container pg-margin'>
              <h3 className='mb-4 bold'>Welcome to PyDino!</h3>
              <p>We build data driven web apps with elegant and easy-to-use interfaces.</p>
              <p className='mb-4'>Contact us below to build something special.</p>
              <div className="d-flex mt-5 justify-content-between">
                <div className='d-flex flex-column align-items-center w-50'>
                  <div className="box">
                    <MdScreenRotation className='box-icon' />
                  </div>
                  <h4 className="label">Responsive</h4>
                  <p>Built to work on any device</p>
                </div>
                <div className='d-flex flex-column align-items-center w-50'>
                    <div className="box">
                      <MdFlashOn className='box-icon' />
                    </div>
                    <h4 className="label">Fast</h4>
                    <p>Fast load times</p>
                </div>
              </div>
              <div className='d-flex mt-4 justify-content-between'>
                <div className='d-flex flex-column align-items-center w-50'>
                    <div className="box">
                      <MdLock className='box-icon' />
                    </div>
                    <h4 className="label">Secure</h4>
                    <p>Data privacy is important to us</p>
                </div>
                <div className='d-flex flex-column align-items-center w-50'>
                    <div className="box">
                      <MdBugReport className='box-icon'/>
                    </div>
                    <h4 className="label">Tested</h4>
                    <p>Quality tested to minimize bugs</p>
                </div>
              </div>
            </div>
        );
    }
}

export default About;
