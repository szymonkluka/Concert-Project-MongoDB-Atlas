const Testimonial = require('../models/testimonial.model')

// get all testimonials
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRandomTestimonial = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Testimonial.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.getTestimonialById = async (req, res) => {
    try {
        const testimonialId = await Testimonial.findById(req.params.id)
        if (!testimonialId) res.status(404).json({ message: 'Not found' });
        else res.json(testimonialId);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.postTestimonial = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({
            author: author,
            text: text
        });
        await newTestimonial.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// modify testimonial by its id

exports.modifyTestimonial = async (req, res) => {
    const { author, text } = req.body;

    try {
        const testimonialId = await Testimonial.findById(req.params.id);
        if (testimonialId) {
            await Testimonial.updateOne({ _id: req.params.id }, {
                $set: {
                    author: author,
                    text: text
                }
            });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

// delete testimonial by its id
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonialId = await Testimonial.findById(req.params.id);
        if (testimonialId) {
            await Testimonial.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};
