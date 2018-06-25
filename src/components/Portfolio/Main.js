import React, { Component } from 'react';
import Intro from './Intro';
import About from './About';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Contact from './Contact';

class Main extends Component {
    render() {
        return (
            <main>
                <Intro />
                <About />
                <Skills />
                <Portfolio />
                <Contact />
            </main>
        );
    }
}

export default Main;
