import React, { Component } from 'react';

class Intro extends Component {
    render() {
        return (
            <section className="flex-col" id="intro">
                <div className="container">
                    <header>
                        <h1 id="intro-heading">Nathan Jensen</h1>
                        <h2 id="intro-subheading">Full Stack Software Engineer</h2>
                    </header><a className="button" href="#about" id="intro-link">View my work</a>
                </div>
            </section>
        );
    }
}

export default Intro;
