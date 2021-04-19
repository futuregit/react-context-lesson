import React, { useContext } from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import CollectionsContext from '../../contexts/collections/collections.context';

import './collection.styles.scss';

// this.props.match object is given to use by the BrowserRouter
// wrapped around the root App component in index.js.
// The match object contains the path, url, and params objects.

const CollectionPage = ({ match }) => {
  // collections will hold an array of a collection title and a array of collection items by title
  const collections = useContext(CollectionsContext);
  // match.params.collectionId is either "hats", "shoes", 
  // "jacket", "mens" or "women".

  const collection = collections[match.params.collectionId];
  // Grab the title and items by collection title.
  const { title, items } = collection;
  // Use items.map to return an array with item.id(1,2,3...)
  // and item({id: 1, imageUrl: "https...", name: "Brown Hat", price: 25} })
  // and assign each index or array items as props to CollectionItem.
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};


export default CollectionPage;
