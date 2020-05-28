import React, {Component} from 'react';
import {connect} from 'react-redux';

class BasketProducts extends Component {

    render() {
        const {basket, basketCount} = this.props;
        return (
            <React.Fragment>
                {
                    basketCount > 0 ?
                        basket.map(item => {
                            return this.renderBasketProduct(item.prodId, item.prodCount)
                        })
                        : <span>Sepetinizde ürün bulunamadı</span>
                }
            </React.Fragment>
        );
    }

    renderBasketProduct(basketId, basketCount) {

        const {products} = this.props;
        return products.map(item => {
            if (item.id === basketId) {
                return (
                    <div className="card mb-3 basketRow" key={item.id}>
                        <div className="row no-gutters">
                            <div className="col-md-3">
                                <img src={item.image} className="card-img" alt={item.name}/>
                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <h6 className="card-title">{item.name}</h6>
                                    <p className="card-text description">{item.description}</p>
                                    <div className="card-text d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="basketPrice">{item.price} TL </span>
                                            <span> x {basketCount} adet</span>
                                        </div>
                                        <span className="float-right small removeBasket"
                                              onClick={() => this.props.removeBasket(item.id, basketCount, item.price)}>Sepetten Çıkar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeBasket: (prodId, prodCount, prodPrice) => {
            dispatch({'type': 'REMOVE-BASKET-PRODUCT', prodId: prodId});
            dispatch({
                'type': 'SUBTRACT-BASKET-TOTAL-PRICE',
                'payload': (parseFloat(prodCount) * parseFloat(prodPrice))
            });
        }
    }
}


const mapStateToProps = (state) => {
    return {
        basket: state.basket,
        products: state.products,
        basketCount: state.basketCount
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketProducts);
