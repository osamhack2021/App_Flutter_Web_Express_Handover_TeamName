import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { snakeToCamelCase } from 'json-style-converter/es5';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import R from 'ramda';

import PromiseItemArray from '_utils/promiseArray';
import { getUser } from '_api/user';
import { getItemByItemId, getItemChild } from '_api/item';
import NoteHeader from '../NoteHeader';
import NoteFooter from '../NoteFooter';
import CardItem from '../CardItem';

function arrayToCardItems(array) {
  return array.map((elem) => <CardItem value={elem} key={elem.Id} />);
}

// type takes "card", "document", "cabinet" values
// refactoring due to change in item schema,
// require sole prop, the item object itself
// Reason : In calling Cards, the Parent already possesses the item array of card from api calls

export default function Card({ Id }) {
  const history = useHistory();

  // find current user from store
  const { user } = useSelector(R.pick(['user']));

  // states of item, createdby, and child array
  const [itemObject, setItemObject] = useState({});
  const [createdBy, setCreatedBy] = useState('');
  const [childObjectArray, setchildObjectArray] = useState([]);

  // set boolean states to handle asynchronous requests
  const [loadingItem, setLoadingItem] = useState(true);
  const [loadingChild, setLoadingChild] = useState(true);
  const [loadingCreator, setLoadingCreator] = useState(true);

  useEffect(() => {
    getItemByItemId(Id).then((item) => {
      setItemObject(snakeToCamelCase(item));
      setLoadingItem(false);
      getItemChild(item.path).then((childArray) => {
        setchildObjectArray(childArray);
        setLoadingChild(false);
      });
    });

    getUser(Id).then((data) => {
      setCreatedBy(data.name);
      setLoadingCreator(false);
    });
  }, []);

  // setting appropriate values to constants
  const { title, content } = itemObject;
  const className = `note--${itemObject.type}`;
  const isArchived = user.bookmarks.includes(Id);
  const dateFromNow = '2주 전 수정됨';
  const routeChange = () => {
    const path = `item/${Id}`;
    history.push(path);
  };
  const innerContent = (itemObject.type === 'card' ? content : arrayToCardItems(childObjectArray));
  const boolSum = loadingItem && loadingChild && loadingCreator;

  return !boolSum && (
    <div className={className}>
      <div>
        {/* passing NoteHeader onClick element, so that upon clicking title can be redirected */}
        <NoteHeader title={title} isArchived={isArchived} onClick={routeChange} />
        <div className="description">
          {createdBy}
        </div>
        <div className="container-child">
          {innerContent}
        </div>
      </div>
      <NoteFooter dateFromNow={dateFromNow} />
    </div>
  );
}

Card.propTypes = {
  Id: PropTypes.string.isRequired,
};
