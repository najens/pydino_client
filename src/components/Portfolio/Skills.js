import React, { Component } from 'react';
import SkillList from './SkillList';
import data from '../../utils/data/skills';

class Skills extends Component {
    render() {
        return (
            <div id="skills">
                <div className="container pg-margin flex-col">
                    <header>
                        <h3 className='bold' id="skills-heading">Skills</h3>
                        <div className='header-bar'></div>
                    </header>
                    <SkillList skills={data.skills} labels={data.labels} />
                </div>
            </div>
        );
    }
}

export default Skills;
