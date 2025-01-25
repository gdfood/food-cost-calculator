export const PRESET_RECIPES = {
  'チャーハン': {
    name: 'チャーハン',
    ingredients: [
      { name: 'ご飯', quantity: 200, unit: 'g', price: 30 },
      { name: '卵', quantity: 1, unit: '個', price: 25 },
      { name: 'チャーシュー', quantity: 50, unit: 'g', price: 150 },
      { name: '長ネギ', quantity: 20, unit: 'g', price: 20 },
      { name: '醤油', quantity: 5, unit: 'ml', price: 5 },
      { name: 'ごま油', quantity: 5, unit: 'ml', price: 10 }
    ],
    storePrice: 800,
    overhead: 30
  },
  'カレーライス': {
    name: 'カレーライス',
    ingredients: [
      { name: 'ご飯', quantity: 200, unit: 'g', price: 30 },
      { name: 'じゃがいも', quantity: 100, unit: 'g', price: 40 },
      { name: 'にんじん', quantity: 50, unit: 'g', price: 30 },
      { name: '玉ねぎ', quantity: 100, unit: 'g', price: 30 },
      { name: '豚肉', quantity: 100, unit: 'g', price: 200 },
      { name: 'カレールー', quantity: 50, unit: 'g', price: 100 }
    ],
    storePrice: 800,
    overhead: 30
  },
  '親子丼': {
    name: '親子丼',
    ingredients: [
      { name: 'ご飯', quantity: 200, unit: 'g', price: 30 },
      { name: '鶏肉', quantity: 100, unit: 'g', price: 150 },
      { name: '卵', quantity: 2, unit: '個', price: 50 },
      { name: '玉ねぎ', quantity: 50, unit: 'g', price: 15 },
      { name: 'だし汁', quantity: 100, unit: 'ml', price: 20 },
      { name: '醤油', quantity: 15, unit: 'ml', price: 15 }
    ],
    storePrice: 850,
    overhead: 30
  },
  '焼きそば': {
    name: '焼きそば',
    ingredients: [
      { name: '中華麺', quantity: 150, unit: 'g', price: 100 },
      { name: 'キャベツ', quantity: 100, unit: 'g', price: 30 },
      { name: '豚肉', quantity: 50, unit: 'g', price: 100 },
      { name: '玉ねぎ', quantity: 50, unit: 'g', price: 15 },
      { name: 'もやし', quantity: 50, unit: 'g', price: 20 },
      { name: 'ソース', quantity: 20, unit: 'ml', price: 20 }
    ],
    storePrice: 700,
    overhead: 30
  }
};