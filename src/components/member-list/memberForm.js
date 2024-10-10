import React, { useState, useEffect } from 'react';
import Modal from "../UI/Modal"
import {FormInput, Action} from "./styles"

const MemberModal = ({ isOpen, onClose, onSubmit, memberData }) => {
  const [form, setForm] = useState({ name: '', age: '', rating: '', activities: '' });

  useEffect(() => {
    if (memberData) {
      setForm({
        name: memberData.name,
        age: memberData.age,
        rating: memberData.rating,
        activities: memberData.activities.join(', '),
      });
    } else {
      setForm({ name: '', age: '', rating: '', activities: '' });
    }
  }, [memberData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const formattedForm = {
      ...form,
      activities: form.activities.split(',').map(activity => activity.trim()),
    };
    onSubmit(formattedForm);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{memberData ? 'Edit Member' : 'Create Member'}</h2>
      <FormInput>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Member Rating"
          value={form.rating}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="activities"
          placeholder="Activities(comma separated)"
          value={form.activities}
          onChange={handleInputChange}
        />
        <Action>
          <button onClick={handleSubmit}>{memberData ? 'Update' : 'Create'}</button>
          <button onClick={onClose}>Cancel</button>
        </Action>
      </FormInput>
    </Modal>
  );
};

export default MemberModal;