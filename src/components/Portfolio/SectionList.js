import React, { Component } from 'react';

class SectionList extends Component {
    sectionClick = () => {
        const navList = document.getElementById("nav-lst");
        navList.classList = "nav-list hidden";
    }

    render() {
        const sections = this.props.sections;

        return (
            <ul className="nav-list" id="nav-lst">
                {sections.map((section, index) => (
                    <li key={index}>
                        <a onClick={this.sectionClick} className="flex-col" href={section.ref} id={`section-${index}`}>{section.name}</a>
                    </li>
                ))}
            </ul>
        );
    }
}

export default SectionList;
