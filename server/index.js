const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const membersJson = require('./members.json');

let members = [...membersJson];

const app = express();

const corsOptions = { origin: '*', optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

app.use(bodyParser.json());

/**
 * @query query: string
 */
app.get('/members', (req, res) => {
  const query = req.query.query;
  const sort = req.query.sort;
  const rating = req.query.rating;
  const activity = req.query.activity;

  let filteredMembers = [...members];
  
  // filter by name
  if (query) {
    const q = query.toLowerCase();
    filteredMembers = members.filter(member =>
      member?.name?.toLowerCase()?.includes(q)
    );
    console.log('GET filtered /members');
  }

  // filter by rating
  if (rating) {
    filteredMembers = filteredMembers.filter(member => member.rating === ratingNumber);
  }

  // Filter by number of activities?? or Name of activities? Unclear. 
  // filter by activity
  // If an activity is included in the list
  if (activity) {
    filteredMembers = filteredMembers.filter(member => 
      member.activities.map(a => a.toLowerCase()).includes(activity)
    );
  }

  // sort by name
  if (sort) {
    if (sort === 'asc') {
      filteredMembers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'desc') {
      filteredMembers.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  // sort by Activity
  // What parameter should we take to sort the activities? 
  // Based on number of activities? Or unique activities? 

  console.log('GET /members');
  res.send(filteredMembers);
});

/**
 * @body name: string required
 * @body age: integer
 * @body activities: array[string]
 * @body rating: enum [1-5]
 */
app.post("/members", (req, res) => {
  const body = req.body.body;
  let newMember = body;
  if (body) {
    if (!body.name) {
      res.send("Name is required");
      return;
    }
    newMember = {
      id: Math.floor(10000 + Math.random() * 90000),
      activities: [],
      ...body,
    };
    members.push(newMember);
  }
  res.send(newMember);
});

/**
 * @param id: string required
 * 
 * @body name: string required
 * @body age: integer
 * @body activities: array[string]
 * @body rating: enum [1-5]
 */
app.patch('/members/:id', (req, res) => {
  console.log('PATCH /members');
  const id = req.params.id;
  const body = req.body.body;

  if (body) {
    members = members.map(member => {
      if (member.id == id) {
        return { ...member, ...body };
      }
      return member;
    });
  }
  res.send(req.body);
});

/**
 * @param id: string required
 */
app.delete('/members/:id', (req, res) => {
  console.log('DELETE /members');
  const id = req.params.id;
  //  quick fix the delete operation on new additions
  const memberIndex = members.findIndex(member => member.id == id);
  
  if (memberIndex !== -1) {
    members.splice(memberIndex, 1);
    res.send('Member removed successfully');
  } else {
    res.status(404).send('Member not found');
  }
});

const PORT = 4444;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
