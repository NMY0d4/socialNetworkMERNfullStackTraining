import User from '../models/User.model.js';

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const formatFriend = ({
  _id,
  firstName,
  lastName,
  occupation,
  location,
  picturePath,
}) => ({
  _id,
  firstName,
  lastName,
  occupation,
  location,
  picturePath,
});

const getFriendsById = async (id) => {
  const user = await User.findById(id);
  const friends = await Promise.all(user.friends.map((id) => getUserById(id)));
  const formattedFriends = friends.map((friend) => formatFriend(friend));
  return formattedFriends;
};

const toggleFriend = async (userId, friendId) => {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== userId);
  } else {
    user.friends.push(friendId);
    friend.friends.push(userId);
  }

  await user.save();
  await friend.save();
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const formattedFriends = await getFriendsById(id);
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    await toggleFriend(id, friendId);
    const formattedFriends = await getFriendsById(id);
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
