import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer className="text-muted">
                    <div className="container">
                        <p className="float-right">
                            <a href="#">Başa Dön</a>
                        </p>
                        <p>Parcel & React & Redux Example - recepteksan.com</p>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;
