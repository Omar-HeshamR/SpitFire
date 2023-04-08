import axios from 'axios';
  
export default async function (req, res) {
  try {
    const response = await axios.get(req.body.url);
    const json = response.data;
    res.status(200).json(json);
  } catch (error) {
    res.status(error.response.status || 500).json({ message: error.message });
  }
}