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
                <div id="resources" className="hidden">
                    <div className="text-long">

                        Finding mental health resources can be overwhelming at first, so we listed some help resources that would be a good start
                        <br />
                        <br />

                        <b>If you are facing an emergency, please refer to the <Link to="/emergency">Emergency</Link> page, where we list resources that will be better suited for you at this moment</b>
                        <br />
                        <br />
                        <div className="resources-list">

                            <b>Resources Provided By The University of Washington</b><br/><br/>
                            <table>
                            <tbody>
                                <tr>
                                    <td>UW Counseling Center</td>
                                    <td><a href="http://www.washington.edu/counseling/">Counseling Center's Website</a></td>
                                </tr>
                                <tr>
                                    <td>UW Hall Health</td>
                                    <td><a href="http://depts.washington.edu/hhpccweb/project/mental-health-clinic/">Hall Health's Website</a></td>
                                </tr>
                                <tr>
                                    <td>UW LiveWell</td>
                                    <td><a href="https://depts.washington.edu/livewell/ ">LiveWell's Website</a></td>
                                </tr>

                                <tr>
                                    <td>UW Medicine</td>
                                    <td><a href="http://healthlibrary.uwmedicine.org/Wellness/MentalHealth/  ">UW Medicine's Mental Health Website</a></td>
                                </tr>
                                </tbody>
                            </table>

                            <br /><br/>
                            <b>Other Resources</b><br/><br/>
                            <table>
                            <tbody>
                                <tr>
                                    <td>UW Social Work Resources</td>
                                    <td><a href="https://socialwork.uw.edu/counseling-resources-students">Resource Page Link</a></td>
                                </tr>
                                <tr>
                                    <td>King County Resources </td>
                                    <td><a href="https://www.kingcounty.gov/depts/community-human-services/mental-health-substance-abuse/services/mental-health.aspx">King County's Resource Site</a></td>
                                </tr>
                                <tr>
                                    <td>Crisis Connections</td>
                                    <td><a href="https://www.crisisconnections.org/">Crisis Connections' Website</a></td>
                                </tr>
                                <tr>
                                    <td>NAMI</td>
                                    <td><a href="https://www.nami.org/  ">NAMI's Website</a></td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}