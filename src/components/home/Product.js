import React from 'react';
import './Product.css';

const Product = ({ imageUrl, title, search }) => {

    const highLightedTitle = (title, searchTerm) => {
        const index = title.toLowerCase().indexOf(searchTerm.toLowerCase());

        if (index !== -1 && searchTerm.length > 0) {
            const firstHalf = title.slice(0, index);
            const secondHalf = title.slice(index + searchTerm.length);

            return (
                <div>
                    {firstHalf}
                    <span className="highlighted-text">{title.substr(index, searchTerm.length)}</span>
                    {secondHalf}
                </div>
            );
        }
    }

    return (
        <div className='productContainer'>
            <div className='product'>
                <img src={`https://test.create.diagnal.com/images/${imageUrl}`} width={"100%"} alt="" onError={(
                    event
                ) => {
                    const eventTarget = event.target;
                    eventTarget.src = 'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png';
                }} />
                <div className=''>{search ? highLightedTitle(title, search) : title}</div>
            </div>
        </div>
    )
}

export default Product;