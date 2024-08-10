"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Superuser: React.FC = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("/api/v1/items");
    setItems(response.data.items);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/v1/items", { name, description });
    console.log(res);

    fetchItems();
    setName("");
    setDescription("");
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold">Superuser</h1>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          className="block w-full mt-2 mb-2 text-black"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Item Description"
          className="block w-full mt-2 mb-2 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </form>
      <ul>
        {items?.map((item: any) => (
          <li key={item._id} className="mt-4">
            <h2 className="text-xl font-bold ">{item.name}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Superuser;
