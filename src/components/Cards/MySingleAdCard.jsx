import React from "react";
import { Link } from "react-router-dom";
import Icon from "../UI/Icons/Icon";
import css from "./MySingleAdCard.module.css";
import Button from "../UI/Buttons/Button";
import { deleteFetch } from "../../utils/fetch";
import { useAuthCtx } from "../../store/AuthContext";

function MySingleAdCard({ item, date }) {
  const dateOptions = {
    dateStyle: "medium",
    timeStyle: "medium",
  };

  const badDate = new Date(date);
  const goodDate = badDate.toLocaleString("lt-Lt", dateOptions);
  const authCtx = useAuthCtx();
  const token = authCtx.token;

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = await deleteFetch(
      `http://localhost:3001/items/delete/${item.id}`,
      token
    );
    window.location.reload();
  };

  return (
    <div className={css.container}>
      <Link to={`/single/${item.id}`}>
        <div className={css.imgContainer}>
          <img src={`http://localhost:3001/ad-img/` + item.image} alt='' />
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

          <div className={css.lowerSection}>
            <h2 className={css.highlight}>$ {item.price}</h2>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MySingleAdCard;
