import React, { Component } from 'react';
import { MdFlashOn, MdBugReport, MdScreenRotation, MdLock } from 'react-icons/lib/md'

class FeatureList extends Component {
    render() {
        const features = this.props.features;

        return (
            <div className="flex-row">
                {features.map((feature, index) => (
                    <div key={index} className="flex-col content-wrap">
                        <div className="box">
                            <i className="material-icons">{feature.icon}</i>
                        </div>
                        <h4 className="label" id={`feature-${index}`}>{feature.name}</h4>
                        <p id={`feature-text-${index}`}>{feature.description}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default FeatureList;
