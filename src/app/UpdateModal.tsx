import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

interface Show {
  id: number;
  title: string;
  genre: string;
  season: number;
  episode: number;
}

interface UpdateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  show: Show;
  onUpdate: (id: number, updatedShow: Show) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onRequestClose, show, onUpdate }) => {
  const [updatedShow, setUpdatedShow] = useState<Show>(show);

  // Sync local state with props
  useEffect(() => {
    setUpdatedShow(show);
  }, [show]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedShow((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(updatedShow.id, updatedShow);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Show"
      className="bg-white p-4 border rounded shadow-lg mx-auto mt-24 max-w-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Update Show</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={updatedShow.title}
          onChange={handleInputChange}
          className="border p-2 m-2 w-full"
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={updatedShow.genre}
          onChange={handleInputChange}
          className="border p-2 m-2 w-full"
          required
        />
        <input
          type="number"
          name="season"
          placeholder="Season"
          value={updatedShow.season}
          onChange={handleInputChange}
          className="border p-2 m-2 w-full"
          required
        />
        <input
          type="number"
          name="episode"
          placeholder="Episode"
          value={updatedShow.episode}
          onChange={handleInputChange}
          className="border p-2 m-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2">Update Show</button>
        <button type="button" onClick={onRequestClose} className="bg-gray-500 text-white p-2 m-2">Cancel</button>
      </form>
    </Modal>
  );
};

export default UpdateModal;
