import HomeContact from '../models/HomeContactModel.js';

// @desc  Submit a contact enquiry
// @route POST /api/home-contact
export const addContactEnquiry = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const enquiry = await HomeContact.create({ name, phone, email, message });

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const msg = Object.values(error.errors)[0].message;
      return res.status(400).json({ message: msg });
    }
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

// @desc  Get all contact enquiries (Admin use)
// @route GET /api/home-contact
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await HomeContact.find().sort({ submittedAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enquiries' });
  }
};

// @desc  Delete single enquiry
// @route DELETE /api/home-contact/:id
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await HomeContact.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete enquiry' });
  }
};

// @desc  Delete multiple enquiries
// @route DELETE /api/home-contact
export const deleteMultipleEnquiries = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res
        .status(400)
        .json({ message: 'Please provide an array of IDs' });
    }

    const result = await HomeContact.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${result.deletedCount} enquiry(s) deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete multiple enquiries' });
  }
};
