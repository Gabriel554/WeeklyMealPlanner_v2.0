import React, { useState } from 'react';

const WeeklyMealPlanner = () => {
  const [meals, setMeals] = useState({
    Monday: { dinner: 'Baked Salmon with Roasted Vegetables', locked: false },
    Tuesday: { dinner: 'Vegetable Stir Fry with Tofu', locked: false },
    Wednesday: { dinner: 'Grilled Chicken with Sweet Potato', locked: false },
    Thursday: { dinner: 'Beef and Broccoli', locked: false },
    Friday: { dinner: 'Homemade Pizza', locked: false },
    Saturday: { dinner: 'Pasta Primavera', locked: false },
    Sunday: { dinner: 'Roast Chicken with Potatoes', locked: false }
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const dinnerOptions = [
    'Baked Salmon with Roasted Vegetables', 'Vegetable Stir Fry with Tofu', 
    'Grilled Chicken with Sweet Potato', 'Beef and Broccoli', 'Homemade Pizza', 
    'Pasta Primavera', 'Roast Chicken with Potatoes', 'Shrimp Tacos', 
    'Eggplant Parmesan', 'Beef Stew', 'Fish Tacos', 'Chicken Curry',
    'Stuffed Bell Peppers', 'Spaghetti Bolognese', 'Teriyaki Salmon',
    'Chickpea Curry', 'Lentil Soup', 'Black Bean Burgers', 'Turkey Meatloaf',
    'Baked Ziti', 'Pesto Pasta with Chicken', 'Honey Garlic Glazed Salmon',
    'Chicken Fajitas', 'Beef Stroganoff', 'Mushroom Risotto', 'Lamb Chops',
    'Thai Green Curry', 'Beef Tacos', 'Vegetable Lasagna', 'Garlic Butter Shrimp', 
    'Chicken Alfredo'
  ];

  const getRandomMeal = (options) => {
    return options[Math.floor(Math.random() * options.length)];
  };

  const generateMeals = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setMeals(prevMeals => {
        const newMeals = { ...prevMeals };
        
        Object.keys(newMeals).forEach(day => {
          if (!newMeals[day].locked) {
            newMeals[day] = {
              ...newMeals[day],
              dinner: getRandomMeal(dinnerOptions)
            };
          }
        });
        
        return newMeals;
      });
      
      setIsGenerating(false);
    }, 800); // Add delay for animation effect
  };

  const toggleLock = (day) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [day]: {
        ...prevMeals[day],
        locked: !prevMeals[day].locked
      }
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Weekly Dinner Planner</h1>
        <p className="text-sm text-gray-600">Plan your dinners for the week ahead</p>
      </div>
      
      <div className="mb-6">
        <button 
          onClick={generateMeals}
          disabled={isGenerating}
          className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md 
                    bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300
                    ${isGenerating ? 'opacity-75' : ''}`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : "Generate Dinner Plan"}
        </button>
      </div>
      
      <div className="space-y-4">
        {Object.entries(meals).map(([day, mealPlan]) => (
          <div 
            key={day}
            className={`p-4 rounded-lg border-2 transition-all duration-300
                      ${mealPlan.locked 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-gray-800">{day}</h2>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={mealPlan.locked} 
                  onChange={() => toggleLock(day)}
                  className="hidden" 
                />
                <div className={`w-10 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out
                              ${mealPlan.locked ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out
                                ${mealPlan.locked ? 'translate-x-4' : 'translate-x-0'}`}>
                  </div>
                </div>
                <span className="ml-2 text-xs text-gray-600">
                  {mealPlan.locked ? 'Locked' : 'Lock'}
                </span>
              </label>
            </div>
            
            <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <p className="text-gray-700">{mealPlan.dinner}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Lock your favorite meals before generating a new plan</p>
      </div>
    </div>
  );
};

export default WeeklyMealPlanner;