import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'; // Import icons

const Filters = ({
  selectedTag, setSelectedTag,
  selectedFamily, setSelectedFamily,
  selectedOrder, setSelectedOrder,
  searchQuery, setSearchQuery,
  products, texts, clearAllFilters
}) => {

  // Extract unique orders from products
  const allOrders = [...new Set(products.map(product => product.order))];

  // Extract unique families for the selected order
  const getFamiliesForOrder = (order) => {
    const families = products
      .filter(product => product.order === order)
      .map(product => product.family);
    return [...new Set(families)];
  };

  // Extract unique tags from products
  const allTags = [...new Set(products.flatMap(product => product.tags))];

  return (
    <div className="filters row">
      
      <div className="field">
        <select
          name='order'
          value={selectedOrder}
          onChange={(e) => {
            setSelectedOrder(e.target.value);
            setSelectedFamily(''); // Reset family when order changes
          }}
          >
          <option value=""></option>
          {allOrders.map(order => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </select>
        <label htmlFor='order'>{texts.selectOrder}</label>
      </div>

      <div className="field">
        <select
          name='family'
          value={selectedFamily}
          onChange={(e) => setSelectedFamily(e.target.value)}
          disabled={!selectedOrder} // Disable if no order is selected
        >
          <option value=""></option> 
          {getFamiliesForOrder(selectedOrder).map(family => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
        <label htmlFor='family'>{texts.selectFamily}</label>
      </div>

      
      <div className="field group">
        <label>{texts.filterByTag}</label>

        <div className='options'>
          {allTags.map(tag => (
            <span
              key={tag}
              className={`tag ${selectedTag === tag ? 'selected' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </span>
          ))}

        </div>
          
      </div>

      
      <div className="field">
        <input
          name='search'
          type="text"
          placeholder={texts.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label htmlFor='search'>{texts.search}</label>
      </div>

        <button onClick={clearAllFilters} className={`close ${selectedTag || selectedFamily || selectedOrder || searchQuery ? '' : 'disabled'}`}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      
    </div>
  );
};

export default Filters;
