"use client";

import Script from "next/script";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChefHat,
  ShoppingCart,
  PlusCircle,
  MinusCircle,
  Book,
} from "lucide-react";
import { PRESET_RECIPES } from "@/lib/constants/recipes";

const FoodCostComparison = () => {
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 1, unit: "g", price: 0 },
  ]);
  const [storeDishPrice, setStoreDishPrice] = useState("");
  const [storeOverhead, setStoreOverhead] = useState(30);
  const [selectedRecipe, setSelectedRecipe] = useState("");

  const loadPreset = (recipeName) => {
    if (PRESET_RECIPES[recipeName]) {
      const recipe = PRESET_RECIPES[recipeName];
      setIngredients(recipe.ingredients);
      setStoreDishPrice(recipe.storePrice);
      setStoreOverhead(recipe.overhead);
      setSelectedRecipe(recipeName);
    }
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: 1, unit: "g", price: 0 },
    ]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const calculateHomeCookingCost = () => {
    return ingredients.reduce((total, ingredient) => {
      return total + (parseFloat(ingredient.price) || 0);
    }, 0);
  };

  const calculateStoreBaseCost = () => {
    const storePrice = parseFloat(storeDishPrice) || 0;
    const overheadPercent = parseFloat(storeOverhead) || 0;
    const baseCost = (storePrice * (100 - overheadPercent)) / 100;
    return baseCost;
  };

  return (
    <>
      <Script
        id="schema-recipe-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "食費計算ツール",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "JPY",
            },
            featureList: [
              "自炊コスト計算",
              "店舗価格比較",
              "プリセットレシピ機能",
            ],
          }),
        }}
      />

      <div
        className="max-w-4xl mx-auto p-4"
        role="main"
        aria-label="食費計算ツール"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">食費比較計算機</h1>
        {/* プリセットレシピセクション */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle
              className="flex items-center gap-2"
              aria-label="プリセットレシピ選択"
            >
              <Book className="h-6 w-6" aria-hidden="true" />
              プリセットレシピ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-2"
              role="group"
              aria-label="レシピ一覧"
            >
              {Object.keys(PRESET_RECIPES).map((recipeName) => (
                <button
                  key={recipeName}
                  onClick={() => loadPreset(recipeName)}
                  aria-label={`${recipeName}を選択`}
                  className={`p-2 rounded border ${
                    selectedRecipe === recipeName
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {recipeName}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* 自炊セクション */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-6 w-6" />
              自炊コスト計算
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4" role="group" aria-label="材料リスト">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    aria-label={`材料${index + 1}の名前`}
                    placeholder="材料名"
                    className="border rounded p-2 w-1/3"
                    value={ingredient.name}
                    onChange={(e) =>
                      updateIngredient(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    aria-label={`材料${index + 1}の数量`}
                    className="border rounded p-2 w-20"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      updateIngredient(index, "quantity", e.target.value)
                    }
                  />
                  <select
                    className="border rounded p-2"
                    value={ingredient.unit}
                    onChange={(e) =>
                      updateIngredient(index, "unit", e.target.value)
                    }
                  >
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    <option value="個">個</option>
                  </select>
                  <input
                    type="number"
                    placeholder="価格"
                    className="border rounded p-2 w-24"
                    value={ingredient.price}
                    onChange={(e) =>
                      updateIngredient(index, "price", e.target.value)
                    }
                  />
                  <span>円</span>
                  <button
                    onClick={() => removeIngredient(index)}
                    className="p-1 text-red-500"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={addIngredient}
                className="flex items-center gap-2 text-blue-500"
              >
                <PlusCircle className="h-5 w-5" />
                材料を追加
              </button>
            </div>
          </CardContent>
        </Card>
        {/* お店での購入セクション */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              お店での購入コスト
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="お店の価格"
                  className="border rounded p-2 w-32"
                  value={storeDishPrice}
                  onChange={(e) => setStoreDishPrice(e.target.value)}
                />
                <span>円</span>
              </div>
              <div className="flex items-center gap-2">
                <label>経費率：</label>
                <input
                  type="number"
                  className="border rounded p-2 w-20"
                  value={storeOverhead}
                  onChange={(e) => setStoreOverhead(e.target.value)}
                />
                <span>%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* 比較結果 */}
        <Card>
          <CardHeader>
            <CardTitle aria-label="計算結果">比較結果</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  <div className="flex justify-between items-center">
                    <span>自炊コスト：</span>
                    <span className="font-bold">
                      {calculateHomeCookingCost()}円
                    </span>
                  </div>
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertDescription>
                  <div className="flex justify-between items-center">
                    <span>お店の原価（推定）：</span>
                    <span className="font-bold">
                      {calculateStoreBaseCost().toFixed(0)}円
                    </span>
                  </div>
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertDescription>
                  <div className="flex justify-between items-center">
                    <span>価格差：</span>
                    <span className="font-bold">
                      {(
                        parseFloat(storeDishPrice) - calculateHomeCookingCost()
                      ).toFixed(0)}
                      円
                    </span>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FoodCostComparison;
