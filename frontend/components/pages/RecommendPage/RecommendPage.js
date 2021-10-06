import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import R from 'ramda';

import HorizontalHeader from '_organisms/HorizontalHeader';
import HorizontalContent from '_organisms/HorizontalContent';
import Header from '_organisms/Header';
import { snakeToCamelCase } from 'json-style-converter/es5';
import { getRecommendItem } from '_api/item';

export default function RecommendPage({ location }) {
  const [loading, setLoading] = useState(true);
  const [recommendObject, setRecommendObject] = useState({});
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    console.log(`Recommend rendering with userId : ${user.Id}`);
    getRecommendItem(user.Id).then((data) => {
      setRecommendObject(snakeToCamelCase(data));
      setLoading(false);
    });
  }, [location]);

  return !loading && (
    <div className="recommend-page">
      <Header />
      <div className="recommend-page-header">
        추천 양식
      </div>
      <div className="recommend-container">
        <div className="recommend-block">
          <HorizontalHeader type="cabinet" />
          <hr />
          <HorizontalContent type="cabinet" cardArray={recommendObject.cabinet} />
        </div>
        <div className="recommend-block">
          <HorizontalHeader type="document" />
          <hr />
          <HorizontalContent type="document" cardArray={recommendObject.document} />
        </div>
        <div className="recommend-block">
          <HorizontalHeader type="card" />
          <hr />
          <HorizontalContent type="card" cardArray={recommendObject.card} />
        </div>
      </div>
    </div>

  );
}

RecommendPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
