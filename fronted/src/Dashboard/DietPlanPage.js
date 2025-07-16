// DietPlanPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Navbard from './Navbard';
import "./DietPlanPage.css";

const dietPlans = {
  underweight: {
    vegetarian: {
      category: "Underweight - vegetarian",
      meals: {
        breakfast: [
          "Oatmeal with banana",
          "Peanut butter toast",
          "Paneer paratha",
          "Almond smoothie",
          "Chia pudding",
          "Idli with sambar",
          "Stuffed poha"
        ],
        lunch: [
          "Rajma chawal",
          "Paneer curry & roti",
          "Vegetable biryani",
          "Chickpea salad",
          "Stuffed paratha & curd",
          "Khichdi with ghee",
          "Veg pulao & dal"
        ],
        dinner: [
          "Dal makhani & rice",
          "Mix veg curry & chapati",
          "Paneer tikka & salad",
          "Lentil soup & toast",
          "Stuffed bell pepper",
          "Vegetable pasta",
          "Idli & sambar"
        ]
      }
    },
    nonVegetarian: {
      category: "Underweight - nonVegetarian",
      meals: {
        breakfast: [
          "Egg sandwich",
          "Chicken sausage & toast",
          "Omelette & banana",
          "Greek yogurt & berries",
          "Boiled eggs & nuts",
          "Protein shake & toast",
          "Scrambled eggs"
        ],
        lunch: [
          "Grilled chicken & rice",
          "Chicken biryani",
          "Fish curry & chapati",
          "Egg curry & roti",
          "Chicken pasta",
          "Lamb curry & rice",
          "Beef stew & toast"
        ],
        dinner: [
          "Chicken soup & toast",
          "Grilled fish & salad",
          "Shrimp curry & rice",
          "Baked salmon & potato",
          "Egg curry & chapati",
          "Chicken tikka & salad",
          "Fish wrap & veggies"
        ]
      }
    }
  },
  normal: {
    vegetarian: {
      category: "Normal - vegetarian",
      meals: {
        breakfast: [
          "Fruit smoothie",
          "Oats with seeds",
          "Vegetable upma",
          "Chilla & chutney",
          "Paneer sandwich",
          "Poha with veggies",
          "Yogurt bowl"
        ],
        lunch: [
          "Dal & rice",
          "Veg khichdi",
          "Tofu curry & roti",
          "Paneer bhurji",
          "Veg pulao & raita",
          "Stuffed paratha",
          "Chole with rice"
        ],
        dinner: [
          "Vegetable soup",
          "Lentil salad",
          "Grilled paneer & salad",
          "Chapati with curry",
          "Idli & sambar",
          "Tofu stir fry",
          "Veg curry & rice"
        ]
      }
    },
    nonVegetarian: {
      category: "Normal - nonVegetarian",
      meals: {
        breakfast: [
          "Boiled eggs & toast",
          "Chicken sandwich",
          "Egg wrap",
          "Greek yogurt & banana",
          "Omelet & smoothie",
          "Egg curry & rice",
          "Chicken sausage"
        ],
        lunch: [
          "Grilled chicken & salad",
          "Fish curry & brown rice",
          "Chicken biryani",
          "Egg bhurji & roti",
          "Shrimp stir fry",
          "Lamb stew & chapati",
          "Chicken pulao"
        ],
        dinner: [
          "Chicken soup & bread",
          "Grilled fish & salad",
          "Shrimp pasta",
          "Chicken curry & roti",
          "Roasted turkey",
          "Egg curry & rice",
          "Fish wrap"
        ]
      }
    }
    },

     overweight: {
    vegetarian: {
      category: "Overweight - vegetarian",
      meals: {
        breakfast: [
          "Green smoothie with spinach and banana",
          "Oats with skim milk and berries",
          "Sprouted moong salad",
          "Low-fat yogurt with fruit",
          "Multigrain toast with avocado",
          "Vegetable juice and boiled eggs",
          "Poha with veggies and flaxseeds"
        ],
        lunch: [
          "Brown rice with dal and veggies",
          "Grilled tofu salad",
          "Quinoa pulao with raita",
          "Vegetable soup with multigrain toast",
          "Chapati with mixed vegetable curry",
          "Lentil salad with olive oil dressing",
          "Steamed idli with sambar"
        ],
        dinner: [
          "Clear vegetable soup and chapati",
          "Grilled paneer and sautéed vegetables",
          "Tofu stir fry with brown rice",
          "Moong dal cheela with salad",
          "Stuffed bell peppers with quinoa",
          "Vegetable khichdi with curd",
          "Lentil soup with whole grain toast"
        ]
      }
    },
    nonVegetarian: {
      category: "Overweight - nonVegetarian",
      meals: {
        breakfast: [
          "Boiled eggs with fruit",
          "Oats with low-fat milk and seeds",
          "Greek yogurt with berries",
          "Scrambled egg whites with toast",
          "Chicken sausage with steamed veggies",
          "Smoothie with whey protein and banana",
          "Grilled chicken slice with salad"
        ],
        lunch: [
          "Grilled chicken breast with brown rice",
          "Fish curry with steamed veggies",
          "Egg white bhurji with roti",
          "Chicken salad with olive oil dressing",
          "Grilled salmon and quinoa",
          "Shrimp stir fry with broccoli",
          "Lentil soup with chicken strips"
        ],
        dinner: [
          "Chicken soup with whole grain toast",
          "Baked fish with asparagus",
          "Boiled egg curry with roti",
          "Grilled turkey with steamed vegetables",
          "Shrimp and spinach salad",
          "Egg white omelette with salad",
          "Chicken stew with low-fat curd"
        ]
      }
    }
  },
  obese: {
    vegetarian: {
      category: "Obese - vegetarian",
      meals: {
        breakfast: [
          "Oats porridge with chia seeds",
          "Vegetable smoothie (spinach, cucumber, lemon)",
          "Moong dal chilla",
          "Low-fat yogurt with fruits",
          "Boiled sprouts with lemon",
          "Ragi dosa",
          "Methi thepla (no oil)"
        ],
        lunch: [
          "Brown rice + dal + cucumber salad",
          "Multigrain roti + mixed veg curry + curd",
          "Quinoa with stir-fried vegetables",
          "Low-oil rajma curry + roti",
          "Tofu & spinach curry",
          "Lauki chana dal + chapati",
          "Cabbage sabzi + moong dal + rice"
        ],
        dinner: [
          "Vegetable soup + salad",
          "Stir-fried paneer + steamed veggies",
          "Khichdi (moong dal + brown rice)",
          "Cabbage soup + whole wheat toast",
          "Palak tofu curry + roti",
          "Sprout salad bowl",
          "Zucchini stir-fry + dal"
        ]
      }
    },
    nonVegetarian: {
      category: "Obese - nonVegetarian",
      meals: {
        breakfast: [
          "Boiled egg whites + multigrain toast",
          "Grilled chicken sandwich (whole wheat bread)",
          "Greek yogurt + berries",
          "Vegetable omelet (less oil)",
          "Protein smoothie (spinach + egg white + berries)",
          "Scrambled eggs + tomato",
          "Egg wrap (no cheese/oil)"
        ],
        lunch: [
          "Grilled chicken + brown rice + salad",
          "Fish curry (low oil) + roti",
          "Chicken soup + whole wheat toast",
          "Grilled turkey slices + veggies",
          "Egg bhurji + chapati",
          "Boiled eggs + cucumber salad",
          "Stir-fried shrimp + quinoa"
        ],
        dinner: [
          "Chicken broth + veggies",
          "Grilled salmon + sautéed spinach",
          "Chicken tikka (no oil) + cucumber raita",
          "Fish soup + toast",
          "Egg curry (less oil) + brown rice",
          "Chicken stir fry + boiled veggies",
          "Boiled egg salad"
        ]
      }
    }
}
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5 && bmi>0) return "underweight";
  if (bmi < 25 && bmi>18.5) return "normal";
  if (bmi < 30 && bmi>25) return "overweight"; // for expansion
  return "obese"; // for expansion
};

export default function DietPlanPage() {
  const location = useLocation();
  const { bmi, dietType, age, gender } = location.state || {};

  const categoryKey = getBMICategory(bmi);
  const plan = dietPlans[categoryKey]?.[dietType];

  if (!plan) {
    return <p>Sorry, no plan found for your data.</p>;
  }

  return (
    <div>
       <Navbard />
       <div id="top">
    <div className="container">
      <h1>Diet Plan</h1>
      <h3>
        BMI: {bmi} | Category: {plan.category} | Age: {age} | Gender: {gender}
      </h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 7 }).map((_, i) => (
            <tr key={i}>
              <td>Day {i + 1}</td>
              <td>{plan.meals.breakfast[i]}</td>
              <td>{plan.meals.lunch[i]}</td>
              <td>{plan.meals.dinner[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}
