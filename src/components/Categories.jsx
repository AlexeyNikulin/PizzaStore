import React from 'react';
import PropTypes from 'prop-types';

const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {

    let maxId = 100;

    return (
        <div className="categories">
            <ul>
                <li 
                    className={activeCategory === null ? 'active' : ''}
                    onClick={() => onClickCategory(null)}>Все</li>
                {items && 
                items.map((item, index) => {
                    maxId++;
                    let clazz = index === activeCategory ? 'active' : '';
                    return <li 
                        key={maxId}
                        className={clazz}
                        onClick={() => onClickCategory(index)}>{item}</li>
                })}
            </ul>
        </div>
    )
});

Categories.propTypes = {
//   activeCategory: PropTypes.oneOf([PropTypes.number, null]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default Categories