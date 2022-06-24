import "./style.css";
import MealAds from './MealAds'
import AvailableMeal from "./AvailableMeal";

const Body = () => {

  return (
    <div>
      <div className="hero"></div>
      <MealAds />
      <AvailableMeal />
    </div>
  );
};

export default Body;
