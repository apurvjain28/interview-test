import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Block, Cell, Filters, Input, Table, TH, Thead, Actions } from "./styles";
import MemberModal from "./memberForm";

const getData = async (setMembers, searchName = '', sort = '') => {
  try {
    const res = await axios.get(`http://localhost:4444/members?query=${searchName}&sort=${sort}`);
    setMembers(res.data);
  } catch(err)  {
    console.log('ERROR', err);
  }
};

const createMember = async (member) => {
  try {
    const res = await axios.post('http://localhost:4444/members', { body: member});
  } catch (err) {
    console.log('ERROR', err);
  }
};

const updateMember = async (id, member) => {
  try {
    await axios.patch(`http://localhost:4444/members/${id}`, { body: member});
    // getData(setMembers);
  } catch (err) {
    console.log('ERROR', err);
  }
};

const deleteMember = async (id) => {
  try {
    await axios.delete(`http://localhost:4444/members/${id}`);
  } catch (err) {
    console.log('ERROR', err);
  }
};

export const SearchBar = ({onSearch}) => (
  <Input
    type="text"
    placeholder="Search for a member"
    onChange={(e) => onSearch(e.target.value)}
  />
);

export const CreateButton = ({onClick}) => (
  <button
      type="button"
      onClick={onClick}
  >
      Create
  </button>
);

const SortOptions = ({ onSortChange }) => (
  <select onChange={(e) => onSortChange(e.target.value)}>
    <option value="">Sort by Name</option>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
);

export const Row = ({ id, age, name, activities, rating, handleEdit, handleDelete}) => (
  <tr key={id}>
    <Cell>{name}</Cell>
    <Cell>{age}</Cell>
    <Cell>{rating}</Cell>
    <Cell>
      {activities.map((activity, i) => (
        <div key={i}>{activity}</div>
      ))}
    </Cell>
    <Cell>
      <Actions>
        <button onClick={() => handleEdit(id)}>Edit</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </Actions>
    </Cell>
  </tr>
);

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [debouncedSearchName, setDebouncedSearchName] = useState(searchName);

  const openModal = (member = null) => {
    setSelectedMember(member);
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedMember(null)
  }

  // create and update Members
  const handleSubmit = (member) => {
    if (selectedMember) {
        updateMember(selectedMember.id, member).then(() => getData(setMembers, debouncedSearchName, sortOrder));
      } else {
        createMember(member).then(() => getData(setMembers, debouncedSearchName, sortOrder));
      }
  };

  const handleDelete = (id) => {
    deleteMember(id).then(() => getData(setMembers, debouncedSearchName, sortOrder));
  }

  const handleSearch = (term) => {
    setSearchName(term);
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort);
  }

  // debouncing added
  useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedSearchName(searchName);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchName]);


  useEffect(() => {
    getData(setMembers, debouncedSearchName, sortOrder);
  }, [debouncedSearchName, sortOrder]);


  return (
  <>
    <MemberModal
      isOpen={modalIsOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      memberData={selectedMember}
    />
    <Block>
      <h1>My Club's Members</h1>
      <Filters>
        <SearchBar onSearch={handleSearch}/>
        <CreateButton onClick={() => openModal()}/>
        <SortOptions onSortChange={handleSortChange}/>
      </Filters>
      <Table>
        <Thead>
          <tr>
            <TH>Name</TH>
            <TH>Age</TH>
            <TH>Member Rating</TH>
            <TH>Activities</TH>
            <TH>Actions</TH>
          </tr>
        </Thead>
        <tbody>
          {members.map((member) => (
            <Row {...member} key={member.id} 
              handleEdit={() => openModal(member)}
              handleDelete={() => handleDelete(member.id)}
            />
          ))}
        </tbody>
      </Table>
    </Block>
  </>
  );
};

export default MemberList;
