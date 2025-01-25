import { useMemo, useState } from "react";

export const useFoodCostCalculator = () => {
  const [ingredients, setIngredients] = useState([]);
  const [storeDishPrice, setStoreDishPrice] = useState('');
  const [storeOverhead, setStoreOverhead] = useState('30');

  // 材料の追加
  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, {
      name: ingredient.name || '',
      price: ingredient.price || '',
      quantity: ingredient.quantity || '',
      unit: ingredient.unit || 'g'
    }]);
  };

  // 材料の削除
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // 材料の更新
  const updateIngredient = (index, key, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [key]: value || '' // 空文字をデフォルト値として設定
    };
    setIngredients(newIngredients);
  };

  // 材料の一括追加
  const setAllIngredients = (newIngredients) => {
    setIngredients(newIngredients.map(ing => ({
      name: ing.name || '',
      price: ing.price || '',
      quantity: ing.quantity || '',
      unit: ing.unit || 'g'
    })));
  };

  const calculations = useMemo(() => {
    const homeCost = ingredients.reduce((total, ing) => {
      const price = parseFloat(ing.price) || 0;
      return total + (price);
    }, 0);

    // 数値変換時のNaN対策
    const storePrice = parseFloat(storeDishPrice) || 0;
    const overhead = parseFloat(storeOverhead) || 30;
    const baseStoreCost = (storePrice * (100 - overhead)) / 100;
    const priceDifference = storePrice - homeCost;

    return {
      homeCookingCost: homeCost,
      storeBaseCost: baseStoreCost,
      priceDifference: priceDifference,
      isValid: !isNaN(homeCost) && !isNaN(storePrice)
    };
  }, [ingredients, storeDishPrice, storeOverhead]);

  return {
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
    // 現在の状態を取得
    getState: () => ({
      ingredients,
      storeDishPrice,
      storeOverhead
    }),
    // 全ての値をリセット
    reset: () => {
      setIngredients([]);
      setStoreDishPrice('');
      setStoreOverhead('30');
    }
  };
};