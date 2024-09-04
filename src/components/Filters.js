import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Filters = ({
  selectedTags = [], // Default to empty array if undefined
  setSelectedTags,
  selectedFamily, setSelectedFamily,
  selectedOrder, setSelectedOrder,
  searchQuery, setSearchQuery,
  products, texts, clearAllFilters
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  const allOrders = [...new Set(products.map(product => product.order))];

  const getFamiliesForOrder = (order) => {
    const families = products
      .filter(product => product.order === order)
      .map(product => product.family);
    return [...new Set(families)];
  };

  const allTags = [...new Set(products.flatMap(product => product.tags))];

  // Filter tags based on search query
  const filteredTags = allTags.filter(tag => tag.toLowerCase().includes(tagSearchQuery.toLowerCase()));

  const handleTagSelect = (tag) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleTagSearchClear = () => {
    setTagSearchQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`filters row content ${isFixed ? 'fixed' : ''}`}>
      <div className="field w190">
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
        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      <div className="field w190">
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
        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      <div className="field group expandable">
        <label>{texts.filterByTag}</label>
        <div className="tag-search">
          <input
            name='tag-search'
            type="text"
            placeholder={texts.searchTagPlaceholder}
            value={tagSearchQuery}
            onChange={(e) => setTagSearchQuery(e.target.value)}
          />
          {tagSearchQuery && (
            <button
              type="button"
              className="clear-button"
              onClick={handleTagSearchClear}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          )}
        </div>
        <div className='options'>
          {filteredTags
            .filter(tag => tag !== "") // Filter out empty tags
            .map(tag => (
              <span
                key={tag}
                className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagSelect(tag)}
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

      <button 
        onClick={clearAllFilters} 
        className={`close ${selectedTags.length || selectedFamily || selectedOrder || searchQuery ? '' : 'disabled'}`}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
};

export default Filters;
