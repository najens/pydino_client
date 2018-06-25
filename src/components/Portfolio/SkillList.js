import React, { Component } from 'react';

class SkillList extends Component {
    render() {
        const skills = this.props.skills;
        const labels = this.props.labels;

        return (
            <div className="bars-wrap">
                {skills.map((skill, index) => (
                    <div key={index} className="bar flex-col justify-content-center">
                        <div className={`bar fill width-${skill.percent}`}>
                            <p className="tag bold flex-col" id={`skill-${index}`}>{skill.name}</p>
                        </div>
                        <div id={`percent-${index}`}>{`${skill.percent} %`}</div>
                    </div>
                ))}
                <ul className="bar-labels flex-row">
                    {labels.map((label, index) => (
                        <li key={index} id={`skill-label-${index}`}>{label}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SkillList;
