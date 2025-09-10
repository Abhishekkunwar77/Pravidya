import Subscriber from '../models/Subscriber.js';

// @desc   Add subscriber
// @route  POST /api/subscribers/subscribe
export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({
      message: 'Subscribed successfully!',
      subscriber,
    });
  } catch (error) {
    // 🛠 Check if it's a Mongoose validation error
    if (error.name === 'ValidationError') {
      // Grab the first error message only
      const msg = Object.values(error.errors)[0].message;
      return res.status(400).json({ message: msg });
    }

    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

// @desc   Get all subscribers
// @route  GET /api/subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete one subscriber
// @route  DELETE /api/subscribers/:id
export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findByIdAndDelete(id);

    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete multiple subscribers
// @route  DELETE /api/subscribers
export const deleteMultipleSubscribers = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of IDs

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: 'Please provide an array of IDs' });
    }

    const result = await Subscriber.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${result.deletedCount} subscriber(s) deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
