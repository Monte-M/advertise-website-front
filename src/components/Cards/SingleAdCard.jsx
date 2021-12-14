import React, { useState } from "react";
import { Link } from "react-router-dom";
import { array } from "yup";
import { useAuthCtx } from "../../store/AuthContext";

import Icon from "../UI/Icons/Icon";
import css from "./SingleAdCard.module.css";
function SingleAdCard({ item, date }) {
  const authCtx = useAuthCtx();
  const loggedIn = authCtx.isLoggedIn;

  const [favourites, setFavourites] = useState([]);

  const dateOptions = {
    dateStyle: "medium",
    timeStyle: "medium",
  };

  const addItem = (e) => {
    e.preventDefault();
    if (item.id !== favourites[0]?.item) {
      const newFavourite = {
        item: item,
        fav: true,
      };
      setFavourites([...favourites, newFavourite]);
    }
  };

  console.log("favorites", favourites);
  console.log("item", item.id);

  const badDate = new Date(date);
  const goodDate = badDate.toLocaleString("lt-Lt", dateOptions);
  return (
    <div className={css.container}>
      <Link to={`/single/${item.id}`}>
        <div className={css.imgContainer}>
          {loggedIn && (
            <div onClick={addItem}>
              <Icon icon='fa-heart-o' />
            </div>
          )}

          <img src={item.image} alt='' />
        </div>
        <div className={css.adContainer}>
          <h2>{item.title}</h2>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-clock-o' />
            </div>

            <h4>{goodDate}</h4>
          </div>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-map-marker' />
            </div>

            <h4>{item.city}</h4>
          </div>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-tasks ' />
            </div>

            <h4>{item.category}</h4>
          </div>

          <h2 className={css.highlight}>$ {item.price}</h2>
        </div>
      </Link>
    </div>
  );
}

export default SingleAdCard;
