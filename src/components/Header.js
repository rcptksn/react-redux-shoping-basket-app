import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import BasketProducts from "./BasketProducts";

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    handleClose() {
        this.setState({
            showModal: false
        })
    }

    handleShow() {
        this.setState({
            showModal: true
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.renderModal()}
                <div
                    className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm justify-content-between">
                    <div className="logoContent d-flex align-items-center">
                        <img className="mr-3"
                             src="https://cdn3.iconfinder.com/data/icons/seo-and-internet-marketing-12/512/74-512.png"
                             alt=""
                             width="48"
                             height="48"/>
                        <div className="lh-100">
                            <h5 className="mb-0 text-white lh-100">{this.props.siteName}</h5>
                            <smaller>{this.props.siteDesc}</smaller>
                        </div>
                    </div>

                    <div className="basketContent" onClick={this.handleShow.bind(this)}>
                        <span className="basketIcon">&nbsp;</span>
                        Sepetim
                        <span className="basketCount">{this.props.basketCount}</span>
                    </div>

                </div>
            </React.Fragment>
        );
    }

    renderModal() {
        const {showModal} = this.state;
        return (
            <Modal show={showModal} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sepetim ({this.props.basketCount})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BasketProducts/>
                </Modal.Body>
                {
                    this.props.basketCount > 0 ? <Modal.Footer>
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex flex-column">
                                <span>Sepete {this.props.basketCount} adet ürün eklediniz.</span>
                                <span>Toplam fiyat: <strong>{this.props.basketTotalPrice.toFixed(3)}</strong> TL</span>
                            </div>
                            <button className="btn btn-success">Alışverişi Tamamla</button>
                        </div>
                    </Modal.Footer> : null
                }
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        basketCount: state.basketCount,
        basketTotalPrice: state.basketTotalPrice
    }
}

export default connect(mapStateToProps)(Header);
