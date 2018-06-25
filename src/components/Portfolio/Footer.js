import React, { Component } from 'react';
import linkedin_logo from '../../img/linkedin_logo.png';
import github_logo from '../../img/github_logo.png';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer-container">
                    <div className="flex-row sm-icon">
                        <a className="flex-col" href="https://www.linkedin.com/in/najens">
                            <img alt="linkedin icon" src={linkedin_logo}/>
                        </a>
                        <a className="flex-col" href="https://github.com/najens">
                            <img alt="github icon" src={github_logo}/>
                        </a>
                        <span className="flex-col" id="copyright">(c) Nathan Jensen</span>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
