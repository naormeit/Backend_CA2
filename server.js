const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

let users = [];

app.post('/api/user', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password ){
        return res.status(400).json({error: 'Enter your credentials.'});
    }

    const newUser = {
        id : Date.now,
        email,
        password
    }

    users.push(newUser);

    res.status(401).json({message: 'User entered successfully.'});
    
})

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const {email, password } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email not found' });
    }
  
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      return res.status(404).json({ error: 'User not found.' });
    }
  
    users[index] = { id: userId, email, password };
    res.json({ message: 'User updated successfully', user: users[index] });
  });

  app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const deletedUser = users.splice(index, 1)[0];
    res.json({ message: 'User deleted successfully', user: deletedUser });
  });


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
