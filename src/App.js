import React, {Component} from 'react';
import Header from './components/Header';
import Footer from "./components/Footer";
import Products from "./components/Products";
import {connect} from 'react-redux';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header siteName={this.props.siteName} siteDesc={this.props.siteDescription}/>
                <Products products={this.props.products}/>
                <Footer/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state/*, ownProps*/) => {
    return {
        siteName: state.siteName,
        siteDescription: state.siteDescription,
        products: state.products
    }
};

export default connect(mapStateToProps)(App)
