import express from "express";
import axios from "axios";

const app = express();
const port = 2000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(express.static("public"));

app.get("/", async(req, res) => {
    const ingredients = [];
  try {
    const result = await axios.get(API_URL);
    for (var i = 1; i < 16; i++) {
        var ingredientIndex = "strIngredient" + i.toString();
        ingredientIndex = result.data.drinks[0][ingredientIndex]
        var measureIndex = "strMeasure" + i.toString();
        measureIndex = result.data.drinks[0][measureIndex]
        if (ingredientIndex === null){
            break;
        }
        if (measureIndex === null){
            measureIndex = "";
        }
        ingredients.push({
            measure: measureIndex,
            ingredient: ingredientIndex
        });
    }
    res.render("index.ejs", {
        ingredients : ingredients,
        drinkName : result.data.drinks[0].strDrink,
        drinkCategory : result.data.drinks[0].strCategory,
        drinkAlcoholic : result.data.drinks[0].strAlcoholic,
        drinkImage : result.data.drinks[0].strDrinkThumb,
        drinkInstructions : result.data.drinks[0].strInstructions
    });
  } catch (error) {
    console.log(error.response);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});