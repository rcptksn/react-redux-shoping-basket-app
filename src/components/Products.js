import React, {Component} from 'react';
import ProductItem from "./ProductItem";

class Products extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="row productList">
                    {
                        this.props.products.map(item => {
                            return (
                                <ProductItem product={item} key={item.id}/>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Products;
