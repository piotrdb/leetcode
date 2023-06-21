import { useState } from 'react';
import ProblemsTable from '../components/ProblemsTable/ProblemsTable';
import TopBar from '../components/TopBar/TopBar';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

export default function Home() {
  const [inputs, setInput] = useState({
    id: '',
    title: '',
    difficulty: '',
    category: '',
    videoId: '',
    link: '',
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submited');
    await setDoc(doc(firestore, 'problems', inputs.id), {
      ...inputs,
      order: Number(inputs.order),
    });
  };

  return (
    <main className="bg-dark-layer-2 min-h-screen">
      <TopBar />
      <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
        &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
      </h1>

      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
            <tr>
              <th scope="col" className="px-1 py-3 w-0 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Difficulty
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Category
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Solution
              </th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>

      <form
        className="p-6 flex flex-col max-w-sm gap-3"
        onSubmit={handleSubmit}
      >
        <input
          onChange={inputChange}
          type="text"
          placeholder="problem id"
          name="id"
        />
        <input
          onChange={inputChange}
          type="text"
          placeholder="title"
          name="title"
        />
        <input
          onChange={inputChange}
          type="text"
          placeholder="difficulty"
          name="difficulty"
        />
        <input
          onChange={inputChange}
          type="text"
          placeholder="category"
          name="category"
        />
        <input
          onChange={inputChange}
          type="text"
          placeholder="video id?"
          name="videoId"
        />
        <input
          onChange={inputChange}
          type="text"
          placeholder="video link?"
          name="link"
        />
        <input
          onChange={inputChange}
          type="text"
          placeholder="order"
          name="order"
        />
        <button className="bg-white">save to database</button>
      </form>
    </main>
  );
}
