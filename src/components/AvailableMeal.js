import CartContext from "../store/context";
import Input from "./Input";
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { FaPlus } from "react-icons/fa";

// const mealData = [
//   { id: "m0", title: "Jollof Rice", desc: "Nigerian Favourite Food", amt: 650 },
//   { id: "m1", title: "Pounded Yam", desc: "The food that gives joy", amt: 850 },
//   { id: "m2", title: "Beans", desc: "The messy food", amt: 400 },
//   { id: "m3", title: "Egg Sause", desc: "Kid favourite", amt: 500 },
//   { id: "m4", title: "Yam Porrage", desc: "Nice food but boring", amt: 650 },
// ];

const AvailableMeal = () => {
  const inputRef = useRef([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cartContext = useContext(CartContext);
  const [mealData, setMealData] = useState([])

  const onCartAdded = useCallback(
    (data) => {
      const inputVal = parseInt(inputRef.current[data.id].value);
      if (inputVal >= 1 || inputRef.current[data.id].value.trim() !== "")
        cartContext.addItemToCart({ ...data, qty: inputVal });
    },
    [cartContext]
  );  

  const fetchedDataHandler = useCallback(async () => {
    try {
      setIsLoading(true)
      setHasError(false)
      const response = await fetch(
        "https://react-http-edb1d-default-rtdb.firebaseio.com/meal.json"
      );
      !response.ok && setHasError(true);      
      const dataJson = await response.json();
      const resultArray = [];
      for (const data in dataJson) {
        const dataObj = {
          id: dataJson[data].id,
          title: dataJson[data].title,
          desc: dataJson[data].desc,
          price: dataJson[data].price,
        };
        resultArray.push(dataObj);
      }
      // console.log("Data Fetched ==", resultArray);
      setMealData(resultArray)
    } catch {
      setHasError(true)
    }
    setIsLoading(false)
  }, []);

  useEffect(() => {
    fetchedDataHandler();
  }, [fetchedDataHandler]);

  return (
    <div className="cart-items">
      {isLoading && <p style={{textAlign: 'center'}}>Loading...</p>}
      {hasError && <p style={{textAlign: 'center'}}>An Error has Occured!</p>}
      {mealData.length > 0 && !hasError && mealData.map((meal) => (
        <div key={meal.id} className="meal-items">
          <div className="items-section">
            <h2>{meal.title}</h2>
            <p>{meal.desc}</p>
            <h2 className="amt">₦{meal.price}</h2>
          </div>
          <div className="amt-section">
            <div className="main-amt-section">
              <h2>Quantity</h2>
              <Input
                ref={(el) => (inputRef.current[meal.id] = el)}
                input={{
                  type: "number",
                  key: meal.id,
                  id: meal.id,
                  min: "1",
                  defaultValue: "1",
                }}
              />
            </div>
            <button type="button" onClick={onCartAdded.bind(null, meal)}>
              <FaPlus /> Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableMeal;
