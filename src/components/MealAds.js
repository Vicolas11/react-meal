import React from "react";
import "./style.css";

const MealAds = () => {

  return (
    <div className="float-content">
      <h1>Delicious Food, Delivered To You!</h1>
      <p>
        Choose your favourite meal from our broad selection of avaible meals and
        enjoy a delicious lunch or dinner at home
      </p>
      <p>
        All our meals are cooked with high quality ingredients, just-in-time and
        of course by experience chefs!
      </p>
    </div>
  );
};

export default React.memo(MealAds)
