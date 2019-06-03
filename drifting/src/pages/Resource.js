import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Resource extends Component {
    // Set up a blank title and description input field
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("resources").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <p className="header-text">
                        General Resources
                    </p>
                </div>
                <div id="resources" className="hidden">

                    <div className="text-long">

                        Finding mental health resources can be overwhelming at first, so we listed some help resources that would be a good start
                        <br />
                        <br />

                        <b>If you are facing an emergency, please refer to the <Link to="/emergency">Emergency</Link> page, where we list resources that will be better suited for you at this moment</b>
                        <br />
                        <br />
                        <div className="resources-list">

                            <b>Resources Provided By The University of Washington</b><br /><br />
                            <a href="http://www.washington.edu/counseling/">UW Counseling Center</a><br />
                            <a href="http://depts.washington.edu/hhpccweb/project/mental-health-clinic/">UW Hall Health</a><br />
                            <a href="https://depts.washington.edu/livewell/ ">UW LiveWell</a><br />
                            <a href="http://healthlibrary.uwmedicine.org/Wellness/MentalHealth/  ">UW Medicine</a><br />

                            <br /><br />
                            <b>Other Resources</b><br /><br />

                            <a href="https://socialwork.uw.edu/counseling-resources-students">UW Social Work Resource Page</a><br />
                            <a href="https://www.kingcounty.gov/depts/community-human-services/mental-health-substance-abuse/services/mental-health.aspx">King County Mental Health Resources</a><br />
                            <a href="https://www.crisisconnections.org/">Crisis Connections</a><br />
                            <a href="https://www.nami.org/  ">NAMI (National Alliance On Mental Health)</a><br />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}