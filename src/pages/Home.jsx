import React, {useEffect} from 'react';
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from '../components';
import {setCategory, setSortBy} from '../redux/action/filters';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPizzas} from '../redux/action/pizza';
import {addPizzaToCart} from '../redux/action/cart';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  {name: 'популярности', type: 'rating', order: 'desc'},
  {name: 'цене', type: 'price', order: 'asc'},
  {name: 'алфавиту', type: 'name', order: 'asc'},
];

const Home = () => {

    const dispatch = useDispatch();

    const onSelecteCategories = React.useCallback((index) => {
      dispatch(setCategory(index));
    }, [dispatch]);

    const onSelecteSortType = React.useCallback((type) => {
      dispatch(setSortBy(type));
    }, [dispatch]);

    const onAddPizzaToCart = (obj) => {
      dispatch(addPizzaToCart(obj));
    }

    const {items, isLoaded, sortBy, category} = useSelector(({pizzas, filters}) => {
      return {
        items: pizzas.items,
        isLoaded: pizzas.isLoaded,
        sortBy: filters.sortBy,
        category: filters.category,
      }
    });

    const cartItems = useSelector(({cart}) => cart.items)

    useEffect(() => {
      dispatch(fetchPizzas(sortBy, category))
    }, [category, sortBy, dispatch]);

    return (
        <div className="container">
          <div className="content__top">
            <Categories 
              activeCategory={category}
              onClickCategory={onSelecteCategories}
              items={categoryNames}/>
            <SortPopup onClickSortType={onSelecteSortType} activeSortType={sortBy.type} items={sortItems}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoaded &&
              items.map(item => {
                return <PizzaBlock 
                  addedCount={cartItems[item.id] && cartItems[item.id].items.length}
                  onClickAddPizza={onAddPizzaToCart}
                  id={item.id} 
                  key={item.id} 
                  {...item}/>
              }) 
            }
            {!isLoaded &&
              Array(12).fill(0).map((item, id) => <PizzaLoadingBlock key={id}/>)
            }
          </div>
        </div>
    )
}

export default Home;
