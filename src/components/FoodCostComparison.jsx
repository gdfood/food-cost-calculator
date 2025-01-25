"use client";

import Script from "next/script";
import React, { useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChefHat, PlusCircle, MinusCircle } from "lucide-react";

import { PRESET_RECIPES } from "@/constants/presetRecipes";
import { useFoodCostCalculator } from "../hooks/useFoodCostCalculator";
import PriceCard from "./ui/PriceCard";
import RecipeButton from "./ui/RecipeButton";

const InputField = ({
  label,
  value,
  onChange,
  min = 0,
  max,
  suffix,
  width = "w-32",
}) => (
  <div className="flex items-center gap-2">
    <label>{label}</label>
    <input
      type="number"
      className={`border rounded p-2 ${width}`}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      required
      aria-label={`${label}を入力`}
    />
    <span>{suffix}</span>
  </div>
);

const formatPrice = (price) => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
  }).format(price);
};

const FoodCostComparison = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    ingredients,
    storeDishPrice,
    storeOverhead,
    calculations,
    setStoreDishPrice,
    setStoreOverhead,
    addIngredient,
    removeIngredient,
    updateIngredient,
    setAllIngredients,
    reset,
  } = useFoodCostCalculator();

  const loadPreset = useCallback((recipeName) => {
    const recipe = PRESET_RECIPES[recipeName];
    setSelectedRecipe(recipeName);
    setAllIngredients(recipe.ingredients);
    setStoreDishPrice(recipe.storePrice || "");
    setStoreOverhead(recipe.overhead || "30");
  }, [setAllIngredients, setStoreDishPrice, setStoreOverhead]);

  const handleStoreInputChange = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setStoreDishPrice("");
      setError(null);
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setStoreDishPrice(value);
      setError(null);
    } else {
      setError("正しい価格を入力してください");
    }
  };

  const handleOverheadChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setStoreOverhead(value);
      setError(null);
    } else {
      setError("経費率は0から100の間で入力してください");
    }
  };

  return (
    <React.Fragment>
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
      <div className="max-w-4xl mx-auto p-4">
        {/* 1. プリセットレシピ選択 (最上部に配置) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {Object.keys(PRESET_RECIPES).map((recipeName) => (
            <RecipeButton
              key={recipeName}
              name={recipeName}
              isSelected={selectedRecipe === recipeName}
              onClick={() => loadPreset(recipeName)}
            />
          ))}
        </div>

        {/* 2. 計算結果 (すぐに見える位置に配置) */}
        <div className="grid md:grid-cols-3 gap-4">
          <PriceCard 
            title="自宅での調理費用"
            amount={formatPrice(calculations.homeCookingCost)}
            bgColor="bg-blue-50"
          />
          <PriceCard 
            title="お店の原価（推定）"
            amount={formatPrice(calculations.storeBaseCost)}
            bgColor="bg-green-50"
          />
          <PriceCard 
            title="価格差"
            amount={formatPrice(calculations.priceDifference)}
            bgColor="bg-yellow-50"
          />
        </div>

        {/* 3. 詳細設定 (アコーディオンで折りたたみ可能) */}
        <details className="mt-4">
          <summary className="cursor-pointer font-bold mb-4">詳細設定</summary>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-4 items-center">
              <InputField
                label="お店の価格"
                value={storeDishPrice}
                onChange={handleStoreInputChange}
                suffix="円"
              />
              <InputField
                label="経費率"
                value={storeOverhead}
                onChange={handleOverheadChange}
                suffix="%"
                width="w-24"
              />
            </div>
            {/* 材料リストはここに配置 */}
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
                        aria-label={`材料${index + 1}を削除`}
                        title={`材料${index + 1}を削除`}
                        onClick={() => removeIngredient(index)}
                        className="p-1 text-red-500"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addIngredient({ name: "", price: "", unit: "" })
                    }
                    className="flex items-center gap-2 text-blue-500"
                  >
                    <PlusCircle className="h-5 w-5" />
                    材料を追加
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </details>
      </div>
    </React.Fragment>
  );
};

export default FoodCostComparison;
