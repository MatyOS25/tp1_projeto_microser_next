import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import UpdateModal from './UpdateModal';

interface Show {
  id: number;
  title: string;
  genre: string;
  season: number;
  episode: number;
}

const TvShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [newShow, setNewShow] = useState<Omit<Show, 'id'>>({ title: '', genre: '', season: 0, episode: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState<Show | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('http://localhost:8080/tvshows');
      const data: Show[] = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows:', error);
      setError('Error fetching shows');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShow((prev) => ({ ...prev, [name]: value }));
  };

  const addShow = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/tvshows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShow),
      });
      setNewShow({ title: '', genre: '', season: 0, episode: 0 });
      fetchShows();
    } catch (error) {
      console.error('Error adding show:', error);
      setError('Error adding show');
    }
  };

  const deleteShow = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/tvshows/${id}`, {
        method: 'DELETE',
      });
      fetchShows();
    } catch (error) {
      console.error('Error deleting show:', error);
      setError('Error deleting show');
    }
  };

  const openUpdateModal = (show: Show) => {
    setCurrentShow(show);
    setIsModalOpen(true);
  };

  const updateShow = async (id: number, updatedShow: Show) => {
    try {
      await fetch(`http://localhost:8080/tvshows/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedShow),
      });
      fetchShows();
    } catch (error) {
      console.error('Error updating show:', error);
      setError('Error updating show');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TV Shows</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={addShow} className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newShow.title}
          onChange={handleInputChange}
          className="border p-2 m-2"
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={newShow.genre}
          onChange={handleInputChange}
          className="border p-2 m-2"
          required
        />
        <input
          type="number"
          name="season"
          placeholder="Season"
          value={newShow.season}
          onChange={handleInputChange}
          className="border p-2 m-2"
          required
        />
        <input
          type="number"
          name="episode"
          placeholder="Episode"
          value={newShow.episode}
          onChange={handleInputChange}
          className="border p-2 m-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2">Add Show</button>
      </form>
      <div>
        {shows.map((show) => (
          <div key={show.id} className="border p-4 mb-2 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{show.title}</h2>
              <p>Genre: {show.genre}</p>
              <p>Season: {show.season}</p>
              <p>Episode: {show.episode}</p>
            </div>
            <div>
              <button onClick={() => deleteShow(show.id)} className="bg-red-500 text-white p-2 m-2">Delete</button>
              <button onClick={() => openUpdateModal(show)} className="bg-yellow-500 text-white p-2 m-2">Update</button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && currentShow && (
        <UpdateModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          show={currentShow}
          onUpdate={updateShow}
        />
      )}
    </div>
  );
};

export default TvShows;
