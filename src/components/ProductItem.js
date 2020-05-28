import React, {Component} from 'react';
import {connect} from 'react-redux';

class ProductItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basketPiece: 1
        }
    }

    render() {
        let {basketPiece} = this.state;
        return (
            <React.Fragment>
                <div className="col col-3 item mb-4">
                    <div className="card">
                        <img src={this.props.product.image}
                             className="card-img-top" alt={this.props.product.name}/>
                        <div className="card-body">
                            <h6 className="card-title">{this.props.product.name}</h6>
                            <p className="card-text">{this.props.product.description}</p>
                            <p className="price">{this.props.product.price} TL</p>
                            <div className="d-flex addBasketDiv justify-content-between">
                                <span className="inputDiv">
                                    <select className="basketPiece" value={basketPiece}
                                            onChange={e => this.setState({basketPiece: e.target.value})}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </span>
                                {this.renderBasketButtons()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderBasketButtons() {
        let {basketProducts, product} = this.props;

        if (basketProducts.some(basketProd => basketProd.prodId === product.id)) {
            return (
                <button className="btn btn-success"
                        onClick={() => this.props.removeBasket(this.props.product.id, this.state.basketPiece, this.props.product.price)}>Sepetten
                    Çıkar
                </button>
            )
        } else {
            return (
                <button className="btn btn-primary"
                        onClick={() => this.props.addBasket(this.props.product.id, this.state.basketPiece, this.props.product.price)}>Sepete
                    Ekle
                </button>
            )
        }
    }

}

const mapStateToProps = (state/*, ownProps*/) => {
    return {
        basketProducts: state.basket
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addBasket: (prodId, prodCount, prodPrice) => {
            let basketProd = {
                prodId: prodId,
                prodCount: parseInt(prodCount)
            };
            dispatch({'type': 'SET-BASKET-PRODUCT', 'payload': basketProd})
            dispatch({'type': 'SUM-BASKET-TOTAL-PRICE', 'payload': (parseFloat(prodCount) * parseFloat(prodPrice))})
        },
        removeBasket: (prodId, prodCount, prodPrice) => {
            dispatch({'type': 'REMOVE-BASKET-PRODUCT', prodId: prodId});
            dispatch({
                'type': 'SUBTRACT-BASKET-TOTAL-PRICE',
                'payload': (parseFloat(prodCount) * parseFloat(prodPrice))
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
