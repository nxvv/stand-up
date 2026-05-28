import { useState } from "react";

export default function ListItem() {

  const [checkedItems, setCheckedItems] = useState({
    item1 : false,
    item2 : false,
    item3 : false,
    item4 : false,
    item5 : false,
    item6 : false,
  });

  const [lastCheckedItem, setLastCheckedItem] = useState("");
  const [numberOfChecked, setNumberOfChecked] = useState(0);

  function handleChange(e)
  {
    if(numberOfChecked == 3) {
      setCheckedItems({
        ...checkedItems, 
        [e.target.id] : e.target.checked,
        [lastCheckedItem] : false
      });
    } else {
      setCheckedItems({
        ...checkedItems, 
        [e.target.id] : e.target.checked
      });
    }

    if (e.target.checked) {
      setLastCheckedItem(e.target.id)
      if (numberOfChecked < 3) setNumberOfChecked(numberOfChecked + 1)
    } else {
      setNumberOfChecked(numberOfChecked - 1)
    }
    
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Items</h2>
        
        <ul className="space-y-3">
          <li 
            key={1}
            className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition">
            <div>
              <span className="font-medium text-gray-900">Item 1</span>
              <p className="text-sm text-gray-600 mt-1">Description for item 1</p>
            </div>
            <input
              id="item1" 
              checked={checkedItems.item1}
              onChange={handleChange}
              type="checkbox" 
              className="ml-4 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0"
            />
          </li>
          <li 
            key={2}
            className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition">
            <div>
              <span className="font-medium text-gray-900">Item 2</span>
              <p className="text-sm text-gray-600 mt-1">Description for item 2</p>
            </div>
            <input 
              id="item2"
              checked={checkedItems.item2}
              onChange={handleChange}
              type="checkbox" 
              className="ml-4 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0" />
          </li>
          <li 
            key={3}
            className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition">
            <div>
              <span className="font-medium text-gray-900">Item 3</span>
              <p className="text-sm text-gray-600 mt-1">Description for item 3</p>
            </div>
            <input
              id="item3"
              checked={checkedItems.item3} 
              onChange={handleChange}
              type="checkbox" 
              className="ml-4 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0" />
          </li>
          <li 
            key={4}
            className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition">
            <div>
              <span className="font-medium text-gray-900">Item 4</span>
              <p className="text-sm text-gray-600 mt-1">Description for item 4</p>
            </div>
            <input 
              id="item4"
              checked={checkedItems.item4}
              onChange={handleChange}
              type="checkbox" 
              className="ml-4 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0" />
          </li>
          <li 
            key={5}
            className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition">
            <div>
              <span className="font-medium text-gray-900">Item 5</span>
              <p className="text-sm text-gray-600 mt-1">Description for item 5</p>
            </div>
            <input 
              id="item5"
              checked={checkedItems.item5}
              onChange={handleChange}
              type="checkbox" 
              className="ml-4 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0" />
          </li>
          <li 
            key={6}
            className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition">
            <div>
              <span className="font-medium text-gray-900">Item 6</span>
              <p className="text-sm text-gray-600 mt-1">Description for item 6</p>
            </div>
            <input 
              id="item6"
              checked={checkedItems.item6}
              onChange={handleChange}
              type="checkbox" 
              className="ml-4 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0" />
          </li>
        </ul>
      </div>
    </div>
  );
}